<script setup lang="ts">
import {Maximize2, Minimize2, Minus, Plus, X} from "lucide-vue-next";
import {usePagesStore} from "~/store/pagesStore";

const route = useRoute()
const router = useRouter()
const { $bus } = useNuxtApp()
const pagesStore = usePagesStore()

const isFullScreen = ref<boolean>(false)
const isHidden = ref<boolean>(false)
const cursorPointer = ref<boolean>(false)

const pages = computed(() => pagesStore.pages);
const currentPage = computed(() => pages.value.find(page => {
  return page.url.replace('/file/', '/') === '/' + route.path.split('/').pop()
}));

$bus.$on('setFront', (flag: boolean) => cursorPointer.value = flag)

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
    class="content-file"
    :class="{
      'content-file_full-screen': isFullScreen,
      'content-file_hidden': isHidden,
      'content-file_cursor-pointer': cursorPointer,
      'content-file_reset-width': currentPage?.resetWidth
    }"
    @click="() => { $bus.$emit('resetFront', false); cursorPointer = false }"
  >
    <header class="title-bar">
      <div class="title-bar__buttons">
        <div class="buttons__button" @click="closeWindow">
          <X :size="8" :strokeWidth="5" color="#31322d"/>
        </div>
        <div class="buttons__button" @click="hideWindow">
          <Minus v-if="!isHidden" :size="8" :strokeWidth="5" color="#31322d"/>
          <Plus v-else :size="8" :strokeWidth="5" color="#31322d"/>
        </div>
        <div class="buttons__button" @click="fullScreen">
          <Maximize2 v-if="!isFullScreen" :size="8" :strokeWidth="5" color="#31322d"/>
          <Minimize2 v-else :size="8" :strokeWidth="5" color="#31322d"/>
        </div>
      </div>
      <h1 class="title">{{ currentPage?.title }}</h1>
    </header>

    <section class="content-wrapper">
      <div class="main-frame">
        <div
          class="content"
          :class="{'content_rounded': currentPage.hideStatusBar}"
        >
          <component
            v-if="currentPage.contentComponent"
            :is="defineAsyncComponent({
              loader: () => import(`~/components/Pages/${currentPage.contentComponent}.vue`)
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
          v-if="!currentPage.hideStatusBar"
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
    margin: 0 36px 0 16px;
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
}

.title-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 44px;

  position: relative;
  padding: 10px 84px 10px 84px;
  border-bottom: 3px solid var(--folder-border-color);
  border-radius: 8px 8px 0 0;
  background: var(--folder-title-bar-bg-color);

  user-select: none;

  //cursor: move;

  .title {
    font-weight: 600;
    color: var(--folder-title-bar-color);
  }

  &__buttons {
    position: absolute;
    display: flex;
    gap: 6px;
    left: 12px;

    .buttons__button {
      width: 16px;
      height: 16px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 2px solid #4d4d4d;
      border-radius: 50%;

      background-color: var(--folder-bg-color);
      transition: background-color .2s ease-in-out;
      cursor: pointer;

      svg {
        transition: opacity .2s ease-in-out;
        opacity: 0.6;
      }

      &:hover {
        background-color: rgba(#4d4d4d, 0.3);

        svg {
          opacity: 1;
        }
      }
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
