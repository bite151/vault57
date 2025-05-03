import process from "node:process";

export default defineNuxtConfig({
  devtools: {
    enabled: true,
    
    timeline: {
      enabled: true,
    },
  },
  
  devServer: {
    port: 3000,
  },
  
  modules: [
    '@pinia/nuxt',
    // '@vite-pwa/nuxt',
    '@nuxt/image',
    '@nuxt/fonts',
    'vue-yandex-maps/nuxt',
  ],
  
  runtimeConfig: {
    public: {
      API_BASE_URL: process.env.API_BASE_URL,
      MEDIA_URL: process.env.MEDIA_URL,
      IMAGES_URL: process.env.IMAGES_URL,
    },
  },
  
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      titleTemplate: 'Vault57 - %s',
      htmlAttrs: {
        lang: 'ru'
      },
      link: [
        // {
        //   rel: 'manifest',
        //   type: 'application/manifest+json',
        //   href: '/manifest.webmanifest'
        // },
        {
          rel: 'icon',
          type: 'image/svg+xml',
          href: '/vault57.svg'
        },
        { rel: 'preload', href: '/fonts/pxplusibmmda.ttf', as: 'font', crossorigin: '' }
      ]
    }
  },
  
  hooks: {
    "pages:extend"(pages) {
      pages.push(
        {
          name: "contacts",
          path: "/contacts",
          file: "~/pages/contacts.vue",
        },
        {
          name: "games-folder",
          path: "/games/:folder",
          file: "~/pages/page.vue",
        },
        {
          name: "games-file-1",
          path: "/games/:folder/file/:file",
          file: "~/pages/page.vue",
        },
        {
          name: "games-file-2",
          path: "/games/:folder/:file",
          file: "~/pages/page.vue",
        },
        {
          name: "js-folder",
          path: "/js/:folder",
          file: "~/pages/page.vue",
        },
        {
          name: "js-file-2",
          path: "/js/:folder/:file",
          file: "~/pages/page.vue",
        },
        {
          name: "level-1",
          path: "/:folder",
          file: "~/pages/page.vue",
        },
        {
          name: "level-2",
          path: "/:folder/:file",
          file: "~/pages/page.vue",
        },
      );
    },
  },
  
  fonts: {
    families: [
      // { name: 'PxPlusIBM', global: true, src: '/fonts/pxplusibmmda.ttf' },
      
      { name: 'Play', global: true, src: '/fonts/Play/Play-Regular.ttf' },
      { name: 'Play-Bold', global: true, src: '/fonts/Play/Play-Bold.ttf' },
      
      { name: 'IBM', global: true, src: '/fonts/IBMPlexSans/IBMPlexSans-Regular.ttf' },
      { name: 'IBM-Thin', global: true, src: '/fonts/IBMPlexSans/IBMPlexSans-Thin.ttf' },
      { name: 'IBM-ExtraLight', global: true, src: '/fonts/IBMPlexSans/IBMPlexSans-ExtraLight.ttf' },
      { name: 'IBM-Light', global: true, src: '/fonts/IBMPlexSans/IBMPlexSans-Light.ttf' },
      { name: 'IBM-Medium', global: true, src: '/fonts/IBMPlexSans/IBMPlexSans-Medium.ttf' },
      { name: 'IBM-SemiBold', global: true, src: '/fonts/IBMPlexSans/IBMPlexSans-SemiBold.ttf' },
      { name: 'IBM-Bold', global: true, src: '/fonts/IBMPlexSans/IBMPlexSans-Bold.ttf' },
      
      { name: 'Roco-Pixel', global: true, src: '/fonts/roco-pixel-rus.ttf' },
    ]
  },
  
  css: [
    'animate.css/animate.min.css',
    '~/assets/scss/utils/_reset.scss',
    '~/assets/scss/main.scss'
  ],
  
  // sourcemap: false,
  vite: {
    // build: {
    //   sourcemap: false,
    // },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "~/assets/scss/utils/_variables.scss" as *;
          `
        }
      }
    }
  },
  // pwa: {
  //   registerType: 'autoUpdate',
  //   manifest: {
  //     name: 'Vault57',
  //     short_name: 'Vault57',
  //     description: 'Ретро компьютерный клуб',
  //     theme_color: '#BEBFB8',
  //     orientation: 'portrait-primary',
  //     icons: [
  //       {
  //         src: '/icon-192.png',
  //         sizes: '192x192',
  //         type: 'image/png',
  //       },
  //       {
  //         src: '/icon-512.png',
  //         sizes: '512x512',
  //         type: 'image/png',
  //       },
  //     ],
  //   },
  //   workbox: {
  //     navigateFallback: '/',
  //     globPatterns: ['**/*.{js,css,html,png,svg,ico,json}'],
  //     globIgnores: ['**/node_modules/**/*'],
  //     globDirectory: '.output/public',
  //     runtimeCaching: [
  //       {
  //         urlPattern: ({ request }) => request.destination === 'image',
  //         handler: 'CacheFirst',
  //         options: {
  //           cacheName: 'images-cache',
  //           expiration: {
  //             maxEntries: 50,
  //             maxAgeSeconds: 7 * 24 * 60 * 60,
  //           },
  //           cacheableResponse: {
  //             statuses: [0, 200],
  //           },
  //         },
  //       },
  //       {
  //         urlPattern: ({ request }) => request.destination === 'script' || request.destination === 'style',
  //         handler: 'StaleWhileRevalidate',
  //         options: {
  //           cacheName: 'assets-cache',
  //           expiration: {
  //             maxEntries: 50,
  //             maxAgeSeconds: 7 * 24 * 60 * 60,
  //           },
  //         },
  //       },
  //     ]
  //   },
  //   devOptions: {
  //     enabled: true,
  //     type: 'module',
  //   },
  //   client: {
  //     installPrompt: true,
  //   }
  // },
  yandexMaps: {
    apikey: '49b703ae-b1f3-4b42-bc45-dc0860f1af3c',
  }
})
