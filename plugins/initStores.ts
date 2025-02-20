import { defineNuxtPlugin } from '#app'
import { usePagesStore } from '~/store/pagesStore'

export default defineNuxtPlugin(async () => {
  const pagesStore = usePagesStore()
  
  if (!pagesStore.pages.length) {
    await pagesStore.fetchPages()
  }
  
  if (!pagesStore.desktopItems.length) {
    await pagesStore.fetchDesktopItems()
  }
})
