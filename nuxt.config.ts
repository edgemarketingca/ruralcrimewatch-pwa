export default defineNuxtConfig({

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@vueuse/nuxt',
    'nuxt-icon',
  ],

  tailwindcss: {
    configPath: 'tailwind.config.ts',
    exposeConfig: false,
    viewer: false,
  },

  colorMode: {
    classSuffix: '',
    fallback: 'dark',
    preference: 'dark',
    storageKey: 'color-mode',
    hid: 'color__mode__script',
    globalName: '__COLOR_MODE__',
  },

  icon: {
    size: '1.3rem',
  },

  app: {
    keepalive: true,
  },

  devtools: {
    enabled: true,
  },
})
