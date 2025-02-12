<script setup lang="ts">
import {Maximize2, Minimize2, Minus, Plus, X} from "lucide-vue-next";
import {usePagesStore} from "~/store/pagesStore";
import type {Page} from "~/types/Page";
import {ref} from "vue";
import FinderHeader from "~/components/common/Finder/FinderHeader.vue";

const route = useRoute()
const router = useRouter()
const { $bus } = useNuxtApp()
const pagesStore = usePagesStore()

const fileWindow = ref(null)
provide('parentElement', fileWindow);

const isFullScreen = ref<boolean>(false)
const isHidden = ref<boolean>(false)
const cursorPointer = ref<boolean>(false)

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

const pages = computed<Page[]>(() => pagesStore.pages);
const currentPage = computed<Page | undefined>(() => pages.value.find(page => {
  return page.url.replace('/file/', '/') === '/' + route.path.split('/').pop()
}));

$bus.$on('setFront', (flag: boolean) => cursorPointer.value = flag)
$bus.$on('file:show', () => isHidden.value = false)
$bus.$on('file:close', (id: number) => {
  if (id === currentPage.value?.id) { closeWindow() }
})

watch(
  () => route.fullPath,
  () => isHidden.value = false
)

function closeWindow(): void {
  const routesArr = route.path.replace('/file/', '/').split('/')
  routesArr.splice(routesArr.length - 1, 1)
  router.push(routesArr.join('/'))
}

function hideWindow(): void {
  isFullScreen.value = false
  isHidden.value = !isHidden.value
}

function fullScreen(): void {
  isHidden.value = false
  isFullScreen.value = !isFullScreen.value
}
</script>

<template>
  <div
    ref="fileWindow"
    class="content-file"
    :class="{
      'content-file_full-screen': isFullScreen,
      'content-file_hidden': isHidden,
      'content-file_cursor-pointer': cursorPointer,
      'content-file_reset-width': currentPage?.resetWidth
    }"
    @click="() => { $bus.$emit('resetFront', false); cursorPointer = false }"
  >
    <FinderHeader
      :moveable="true"
      :buttons="windowButtons"
    >
      <h1>{{ currentPage?.title }}</h1>
    </FinderHeader>

    <section class="content-wrapper">
      <div class="main-frame">
        <div
          class="content"
          :class="{'content_rounded': currentPage?.hideStatusBar}"
        >
          <component
            v-if="currentPage?.contentComponent"
            :is="defineAsyncComponent({
              loader: () => import(`~/components/Pages/${currentPage?.contentComponent}.vue`)
            })"
          />

          <template v-else >
            <p>[content file component]</p>
            <pre>{{ route.params }}</pre>
            <pre>{{ currentPage }}</pre>
          </template>
        </div>

        <footer
          class="status-bar"
          v-if="!currentPage?.hideStatusBar"
        >
          {{ route.fullPath.replace('/file/', '/') }}
        </footer>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.content-file {
  max-width: 1180px;
  width: 100%;
  min-width: 360px;
  height: 90vh;
  min-height: 300px;
  margin: -40px -166px 0 16px;

  background-color: var(--folder-bg-color);
  border: 3px solid var(--folder-border-color);
  border-radius: 12px;
  box-shadow: 20px 20px 0 0 var(--folder-shadow-color);

  position: fixed;

  &_reset-width {
    width: auto;
    max-width: none;
  }
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
    //margin: 0 36px 0 16px !important;
    margin: auto !important;
  }
  &_hidden {
    position: fixed;
    bottom: 12px;
    left: 88px;
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

.content-wrapper {
  height: calc(100% - 44px);
  display: flex;
  flex-direction: row;
}

.main-frame {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
.content {
  //padding: 18px;
  flex-grow: 1;
  overflow: auto;
  &_rounded {
    border-radius: 0 0 8px 8px;
  }
}
.status-bar {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  height: 36px;
  padding: 0 18px;
  border-top: 3px solid var(--folder-border-color);
  border-radius: 0 0 8px 8px;

  background-color: var(--folder-status-bar-bg-color);
  font-weight: 600;
  color: var(--folder-status-bar-color);
}
</style>
