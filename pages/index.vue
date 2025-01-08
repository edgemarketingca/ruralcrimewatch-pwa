<script setup lang="ts">
import { Carousel, Navigation, Pagination, Slide } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'

const { data: crime } = await useAsyncData('crime', () => queryContent('/crime/').where({ _dir: 'crime' }).find())

const { news, pending } = await useNews()

function getThumbnail(item: {} | undefined) {
  if (item) {
    const thumbnail: any = Object.values(item).find((value: any) => value.handle === 'thumbnail')
    if (thumbnail) {
      return thumbnail?.value?.data
    }
  }
}
</script>

<template>

    <main class="items-stretch text-white pb-10">  
    <div class="top-4 flex justify-center items-center bg-primary p-2 rounded-lg mb-6">
      <NuxtLink title="Report Suspicous Activity" class="p-2" to="tel:1-833-547-7283">
         <span class="font-bold text-l text-black">Call to report suspicious activity in Alberta :: 1-833-547-RAVE</span>
      </NuxtLink>
    </div>
    </main>
    <main class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 place-items-center items-stretch text-white pb-10">
    <Carousel :autoplay="8000" :wrapAround="true" :pauseAutoplayOnHover="true" class="lg:col-span-3 col-span-3 w-full">
      <Slide v-for="item in news" :key="item.path" class="group w-full h-96 rounded-lg relative">
        <NuxtLink :to="item.path">
          <div class="bg-neutral-800 absolute inset-0 -z-20 mx-2 rounded-lg" />
          <div class="absolute inset-0 pointer-events-none -z-10 mx-2 rounded-lg group-hover:border border-primary">
          <!-- <img
            v-if="item.thumbnail"
            class="rounded-lg opacity-50 object-cover w-full h-full"
            :alt="item.name"
            :src="item.thumbnail"
          > -->
          <img
            v-if="getThumbnail(item.custom_attributes?.data)"
            class="rounded-lg opacity-50 object-cover w-full h-full"
            :alt="item.name"
            :src="getThumbnail(item.custom_attributes.data)?.url"
          >
          <div class="absolute inset-0 w-full h-full to-bg-black-10 bg-gradient-to-t from-black/80 via-black/50" />
        </div>
        <div class="p-8 flex flex-col gap-4">
          <h2 class="mb-2 block font-sans leading-[1.5] tracking-normal text-white antialiased font-bold drop-shadow-lg text-2xl">
              {{ item.name }}
          </h2>
          <p class="line-clamp-2 text-xs text-gray-200 drop-shadow-lg">
            {{ item.description }}
          </p>
          <p class="absolute left-4 bottom-4 text-xs flex items-center gap-1 justify-center">
            <Icon class="w-5 h-5" name="ph:calendar-blank-duotone" />
            {{ useDateFormat(new Date(item.date_added), 'MMMM D, YYYY').value }}
          </p>
          <p class="absolute right-4 bottom-4 text-xs flex items-center gap-1 justify-right">
            <NuxtLink :to="item.path">
              Read More <Icon class="w-5 h-5" name="mdi:chevron-double-right" />
            </NuxtLink>
          </p>
          <!--
          <NuxtLink
            class="absolute right-1/2 bottom-4  -translate-x-1/2 bg-primary p-2 rounded-lg opacity-80 group-hover:opacity-100 transition-all !text-black"
            :to="item.path">
            Read more
          </NuxtLink>
          -->
        </div>
      </NuxtLink>
      </Slide>
      <template #addons>
        <Navigation />
        <Pagination />
      </template>
    </Carousel>
    <AppCard v-for="item of crime" :key="item._path" :item="item" />
    <AppCard :item="{
      _path: '/map',
      title: 'RCMP Crime Map',
      description: 'Keep current with your region\'s recent thefts, mischief, and break-and-enter reports.',
      image: '/rcmp-banner.webp'
    }" />
    <AppCard class="lg:col-span-2" :item="{
      _path: 'https://ab.211.ca/',
      title: `Get Local Support, You're Not Alone`,
      description: 'Alberta 211 | Free. Confidential. Live Answer 24/7',
      target: '_blank',
      image: '/help-banner.webp'
    }" />
  </main>
</template>

<style>
/* .carousel__item {
  min-height: 200px;
  width: 100%;
  background-color: var(--vc-clr-primary);
  color: var(--vc-clr-white);
  font-size: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel__slide {
  padding: 10px;
}

.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  border: 5px solid white;
} */

.carousel__viewport {
  @apply rounded-lg;
}
.carousel__icon { 
  fill: #fff; 
}
.dark .carousel__pagination-button:after { 
  background-color: #777;
}
.dark .carousel__pagination-button--active:after, 
.carousel__pagination-button--active:after {
  background-color: #facc15;
}
.dark .carousel__pagination-button:hover:after {
  background-color: #e5e7eb;
}
.carousel__pagination-button:hover:after {
  background-color: #222;
}
</style>
