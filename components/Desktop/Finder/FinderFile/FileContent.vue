<script setup lang="ts">
import type {PageContent} from "~/types/Page";

const config = useRuntimeConfig()
defineProps<({
  content: PageContent | string | null
})>()

function imgSrc(src: string): string {
  return !src.includes(';base64') ? config.public.MEDIA_URL + src : src
}
</script>

<template>
  <div
    v-if="content && typeof content !== 'string'"
    class="article"
    :style="`background-image: url(${config.public.MEDIA_URL}/images/backgrounds/236_45fabric.png)`"
  >
    <div
      v-for="(block, i) in content.blocks"
      :key="block.id"
      class="article__block"
    >
      <NuxtImg
        v-if="block.img"
        :src="imgSrc(block.img)"
        :placeholder="[50, 25, 75, 5]"
        format="webp"
        class="cover"
        loading="lazy"
      />
      <h2 v-if="i === 0">{{ content.h1 }}</h2>
      <h3 v-if="block.title">{{ block.title }}</h3>
      <p v-for="p in block.p">{{ p }}</p>
      <div
        v-if="block.images?.length"
        class="images"
        :class="'images__col-' + block.images.length"
      >
        <NuxtImg
          v-for="img in block.images"
          :src="imgSrc(img)"
          :placeholder="[50, 25, 75, 5]"
          format="webp"
          loading="lazy"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.article {
  padding: 18px 32px 18px 18px;
  background-repeat: repeat;
  background-attachment: fixed;

  &__block {
    margin-bottom: 36px;
    &:last-of-type {
      margin-bottom: 0;
    }
  }

  h2 {
    font-size: 32px;
    font-weight: 600;
    margin-bottom: 16px;
    font-family: sans-serif;
    //text-align: center;
  }

  h3 {
    margin-bottom: 8px;
    font-size: 18px;
    font-weight: 600;
    font-family: sans-serif;
    line-height: 1.3;
  }
  img.cover {
    max-width: 360px;
    width: 100%;
    margin-top: 52px;
    padding: 0 24px 14px 0;
    float: left;
  }

  .images {
    margin-top: 24px;
    display: grid;
    grid-row-gap: 16px;
    grid-column-gap: 16px;
    grid-template-columns: repeat(3, minmax(auto, 1fr));
    clear: both;

    @for $i from 3 through 6 {
      &__col-#{$i} {
        grid-template-columns: repeat(#{$i}, minmax(auto, 1fr));
      }
    }

    img {
      width: 100%;
    }
  }

  p {
    margin-bottom: 14px;
  }
}
</style>
