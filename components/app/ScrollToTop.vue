<script setup lang="ts">
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}
</script>

<template>
  <button class="fixed right-3 bottom-4 bg-white dark:bg-neutral-800 dark:text-white px-3 py-2 rounded-full border dark:border-gray-700" @click="scrollToTop">
    <Icon name="carbon:arrow-up" />
  </button>
</template>