// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@nuxt/image', '@nuxt/fonts', 'vue-yandex-maps/nuxt'],
  
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
  
  yandexMaps: {
    apikey: '49b703ae-b1f3-4b42-bc45-dc0860f1af3c',
  },
})
