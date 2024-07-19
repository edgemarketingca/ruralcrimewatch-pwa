export default defineNuxtConfig({

  app: {
    head: {
      title: "Alberta Provincial Rural Crime Watch",
      meta: [
        { name: 'robots', content: 'index, follow' },
      ], 
      
      link: [
        { rel: 'favicon', href: '/favicon.ico' },
        //{ rel: 'manifest', href: '/manifest.json' },
      ],
      
    },
    manifest: {
      "id": "Alberta Provincial Rural Crime Watch",
      "name": "Alberta Provincial Rural Crime Watch",
      "short_name": "Rural Crime Watch",
      "description": "Alberta Rural Crime Watch partners with the RCMP to help reduce crime in rural Alberta communities and build safer neighbourhoods.",
      "background_color": "#000000",
      "theme_color": "#000000",
      "lang": "en-us",
      "start_url": "/",
      "scope": "/",
      "dir": "ltr",
      "display": "standalone",
      "orientation": "portrait-primary",
      "prefer_related_applications": false,
      "display_override": ["window-controls-overlay"],
      "icons": [
        {
          "src": "icons/512x512.png",
          "sizes": "512x512",
          "type": "image/png"
        },
        {
          "src": "icons/192x192.png",
          "sizes": "192x192",
          "type": "image/png"
        },
        {
          "src": "icons/48x48.png",
          "sizes": "48x48",
          "type": "image/png"
        },
        {
          "src": "icons/24x24.png",
          "sizes": "24x24",
          "type": "image/png"
        }
      ],
      "categories": [
        "education",
        "government",
        "lifestyle",
        "news",
        "security"
      ],
      "features": [
        "Cross Platform",
        "fast",
        "simple"
      ]
    },
    keepalive: true,
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

  loadingIndicator: {
    name: '~/composables/loading.html',
    img: '/icons/192.png'
  },
  
  devtools: {
    enabled: true,
  },
})
