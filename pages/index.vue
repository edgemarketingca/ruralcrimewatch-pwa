<script setup lang="ts">
import { Carousel, Slide } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'

const { data: articles } = await useAsyncData('articles', () => queryContent('/articles/').where({ _draft: false }).find())

const { data: crime } = await useAsyncData('crime', () => queryContent('/crime/').where({ _dir: 'crime' }).find())
</script>

<template>
  <main class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 place-items-center items-stretch text-white">
    <NuxtLink
      v-for="item of crime"
      :key="item._path"
      :to="item._path"
      class="relative group grid w-full h-72 flex-col items-end justify-center overflow-hidden rounded-xl bg-neutral-900 bg-clip-border text-center hover:border border-primary"
    >
      <div
        class="absolute inset-0 m-0 h-full w-full overflow-hidden rounded-none bg-transparent bg-cover bg-clip-border bg-center shadow-none"
        :style="{ backgroundImage: `url(${item.image})` }"
      >
        <div class="absolute inset-0 w-full h-full to-bg-black-10 bg-gradient-to-t from-black/80 via-black/50" />
      </div>
      <div class="relative p-4">
        <h2 class="mb-2 block font-sans text-2xl leading-[1.5] tracking-normal text-white antialiased font-bold">
          {{ item.title }}
        </h2>
        <p class="line-clamp-2 text-xs text-gray-200">
          {{ item.description }}
        </p>
        <!-- <h5 class="block mb-4 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-gray-400">
          Tania Andrew
        </h5> -->
      </div>
    </NuxtLink>
    <Carousel :autoplay="2500" :wrapAround="true" :pauseAutoplayOnHover="true" class="col-span-2 w-full">
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
    <NuxtLink class="group relative w-full border border-transparent hover:border-primary rounded-lg" :to="{ name: 'map' }">
      <div class="absolute bg-primary p-4 rounded-lg z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all">
        Click to view map
      </div>
      <div class="w-full h-full bg-cover rounded-xl hover:opacity-30 transition-all" style="background-image: url(/police.avif);" />
    </NuxtLink>
    <NuxtLink
      class="relative col-span-3 grid w-full h-72 flex-col items-end justify-center overflow-hidden rounded-xl bg-neutral-900 bg-clip-border text-center hover:border border-red-600"
      to="https://ab.211.ca/"
    >
      <div
        class="absolute inset-0 m-0 h-full w-full overflow-hidden rounded-none bg-transparent bg-cover bg-clip-border bg-center shadow-none"
        :style="{ backgroundImage: `url(https://www.ruralcrimewatch.ab.ca/application/files/7017/0242/6569/rcw--banner-01.jpg)` }"
      >
        <div class="absolute inset-0 w-full h-full bg-black opacity-50" />
      </div>
      <div class="relative p-4">
        <h2 class="mb-2 block font-sans text-4xl leading-[1.5] tracking-normal text-white antialiased font-bold">
          Get Local Support, You're Not Alone
        </h2>
      </div>
      <div />
    </NuxtLink>
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