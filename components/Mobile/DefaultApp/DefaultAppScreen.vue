<script setup lang="ts">
import {useWindowsStore} from "~/store/windowsStore";
import {usePagesStore} from "~/store/pagesStore";
import type {PageWindow} from "~/types/Window";
import type {Page} from "~/types/Page";
import AsyncIcon from "~/components/Common/AsyncIcon.vue";
import {useEventListener, useSwipe, type UseSwipeDirection} from "@vueuse/core";
import DefaultAppIcon from "~/components/Mobile/DefaultApp/DefaultAppIcon.vue";
import {generateUrl, getPageParams, sleep} from "~/helpers/app.helpers";
import DefaultAppContent from "~/components/Mobile/DefaultApp/DefaultAppContent.vue";
import CustomAppScreen from "~/components/Mobile/CustomApp/CustomAppScreen.vue";

const { screen, isMenuOpened } = defineProps<{
  screen: PageWindow,
  isMenuOpened: boolean
}>()

const isTopScreen = computed(() => screen.id === windowsStore.openedWindows[windowsStore.openedWindows.length - 1].id)

const swipeEl = shallowRef<HTMLElement | null>(null)
const screenEl = shallowRef<HTMLElement | null>(null);

const { direction, isSwiping, lengthX, lengthY } = useSwipe(
  swipeEl,
  {
    passive: false,
    onSwipe(e: TouchEvent) {
      if (!isTopScreen.value) return
      if (!screenEl.value) return
      if (lengthY.value < 0) return
      screenEl.value.style.top = -lengthY.value + 'px'
    },
    onSwipeEnd(e: TouchEvent, direction: UseSwipeDirection) {
      if (!screenEl.value) return
      if (!isTopScreen.value) return

      if (direction === 'up') {
        if (lengthY.value > 170) {
          screenEl.value.style.top = '-100%'
          closeScreenBySwipe()
        } else {
          screenEl.value.style.top = '0px'
        }
      }
    },
  },
)

const emits = defineEmits(['showMenu', 'selectWindow']);
const pagesStore = usePagesStore()
const windowsStore = useWindowsStore()

const isLoaded = computed<boolean>(() => windowsStore.isLoaded)
const isMainScreen = computed<boolean>(() => windowsStore.openedWindows[0].id === screen.id)

const titleClass = ref<string>('')

useEventListener(screenEl, 'scroll', () => offsetTitle())
onMounted(() => offsetTitle())

const content = computed<Page[]>(() => {
  return pagesStore.pages
    .filter(page => page.parentId === screen.id)
    .sort((a: Page, b: Page) => {
      if (a.title < b.title) return -1
      if (a.title > b.title) return 1
      return 0
    })
})

function offsetTitle() {
  if (!screenEl.value) return
  titleClass.value = (screenEl.value.scrollTop > 16)
    ? 'app-title_offset app-title_transition-none'
    : ''
}

async function launchApp(app: Page): Promise<void> {
  const url = generateUrl(app)
  const params = getPageParams(url)

  // emits('selectWindow', windowsStore.openedWindows.length - 1)
  windowsStore.setWindow(url, params)
  // await sleep(50)
  // emits('selectWindow', null)
  window.history.pushState({}, '', url)
}

async function selectScreen(): Promise<void> {
  const index = windowsStore.openedWindows.findIndex(w => w.id === screen.id)
  emits('selectWindow', index)

  await sleep(400)
  windowsStore.openedWindows.splice(index + 1)
  window.history.pushState({}, '', screen.fullUrl)
  emits('showMenu', false)
  emits('selectWindow', null)
}

async function back(): Promise<void> {
  const index = windowsStore.openedWindows.findIndex(w => w.id === screen.id)
  if (index > -1) {
    emits('selectWindow', index -1)
  }

  await sleep(400)
  windowsStore.closeWindow(screen.windowId)
  emits('selectWindow', null)
}

function closeApp(): void {
  windowsStore.closeAllWindows()
  window.history.pushState({}, '', '/desktop')
}

function closeScreenBySwipe(): void {
  setTimeout(() => {
    windowsStore.closeWindow(screen.windowId)
    if (!windowsStore.openedWindows.length) {
      emits('showMenu', false)
      window.history.pushState({}, '', '/desktop')
    }
  }, 300)
}
</script>

