<script setup lang="ts">
import { ref } from "vue";
import { useWindowsStore } from "~/store/windowsStore";
import FinderHeader from "~/components/Desktop/Finder/FinderHeader.vue";
import FinderStatusBar from "~/components/Desktop/Finder/FinderStatusBar.vue";
import type { PageWindow } from "~/types/Window";
import {generateUrl, parseQueryString} from "~/helpers/app.helpers";
import Simplebar from "simplebar-vue";
import 'assets/scss/simplebar.css';
import FileContent from "~/components/Desktop/Finder/FinderFile/FileContent.vue";
import {usePagesStore} from "~/store/pagesStore";
import {useDialogStore} from "~/store/dialogStore";
import ReviewsViewer from "~/components/CustomPageComponents/ReviewsViewer.vue";

const config = useRuntimeConfig()

const { currentWindow } = defineProps<{
  currentWindow: PageWindow
}>()

const fileWindowElement = ref<HTMLElement | null>(null)
provide('parentElement', fileWindowElement);

const currentComponent = shallowRef(null);
const componentParams = ref<Record<string, string> | null>(null)
watch(
  () => currentWindow?.desktop.contentComponent,
  (component) => {
    if (!component) {
      componentParams.value = null
      currentComponent.value = null
      return
    }
    const [name, paramsStr] = component!.split('?')

    componentParams.value = paramsStr ? parseQueryString(paramsStr) : null

    if (name) {
      currentComponent.value = defineAsyncComponent(() =>
        import(`~/components/CustomPageComponents/${name}.vue`)
      );
    }
  },
  { immediate: true }
);

const windowButtons = ref([
  {
    icon: 'X',
    action: confirmCloseWindow
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
const pagesStore = usePagesStore()
const dialogStore = useDialogStore()

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

const background = computed<string | null>(() => {
  if (!currentWindow.desktop.background) return null
  if (currentWindow.desktop.background.includes('#')) {
    return `background-color: ${currentWindow.desktop.background}`
  }

  return `background: url(${config.public.IMAGES_URL}${currentWindow.desktop.background}) repeat`
})

onMounted(() => {
  isShown.value = 1
})

function toFront(): void {
  windowsStore.setWindowToFront(currentWindow.windowId)
}

function openConfirmDialog (): void {
  dialogStore.confirmDialog = {
    title: 'You have unsaved changes',
    dialog: 'Close without saving?',
    buttons: [
      {
        text: 'Cancel',
        action: () => dialogStore.confirmDialog = null,
      },
      {
        text: 'Close',
        action: async () => {
          await closeWindow()
          dialogStore.confirmDialog = null
        }
      }
    ]
  }
}

async function confirmCloseWindow(): Promise<void> {
  if (currentWindow.url === '/page-editor' && pagesStore.editorHasChanges) {
    openConfirmDialog()
    return
  }
  await closeWindow()
}

async function closeWindow() {
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
    await closeWindow()
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
      v-show="isShown > 0"
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
        @on-move-start="toFront"
      >
        <h1>{{ currentWindow.desktop.title }}</h1>
      </FinderHeader>

      <section class="content-wrapper">
        <div class="main-frame">

          <div
            v-if="currentWindow.type === 'review'"
            class="component-wrapper"
            :class="{'component-wrapper_rounded': currentWindow.desktop.hideStatusBar}"
            :style="background"
          >
            <ReviewsViewer
              :content="currentWindow.content"
            />
          </div>

          <div
            v-else-if="currentWindow.desktop.contentComponent"
            class="component-wrapper"
            :class="{'component-wrapper_rounded': currentWindow.desktop.hideStatusBar}"
            :style="background"
          >
            <component
              v-if="currentComponent"
              :is="currentComponent"
              v-bind="componentParams"
            />
          </div>

          <Simplebar class="scrollbar-file" v-else>
            <div
              class="content"
              :class="{'content_rounded': currentWindow.desktop.hideStatusBar}"
              :style="background"
            >
              <FileContent :content="currentWindow?.content" />
            </div>
          </Simplebar>

          <FinderStatusBar
            v-if="!currentWindow.desktop.hideStatusBar"
            @on-resize-end="onResizeEnd"
            @on-resize-start="toFront"
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
  width: 1000px;
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
    height: calc(100vh + 6px) !important;
    width: calc(100% + 6px) !important;
    max-width: 1480px;


    top: -3px !important;
    bottom: -3px !important;
    left: -3px !important;
    right: -3px !important;
    //margin: 0 36px 0 16px !important;
    margin: auto !important;

    //border-width: 2px;
    border-radius: 0;
    &:deep(.title-bar),
    &:deep(.component-wrapper) {
      border-radius: 0;
    }
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
