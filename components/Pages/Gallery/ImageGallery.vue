<script setup lang="ts">
import EmptyFolder from "~/components/AppFolder/EmptyFolder.vue";
import {useGalleryStore} from "~/store/galleryStore";
import GalleryFile from "~/components/Pages/Gallery/GalleryFile.vue";

const galleryStore = useGalleryStore()

const images = computed(() => galleryStore.images)
const previewer = ref<string | null>(null)
</script>

<template>
  <EmptyFolder v-if="!images.length">
    Папка пуста
  </EmptyFolder>

  <div class="files" v-else>
    <div class="file"
      v-for="image in images"
      :key="image.id"
      @click="previewer = image.src"
    >
      <div class="img-wrapper">
        <img :src="`/images/${image.src}`" alt="">
      </div>
      <p>{{ image.title }}</p>
    </div>
  </div>

  <ClientOnly>
    <Teleport to="#main-content">
      <GalleryFile
        v-if="previewer"
        v-model="previewer"
        @handle-close="() => previewer = null"
      />
    </Teleport>
  </ClientOnly>
</template>

<style scoped lang="scss">
.files {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
}

.file {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: calc((100% - 80px) / 5);
  min-width: 170px;
  margin-bottom: 12px;


  .img-wrapper {
    height: 100px;
    width: 80%;
    margin-bottom: 4px;
    cursor: pointer;
  }

  img {
    width: 100%;
    height: 100%;
    padding: 3px;
    border-radius: 8px;
    object-fit: cover;
    background-position: center;
    transition: background-color .2s ease-in-out, border-color .2s ease-in-out;
    filter: grayscale(100%);
  }

  p {
    padding: 2px 6px;
    border-radius: 4px;
    border: 1px solid transparent;
    text-align: center;
    line-height: 1.3;
    color: #31322d;
    cursor: pointer;
    transition: color .2s ease-in-out, background-color .2s ease-in-out, border-color .2s ease-in-out;
  }

  &:hover, &_active {
    p {
      border-color: #e4e5e3;
      background-color: #e4e5e3;
    }

    img {
      border-color: #e4e5e3;
      background-color: #e4e5e3;
    }
  }

  &_active {
    p, svg {
      border: 1px dotted #aaa !important;
    }
  }
}
</style>
