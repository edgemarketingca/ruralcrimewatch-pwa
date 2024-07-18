<script setup lang="ts">
import { version } from '~/package.json'

const { newslist, pendinglist } = await useNewsList()
  
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
  <main class="content-page list-page text-black dark:text-white">
    
    <div class="sticky top-4 flex justify-between items-center bg-primary p-2 rounded-lg mb-6">
      <NuxtLink title="Home" class="p-2" to="/">
        <Icon class="w-5 h-5 text-black" name="ph:arrow-left" />
      </NuxtLink>
      <div>
        <span class="font-bold text-xl text-black">
          News &amp; Updates from the APRCWA
        </span>
      </div>
      <div />
    </div>

    <div class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 place-items-center items-stretch text-white pb-10">
    <section class="grid grid-cols-1 gap-6">
       
      <!-- Goal: display full list of news articles, with pagination -->
      
      <div v-for="item in newslist" :key="item.path" class="w-full relative lg:col-span-3">
      <div class="group grid">
        
          <div class="relative group grid w-full lg:col-span-1 col-span-1 flex-col">
            <img
            v-if="getThumbnail(item.custom_attributes?.data)"
            class="rounded-lg opacity-50 object-cover w-full h-full"
            :alt="item.name"
            :src="getThumbnail(item.custom_attributes.data)?.url"
            >
          </div>
          <div class="relative group grid w-full lg:col-span-2 col-span-3 flex-col>
            <h2 class="mb-2 block font-sans leading-[1.5] tracking-normal text-white antialiased font-bold drop-shadow-lg text-2xl">
                {{ item.name }}
            </h2>
            <p class="line-clamp-2 text-xs text-gray-200 drop-shadow-lg">
              {{ item.description }}
            </p>
            <p class="text-xs flex items-center gap-1 justify-center">
              <Icon class="w-5 h-5" name="ph:calendar-blank-duotone" />
              {{ useDateFormat(new Date(item.date_added), 'MMMM D, YYYY').value }}
             | 
              <NuxtLink :to="item.path">
                Read More <Icon class="w-5 h-5" name="mdi:chevron-double-right" />
              </NuxtLink>
            </p>
          </div>
          
      </div>  
      </div>
      
    </section>
    </div>
        
    <hr />

    <section class="grid grid-cols-1 gap-2 p-4">
    
      <NuxtLink to="https://www.ruralcrimewatch.ab.ca/join-our-newsletter" target="_blank" class="bg-primary p-2 rounded-lg text-center !text-black opacity-80 hover:opacity-100 transition-all-ease">
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
