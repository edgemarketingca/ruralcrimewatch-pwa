<script setup lang="ts">
import { version } from '~/package.json'
</script>

<template>
  <main class="list-page text-black dark:text-white">
    
    <div class="sticky top-4 flex justify-between items-center bg-primary p-2 rounded-lg mb-6">
      <NuxtLink title="Home" class="p-2" to="/">
        <Icon class="w-5 h-5" name="ph:arrow-left text-black" />
      </NuxtLink>
      <div>
        <span class="font-bold text-xl text-black">
          News &amp; Updates from the APRCWA
        </span>
      </div>
      <div />
    </div>

    <section class="grid grid-cols-12 gap-6">
       
      <!-- Goal: display full list of news articles, with pagination -->
      
    </section>
        
    <hr />

    <section class="grid grid-cols-1 gap-2 p-4">
    
      <NuxtLink to="https://www.ruralcrimewatch.ab.ca/join-our-newsletter" target="_blank" class="bg-primary p-2 rounded-lg opacity-80 group-hover:opacity-100 transition-all text-center !text-black">
        Signup for our Newsletter - Join Today!
      </NuxtLink>
      
    </section>
  
  </main>
</template>

<style lang="scss">
.list-page {
  .toc {
    h2, h3 {
      margin-bottom: 0;
      font-size: 14px;
    }
  }
  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }
  h2 {
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }
  h3 {
    font-size: 1.75rem;
    font-weight: 500;
    margin-bottom: 1rem;
  }
  h4 {
    font-size: 1.5rem;
    font-weight: 500;
    margin-bottom: 1rem;
  }
  h5 {
    font-size: 1.25rem;
    font-weight: 500;
    margin-bottom: 1rem;
  }
  h6 {
    font-size: 1rem;
    font-weight: 500;
    margin-bottom: 1rem;
  }
  p + p {
    margin-bottom: 1rem;
  }
  p {
    font-size: 1rem;
    font-weight: 400;
  }
  ul {
    list-style: disc;
    padding-left: 1rem;
    li {
      margin-bottom: 0.5rem;
    }
  }  
}
</style>
