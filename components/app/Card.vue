<script setup lang="ts">
import { useDateFormat } from '@vueuse/core'
import type { Article } from '~/types'

defineProps<{
  item: Article
}>()
</script>

<template>
  <NuxtLink
    :to="item.link"
    class="group max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-neutral-900 dark:border-neutral-800"
  >
    <img
      class="h-60 w-full object-cover group-hover:scale-90 group-hover:rounded-xl rounded-t-lg transition-all"
      :src="item.thumbnail"
      alt=""
    >
    <div class="p-5">
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {{ item.title }}
      </h5>
      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
        {{ item.description }}
      </p>
      <p class="text-white text-xs opacity-60">
        <Icon class="w-5 h-5" name="ph:calendar-duotone" />
        {{ useDateFormat(new Date(item.date), 'YYYY,MM,DD').value }}
      </p>
    </div>
  </NuxtLink>
</template>
