import { defineNuxtRouteMiddleware, abortNavigation } from '#app'
import type { RouteLocationNormalized } from 'vue-router'
import { useWindowsStore } from '~/store/windowsStore'
import { useGalleryStore } from '~/store/galleryStore'
import { findPageByUrl } from '~/helpers/app.helpers'

export default defineNuxtRouteMiddleware(async (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
  const windowsStore = useWindowsStore()
  const galleryStore = useGalleryStore()

  if (to.params.folder === 'gallery' && !galleryStore.images.length) {
    await galleryStore.fetchImages()
  }
  
  const page = findPageByUrl(to.path)
  
  if (to.path !== '/' && !page) {
    abortNavigation({
      statusCode: 404,
      message: 'Page not found',
      fatal: true
    })
  }
  
  useSeoMeta({
    title: page?.title ?? '',
    description: page?.metaDescription ?? ''
  })
  
  if (to.path === from.path) {
    windowsStore.setWindow(to.path, to.params)
  } else {
    windowsStore.updateWindowContent(from.path, to.path, to.params)
  }
})
