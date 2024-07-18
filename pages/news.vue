<script setup lang="ts">
import { version } from '~/package.json'
</script>

<template>
  <main class="dark:text-white">
    
    <h2 class="text-3xl text-primary">
      News & Updates from the APRCWA
    </h2>
    <div class="flex flex-col gap-8 my-4 pl-4">
      
    <!-- Goal: display full list of news articles, with pagination -->
      
    </div>
    
    <hr />

    <h2 class="text-3xl text-primary">
      Signup for our Newsletter: 
    </h2>
    <NuxtLink to="https://www.ruralcrimewatch.ab.ca/join-our-newsletter" target="_blank" class="bg-primary p-2 rounded-lg opacity-80 group-hover:opacity-100 transition-all !text-black">
      Join Today!
    </NuxtLink>
       
  </main>
</template>
