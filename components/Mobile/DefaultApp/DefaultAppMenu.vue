<script setup lang="ts">
import {useWindowsStore} from "~/store/windowsStore";
import {usePagesStore} from "~/store/pagesStore";
import {generateUrl, getPageParams, sleep} from "~/helpers/app.helpers";
import AsyncIcon from "~/components/Common/AsyncIcon.vue";
import type {Page} from "~/types/Page";


const emits = defineEmits(['showMenu', 'selectWindow']);
const windowsStore = useWindowsStore()
const pagesStore = usePagesStore()

const firstScreen = computed<Page>(() => windowsStore.openedWindows[0])

const links = computed<Page[]>(() => {
  const screens = windowsStore.openedWindows
  if (!screens.length) return []
  return pagesStore.pages
    .filter(page => page.parentId === firstScreen.value.id)
    .sort((a: Page, b: Page) => {
      if (a.title < b.title) return -1
      if (a.title > b.title) return 1
      return 0
    })
})

const realizeRedirect = (url: string): void => {
  window.history.pushState({}, '', url)
  emits('showMenu', false)
  emits('selectWindow', null)
}

async function toHome(): Promise<void> {
  realizeRedirect('/desktop')
  windowsStore.closeAllWindows()
}

async function redirect(page: Page) {
  const currentScreen = windowsStore.openedWindows[windowsStore.openedWindows.length - 1]
  if (page.id === currentScreen.id) {
    emits('selectWindow', null)
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
              :name="firstScreen.mobile?.icon || firstScreen.icon"
              :size="22"
              :stroke-width="1.6"
              color="#dededc"
            />
            {{ firstScreen.title }}
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
                  :name="link.mobile?.icon || link.icon"
                  :size="18"
                  :stroke-width="1.4"
                  color="#dededc"
                />
                {{ link.title }}
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
