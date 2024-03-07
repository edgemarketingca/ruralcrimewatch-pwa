<script setup lang="ts">
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}
</script>

<template>
  <button class="fixed md:right-8 md:bottom-8 right-4 bottom-16 bg-white dark:bg-neutral-800 dark:text-white px-3 py-2 rounded-full border dark:border-gray-700" @click="scrollToTop">
    <Icon name="carbon:arrow-up" />
  </button>
</template>
