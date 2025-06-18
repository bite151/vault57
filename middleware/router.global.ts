import { defineNuxtRouteMiddleware, abortNavigation } from '#app'
import type { RouteLocationNormalized } from 'vue-router'
import { useWindowsStore } from '~/store/windowsStore'
import { useGalleryStore } from '~/store/galleryStore'
import { findPageByUrl } from '~/helpers/app.helpers'
import { useMetaTags } from "~/composables/useMetaTags";

export default defineNuxtRouteMiddleware(async (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
  const windowsStore = useWindowsStore()
  const galleryStore = useGalleryStore()
  const { setMetaTags } = useMetaTags()

  if (!galleryStore.images.length) {
    await galleryStore.fetchImages()
  }
  
  const page = findPageByUrl(to.path)
  if (page) {
    setMetaTags(page.seo, to.path)
  }
  
  const exceptionPaths = ['/', '/contacts']
  if (!exceptionPaths.includes(to.path) && !page) {
    abortNavigation({
      statusCode: 404,
      message: 'Page not found',
      fatal: true
    })
  }
  
  if (to.path === from.path) {
    windowsStore.setWindow(to.path, to.params)
  } else {
    windowsStore.updateWindowContent(from.path, to.path, to.params)
  }
})
