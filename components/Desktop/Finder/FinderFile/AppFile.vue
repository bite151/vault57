<script setup lang="ts">
import { ref } from "vue";
import { useWindowsStore } from "~/store/windowsStore";
import FinderHeader from "~/components/Desktop/Finder/FinderHeader.vue";
import FinderStatusBar from "~/components/Desktop/Finder/FinderStatusBar.vue";
import type { PageWindow } from "~/types/Window";
import {generateUrl} from "~/helpers/app.helpers";
import Simplebar from "simplebar-vue";
// import 'simplebar-vue/dist/simplebar.min.css';
import 'assets/scss/simplebar.css';
import FileContent from "~/components/Desktop/Finder/FinderFile/FileContent.vue";

const { currentWindow } = defineProps<{
  currentWindow: PageWindow
}>()

const fileWindowElement = ref<HTMLElement | null>(null)
provide('parentElement', fileWindowElement);

const currentComponent = shallowRef(null);
watch(
  () => currentWindow?.desktop.contentComponent,
  (componentName) => {
    if (componentName) {
      currentComponent.value = defineAsyncComponent(() =>
        import(`~/components/CustomPageComponents/${componentName}.vue`)
      );
    }
  },
  { immediate: true }
);

const windowButtons = ref([
  {
    icon: 'X',
    action: closeWindow
  },
  {
    icon: 'Minus',
    action: hideWindow
  },
  {
    icon: !currentWindow.isFullScreen ? 'Maximize2' : 'Minimize2',
    action: fullScreen
  }
])

const windowsStore = useWindowsStore()
const openedWindows = computed(() => windowsStore.openedWindows.filter(item => !item.isHidden))
const breadCrumbs = generateUrl(currentWindow)

const isShown = ref<number>(0)
const showEffectClassName = computed<string>(() => {
  if (isShown.value === 2) {
    return 'animate__fadeInUp' // expand
  }
  return 'animate__fadeIn' // open
})
const hideEffectClassName = computed<string>(() => {
  if (isShown.value === -1) {
    return 'animate__fadeOutDown'  // hide in the Dock
  }
  return 'animate__fadeOut' // close window
})

onMounted(() => {
  isShown.value = 1
})

function toFront(): void {
  windowsStore.setWindowToFront(currentWindow.windowId)
}

async function closeWindow(): Promise<void> {
  isShown.value = -2
  await new Promise(r => setTimeout(r, 50));
  windowsStore.closeWindow(currentWindow.windowId)

  updateWindowsPosition()
}

async function hideWindow(e: MouseEvent): Promise<void> {
  isShown.value = -1
  await new Promise(r => setTimeout(r, 50));
  const checkMatches = windowsStore.openedWindows
    .filter(item => item.isHidden)
    .some(item => item.id === currentWindow.id)
  if (checkMatches) {
    // if there is already such a window in the dock,
    // then the duplicate is closed.
    closeWindow()
  } else {
    windowsStore.updateWindowParams({
      windowId: currentWindow.windowId,
      isHidden: true,
      hiddenAt: Math.round(new Date().getTime() / 1000)
    })
  }

  updateWindowsPosition()
  e.stopPropagation()
}

function updateWindowsPosition() {
  const nextWindow = openedWindows.value[openedWindows.value.length - 1]
  if (nextWindow) {
    windowsStore.setWindowToFront(nextWindow.windowId)
    // router.push(nextWindow.fullUrl)
    return
  }
  window.history.pushState({}, '', '/desktop')
}

function fullScreen(): void {
  const isFullScreen = !openedWindows.value.find(item => item.windowId === currentWindow.windowId)?.isFullScreen
  windowsStore.updateWindowParams({
    windowId: currentWindow.windowId,
    isHidden: false,
    isFullScreen
  })
}

function onMoveEnd(): void {
  windowsStore.updateWindowParams({
    windowId: currentWindow.windowId,
    position: {
      x: fileWindowElement.value!.offsetLeft,
      y: fileWindowElement.value!.offsetTop,
      margin: '0'
    },
  })
}

function onResizeEnd(): void {
  windowsStore.updateWindowParams({
    windowId: currentWindow.windowId,
    size: {
      width: fileWindowElement.value!.clientWidth,
      height: fileWindowElement.value!.clientHeight,
    },
    position: {
      x: fileWindowElement.value!.offsetLeft,
      y: fileWindowElement.value!.offsetTop,
      margin: '0'
    }
  })
}
</script>

