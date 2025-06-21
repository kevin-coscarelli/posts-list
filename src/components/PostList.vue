<script lang="ts" setup>
import { onMounted, onUnmounted } from 'vue'
import Post from './Post.vue'
import { useFetchPosts } from '../services/useFetchPosts'
// TODO: Centralize edit toggle behavior in list component and toggle one at a time.
// TODO: Make post addition more in line with design.

const { loading, posts, err, fetchPosts } = useFetchPosts()
onMounted(() => {
    fetchPosts()
    window.addEventListener('scroll', handleScroll)
})

const handleScroll = async () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement
    const threshold = 100 // pixels from bottom

    if (scrollHeight - (scrollTop + clientHeight) < threshold && posts.value.length && !loading.value) {
        await fetchPosts()
    }
}

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})
// TODO: pass a bunch of props in a less verbose way
</script>
<template>
    <div class="flex flex-col gap-2.5 justify-center pb-2.5">
        <Post v-if="posts.length" v-for="post in posts" :key="post.id" :body="post.body" :id="post.id"
            :title="post.title" :views="post.views" :reactions="post.reactions" />
        <span v-if="loading">Loading more posts...</span>
        <span v-if="err" class="font-bold text-red-500">{{ err }}</span>
    </div>
</template>
