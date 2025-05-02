<script setup lang="ts">
import {useGalleryStore} from "~/store/galleryStore";
import EmptyFolder from "~/components/Desktop/Finder/FinderFolder/EmptyFolder.vue";
import type {GalleryImage} from "~/types/Gallery";

interface Images { images: Ref<GalleryImage[]> }

const GalleryFile = defineAsyncComponent(() => import("~/components/CustomPageComponents/Gallery/GalleryFile.vue"))

const config = useRuntimeConfig()
const galleryStore = useGalleryStore()
const { images }: Images = storeToRefs(galleryStore);

const previewer = ref<string | null>(null)

function openPreviewer(image: GalleryImage) {
  previewer.value = image.src
}
</script>

<template>
  <div class="content">
    <EmptyFolder v-if="!images.length">
      Папка пуста
    </EmptyFolder>

    <div class="files" v-else>
      <div
        class="file"
        v-for="image in images"
        :key="image.id"
        @click.stop="openPreviewer(image)"
      >
        <div class="img-wrapper">
          <NuxtImg
            :src="config.public.IMAGES_URL + image.src"
            format="webp"
            :placeholder="[50, 25, 75, 5]"
            loading="lazy"
          />
        </div>
        <p>{{ image.title }}</p>
      </div>
    </div>
  </div>

  <ClientOnly>
    <Teleport to="#main-content-teleport">
      <GalleryFile
        v-if="previewer"
        v-model="previewer"
        @handle-close="() => previewer = null"
      />
    </Teleport>
  </ClientOnly>
</template>

<style scoped lang="scss">
.content {
  padding: 18px;
  flex-grow: 1;
}

.files {
  display: grid;
  grid-row-gap: 32px;
  grid-column-gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(148px, 1fr));
}

.file {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  .img-wrapper {
    height: 120px;
    width: 100%;
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
