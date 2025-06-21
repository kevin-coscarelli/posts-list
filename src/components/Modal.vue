<script lang="ts" setup>
// TODO: Create custom hook
defineProps({
    showModal: Boolean
})
const emit = defineEmits(['toggleModal'])
</script>

<template>
    <Teleport to="body">
        <div v-if="showModal" class="modal-overlay" @click.self="emit('toggleModal')">
            <div class="modal-content">
                <slot></slot>
                <!-- <button @click="emit('toggleModal')">Close</button> -->
            </div>
        </div>
    </Teleport>
</template>

<style>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background: white;
    padding: 20px;
    border-radius: 5px;
    max-width: 400px;
    width: 100%;
}
</style>