export default defineNuxtConfig({

  app: {
    head: {
      title: "Alberta Provincial Rural Crime Watch",
      meta: [
        { name: 'robots', content: 'index, follow' },
      ], 
      
      link: [
        { rel: 'favicon', href: '/favicon.ico' },
        { rel: 'manifest', href: '/manifest.json' },
        { rel: 'stylesheet', href: '/appstyles.css' },
      ],
      
    },
    keepalive: true,
  },
  
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/color-mode', '@nuxthq/studio', '@nuxt/content', '@vueuse/nuxt', 'nuxt-icon', 'nuxt-gtag', '@nuxtjs/google-analytics'],
  
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

  content: {
    documentDriven: true,
  },

  icon: {
    size: '1.3rem',
  },

  gtag: {
    id: 'G-VPRLB74ECH',
  },
  googleAnalytics: {
    id: 'G-VPRLB74ECH', 
    dev: testingAnalytics ? true : process.env.NODE_ENV !== 'production',
    debug: testingAnalytics
      ? {
        enabled: true,
        sendHitTask: true
      }
      : {}
  },
  loadingIndicator: {
    name: '~/composables/loading.html',
    img: '/icons/192.png'
  },
  
  devtools: {
    enabled: true,
  },
})
