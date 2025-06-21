<script setup lang="ts">
    import Header from './components/Header.vue'
    import PostList from './components/PostList.vue';
</script>

<template>
    <div class="flex justify-center">
        <div class="w-full max-w-[400px] flex flex-col gap-2.5">
            <Header/>
            <PostList />
        </div>
    </div>
</template>

<style scoped>
</style>
