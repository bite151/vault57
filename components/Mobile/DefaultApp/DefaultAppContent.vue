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
  >
    <h2>{{ content.h1 }}</h2>
    <div
      v-for="(block) in content.blocks"
      :key="block.id"
      class="article__block"
    >
      <NuxtImg
        v-if="block.img"
        :src="config.public.MEDIA_URL + block.img"
        :placeholder="[50, 25, 75, 5]"
        format="webp"
        class="cover"
        loading="lazy"
      />
      <h3 v-if="block.title">{{ block.title }}</h3>
      <p v-for="p in block.p">{{ p }}</p>
      <div
        v-if="block.images?.length"
        class="images"
        :class="'images__col-' + block.images.length"
      >
        <NuxtImg
          v-for="img in block.images"
          :src="config.public.MEDIA_URL + img"
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
  padding: 0 24px;


  &__block {
    margin-bottom: 24px;
    &:last-of-type {
      margin-bottom: 48px;
    }
  }

  h2 {
    padding: 0;
    font-size: 16px;
  }

  h3 {
    margin-bottom: 8px;
    font-size: 16px;
    font-weight: 600;
    font-family: sans-serif;
    line-height: 1.3;
  }
  img.cover {
    width: 100%;
    margin: 24px 0;
    border-radius: 24px;
  }

  .images {
    margin-top: 16px;
    display: flex;
    flex-wrap: nowrap;
    gap: 24px;
    padding-right: 24px;
    width: calc(100% + 48px);
    margin-left: -24px;
    overflow: auto;

    img {
      &:first-of-type {
        margin-left: 24px;
      }
      width: 55vw;
      border-radius: 16px;
    }
  }

  p {
    margin-bottom: 8px;
    font-size: 14px;
  }
}
</style>
