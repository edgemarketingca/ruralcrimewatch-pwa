<script setup lang="ts">
defineProps<{
  item: any
}>()
</script>

<template>
  <NuxtLink
    :to="item._path"
    class="relative group grid w-full min-h-full h-72 lg:col-span-1 col-span-3 flex-col items-center justify-center overflow-hidden rounded-xl bg-neutral-900 bg-clip-border text-center hover:border border-primary"
    :class="{ 'md:items-end': item.description }"
  >
    <div
      class="absolute inset-0 m-0 h-full w-full overflow-hidden rounded-none bg-transparent bg-cover bg-clip-border bg-center shadow-none group-hover:scale-110 group-hover:blur-sm transition-all duration-300"
      :style="{ backgroundImage: `url(${item.image})` }">
      <div class="absolute inset-0 w-full h-full to-bg-black-10 bg-gradient-to-t from-black/80 via-black/50" />
    </div>
    <div class="relative p-4">
      <h2
        class="mb-2 block font-sans leading-[1.5] tracking-normal text-white antialiased font-bold"
        :class="item.description ? 'text-2xl' : 'text-3xl'"
      >
        {{ item.title }}
      </h2>
      <p v-if="item.description" class="line-clamp-2 text-xs text-gray-200">
        {{ item.description }}
      </p>
    </div>
  </NuxtLink>
</template>
