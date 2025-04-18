<script setup lang="ts">
import {useWindowsStore} from "~/store/windowsStore";
import {usePagesStore} from "~/store/pagesStore";
import {generateUrl, getPageParams, sleep} from "~/helpers/app.helpers";
import AsyncIcon from "~/components/Common/AsyncIcon.vue";
import type {Page} from "~/types/Page";
import type {PageWindow} from "~/types/Window";
import {useAppStatesStore} from "~/store/appStatesStore";


const emits = defineEmits(['showMenu', 'selectWindow']);
const windowsStore = useWindowsStore()
const pagesStore = usePagesStore()

const appStatesStore = useAppStatesStore()
const { isMobileMenuOpened } = storeToRefs(appStatesStore);

const firstScreen = computed<PageWindow>(() => windowsStore.openedWindows[0])
const currentScreen = computed<PageWindow | undefined>(() => windowsStore.currentScreen)

const links = computed<Page[]>(() => {
  const screens = windowsStore.openedWindows
  if (!screens.length) return []
  const items = pagesStore.pages
    .filter(page => page.parentId === firstScreen.value.id)
    .sort((a: Page, b: Page) => {
      if (a.desktop.title < b.desktop.title) return -1
      if (a.desktop.title > b.desktop.title) return 1
      return 0
    })

  const typePriority = (type: string) => ['folder', 'file'].indexOf(type) + 1 || Infinity;
  return items.sort((a, b) => typePriority(a.type) - typePriority(b.type));
})

const realizeRedirect = (url: string): void => {
  window.history.pushState({}, '', url)
  emits('showMenu', false)
  isMobileMenuOpened.value = false
  emits('selectWindow', null)
}

async function toHome(): Promise<void> {
  realizeRedirect('/desktop')
  windowsStore.closeAllWindows()
}

async function redirect(page: Page) {
  if (page.id === currentScreen.value?.id) {
    emits('selectWindow', null)
    isMobileMenuOpened.value = false
    emits('showMenu', false)
    return
  }

  const index = windowsStore.openedWindows.findIndex(w => w.id === page.id)
  if (index > -1) {
    emits('selectWindow', index)
    await sleep(400)
    windowsStore.openedWindows.splice(index + 1)
    const { fullUrl } = windowsStore.openedWindows[index]
    realizeRedirect(fullUrl)
    return
  }

  const url = generateUrl(page)
  const params = getPageParams(url)

  emits('selectWindow', 0)
  await sleep(200)
  windowsStore.openedWindows.splice(1)
  windowsStore.setWindow(url, params)
  await sleep(200)
  emits('selectWindow', null)
  await sleep(300)
  isMobileMenuOpened.value = false
  emits('showMenu', false)
}
</script>

<template>

  <section class="app-menu">
    <header class="app-menu-header">
      <button
        class="home-button"
        @click="toHome()"
      >
        <span class="icon-wrapper">
          <AsyncIcon
            name="House"
            :size="32"
            :stroke-width="1.4"
            color="#3e403b"
          />
        </span>
        <span class="title">Vault57</span>
      </button>
    </header>

    <nav>
      <ul>
        <li>
          <button
            class="menu-button button-group"
            @click="redirect(firstScreen)"
          >
            <AsyncIcon
              :name="firstScreen.mobile.icon || firstScreen.desktop.icon"
              :size="22"
              :stroke-width="1.6"
              color="#dededc"
            />
            {{ firstScreen.mobile.title }}
          </button>
          <ul>
            <li
              v-for="link in links"
              :key="link.id"
            >
              <button
                class="menu-button"
                @click="redirect(link)"
              >
                <AsyncIcon
                  :name="link.mobile.icon || link.desktop.icon"
                  :size="18"
                  :stroke-width="1.4"
                  color="#dededc"
                />
                {{ link.mobile.title }}
              </button>
            </li>
          </ul>
        </li>
      </ul>

    </nav>
  </section>
</template>

<style scoped lang="scss">
.home-button {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 56px;

  .icon-wrapper {
    width: 56px;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #dededc;
    border-radius: 8px;
  }

  .title {
    font-family: Play-Bold, sans-serif;
    font-size: 28px;
    font-weight: 600;
    color: #dededc;
  }
}
.app-menu {
  position: fixed;
  width: 100%;
  height: 100%;
  max-width: 480px;
  padding: 48px 24px;
  //border: 1px solid #dededc;
  //border-radius: 40px;
  z-index: 1;

  ul li {
    &> ul {
      padding-left: 8px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding-top: 16px;
    }
  }
}

.menu-button {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: IBM, sans-serif;
  color: #dededc;

  &.button-group {
    gap: 12px;
    font-size: 24px;
    font-weight: 600;
  }
}
</style>
