<script setup lang="ts">
import { menu, socials } from '~/constants'

const route = useRoute()

const { collapsed } = useLayout()

const resize = computed(() => {
  if (route.name === 'index')
    return false
  return true
})
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
        <NuxtLink title="app title" class="flex justify-center" to="/">
          <img :width="collapsed ? 50 : resize ? 70 : 110" class="transition-all" src="/logo.png">
        </NuxtLink>
        <div class="border-t border-gray-400/30 my-4" />
        <AppNav class="space-y-2" :items="menu" :collapsed="collapsed" />
      </div>
      <div>
        <div class="border-t border-gray-400/30 my-4" />
        <AppNav class="grid grid-cols-1 items-center justify-center gap-2" :items="socials" :collapsed="collapsed">
          <li>
            <AppColorMode class="w-full flex items-center p-2 !text-gray-900 dark:!text-white rounded-lg hover:bg-yellow-400 hover:text-black dark:hover:!text-black transition" :class="{ 'justify-center': collapsed }">
              <span v-if="!collapsed" class="capitalize ms-3">
                {{ $colorMode.preference }}
              </span>
            </AppColorMode>
          </li>
        </AppNav>
      </div>
    </div>
  </aside>
</template>
