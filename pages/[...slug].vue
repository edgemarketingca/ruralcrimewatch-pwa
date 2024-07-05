<script setup lang="ts">
const { page, toc } = useContent()
</script>


<template>
  <main v-if="page" class="content-page text-black dark:text-white">
    <div class="sticky top-4 flex justify-between items-center bg-primary p-2 rounded-lg mb-6">
      <NuxtLink title="Home" class="p-2" to="/">
        <Icon class="w-5 h-5" name="ph:arrow-left" />
      </NuxtLink>
      <div>
        <span class="font-bold text-xl text-black">
          {{ page.title }}
        </span>
      </div>
      <div />
    </div>
    <section class="grid grid-cols-12 gap-6">
      <ContentRenderer :value="page" :key="page._id">
        <div :class="toc.links.length ? 'lg:col-span-10 col-span-12' : 'col-span-12'">
          <img class="w-full h-[30rem] object-cover rounded-lg mb-4 border border-neutral-400/20" :src="page.image" :alt="page.title" />
          <!-- <h1>
            {{ page.title }}
          </h1> -->
          <ContentRendererMarkdown :value="page" />
        </div>
      </ContentRenderer>
      <nav v-if="toc.links.length" class="col-span-2 rounded-lg p-4 bg-white dark:bg-neutral-800 hidden lg:block">
        <div class="sticky top-24">
          <ul class="toc list-none">
            <li v-for="item in toc.links" :key="item.id">
              <h2 class="block bg-gray-200 !text-black router-link-exact-active flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-yellow-400 dark:hover:bg-yellow-400 hover:text-black dark:hover:text-black transition">
                <NuxtLink :to="`#${item.id}`">
                  {{ item.text }}
                </NuxtLink>
                <ul class="opacity-80 list-disc ml-3 my-2">
                  <li v-for="child of item.children" :key="child.id" >
                    <h3 class="">
                      <NuxtLink :to="`#${child.id}`">
                        {{ child.text }}
                      </NuxtLink>
                    </h3>
                  </li>
                </ul>
              </h2>
            </li>
          </ul>
        </div>
      </nav>
    </section>
  </main>
</template>

<style lang="scss">
.content-page {
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
  nav ul {
    list-style: none;
    padding-left: 0;
    nav li {
      margin-bottom: 0.5rem;
    }
  } 
}
</style>
