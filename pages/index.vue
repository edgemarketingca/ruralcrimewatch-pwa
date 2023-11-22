<script setup lang="ts">
import type { NewsRSS, Article, Channel } from '~/types'
import { parseString } from 'xml2js'

const { data, pending } = await useFetch('https://www.ruralcrimewatch.ab.ca/rss/bulletinboard', {
  lazy: true,
  transform: (xml: string) => {
    let raw: Channel | undefined
    let result: Article[] = []
    
    parseString(xml, (err, res: NewsRSS) => raw = res?.rss?.channel?.[0])

    raw?.item.forEach((item) => {
      result.push({
        title: item.title[0],
        thumbnail: getImage(item.description[0]),
        description: getDescription(item.description[0]),
        link: item.link[0],
        date: item.pubDate[0],
      })
    })

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
  return text.replace(/<p><img src=".*?" \/><\/p>/g, '')
}
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
      <AppCard v-for="item of data" :key="item.link" :item="item" />
    </template>
  </main>
</template>