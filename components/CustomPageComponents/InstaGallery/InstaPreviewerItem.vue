<script setup lang="ts">

import type {GalleryImage} from "~/types/Gallery";

defineProps<{ image: GalleryImage }>()
const config = useRuntimeConfig()
</script>

<template>
  <div class="previewer-item">
    <header class="item-header">
      <div class="avatar-wrapper">
        <nuxt-img
          :src="`${config.public.IMAGES_URL}/brand/insta-logo.jpg`"
          alt=""
          loading="lazy"
        />
      </div>
      <div>
        vault57
        <p>{{ image.title }}</p>
      </div>
    </header>
<!--    <nuxt-img-->
<!--      :src="config.public.IMAGES_URL + image.src"-->
<!--      :placeholder="[50, 25, 75, 5]"-->
<!--      class="item-img"-->
<!--      format="webp"-->
<!--      loading="lazy"-->
<!--      :alt="image.alt"-->
<!--    />-->
    <img
      :src="config.public.IMAGES_URL + image.src"
      class="item-img"
      :alt="image.alt"
    />
    <footer class="item-footer">
      <p class="item-description">
        <span>vault57</span>
        {{ image.alt }}
      </p>
      <p class="item-date">
        {{ image.date }}
      </p>
    </footer>
  </div>
</template>

<style scoped lang="scss">
.previewer-item{
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px 0;

  .item-header {
    padding: 0 12px;
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 600;
    .avatar-wrapper {
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 1px solid #ebebeb;
      }
    }

    p {
      margin-top: -2px;
      font-weight: normal;
      color: #838383;
      font-size: 13px;
    }
  }
  .item-img {
    width: 100%;
    padding: 0 4px;
  }
  .item-footer {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 0 12px;
  }
  .item-description {
    font-size: 14px;
    color: #656565;
    span {
      margin-right: 5px;
      font-weight: 600;
      color: #3e403b;
    }
  }
  .item-date {
    font-size: 12px;
    color: #838383;
  }
}
</style>
