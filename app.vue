<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core'

const { y } = useWindowScroll()
const { collapsed } = useLayout()
</script>

<template>
  <Html lang="en">
    <Body class="bg-white dark:bg-black">
      <NuxtLoadingIndicator />

      <AppHeader />
      <AppSidebar />
      <AppBottomBar />

      <div class="relative min-h-screen bg-gray-200 dark:bg-neutral-950" :class="collapsed ? 'sm:ml-24' : 'sm:ml-64'">
        <div class="p-8 pb-20 sm:mt-0 mt-16 sm:mb-0 mb-16">
          <NuxtPage />
        </div>
        <AppFooter />
      </div>

      <Transition name="fade">
        <AppScrollToTop v-if="y > 27" />
      </Transition>
    </Body>
  </Html>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
