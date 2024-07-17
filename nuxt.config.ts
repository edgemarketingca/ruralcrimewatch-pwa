export default defineNuxtConfig({

  app: {
    head: {
      meta: [
        { name: 'robots', content: 'index, follow' },
      ],
      link: [
        { rel: 'manifest', href="manifest.json" },
      ],
    },
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    // '@vite-pwa/nuxt',
    '@nuxthq/studio',
    '@nuxt/content',
    '@vueuse/nuxt',
    'nuxt-icon',
   // 'nuxt-security',
  ],

  /*
  security: {
    nonce: true, // Enables HTML nonce support in SSR mode
    ssg: {
      meta: true, // Enables CSP as a meta tag in SSG mode
      hashScripts: true, // Enables CSP hash support for scripts in SSG mode
      hashStyles: false // Disables CSP hash support for styles in SSG mode (recommended)
    },
    headers: {
      contentSecurityPolicy: {
        'script-src': [
          "'self'",  // Fallback value, will be ignored by most modern browsers (level 3)
          "https:", // Fallback value, will be ignored by most modern browsers (level 3)
          "'unsafe-inline'", // Fallback value, will be ignored by almost any browser (level 2)
          "'strict-dynamic'", // Strict CSP via 'strict-dynamic', supported by most modern browsers (level 3)
          "'nonce-{{nonce}}'" // Enables CSP nonce support for scripts in SSR mode, supported by almost any browser (level 2)
        ],
        'style-src': [
          "'self'", // Enables loading of stylesheets hosted on same origin
          "https:", // For increased security, replace by the specific hosting domain or file name of your external stylesheets
          "'unsafe-inline'" // Recommended default for most Nuxt apps
        ],
        'base-uri': ["'none'"],
        'img-src': ["'self'", "data:https://www.ruralcrimewatch.ab.ca"], // Add relevant https://... sources if you load images from external sources 
        'font-src': ["'self'", "https:"], // (, "data:") For increased security, replace by the specific sources for fonts
        'object-src': ["'none'"],
        'script-src-attr': ["'none'"],
        'upgrade-insecure-requests': true
      }
    },
    sri: true
  },
  */
  
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

  app: {
    keepalive: true,
  },

  devtools: {
    enabled: true,
  },
})
