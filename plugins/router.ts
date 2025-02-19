import {useWindowsStore} from "~/store/windowsStore";
import {usePagesStore} from "~/store/pagesStore";
import {useGalleryStore} from "~/store/galleryStore";
import type {RouteLocationNormalizedGeneric} from "vue-router";
import type {Page} from "~/types/Page";
import {findPageByUrl} from "~/helpers/app.helpers";

export default defineNuxtPlugin(async (nuxtApp) => {
  const windowsStore = useWindowsStore()
  const pagesStore = usePagesStore();
  const galleryStore = useGalleryStore();
  
  if (!pagesStore.pages.length) {
    await pagesStore.fetchPages()
  }
  
  if (!pagesStore.desktopItems.length) {
    await pagesStore.fetchDesktopItems()
  }
  
  addRouteMiddleware('routeWatcher', async (
    to: RouteLocationNormalizedGeneric,
    from: RouteLocationNormalizedGeneric
  ): Promise<void> => {
      if (to.params.folder === 'gallery' && !galleryStore.images.length) {
        await galleryStore.fetchImages()
      }

      const page: Page | null = findPageByUrl(to.path)
      if (to.path !== '/' && !page) {
        abortNavigation({
          statusCode: 404,
          message: 'Page not found',
          fatal: true
        })
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
