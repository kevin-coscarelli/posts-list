<script lang="ts" setup>
import editIcon from '../assets/edit.svg'
import { ref, defineProps } from 'vue'
import type { Post } from '../services/useFetchPosts'
import { useFetchPosts } from '../services/useFetchPosts'

const { editPost } = useFetchPosts()

const props = defineProps<Post>()
const newTitle = ref(props.title)
const newBody = ref(props.body)

const editMode = ref(false)
function submit() {
    editPost({
        id: props.id,
        title: newTitle.value,
        body: newBody.value
    })
    editMode.value = false
}
</script>
<template>
    <div
        class="border border-[#E3E8EB] bg-white shadow-[0_1px_9px_2px_#C1C2C626] rounded-lg flex flex-col gap-2.5 py-2.5 px-[15px]">
        <div class="flex justify-between gap-2.5 items-baseline">
            <h2 v-if="!editMode" class="font-bold">{{ title }}</h2>
            <input class="px-2 py-1 w-full" name="postTitle" v-if="editMode" placeholder="Post title..."
                v-model="newTitle" />
            <button v-if="!editMode" @click="editMode = true" class="cursor-pointer [&_svg]hover:fill-zinc-500"><img
                    :src="editIcon" /></button>
            <div v-if="editMode" class="flex gap-2.5">
                <button class="font-black cursor-pointer" @click="editMode = false">✕</button>
                <button class="font-black cursor-pointer" @click="submit">✓</button>
            </div>
        </div>
        <p v-if="!editMode" class="text-[#83888F] text-sm overflow-ellipsis w-full line-clamp-3">{{ body }}</p>
        <textarea class="px-2 py-1 text-sm" rows="5" name="postContent" v-if="editMode" placeholder="Post content..."
            v-model="newBody" />
    </div>
</template>