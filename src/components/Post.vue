<script lang="ts" setup>
import editIcon from '../assets/edit.svg'
import { ref } from 'vue'

const editMode = ref(false)
</script>
<template>
    <div
        class="border border-[#E3E8EB] bg-white shadow-[0_1px_9px_2px_#C1C2C626] rounded-lg flex flex-col gap-2.5 py-2.5 px-[15px]">
        <div class="flex justify-between gap-2.5">
            <h2 v-if="!editMode" class="font-bold">One can cook on and with an open fire.</h2>
            <input class="px-2 py-1 w-full" name="postTitle" v-if="editMode" placeholder="Post title..." value="One can cook on and with an open fire."/>
            <button v-if="!editMode" @click="editMode = true" class="cursor-pointer [&_svg]hover:fill-zinc-500"><img :src="editIcon" /></button>
            <div v-if="editMode" class="flex gap-2.5">
                <button class="font-black cursor-pointer" @click="editMode = false">✕</button>
                <button class="font-black cursor-pointer">✓</button>
            </div>
        </div>
        <p v-if="!editMode" class="text-[#83888F] text-sm overflow-ellipsis w-full line-clamp-3">One can cook on and with an open fire. These are some of the ways to cook with fire outside. Cooking meat using a spit is a great way to evenly cook meat. In order...</p>
        <textarea class="px-2 py-1 text-sm" rows="5" name="postContent" v-if="editMode" placeholder="Post content..." value="One can cook on and with an open fire. These are some of the ways to cook with fire outside. Cooking meat using a spit is a great way to evenly cook meat. In order."/>
    </div>
</template>