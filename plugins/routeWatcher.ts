import {useWindowsStore} from "~/store/windowsStore";

export default defineNuxtPlugin((nuxtApp) => {
  const windowsStore = useWindowsStore()
  addRouteMiddleware('routeWatcher', (to, from) => {
      if (to.path === from.path) {
        windowsStore.setWindow(to.path, to.params)
      } else {
        windowsStore.updateWindowContent(from.path, to.path, to.params);
      }
      
    },
    { global: true }
  )
})
