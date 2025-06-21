<script lang="ts" setup>
import { ref } from 'vue'
import Modal from './Modal.vue'
import { useFetchPosts } from '../services/useFetchPosts'

const { addPost } = useFetchPosts()
const showModal = ref(false)
const newTitle = ref('')
const newBody = ref('')

function toggleModal() {
    showModal.value = !showModal.value
}
function closeModal() {
    toggleModal()
    newBody.value = ''
    newTitle.value = ''
}

function submit() {
    addPost({
        title: newTitle.value,
        body: newBody.value
    })
    closeModal()
}
</script>

<template>
    <nav class="flex justify-between">
        <h1 class="font-bold text-xl">Posts</h1>
        <button @click="showModal = !showModal" class="text-primary cursor-pointer hover:text-sky-800">Add post</button>
    </nav>

    <Modal :showModal="showModal" @toggleModal="toggleModal">
        <form @submit.prevent="submit" class="flex flex-col gap-4">
            <h1 class="font-bold text-xl">Add new post</h1>
            <div class="flex flex-col">
                <label for="title" class="text-sm font-bold">Title</label>
                <input name="title" placeholder="Post title..." class="px-2 py-1 border border-gray-400 rounded-lg" v-model="newTitle" />
            </div>
            <div class="flex flex-col">
                <label for="body" class="text-sm font-bold">Body</label>
                <textarea name="body" rows="5" placeholder="Post content..." class="px-2 py-1 border border-gray-400 rounded-lg" v-model="newBody" />
            </div>
            <div class="flex justify-center gap-4">
                <button type="submit" class="btn text-white bg-primary hover:bg-sky-700 active:bg-sky-900">Add</button>
                <button @click="closeModal"
                    class="btn text-white bg-gray-400 hover:bg-gray-500 active:bg-gray-700">Cancel</button>
            </div>
        </form>
    </Modal>
</template>

<style></style>