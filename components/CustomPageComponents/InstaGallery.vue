<script setup lang="ts">
import {useGalleryStore} from "~/store/galleryStore";
import type {GalleryImage} from "~/types/Gallery";

const InstaPreviewer = defineAsyncComponent(() => import('~/components/CustomPageComponents/InstaGallery/InstaPreviewer.vue'));

interface Images { images: Ref<GalleryImage[]> }

const config = useRuntimeConfig()
const galleryStore = useGalleryStore()
const { images }: Images = storeToRefs(galleryStore);

const previewer = ref<number | null>(null)

function openPreviewer(imageId: number) {
  previewer.value = imageId
}

onMounted(async () => {
  if (!images.value.length) {
    await galleryStore.fetchImages()
  }
})
</script>

<template>
  <div class="insta-gallery">
    <header class="header">
      <div class="header-avatar-wrapper">
        <nuxt-img
          :src="`${config.public.IMAGES_URL}/brand/insta-logo.jpg`"
          alt=""
          loading="lazy"
        />
      </div>
      <div class="header-content">
        <p class="title">vault57club</p>
        <p class="count"><span>{{ images.length }}</span> публикаций</p>
        <p class="description">VAULT57 | РЕТРО КЛУБ | ОРЁЛ</p>
      </div>
    </header>

    <div class="images">
      <div
        class="image-wrapper"
        v-for="image in images"
        :key="image.id"
        @click="openPreviewer(image.id)"
      >
        <NuxtImg
          :src="config.public.IMAGES_URL + image.src"
          :placeholder="[50, 25, 75, 5]"
          format="webp"
          loading="lazy"
        />
      </div>
    </div>

    <transition
      enter-active-class="animate__animated animate__zoomIn animate__faster"
      leave-active-class="animate__animated animate__zoomOut animate__fast"
    >
      <InstaPreviewer
        v-if="previewer"
        :current-image="previewer"
        @close="previewer = null"
      />
    </transition>
  </div>
</template>

<style scoped lang="scss">
.insta-gallery {
  background-color: #ffffff !important;
}
.header {
  display: flex;
  padding: 24px;
  gap: 24px;
  &-avatar-wrapper {
    width: 120px;
    height: 120px;
    img {
      width: 100%;
      border-radius: 50%;
      border: 1px solid #ebebeb;
    }
  }
  &-content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 8px;

    .title {
      font-size: 20px;
    }

    .description {
      font-weight: 600;
      font-size: 14px;
    }

    .count {
      color: #8c8c8c;
      font-size: 15px;
      span{
        margin-right: 3px;
        font-size: 16px;
        font-weight: 600;
        color: #3e403b;
      }
    }
  }
}

.images {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  padding: 0 2px;
}

.image-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  aspect-ratio: 1 / 1;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
}

.animate__faster {
  --animate-duration: 0.4s;
  --animate-delay: 0.2s;
}
</style>
