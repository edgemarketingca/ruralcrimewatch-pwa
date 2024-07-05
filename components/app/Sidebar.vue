<script setup lang="ts">
import { socials } from '~/constants'

const route = useRoute()

const { collapsed } = useLayout()

const resize = computed(() => {
  if (route.name === 'index')
    return false
  return true
})

const { menus } = await useMenu()
</script>

<template>
  <aside
    :class="collapsed ? 'w-24' : 'w-64'"
    class="fixed top-0 left-0 z-40 h-screen -translate-x-full sm:translate-x-0 transition-all"
    aria-label="Sidebar"
  >
    <div class="flex flex-col justify-between h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-black border-r border-gray-400/20">
      <button class="absolute right-2 top-2 dark:text-white" @click="collapsed = !collapsed">
        <Icon :name="collapsed ? 'ph:circle' : 'carbon:circle-filled'" />
      </button>
      <div>
        <!-- <span class="text-white">
          {{ crime }}
        </span> -->
        <NuxtLink title="app title" class="flex justify-center" to="/">
          <img :width="collapsed ? 50 : resize ? 70 : 110" class="transition-all" src="/logo.png">
        </NuxtLink>
        <div class="border-t border-gray-400/30 my-4" />
        <AppNav class="space-y-2" :items="menus" :collapsed="collapsed" />
      </div>
      <div>
        <div class="border-t border-gray-400/30 my-4" />
        <div class="flex justify-center gap-4" style="flex-direction: row; flex-wrap: wrap;">
          
          <!--
          <NuxtLink v-for="item of socials" :key="item.title" :to="item._path" target="_blank" external>
            <Icon class="w-6 h-6 !text-gray-900 dark:!text-white padding:2px" :name="item.icon" />
          </NuxtLink>
          -->
          <button v-for="item of socials" :key="item.title" window.location.href="item._path">
            <Icon class="w-6 h-6 !text-gray-900 dark:!text-white padding:2px" :name="item.icon" />
          </button>
          
          <AppColorMode class="padding:2px !text-gray-900 dark:!text-white rounded-lg hover:bg-yellow-400 hover:text-black dark:hover:!text-black transition" :class="{ 'justify-center': collapsed }">
            <!-- <span v-if="!collapsed" class="capitalize ms-3">
                {{ $colorMode.preference }}
              </span> -->
          </AppColorMode>
          
          <!-- <button
            class="text-white"
            @click="open = !open"
          >
            <Icon class="w-6 h-6" :name="open ? 'i-ph-x' : 'i-ph-list'" />
          </button> -->
          
        </div>
        
        <!--
        <AppNav class="grid items-center justify-center gap-2 place-items-center" :class="collapsed ? 'grid-cols-1' : 'grid-cols-5'" :items="socials" :collapsed="true">
          <li>
            <AppColorMode class="w-full flex items-center p-2 !text-gray-900 dark:!text-white rounded-lg hover:bg-yellow-400 hover:text-black dark:hover:!text-black transition" :class="{ 'justify-center': collapsed }">
             --> <!-- <span v-if="!collapsed" class="capitalize ms-3">
                {{ $colorMode.preference }}
              </span> --><!--
            </AppColorMode>
          </li>
        </AppNav>
        -->
      </div>
    </div>
  </aside>
</template>
