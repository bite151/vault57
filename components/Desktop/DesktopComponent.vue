<script setup lang="ts">
import {watchDebounced} from "@vueuse/shared";
import {useWindowsStore} from "~/store/windowsStore";
import {usePagesStore} from "~/store/pagesStore";
import {findPageByUrl} from "~/helpers/app.helpers";
import type {PageWindow} from "~/types/Window";
import {useThemeColor} from "~/composables/useThemeColor";
import {useAuthStore} from "~/store/authStore";

const AppDesktop = defineAsyncComponent(() => import('~/components/Desktop/Desktop/AppDesktop.vue'))
const AppFolder = defineAsyncComponent(() => import('~/components/Desktop/Finder/FinderFolder/AppFolder.vue'))
const AppFile = defineAsyncComponent(() => import('~/components/Desktop/Finder/FinderFile/AppFile.vue'))

const route = useRoute()

const authStore = useAuthStore()
const windowsStore = useWindowsStore()
const pagesStore = usePagesStore()
const { changeThemeColor } = useThemeColor()

const windows = computed<PageWindow[]>(() => windowsStore.openedWindows)
const openedWindows = computed(() => windows.value.filter(window => !window.isHidden))
const isAuth = computed(() => authStore.isAuth)
const user = computed(() => authStore.profile)

onMounted(() => {
  console.log('Desktop application launched')
  changeThemeColor('#c0c2be')
  getLastSession()
})

watchDebounced(
  () => windowsStore.openedWindows,
  () => {
    const data = windows.value.map((item) => {
      const { content, ...rest } = item;
      return rest;
    });

    localStorage.setItem('openedWindows', JSON.stringify({
      dataCreatedAt: Math.round(new Date().getTime() / 1000),
      data
    }))
  },
  { debounce: 500, maxWait: 1000 }
)

function getLastSession () {
  const str = localStorage.getItem('openedWindows')
  if (!str) {
    windowsStore.isLoaded = true
    return
  }

  const storage = JSON.parse(str);
  if (!storage.data?.length) {
    windowsStore.isLoaded = true
    return
  }

  const session: PageWindow[] = storage.data.map((item: PageWindow) => {
    const page = pagesStore.pages.find(page => page.id === item.id)
    item.content = page?.content || null
    item.pageId = page!.id!
    return item
  })

  if (route.path.includes('/desktop')) {
    windowsStore.openedWindows = session
    const topWindowId = session.find(item => item.isOnFront)?.windowId ?? null
    if (topWindowId) {
      windowsStore.setWindowToFront(topWindowId)
    }
    windowsStore.isLoaded = true
    return
  }

  const currentPage = findPageByUrl(route.path)

  if (currentPage) {
    const isWindowOpen = session.find(item => item.id === currentPage.id)

    if (isWindowOpen) {
      session.map((item: PageWindow) => {
        if (item.windowId === isWindowOpen.windowId) {
          item.isHidden = false
        }
        return item
      })
      windowsStore.openedWindows = session
      windowsStore.setWindowToFront(isWindowOpen.windowId)
      windowsStore.isLoaded = true
      return
    }

    const currentSession = [
      ...session,
      ...windowsStore.openedWindows
    ]
    windowsStore.openedWindows = [...new Map(currentSession.map(item => [item.windowId, item])).values()];
  }
  windowsStore.isLoaded = true
}

function isComponent(window: PageWindow) {
  return !window.routeParams?.file ? AppFolder : AppFile
}
</script>

<template>
  <main
    id="main-content-teleport"
    class="desktop"
  >
    <component
      class="window-component"
      v-for="window in openedWindows"
      :is="isComponent(window)"
      :key="window.windowId"
      :current-window="window"
    />

    <div
      v-if="isAuth && user.role === 'admin'"
      class="session-info"
    >
      <p>Active session:</p>
      <p>{{ user.role }}</p>
      <p>{{ user.name }}</p>
    </div>

    <AppDesktop />
  </main>
</template>

<style scoped lang="scss">
.desktop {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: var(--desktop-bg-color);
}

.session-info {
  position: fixed;
  bottom: 24px;
  left: 24px;

  p {
    font-size: 12px;
    color: #dedcdc;
    user-select: none;
  }
}

//.window-component {
//  transform: translateY(100vh) scale(.5);
//  opacity: 0;
//  visibility: hidden;
//
//  &_visible {
//    transform: translateY(0) scale(1);
//    opacity: 1;
//    visibility: visible;
//  }
//}

.window-component {
  //transform: translateY(100vh) scale(0.5);
  //opacity: 0;
  //visibility: hidden;
  //animation: fadeInUp ease-out .1s fade-in();
  opacity: 1;
  visibility: visible;
}

@keyframes fadeInUp {
  to {
    transform: translateY(0) scale(1);
    opacity: 1;
    visibility: visible;
  }
}
</style>
