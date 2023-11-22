<script setup lang="ts">
const items = [
  {
    title: 'General Services',
    thumbnail: 'https://www.ctvnews.ca/polopoly_fs/1.4847278.1583875469!/httpImage/image.jpg_gen/derivatives/landscape_1020/image.jpg',
    links: [
      {
        title: 'Alberta Health Link 811',
        to: '',
      },
      {
        title: 'Alberta Supports 1-877-644-9992',
        to: '',
      },
      {
        title: 'Community and Social Services AB',
        to: '',
      },
      {
        title: 'Alberta Health Services',
        to: '',
      },
    ],
  },
  {
    title: 'Mental Health',
    thumbnail: 'https://pbs.twimg.com/profile_images/1306130692464549889/4VB9obc-_400x400.jpg',
  },
]
</script>

<template>
  <main class="grid grid-cols-2 gap-8">
    <div
      v-for="item of items"
      :key="item.title"
      class="group flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-neutral-900 dark:hover:bg-neutral-800 hover:!border-primary">
      <img
        class="object-cover w-full rounded-t-lg h-96 md:h-48 md:w-48 md:rounded-none md:rounded-s-lg group-hover:scale-90 group-hover:rounded-xl transition-all"
        :src="item.thumbnail"
        alt=""
      >
      <div class="flex flex-col justify-between p-4 leading-normal">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {{ item.title }}
        </h5>
        <p class="flex flex-col mb-3 font-normal text-gray-700 dark:text-gray-400">
          <NuxtLink v-for="link of item.links" :key="link.title" :to="link.to">
            {{ link.title }}
          </NuxtLink>
        </p>
      </div>
    </div>
  </main>
</template>