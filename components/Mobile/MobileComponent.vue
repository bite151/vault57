<script setup lang="ts">
import LauncherScreen from "~/components/Mobile/Launcher/LauncherScreen.vue";
import DefaultApp from "~/components/Mobile/DefaultApp/DefaultApp.vue";
import {useWindowsStore} from "~/store/windowsStore";
import {generateUrl, getPageParams, getParents} from "~/helpers/app.helpers";
import type {PageWindow} from "~/types/Window";
import type {Page} from "~/types/Page";
import {useAppStatesStore} from "~/store/appStatesStore";

const route = useRoute()
const router = useRouter()
const windowsStore = useWindowsStore()
const currentScreen = computed<PageWindow | undefined>(() => windowsStore.currentScreen)

const urls = ['/my-computer', '/trash', '/desktop']
if (urls.includes(route.path)) {
  windowsStore.closeAllWindows()
}

onMounted(() => {
  console.log('Launched mobile application', route.path);

  router.push({ path: window.location.pathname });

  if (urls.includes(route.path)) {
    window.history.pushState({}, '', '/desktop')
  }

  loadScreens()
  windowsStore.isLoaded = true
})

const appStatesStore = useAppStatesStore()
const { isMobileMenuOpened } = storeToRefs(appStatesStore);
const currentScreenBackground = computed<string | undefined>(() => windowsStore.currentScreen?.mobile.background)

watch(
  () => [isMobileMenuOpened.value, windowsStore.openedWindows.length],
  () => {
    if (!import.meta.browser) return
    const check = !isMobileMenuOpened.value && !!windowsStore.openedWindows.length
    document.body.style.background = check ? currentScreenBackground.value || '#dededc' : '#3e403b'
  },
  { immediate: true }
)

onBeforeUnmount(() => {
  console.log('Mobile application is unmounted');
})

function loadScreens() {
  if (!windowsStore.openedWindows.length || !currentScreen.value) {
    document.body.style.background = '#3e403b'
    return
  }
  windowsStore.openedWindows = [currentScreen.value]

  document.body.style.background = currentScreen.value.mobile.background ?? '#dededc'

  if (!currentScreen.value.mobile?.loadParentsScreens) return

  const parents = getParents(currentScreen.value).slice(1, -1).filter(s => s.url !== '/my-computer').reverse()

  parents.forEach((item: Page) => {
    const fullUrl = generateUrl(item)
    const randomString = Math.random().toString(36).substring(2, 10);

    const screen: PageWindow = {
      ...item,
      fullUrl,
      routeParams: getPageParams(fullUrl),
      windowId: randomString + '-' + new Date().getTime(),
      pageId: item.id,
      isOnFront: false,
      isHidden: false,
      position: {
        x: 0,
        y: 0,
        margin: 'auto',
      }
    }

    windowsStore.openedWindows = [screen, ...windowsStore.openedWindows]
  })
}
</script>

<template>
  <main class="mobile">
    <div class="mobile-screen">
      <Transition
        enter-active-class="animate__animated animate__zoomIn animate__faster"
        leave-active-class="animate__animated animate__fadeOut animate__faster"
      >
        <DefaultApp />
      </Transition>

      <LauncherScreen />
    </div>
  </main>
</template>

<style scoped lang="scss">
  .mobile {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100dvh;
    background-color: #3e403b;
  }

  .mobile-screen {
    position: relative;
    max-width: 480px;
    max-height: 926px;
    width: 100%;
    height: 100%;
    min-height: 100dvh;
    background-color: #3e403b;
    //overflow: hidden;
  }
  .animate__faster {
    --animate-duration: 0.4s;
  }
</style>
