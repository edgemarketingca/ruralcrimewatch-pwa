<script setup lang="ts">
import { socials } from '~/constants'

const { menus } = await useMenu()
const open = ref(false)
</script>

<template>
  <nav class="sm:hidden fixed z-50 bg-black/40 backdrop-blur-lg border-b border-gray-400/20 top-0 right-0 left-0 px-4 py-2">
    <div class="flex justify-between items-center">
      <NuxtLink title="app title" class="flex justify-center" to="/">
        <img class="h-14" src="/logo.png">
      </NuxtLink>
      <div class="flex items-center gap-4">
        <NuxtLink role="button" v-for="item of socials" :title="item.title" :key="item.title" :to="item._path" target="_blank" external>
          <Icon class="w-6 h-6 text-white" :name="item.icon" />
        </NuxtLink>
        <AppColorMode />
        <button
          class="text-white"
          @click="open = !open"
        >
          <Icon class="w-6 h-6" :name="open ? 'i-ph-x' : 'i-ph-list'" />
        </button>
      </div>
    </div>
    <AppNav v-show="open" v-model:open="open" :items="menus" class="space-y-2 pb-4 pt-4 mt-4 border-t border-gray-400/20" />
  </nav>
</template>
