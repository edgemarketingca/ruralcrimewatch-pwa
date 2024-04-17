<script setup lang="ts">
import { Carousel, Slide } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'

const { data: articles } = await useAsyncData('articles', () => queryContent('/articles/').where({ _draft: false }).find())

const { data: crime } = await useAsyncData('crime', () => queryContent('/crime/').where({ _dir: 'crime' }).find())
</script>

<template>
  <main class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 place-items-center items-stretch text-white">
    <AppCard v-for="item of crime" :key="item._path" :item="item" />
    <Carousel :autoplay="2500" :wrapAround="true" :pauseAutoplayOnHover="true" class="lg:col-span-2 col-span-3 w-full">
      <Slide v-for="item in articles" :key="item._path" class="group w-full h-80 rounded-lg p-4 relative">
        <div class="bg-neutral-950 absolute inset-0 -z-20 mx-2 rounded-lg" />
        <div class="absolute inset-0 pointer-events-none -z-10 px-2">
          <img class="rounded-lg opacity-50 object-cover w-full h-full group-hover:border border-primary"  :src="item.image" >
        </div>
        <div class="p-4 flex flex-col gap-4">
          <h2 class="text-3xl">
            {{ item.title }}
          </h2>
          <p class="text-sm">
            {{ item.description }}
          </p>
          <p class="absolute left-4 bottom-4 text-xs flex items-center gap-1 justify-center">
            <Icon class="w-5 h-5" name="ph:calendar-duotone" />
            {{ useDateFormat(new Date(item.date), 'YYYY,MM,DD').value }}
          </p>
          <NuxtLink class="absolute bottom-6 left-1/2 -translate-x-1/2 bg-primary p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all" :to="item._path">
            Read more
          </NuxtLink>
        </div>
      </Slide>
    </Carousel>
    <AppCard :item="{
      _path: '/map',
      title: 'RCMP Crime Map',
      description: 'Keep current with your region\'s recent thefts, mischief, and break-and-enter reports.',
      image: '/police.avif'
    }" />
    <AppCard class="lg:col-span-3" :item="{
      _path: 'https://ab.211.ca/',
      title: `Get Local Support, You're Not Alone`,
      image: 'https://www.ruralcrimewatch.ab.ca/application/files/7017/0242/6569/rcw--banner-01.jpg'
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
</style>