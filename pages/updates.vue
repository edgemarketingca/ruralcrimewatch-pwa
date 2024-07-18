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
    
    <div class="sticky top-4 z-40 flex justify-between items-center bg-primary p-2 rounded-lg mb-6">
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

    <section class="grid grid-cols-1 gap-2 p-4">
    
      <NuxtLink title="Signup for our Newsletter" to="https://www.ruralcrimewatch.ab.ca/join-our-newsletter" target="_blank" class="titleheading bg-gray-200 p-2 rounded-lg text-center !text-black hover:bg-primary transition" external>
        Signup for our Newsletter - Join Today!
      </NuxtLink>
      
    </section>
    
    <section class="grid lg:grid-cols-3 md:grid-cols-1 grid-cols-1 gap-8 place-items-center items-stretch text-black dark:text-white pb-10">
       
      <!-- Goal: display full list of news articles, with pagination -->
      
      <div v-for="item in newslist" :key="item.path" class="grid-cols-1 p-4 rounded-lg bg-white dark:bg-neutral-800">
        
          <div class="relative mb-4 h-48 rounded-lg border border-gray dark:border-neutral-800">
            <NuxtLink :to="item.path">
              <img
              v-if="getThumbnail(item.custom_attributes?.data)"
              class="absolute inset-0 rounded-lg opacity-100 object-cover w-full h-full"
              :alt="item.name"
              :src="getThumbnail(item.custom_attributes.data)?.url"
              >
            </NuxtLink>
          </div>
          <div class="p-2">
            <h3 class="titleheading mb-2 block font-sans leading-[1] tracking-normal antialiased font-bold">
                <NuxtLink :to="item.path">
                  {{ item.name }}
                </NuxtLink>
            </h3>
            <p class="pb-4">
              {{ item.description }}
            </p>
            <p class="flex items-center gap-1">
              <Icon class="w-5 h-5" name="ph:calendar-blank-duotone" />
              {{ useDateFormat(new Date(item.date_added), 'MMMM D, YYYY').value }}
               | 
              <NuxtLink :to="item.path" title="Read More">Read More</NuxtLink> <Icon class="w-5 h-5" name="mdi:chevron-double-right" />
              
            </p>
          </div>
          
      </div>  
      
    </section>
    
  </main>
</template>

<style lang="scss">
.content-page.list-page {
  .titleheading a,
  a.titleheading { text-decortation: none !important; }
  
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