<template>
  <Transition
    :enter-active-class="`animate__animated animate__faster ${showEffectClassName}`"
    :leave-active-class="`animate__animated animate__faster ${hideEffectClassName}`"
  >
    <div
      v-if="isShown > 0"
      ref="fileWindowElement"
      class="content-file"
      :class="{
        'content-file_full-screen': currentWindow.isFullScreen,
        'content-file_hidden': currentWindow.isHidden,
        'content-file_front': currentWindow.isOnFront,
        'content-file_reset-width': currentWindow?.desktop.resetWidth
      }"
      :style="`
      top: ${currentWindow?.position?.y}px;
      left: ${currentWindow?.position?.x}px;
      margin: ${currentWindow?.position?.margin || '0'};
      width: ${currentWindow?.size?.width ? currentWindow.size.width + 'px' : ''};
      height: ${currentWindow?.size?.height ? currentWindow.size.height + 'px' : ''}`"
      @click="toFront()"
    >
      <FinderHeader
        :moveable="true"
        :buttons="windowButtons"
        @on-move-end="onMoveEnd"
        @on-move-start="toFront()"
      >
        <h1>{{ currentWindow.desktop.title }}</h1>
      </FinderHeader>

      <section class="content-wrapper">
        <div class="main-frame">
          <div
            v-if="currentWindow.desktop.contentComponent"
            class="component-wrapper"
            :class="{'component-wrapper_rounded': currentWindow.desktop.hideStatusBar}"
          >
            <component
              v-if="currentComponent"
              :is="currentComponent"
            />
          </div>

          <Simplebar class="scrollbar-file" v-else>
            <div
              class="content"
              :class="{'content_rounded': currentWindow.desktop.hideStatusBar}"
            >
              <FileContent :content="currentWindow?.content" />
            </div>
          </Simplebar>

          <FinderStatusBar
            v-if="!currentWindow.desktop.hideStatusBar"
            @on-resize-end="onResizeEnd"
          >
            {{ breadCrumbs.replace('/file/', '/') }}
          </FinderStatusBar>
        </div>
      </section>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
.content-file {
  max-width: 1320px;
  width: 946px;
  min-width: 720px !important;
  height: 80vh;
  max-height: 980px !important;
  min-height: 430px !important;
  //margin: -40px -166px 0 16px;

  background-color: var(--folder-bg-color);
  border: 3px solid var(--folder-border-color);
  border-radius: 12px;
  box-shadow: 20px 20px 0 0 var(--folder-shadow-color);

  position: fixed;
  margin: auto;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  z-index: 1;

  &_reset-width {
    min-width: 430px !important;
    width: fit-content;
    max-width: none;
  }
  &_cursor-pointer {
    cursor: pointer;
  }
  &_full-screen {
    box-shadow: none;
    height: 100vh !important;
    width: 100% !important;
    max-width: 1320px;


    top: 0 !important;
    bottom: 0 !important;
    left: 0 !important;
    right: 0 !important;
    //margin: 0 36px 0 16px !important;
    margin: auto !important;
  }
  &_hidden {
    position: fixed;
    bottom: 12px;
    left: 88px;
    //top: inherit !important;
    width: 200px;
    height: 48px;
    min-height: 46px;
    box-shadow: none;

    .title-bar {
      border: none;
      background-color: transparent;
    }
    .content-wrapper {
      display: none;
    }
  }
  &_front {
    position: fixed;
    z-index: 11;
  }

  &_reset-margin{
    margin: 0;
  }

  &.is-move {
    box-shadow: 30px 30px 0 0 var(--folder-shadow-light-color);
    transform: translateY(-5px) translateX(-5px) scale(1.01);

    .title-bar {
      cursor: grabbing
    }
  }
}

.content-wrapper {
  height: calc(100% - 44px);
  display: flex;
  flex-direction: row;
}

.main-frame {
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  overflow: auto;
}

.scrollbar-file {
  height: calc(100% - 36px);
}

.content {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: auto;
  &_rounded,
  &_rounded .component-wrapper{
    border-radius: 0 0 8px 8px;
  }
}

.component-wrapper {
  height: 100%;
  flex-grow: 1;
}

.component-wrapper_rounded {
  border-radius: 0 0 8px 8px;
  overflow: hidden;
}

.status-bar {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  height: 36px;
  padding: 0 18px;
  border-top: 3px solid var(--folder-border-color);
  border-radius: 0 0 10px 10px;

  background-color: var(--folder-status-bar-bg-color);
  font-weight: 600;
  color: var(--folder-status-bar-color);
}

.animate__faster {
  --animate-duration: 0.7s;
}
</style>
