<script setup lang="ts">
import type { Menu } from '~/types'

defineProps<{
  items: Menu[]
  collapsed?: boolean
}>()
</script>

<template>
  <ul class="font-medium">
    <li v-for="item of items" :key="item.name">
      <NuxtLink
        :title="item.name"
        :to="item.to"
        :class="{ 'justify-center': collapsed }"
        active-class="bg-yellow-400 !text-black"
        class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-yellow-400 hover:text-black dark:hover:text-black transition"
      >
        <Icon v-if="item.icon" class="w-6 h-6" :name="item.icon" />
        <span v-if="!collapsed" class="ms-3">
          {{ item.name }}
        </span>
      </NuxtLink>
    </li>
    <slot />
  </ul>
</template>