<template>
  <div
    ref="screenEl"
    class="app-screen"
    :style="`${screen.mobile.background ? 'background: ' + screen.mobile.background : ''}`"
  >
    <div
      v-if="isMenuOpened"
      ref="swipeEl"
      class="blocker"
      @click="selectScreen()"
    />

    <header class="app-header">
      <Transition
        enter-active-class="animate__animated animate__zoomIn animate__faster"
        leave-active-class="animate__animated animate__fadeOut animate__faster"
      >
        <div
          v-if="isLoaded"
          class="header-content"
        >
          <button
            v-if="isMainScreen"
            class="menu-button menu-button_home"
            @click="closeApp()"
          >
            <AsyncIcon
              name="House"
              :size="26"
              :stroke-width="1.6"
              color="#3e403b"
            />
          </button>
          <button
            v-else
            class="menu-button"
            @click="back()"
          >
            <AsyncIcon
              name="ChevronLeft"
              :size="28"
              :stroke-width="1.5"
              color="#3e403b"
            />
          </button>

          <button
            v-if="!isMainScreen"
            class="menu-button"
            @click="emits('showMenu', true)"
          >
            <AsyncIcon
              name="Menu"
              :size="28"
              :stroke-width="1.5"
              color="#3e403b"
            />
          </button>
        </div>
      </Transition>
    </header>

    <CustomAppScreen
      v-if="screen.mobile.contentComponent"
      :screen="screen"
    />

    <section v-else class="app-main">
      <div
        class="app-title"
        :class="titleClass"
      >
        <h1>{{ screen.mobile?.title || screen.title }}</h1>
      </div>

      <p
        v-show="screen.mobile?.description"
        class="app-description"
      >
        {{ screen.mobile?.description }}
      </p>

      <div
        class="main-content"
        :class="{'main-content_grid': !screen.content}"
      >
        <DefaultAppIcon
          v-for="item in content"
          :key="item.id"
          :title="item.title"
          :icon="item.mobile?.icon || item.icon"
          @click="launchApp(item)"
        />

        <DefaultAppContent
          v-if="screen.routeParams?.file"
          :content="screen.content"
        />
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.app {
  &-screen {
    position: fixed;
    width: 100%;
    height: 100%;
    max-width: 480px;
    background: #dededc;

    overflow-y: auto;
    overflow-x: hidden;
    transition: transform .4s ease, top .2s ease;
    z-index: 9;

    .blocker {
      position: fixed;
      width: 100%;
      height: 99999%;
      max-width: 480px;
      background: rgba(0, 0, 0, 0.2);
      z-index: 100;
    }
  }
  &-header {
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    height: 60px;
    display: flex;
    justify-content: center;
    z-index: 99;

    .header-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      max-width: 480px;
      height: 60px;
      padding: 12px 24px;
    }

    .menu-button {
      //margin-left: -4px;
      width: min-content;

      &_home {
        margin-top: 3px;
      }
    }
  }

  &-title {
    position: sticky;
    top: 0;
    padding: 12px 24px 0;
    background-color: #dededc;
    margin-bottom: 12px;
    transition: .3s ease-in-out;
    h1 {
      font-family: Play-Bold, sans-serif;
      font-size: 32px;
      font-weight: 600;
      line-height: 36px;
      transition: .5s ease-in-out;
    }

    &_transition-none {
      transition: none;
    }
    &_offset {
      margin-bottom: 0;
      padding: 12px 64px 12px 72px;
      h1 {
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 100%;
        overflow: hidden;
      }

      &::before {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        width: 100%;
        height: 24px;
        bottom: -24px;
        background: linear-gradient(180deg, rgba(222,222,220,1) 0%, rgba(255,255,255,0) 100%);
      }
    }
  }

  &-description {
    padding: 0 24px;
    font-size: 14px;
  }
  &-main {
    margin-top: -12px;
    &.app-custom {
      margin-top: -60px;

      .app-title {
        z-index: 1;
        background: rgba(#dededc, .5);
        &:before {
          display: none;
        }
      }

      .custom-component-content {
        //margin-top: -60px;
        //height: 100dvh !important;
        height: calc(100dvh - 60px) !important;
        background: #dededc !important;
      }
    }
    .main-content {
      &_grid {
        padding: 24px;
        display: grid;
        grid-row-gap: 24px;
        grid-column-gap: 24px;
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      }
    }
  }
}
.component-wrapper {
  //height: calc(100dvh - 60px);
  height: 100dvh;
  margin-top: -60px;
}
.animate__faster {
  --animate-duration: 0.2s;
}
</style>
