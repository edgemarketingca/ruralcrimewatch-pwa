<script setup lang="ts">

</script>

<template>
  <footer class="absolute z-9 bottom-0 right-0 left-0 bg-white shadow dark:bg-black border-t border-gray-400/20">
    <div class="w-full mx-auto p-4 md:flex md:items-center md:justify-between text-center">
      <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">
        © {{ new Date().getFullYear() }}
        <NuxtLink title="Alberta Provincial Rural Crime Watch Association" :to="{ name: 'index' }" class="dark:text-white hover:underline">APRCWA</NuxtLink>
      </span>
      <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0 justify-center">
        <li>
          <NuxtLink to="https://www.ruralcrimewatch.ab.ca/privacy-policy" class="hover:underline me-4 md:me-6">
            Privacy Policy
          </NuxtLink>
        </li>
        <li>
          <NuxtLink :to="{ name: 'about' }" class="hover:underline me-4 md:me-6">
            About
          </NuxtLink>
        </li>
      </ul>
    </div>
  </footer>
</template>
