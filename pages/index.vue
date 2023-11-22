<script setup lang="ts">
import type { NewsRSS, News } from '~/types'
import { parseString } from 'xml2js'

const { data, pending } = await useFetch('https://www.ruralcrimewatch.ab.ca/rss/bulletinboard', {
  lazy: true,
  transform: (xml: string) => {
    let result: News | undefined
    parseString(xml, (err, res: NewsRSS) => result = res?.rss?.channel?.[0])
    return result
  }
})

function getImage(text: string) {
  const regex = /<img src="(.*?)"/;
  const match = text.match(regex);

  if (match && match[1]) {
    return match[1];
  } else {
    return "Image source not found";
  }
}

function getDescription(text: string) {
  const imgRegex = /<img[^>]+>/;
  const withoutImg = text.replace(imgRegex, '');
  const descRegex = /<p>(.*?)<\/p>/;
  const match = withoutImg.match(descRegex);

  if (match && match[1]) {
    return match[1];
  } else {
    return "Description text not found";
  }
}
</script>

<template>
  <main class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 place-items-center">
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
              <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
            </h5>
          </a>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
          </p>
        </div>
      </div>
    </template>
    <template v-else>
      <NuxtLink
        v-for="article of data?.item"
        :key="article.link[0]"
        :to="article.link[0]"
        class="group max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-neutral-900 dark:border-neutral-800"
      >
        <img class="h-60 w-full object-cover group-hover:scale-90 group-hover:rounded-xl rounded-t-lg transition-all" :src="getImage(article.description[0])" alt="" />
        <div class="p-5">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {{ article.title[0] }}
          </h5>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {{ getDescription(article.description[0]) }}
          </p>
          <button class="inline-flex gap-2 items-center px-3 py-2 text-sm font-medium text-center text-black bg-yellow-400 rounded-lg hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:bg-yellow-400 dark:hover:bg-yellow-400 dark:focus:ring-yellow-800">
            Read more
            <Icon name="ph:arrow-right" />
          </button>
        </div>
      </NuxtLink>
    </template>
  </main>
</template>