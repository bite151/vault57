<script setup lang="ts">
import {Maximize2, Minimize2, Minus, Plus, X} from "lucide-vue-next";
import {usePagesStore} from "~/store/pagesStore";

const route = useRoute()
const router = useRouter()
const { $bus } = useNuxtApp()
const pagesStore = usePagesStore()

const isFullScreen = ref<boolean>(false)
const isHidden = ref<boolean>(false)

const pages = computed(() => pagesStore.pages);
const currentPage = computed(() => pages.value.find(page => {
  return page.url.replace('/file', '') === '/' + route.path.split('/').pop()
}));

watch(
  () => route.fullPath,
  () => isHidden.value = false
)

function closeWindow(): void {
  const routesArr = route.path.replace('/file', '').split('/')
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

function isCursorPointer(): boolean {
  // const el = document.querySelector('.content-folder')
  // console.log(el)
  //
  // return false
}

watch(
  () => document.querySelector('.content-folder')?.classList,
  () => {
    console.log('aaaaaaa')
  },
  { root: true }
)

</script>

<template>
  <div
    class="content-file"
    :class="{
      'content-file_full-screen': isFullScreen,
      'content-file_hidden': isHidden,
      'content-file_cursor-pointer': isCursorPointer(),
    }"
    @click="() => $bus.$emit('resetFront', false)"
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
        <div class="content">
          <p>[content file component]</p>
          <pre>{{ route.params }}</pre>
          <pre>{{ currentPage }}</pre>
          <slot></slot>
        </div>

        <footer class="status-bar">
          {{ route.fullPath.replace('/file', '') }}
        </footer>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.content-file {
  max-width: 1180px;
  width: 1180px;
  min-width: 360px;
  height: 90vh;
  min-height: 300px;
  margin: -40px -166px 0 16px;

  background-color: #f5f5f5;
  border: 3px solid #31322d;
  border-radius: 12px;
  box-shadow: 20px 20px 0 0 rgba(#31322d, .7);

  position: fixed;

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
    bottom: 16px;
    left: 88px;
    width: 200px;
    height: 46px;
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
  padding: 10px 12px 10px 84px;
  border-bottom: 3px solid #31322d;
  border-radius: 8px 8px 0 0;
  background: #bebfb8;

  user-select: none;

  //cursor: move;

  .title {
    font-weight: 600;
    color: #31322d;
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

      background-color: #f5f5f5;
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
      //&:first-of-type {
      //  background-color: #4d4d4d;
      //}
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
  padding: 18px;
  flex-grow: 1;
  overflow: auto;
}
.status-bar {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  height: 36px;
  padding: 0 18px;
  border-top: 3px solid #31322d;

  font-weight: 600;
  color: #31322d;
}
</style>
