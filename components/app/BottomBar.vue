<script setup lang="ts">
import { mobileMenu } from '~/constants'
</script>

<template>
  <ul class="fixed bottom-0 right-0 left-0 z-50 bg-black/40 backdrop-blur-lg flex justify-between sm:hidden" style="font-size: 0.9rem;">
    <li v-for="item, index of mobileMenu" :key="item._path" class="w-auto" :class="{ ' w-full border-l border-transparent hover:border-gray-200/20': index }">
      <NuxtLink
        :title="item.title"
        :to="item._path"
        active-class="bg-yellow-400 !text-black"
        class="flex items-center p-4 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-yellow-400 dark:hover:text-black hover:text-black transition"
      >
        <Icon v-if="item.icon" class="w-6 h-6" :name="item.icon" />
        <span class="ms-3">
          {{ item.title }}
        </span>
      </NuxtLink>
    </li>
  </ul>
</template>
