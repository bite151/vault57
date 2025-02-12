<script setup lang="ts">
import {Maximize2, Minimize2, Minus, Plus, X} from "lucide-vue-next";
import Simplebar from 'simplebar-vue';
import '~/assets/scss/simplebar.css';
import {usePagesStore} from "~/store/pagesStore";
import FinderHeader from "~/components/common/Finder/FinderHeader.vue";
import {ref} from "vue";

const folderWindow = ref(null)
provide('parentElement', folderWindow);

const isFullScreen = ref<boolean>(false)
const isHidden = ref<boolean>(false)
const isOnFront = ref<boolean>(false)

const windowButtons = ref([
  {
    icon: 'X',
    action: closeWindow
  }, {
    icon: !isHidden.value ? 'Minus' : 'Plus',
    action: hideWindow
  }, {
    icon: !isFullScreen.value ? 'Maximize2' : 'Minimize2',
    action: fullScreen
  }
])

const route = useRoute()
const router = useRouter()
const { $bus } = useNuxtApp()
const pagesStore = usePagesStore()

const pages = computed(() => pagesStore.pages);
const currentPage = computed(() => pages.value.find(page => {
  if (route.params.folder) {
    return page.url.replace('/file/', '/') === '/' + route.params.folder
  }
  const routesArr = route.path.replace('/file/', '/').split('/')
  const level = !route.params.file ? 1 : 2
  return page.url.replace('/file/', '/') === '/' + routesArr[routesArr.length - level]
}));

const breadCrumbs = computed(() => {
  const routesArr = route.path.replace('/file/', '/').split('/')
  if (route.params.file) {
    routesArr.splice(routesArr.length - 1, 1)
  }
  routesArr.splice(0, 1)
  return routesArr.map(item => pages.value.find(page => page.url.replace('/file/', '/') === '/' + item)!.url).join('')
})

$bus.$on('resetFront', () => isOnFront.value = false)

function closeWindow(): void {
  router.push('/desktop')
}

function hideWindow(): void {
  isFullScreen.value = false
  isHidden.value = !isHidden.value
}

function fullScreen(): void {
  isHidden.value = false
  isFullScreen.value = !isFullScreen.value
}

function toFront(): void {
  if (route.params?.file || route.path === '/gallery') {
    isOnFront.value = true
    $bus.$emit('setFront', true)
  }
}
</script>

<template>
  <div
    ref='folderWindow'
    class="content-folder"
    :class="{
      'content-folder_full-screen': isFullScreen,
      'content-folder_hidden': isHidden,
      'content-folder_front': isOnFront,
      'content-folder_cursor-pointer': !isOnFront && route.params.file
    }"
    @click="toFront()"
  >
    <FinderHeader
      :moveable="true"
      :buttons="windowButtons"
    >
      <h1>{{ currentPage?.title }}</h1>
    </FinderHeader>

    <section class="content-wrapper">
      <aside class="task-bar">
        <Simplebar class="scrollbar-task-bar">
          <slot name="navigation"></slot>
        </Simplebar>
      </aside>
      <div class="main-frame">
        <Simplebar class="scrollbar-folder">
          <slot></slot>
        </Simplebar>
        <footer class="status-bar">
          {{ breadCrumbs }}
        </footer>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.content-folder {
  max-width: 1280px;
  width: 100%;
  min-width: 360px;
  height: 90vh;
  min-height: 300px;
  margin: 0 36px 0 16px;

  background-color: var(--folder-bg-color);
  border: 3px solid var(--folder-border-color);
  border-radius: 12px;
  box-shadow: 20px 20px 0 0 var(--folder-shadow-color);

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
    bottom: 22px;
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
    box-shadow: 30px 30px 0 0 var(--folder-shadow-color);
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
    padding-right: 26px !important;
  }
}

.status-bar {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  height: 36px;
  padding: 0 18px;
  border-top: 3px solid var(--folder-border-color);
  border-radius: 0 0 8px 0;

  background-color: var(--folder-status-bar-bg-color);
  font-weight: 600;
  color: var(--folder-status-bar-color);
}
</style>
