<script setup lang="ts">
import type {PageContent} from "~/types/Page";

const config = useRuntimeConfig()
defineProps<({
  content: PageContent | null
})>()
</script>

<template>
  <div
    v-if="content"
    class="article"
    :style="`background-image: url(${config.public.MEDIA_URL}/images/backgrounds/236_45fabric.png)`"
  >
    <div
      v-for="(block, i) in content.blocks"
      :key="block.id"
      class="article__block"
    >
      <img
        v-if="block.img"
        :src="config.public.MEDIA_URL + block.img"
        class="cover"
        alt=""
      />
      <h1 v-if="i === 0">{{ content.h1 }}</h1>
      <h2 v-if="block.title">{{ block.title }}</h2>
      <p v-for="p in block.p">{{ p }}</p>
      <div
        v-if="block.images?.length"
        class="images"
        :class="'images__col-' + block.images.length"
      >
        <img
          v-for="img in block.images"
          :src="config.public.MEDIA_URL + img"
          alt=""
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

  h1 {
    font-size: 32px;
    font-weight: 600;
    margin-bottom: 16px;
    font-family: sans-serif;
    //text-align: center;
  }

  h2 {
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
  }

  p {
    margin-bottom: 14px;
  }
}
</style>
