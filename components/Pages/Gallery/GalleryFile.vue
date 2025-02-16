<script setup lang="ts">
import {X, ChevronLeft, ChevronRight} from "lucide-vue-next";
import {useGalleryStore} from "~/store/galleryStore";
import {ref} from "vue";
import FinderHeader from "~/components/common/Finder/FinderHeader.vue";

const { $bus } = useNuxtApp()
const emit = defineEmits(['handleClose'])
const galleryStore = useGalleryStore()

const images = computed(() => galleryStore.images)
const model = defineModel()
const imageIndex = ref<number>(0)

const currentImage = computed(() => imageIndex.value !== null ? images.value[imageIndex.value] : null)
const location = computed(() => import.meta.client ? window.location.origin : null)

const isFullScreen = ref<boolean>(false)
const isHidden = ref<boolean>(false)
const cursorPointer = ref<boolean>(false)

const imageWindow = ref(null)
provide('parentElement', imageWindow);

onMounted(() => {
  setImageIndex()
})

watch(
  () => model.value,
  () => setImageIndex()
)

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

</script>

<template>
  <div
    v-if="currentImage"
    ref="imageWindow"
    class="content-file"
    :class="{
      'content-file_full-screen': isFullScreen,
      'content-file_hidden': isHidden,
      'content-file_cursor-pointer': cursorPointer
    }"
    @click="() => { $bus.$emit('resetFront', false); cursorPointer = false }"
  >
    <FinderHeader
      :moveable="true"
      :buttons="[{
        icon: 'X',
        action: closeWindow
      }]"
    >
      {{ currentImage.title }}
    </FinderHeader>
<!--
    <header class="title-bar">
      <div class="title-bar__buttons">
        <div class="buttons__button" @click="closeWindow">
          <X :size="8" :strokeWidth="5" color="#31322d"/>
        </div>
      </div>
      <h1 class="title">{{ currentImage.title }}</h1>
    </header>
-->
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
<!--
        <footer class="status-bar">
          {{ location }}/images/{{ currentImage.src }}
        </footer>
-->
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.content-file {
  height: 90vh;
  min-height: 300px;
  margin: -40px -166px 0 16px;

  background-color: var(--folder-bg-color);
  border: 3px solid var(--folder-border-color);
  border-radius: 12px;
  box-shadow: 20px 20px 0 0 var(--folder-shadow-color);

  position: fixed;

  z-index: 999;

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
}

.content {
  display: flex;
  justify-content: center;
  flex-grow: 1;
  //padding: 8px 12px 0;
  overflow: auto;

  img {
    height: calc(90vh - 98px);
    //border-radius: 8px;
  }
}

.controls {
  display: flex;
  justify-content: center;
  height: 48px;
  button {
    width: 36px;
    margin: 0 12px;
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
