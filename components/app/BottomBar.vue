<script setup lang="ts">
const items = [
  {
    name: 'Home',
    icon: 'ph:house-duotone',
    to: '/',
  },
  {
    name: 'Chapter',
    icon: 'ph:archive-duotone',
    to: '/safety',
  },
  {
    name: 'Safety Tips',
    icon: 'ph:shield-check-duotone',
    to: '/safety',
  },
]
</script>

<template>
  <ul class="fixed bottom-0 right-0 left-0 z-50 bg-black/40 backdrop-blur-lg flex justify-between sm:hidden">
    <!-- <AppNav :items="items" class="flex justify-between items-center" /> -->
    <li v-for="item of items" class="w-full">
      <NuxtLink
        :title="item.name"
        :to="item.to"
        active-class="bg-yellow-400 !text-black"
        class="flex items-center p-4 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-yellow-400 hover:text-black transition"
      >
         <Icon class="w-6 h-6" v-if="item.icon" :name="item.icon" />
         <span class="ms-3">
          {{ item.name }}
         </span>
      </NuxtLink>
    </li>
  </ul>
</template>