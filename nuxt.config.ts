// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
  
  devServer: {
    // host: 'localhost',
    host: '192.168.1.145', // Home
    // host: '192.168.88.252', // Vault57
    port: 3000,
  },
  
  modules: ['@pinia/nuxt', '@vite-pwa/nuxt', '@nuxt/image', '@nuxt/fonts', 'vue-yandex-maps/nuxt'],
  
  runtimeConfig: {
    public: {
      API_URL: process.env.API_URL,
      MEDIA_URL: process.env.MEDIA_URL,
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
        {
          rel: 'manifest',
          type: 'application/manifest+json',
          href: '/manifest.webmanifest'
        }
      ]
    }
  },
  
  hooks: {
    "pages:extend"(pages) {
      pages.push(
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
          name: "level-1",
          path: "/:folder",
          file: "~/pages/page.vue",
        }, {
          name: "level-2",
          path: "/:folder/:file",
          file: "~/pages/page.vue",
        },
      );
    },
  },
  
  fonts: {
    families: [
      { name: 'Play', global: true, src: '/fonts/Play/Play-Regular.ttf' },
      { name: 'Play-Bold', global: true, src: '/fonts/Play/Play-Bold.ttf' },

      { name: 'IBM', global: true, src: '/fonts/IBMPlexSans/IBMPlexSans-Regular.ttf' },
      { name: 'IBM-Thin', global: true, src: '/fonts/IBMPlexSans/IBMPlexSans-Thin.ttf' },
      { name: 'IBM-ExtraLight', global: true, src: '/fonts/IBMPlexSans/IBMPlexSans-ExtraLight.ttf' },
      { name: 'IBM-Light', global: true, src: '/fonts/IBMPlexSans/IBMPlexSans-Light.ttf' },
      { name: 'IBM-Medium', global: true, src: '/fonts/IBMPlexSans/IBMPlexSans-Medium.ttf' },
      { name: 'IBM-SemiBold', global: true, src: '/fonts/IBMPlexSans/IBMPlexSans-SemiBold.ttf' },
      { name: 'IBM-Bold', global: true, src: '/fonts/IBMPlexSans/IBMPlexSans-Bold.ttf' },

      { name: 'PxPlusIBM', global: true, src: '/fonts/pxplusibmmda.ttf' },
      { name: 'Roco-Pixel', global: true, src: '/fonts/roco-pixel-rus.ttf' },
    ]
  },

  css: [
    'animate.css/animate.min.css',
    '~/assets/scss/utils/_reset.scss',
    '~/assets/scss/main.scss'
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/scss/utils/_variables.scss" as *;',
        }
      }
    }
  },
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'Vault57',
      short_name: 'Vault57',
      description: 'Ретро компьютерный клуб',
      theme_color: '#BEBFB8',
      icons: [
        {
          src: '/icon-192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/icon-512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    },
    workbox: {
      navigateFallback: '/',
      globPatterns: ['**/*.{js,css,html,png,svg,ico,json}'],
    },
    devOptions: {
      enabled: true,
      type: 'module',
    },
    client: {
      installPrompt: true,
    }
  },
  yandexMaps: {
    apikey: '49b703ae-b1f3-4b42-bc45-dc0860f1af3c',
  },
})
