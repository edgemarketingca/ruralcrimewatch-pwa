<script setup lang="ts">
import type { ParsedContent } from '@nuxt/content/types'
import type { Menu } from '~/types'
import { useVModel } from '@vueuse/core'

const props = defineProps<{
  items: (Menu | ParsedContent)[]
  collapsed?: boolean
  open?: boolean
}>()

const model = useVModel(props, 'open')
</script>

<template>
  <ul class="font-medium text-white">
    <li v-for="item of items" :key="item.title">
      <NuxtLink
        :title="item.title"
        :to="item._path"
        :class="{ 'justify-center': collapsed }"
        active-class="bg-yellow-400"  
        class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-200 dark:hover:bg-yellow-400 hover:text-black dark:hover:text-black transition"
        @click="model = false"
      >
        
        <Icon class="w-6 h-6" :name="item.icon ?? 'i-ph:circle'" />
        <span v-if="!collapsed" class="ms-3">
          {{ item.title }}
        </span>
      </NuxtLink>
    </li>
    <slot />
  </ul>
</template>

