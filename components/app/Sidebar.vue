<script setup lang="ts">
import { menu, socials } from '~/constants'

const route = useRoute()

const resize = computed(() => {
  if (route.name === 'index')
    return false
  return true
})

const collapsed = ref(false)
</script>


<template>
  <aside
    :class="collapsed ? 'w-24' : 'w-64'"
    class="fixed top-0 left-0 z-40 h-screen -translate-x-full sm:translate-x-0 transition-all"
    aria-label="Sidebar"
  >
     <div class="flex flex-col justify-between h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-black border-r border-gray-400/20">
      <button class="absolute right-2 top-2 text-white" @click="collapsed = !collapsed">
        <Icon :name="collapsed ? 'ph:circle' : 'ph:circle-duotone'" />
      </button>
      <div>
        <NuxtLink title="app title" class="flex justify-center" to="/">
          <img :width="collapsed ? 50 : resize ? 70 : 110" class="transition-all" src="/logo.png" />
        </NuxtLink>
        <div class="border-t border-gray-400/30 my-4" />
        <AppNav :items="menu" :collapsed="collapsed" />
      </div>
      <div>
        <div class="border-t border-gray-400/30 my-4" />
        <AppNav :items="socials" :collapsed="collapsed">
          <li>
              <AppColorMode class="w-full flex items-center p-2 !text-gray-900 dark:!text-white rounded-lg hover:bg-yellow-400 hover:text-black  transition">
                <span class="capitalize ms-3">
                  {{ $colorMode.preference }}
                </span>
              </AppColorMode>
             <!-- <button
               title="Color Mode"
               class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-yellow-400 hover:text-black transition"
             >
                <Icon class="w-6 h-6" name="item.icon" />
                <span v-if="!collapsed" class="ms-3">
                 {{ item.name }}
                </span>
             </button> -->
          </li>
        </AppNav>
      </div>
     </div>
  </aside>
</template>