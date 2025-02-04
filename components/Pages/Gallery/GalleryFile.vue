<script setup lang="ts">
import {Maximize2, Minimize2, Minus, Plus, X, ChevronLeft, ChevronRight} from "lucide-vue-next";
import {useGalleryStore} from "~/store/galleryStore";

const {$bus} = useNuxtApp()
const emit = defineEmits(['handleClose'])
const galleryStore = useGalleryStore()

const images = computed(() => galleryStore.images)
const model = defineModel()
const imageIndex = ref<number>(0)

const currentImage = computed(() => imageIndex.value !== null ? images.value[imageIndex.value] : null)
const location = computed(() => import.meta.client ? window.location.origin : null)


onMounted(() => setImageIndex())
watch(
  () => model.value,
  () => setImageIndex()
)

const isFullScreen = ref<boolean>(false)
const isHidden = ref<boolean>(false)
const cursorPointer = ref<boolean>(false)

$bus.$on('setFront', (flag: boolean) => cursorPointer.value = flag)

function setImageIndex() {
  imageIndex.value = images.value.findIndex(img => img.src === model.value)
}

function changeImageIndex(n: number) {
  imageIndex.value += n
  if (imageIndex.value < 0) imageIndex.value = images.value.length - 1
  if (imageIndex.value > images.value.length - 1) imageIndex.value = 0
}

function closeWindow(): void {
  emit("handleClose", true)
}

function hideWindow(): void {
  // isFullScreen.value = false
  // isHidden.value = !isHidden.value
}

function fullScreen(): void {
  // isHidden.value = false
  // isFullScreen.value = !isFullScreen.value
}

</script>

<template>
  <div
    v-if="currentImage"
    class="content-file"
    :class="{
      'content-file_full-screen': isFullScreen,
      'content-file_hidden': isHidden,
      'content-file_cursor-pointer': cursorPointer
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
      <h1 class="title">{{ currentImage.title }}</h1>
    </header>

    <section class="content-wrapper">
      <div class="main-frame">
        <div class="content">
          <img
            :src="`/images/${currentImage.src}`"
            alt=""
          >
        </div>
        <div class="controls">
          <button @click="changeImageIndex(-1)">
            <ChevronLeft />
          </button>
          <button @click="changeImageIndex(1)">
            <ChevronRight />
          </button>
        </div>


        <footer class="status-bar">
          {{ location }}/images/{{ currentImage.src }}
        </footer>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.content-file {
  //max-width: 1180px;
  //width: 1180px;
  //min-width: 360px;
  height: 90vh;
  min-height: 300px;
  margin: -40px -166px 0 16px;

  background-color: #f5f5f5;
  border: 3px solid #31322d;
  border-radius: 12px;
  box-shadow: 20px 20px 0 0 rgba(#31322d, .7);

  position: fixed;
  //top: 0;
  //right: 0;
  //bottom: 0;
  //left: 148px;

  z-index: 99;

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
  display: flex;
  justify-content: center;
  flex-grow: 1;
  padding: 8px 12px 0;
  overflow: auto;

  img {
    height: calc(90vh - 134px);
    border-radius: 8px;
  }
}

.controls {
  display: flex;
  justify-content: center;
  height: 40px;
  button {
    width: 36px;
    margin: 0 4px;
  }
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
