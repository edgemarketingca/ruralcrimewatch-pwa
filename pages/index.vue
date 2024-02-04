<script setup lang="ts">
const { news, pending } = await useNews()
</script>

<template>
  <main class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 place-items-center items-stretch">
    <template v-if="pending">
      <div
        v-for="item of 10"
        :key="item"
        class="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-full"
      >
        <div class="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-700">
          <Icon class="w-20 h-20" name="ph:image-duotone" />
        </div>
        <div class="p-5">
          <a href="#">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4" />
            </h5>
          </a>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
          </p>
        </div>
      </div>
    </template>
    <template v-else>
      <AppCard v-for="item of news" :key="item.link" :item="item" />
    </template>
  </main>
</template>
