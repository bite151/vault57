<script setup lang="ts">
import {useWindowsStore} from "~/store/windowsStore";
import {ref} from "vue";
import FinderHeader from "~/components/common/Finder/FinderHeader.vue";
import FinderStatusBar from "~/components/common/Finder/FinderStatusBar.vue";
import Navigation from "~/components/AppFolder/Navigation/Navigation.vue";
import FolderContent from "~/components/AppFolder/FolderContent.vue";
import Simplebar from 'simplebar-vue';
// import 'simplebar-vue/dist/simplebar.min.css';
import '~/assets/scss/simplebar.css';
import type { PageWindow } from "~/types/Window";
import { generateUrl } from "~/helpers/app.helpers";

const props = defineProps<{
  currentWindow: PageWindow
}>()
const currentWindow = toRef(props, 'currentWindow')

const folderWindowElement = ref<HTMLElement | null>(null)
provide('parentElement', folderWindowElement);
provide('currentWindow', currentWindow.value)

const windowButtons = computed(() => [
  {
    icon: 'X',
    action: closeWindow
  }, {
    icon: 'Minus',
    action: hideWindow
  }, {
    icon: !currentWindow.value.isFullScreen ? 'Maximize2' : 'Minimize2',
    action: toggleFullScreen
  }
])
const windowsStore = useWindowsStore()
const openedWindows = computed(() => windowsStore.openedWindows.filter(item => !item.isHidden))
const breadCrumbs = computed(() => generateUrl(currentWindow.value))

function toFront(): void {
  windowsStore.setWindowToFront(currentWindow.value.windowId)
}

function toggleFullScreen(): void {
  const isFullScreen = !openedWindows.value.find(item => item.windowId === currentWindow.value.windowId)?.isFullScreen
  windowsStore.updateWindowParams({
    windowId: currentWindow.value.windowId,
    isHidden: false,
    isFullScreen
  })
}

function hideWindow(e: MouseEvent): void {
  const checkMatches = windowsStore.openedWindows
    .filter(item => item.isHidden)
    .some(item => item.id === currentWindow.value.id)
  if (checkMatches) {
    // if there is already such a window in the dock,
    // then the duplicate is closed.
    closeWindow()
  } else {
    windowsStore.updateWindowParams({
      windowId: currentWindow.value.windowId,
      isHidden: true,
      hiddenAt: Math.round(new Date().getTime() / 1000)
    })
  }
  updateWindowsPosition()
  e.stopPropagation()
}

function closeWindow(): void {
  windowsStore.closeWindow(currentWindow.value.windowId)
  if (!openedWindows.value.length) {
    window.history.pushState({}, '', '/desktop')
  }
}

function updateWindowsPosition() {
  const nextWindow = openedWindows.value[openedWindows.value.length - 1]
  if (nextWindow) {
    windowsStore.setWindowToFront(nextWindow.windowId)
    return
  }
  window.history.pushState({}, '', '/desktop')
}

function onMoveEnd(): void {
  windowsStore.updateWindowParams({
    windowId: currentWindow.value.windowId,
    position: {
      x: folderWindowElement.value!.offsetLeft,
      y: folderWindowElement.value!.offsetTop,
      margin: '0'
    },
  })
}

function onResizeEnd(): void {
  windowsStore.updateWindowParams({
    windowId: currentWindow.value.windowId,
    size: {
      width: folderWindowElement.value!.clientWidth,
      height: folderWindowElement.value!.clientHeight,
    },
    position: {
      x: folderWindowElement.value!.offsetLeft,
      y: folderWindowElement.value!.offsetTop,
      margin: '0'
    }
  })
}
</script>

<template>
  <div
    ref='folderWindowElement'
    class="content-folder"
    :class="{
      'content-folder_full-screen': currentWindow.isFullScreen,
      'content-folder_hidden': currentWindow.isHidden,
      'content-folder_front': currentWindow.isOnFront,
    }"
    :style="`
    top: ${currentWindow?.position?.y}px;
    left: ${currentWindow?.position?.x}px;
    margin: ${currentWindow?.position?.margin || '0'};
    width: ${currentWindow?.size?.width}px;
    height: ${currentWindow?.size?.height}px;`"
    @click="toFront()"
  >
    <FinderHeader
      :moveable="true"
      :buttons="windowButtons"
      @on-move-end="onMoveEnd"
    >
      <h1>{{ currentWindow?.title }}</h1>
    </FinderHeader>

    <section class="content-wrapper">
      <aside class="task-bar">
        <Simplebar class="scrollbar-task-bar">
          <Navigation />
        </Simplebar>
      </aside>
      <div class="main-frame">
        <Simplebar class="scrollbar-folder">
          <FolderContent
            :key="currentWindow.windowId"
            :current-folder="currentWindow!"
          />
        </Simplebar>

        <FinderStatusBar
          @on-resize-end="onResizeEnd"
        >
          {{ breadCrumbs.replace('/file/', '/') }}
        </FinderStatusBar>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.content-folder {
  position: fixed;
  max-width: 1320px;
  width: 946px;
  //width: 100%;
  min-width: 720px !important;
  height: 80vh;
  max-height: 980px !important;
  min-height: 430px !important;
  //margin: 0 36px 0 16px;

  margin: auto;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  background-color: var(--folder-bg-color);
  border: 3px solid var(--folder-border-color);
  border-radius: 12px;
  box-shadow: 20px 20px 0 0 var(--folder-shadow-color);

  z-index: 1;

  &_cursor-pointer {
    cursor: pointer;
  }
  &_full-screen {
    box-shadow: none;
    height: 100vh;
    width: 100%;
    max-width: 1320px;

    top: 0 !important;
    bottom: 0 !important;
    left: 0 !important;
    right: 0 !important;
    margin: auto !important;
  }

  &_hidden {
    position: fixed;
    //bottom: 22px !important;
    //top: inherit !important;
    left: 0;
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

.scrollbar-task-bar {
  height: 100%;
  &:deep(.simplebar-content-wrapper) {
    padding: 18px 36px 18px 18px;
  }
}

.content-wrapper {
  height: calc(100% - 44px);
  display: flex;
  flex-direction: row;
}

.task-bar {
  flex-shrink: 0;
  height: 100%;
  width: 300px;
  border-right: 3px solid var(--folder-border-color);
  border-radius: 0 0 0 8px;

  background: var(--folder-task-bar-bg-color);
  overflow: auto;
}

.main-frame {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.scrollbar-folder {
  height: calc(100% - 36px);
  &:deep(div.simplebar-content) {
    padding-right: 0 !important;
    height: 100%;
    display: flex;
  }
}

.scrollbar-folder.simplebar-scrollable-y{
  &:deep(div.simplebar-content) {
    padding-right: 12px !important;
  }
}
</style>
