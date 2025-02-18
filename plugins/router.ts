import {useWindowsStore} from "~/store/windowsStore";
import {usePagesStore} from "~/store/pagesStore";
import {useGalleryStore} from "~/store/galleryStore";

export default defineNuxtPlugin(async (nuxtApp) => {
  const windowsStore = useWindowsStore()
  const pagesStore = usePagesStore();
  const galleryStore = useGalleryStore();
  
  if (!pagesStore.pages.length) {
    await pagesStore.fetchPages()
  }
  
  if (pagesStore.desktopItems.length) {
    await pagesStore.fetchDesktopItems()
  }
  
  addRouteMiddleware('routeWatcher', async (to, from) => {
      if (to.params.folder === 'gallery' && !galleryStore.images.length) {
        await galleryStore.fetchImages()
      }

      if (to.path === from.path) {
        windowsStore.setWindow(to.path, to.params)
      } else {
        windowsStore.updateWindowContent(from.path, to.path, to.params);
      }
    },
    { global: true }
  )
})
