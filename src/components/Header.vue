<script lang="ts" setup>
import { ref } from 'vue'
import Modal from './Modal.vue'

const showModal = ref(false)
function toggleModal() {
    showModal.value = !showModal.value
}
</script>

<template>
    <nav class="flex justify-between">
        <h1 class="font-bold text-xl">Posts</h1>
        <button @click="showModal = !showModal" class="text-primary cursor-pointer hover:text-sky-800">Add post</button>
    </nav>

    <Modal :showModal="showModal" @toggleModal="toggleModal">
        <div class="flex flex-col gap-4">
            <h1 class="font-bold text-xl">Add new post</h1>
            <input name="title" placeholder="Post title..." class="px-2 py-1" />
            <textarea name="content" rows="5" maxlength="256" placeholder="Post content..." class="px-2 py-1" />
            <div class="flex justify-center gap-4">
                <button @click="toggleModal"
                    class="btn text-white bg-primary hover:bg-sky-700 active:bg-sky-900">Add</button>
                <button @click="toggleModal"
                    class="btn text-white bg-gray-400 hover:bg-gray-500 active:bg-gray-700">Cancel</button>
            </div>
        </div>
    </Modal>
</template>

<style></style>