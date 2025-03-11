<script setup lang="ts">

import {useGalleryStore} from "~/store/galleryStore";
import AsyncIcon from "~/components/Common/AsyncIcon.vue";
import InstaPreviewerItem from "~/components/CustomPageComponents/InstaGallery/InstaPreviewerItem.vue";
import type {GalleryImage} from "~/types/Gallery";

const emits = defineEmits(['close'])
const { currentImage } = defineProps<{
  currentImage: number
}>()

interface Images { images: Ref<GalleryImage[]> }

const galleryStore = useGalleryStore()
const { images }: Images = storeToRefs(galleryStore)
const containerEl = ref<HTMLElement | null>(null)

onMounted(() => {
  scrollToImage(currentImage)
})

function scrollToImage(id: number) {
  const index = images.value.findIndex(i => i.id === id)

  nextTick(() => {
    const items = containerEl.value?.querySelectorAll('.insta-item')
    if (items && items[index]) {
      items[index].scrollIntoView({ block: 'start' })
    }
  })
}
</script>

<template>
  <div class="previewer">
    <header class="previewer-header">
      <button @click="emits('close')">
        <AsyncIcon
          name="ChevronLeft"
          :size="32"
          :stroke-width="1.7"
        />
      </button>
      <div class="previewer-header__content">
        <p class="title">VAULT57</p>
        <p class="description">Публикации</p>
      </div>
    </header>

    <div
      class="previewer-content"
      ref="containerEl"
    >
      <InstaPreviewerItem
        v-for="image in images"
        :image="image"
        :key="image.id"
        class="insta-item"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">

.previewer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #fff;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;

  &-header {
    display: flex;
    position: sticky;
    top: 0;
    height: 60px;
    max-width: 480px;
    width: 100%;
    border-bottom: 1px solid #ebebeb;

    button {
      width: 48px;
    }

    &__content {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding-right: 48px;

      .title {
        font-weight: 600;
        font-size: 13px;
        color: #838383;
      }

      .description {
        font-weight: 600;
        font-size: 16px;
      }
    }
  }

  &-content {
    max-width: 480px;
    width: 100%;
    height: calc(100dvh - 60px);

    display: flex;
    flex-direction: column;
    gap: 8px;

    overflow: auto;
  }
}

</style>
