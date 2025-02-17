<script setup lang="ts">
import {useWindowsStore} from "~/store/windowsStore";
import {usePagesStore} from "~/store/pagesStore";
import {watchDebounced} from "@vueuse/shared";
import AppDesktop from "~/components/AppDesktop/AppDesktop.vue";
import type {PageWindow} from "~/types/Window";
import {findPageByUrl} from "~/helpers/app.helpers";

const route = useRoute()
const windowsStore = useWindowsStore()
const pagesStore = usePagesStore()

const loaded = ref<boolean>(false)
const windows = computed<PageWindow[]>(() => windowsStore.openedWindows)

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
  { debounce: 1000, maxWait: 2000 }
)

onMounted(() => {
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
    item.content = pagesStore.pages.find(page => page.id === item.id)?.content || []
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
    const updatedSession = session
      .map((item: PageWindow) => {
        const page = pagesStore.pages.find(page => page.id === item.id)
        item.content = page?.content || []
        item.pageId = page!.id
        return item
      })

    const isWindowOpen = updatedSession.find(item => item.id === currentPage.id)

    if (isWindowOpen) {
      updatedSession.map((item: PageWindow) => {
        if (item.windowId === isWindowOpen.windowId) {
          item.isHidden = false
        }
        return item
      })
      windowsStore.openedWindows = updatedSession
      windowsStore.setWindowToFront(isWindowOpen.windowId)
      windowsStore.isLoaded = true
      return
    }

    windowsStore.openedWindows = [
      ...updatedSession,
      ...windowsStore.openedWindows
    ]
  }

  windowsStore.isLoaded = true
})
</script>

<template>
  <main
    :class="{ loaded }"
    id="main-content-teleport"
  >
    <NuxtPage/>
    <AppDesktop />
  </main>
</template>

<style scoped lang="scss">
main {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: var(--desctop-bg-color);
  //background-image: url("/images/vault57_b1.png");
  //background-repeat: no-repeat;
  //background-position: center center;
}


//.content-file{ transition-delay: 1s }
</style>
