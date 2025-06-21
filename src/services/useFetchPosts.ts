// Reused script

import { ref } from "vue"

// =============
type ReqProps = {
    path?: string,
    body?: Record<string, any>
    params?: Record<string, any>
    url?: string 
}

const baseUrl = 'https://dummyjson.com'

async function requestHandler({ path = '', data, params, url }: ReqProps & { data: RequestInit }) {
    let res
    let parsedRes
    const defUrl = url ?? baseUrl
    const paramString = params ? `?${new URLSearchParams(params).toString()}` : ''
    const urlObj = new URL(`${path}${paramString}`, defUrl)

    try {
        res = await fetch(urlObj.toString(), data)
        if (!res.ok) {
            throw new Error(`${path}: Request failed.`)
        }
        parsedRes = await res.json()
        if (!parsedRes) {
            throw new Error(`${path}: failed to parse response`)
        }
    } catch(e: any) {
        console.error(e.message)
    } finally {
        if (parsedRes) console.log('\x1b[34m [INFO] \x1b[0m', parsedRes)
        else console.log('\x1b[34m [INFO] \x1b[0m', res)
    }

    return parsedRes
}

async function fetchMe({ path, body, params, url }: ReqProps) {
    const data: RequestInit = {
        body: JSON.stringify(body),
        method: 'GET',
    }

    return await requestHandler({ path, data, params, url })
}
// =============

export type Post = {
    id: number,
    title: string,
    body: string,
    reactions?: {
        likes: number,
        dislikes: number
    },
    views?: number
}

const posts = ref<Post[]>([])
const loading = ref(false)
const err = ref<string | null>(null)
const step = 20
let total: number | null = null
let resultCounter = 0
// So IDs dont overlap
let idIndex = 1000
let currentQuery: null | string = null

export function useFetchPosts() {
    // TODO: Add fetch retry strategy and detailed error messages

    const fetchPosts = async (query: string | null = null) => {
        if (query !== currentQuery) {
            currentQuery = query
            total = null
            resultCounter = 0
            posts.value = []
        }
        if (total && resultCounter >= total) return
        loading.value = true
        err.value = null
        try {
            const params = {
                    limit: step,
                    skip: resultCounter,
                    select: 'title,reactions,body,views'
                }
            const res: { total: number, posts: Post[] } = await fetchMe({
                path: currentQuery?.length ? '/posts/search' : '/posts',
                params: {
                    ...(currentQuery?.length && { q: currentQuery }),
                    ...params
                }
            })
            total = res.total
            posts.value = posts.value.concat(res.posts)
            resultCounter += res.posts.length

        } catch (e) {
            err.value = `Couldn't fetch any posts 🙁. Better luck next time.`
        } finally {
            loading.value = false
        }
    }

    const addPost = ({ title, body }: Pick<Post, 'title' | 'body'>) => {
        posts.value = posts.value.concat({
            title,
            body,
            id: idIndex++
        })
    }

    const editPost = ({ title, body, id}: Pick<Post, 'id' | 'title' | 'body'>) => {
        const thePost = posts.value.find(post => post.id === id)
        if (thePost) {
            thePost.body = body
            thePost.title = title
        }
    }

    return {
        posts,
        fetchPosts,
        addPost,
        editPost,
        err,
        loading
    }
}