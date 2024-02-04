<script setup lang="ts">
const colorMode = useColorMode()

function toggleMode() {
  const values = ['light', 'dark']
  const index = values.indexOf(colorMode.preference)
  const next = (index + 1) % values.length
  colorMode.preference = values[next]
}
</script>

<template>
  <button class="text-white" @click="toggleMode">
    <Icon v-if="colorMode.preference === 'dark'" class="w-6 h-6" name="ph:moon-duotone" />
    <Icon v-else-if="colorMode.preference === 'light'" class="w-6 h-6" name="ph:sun-duotone" />
    <slot />
  </button>
</template>
