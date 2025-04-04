import {useAuthStore} from "~/store/authStore";
import {usePagesStore} from "~/store/pagesStore";
import {useWindowsStore} from "~/store/windowsStore";

export default defineNuxtPlugin(() => {
  const authStore = useAuthStore()
  const pagesStore = usePagesStore()
  const windowsStore = useWindowsStore()
  
  watch(
    () => authStore.isAuth,
    async (isAuth) => {
      await pagesStore.fetchPages()
      
      if (!isAuth) {
        windowsStore.closeProtectedWindows();
      }
    }
  )
})
