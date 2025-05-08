<script setup lang="ts">

import HlsPlayer from "~/components/Common/HlsPlayer.vue";

const { isMobile } = useDevice()
const style = computed(() => {
  return isMobile.value ? [{ height: '100dvh !important', marginTop: '-60px'}] : []
})

</script>

<template>
  <div class="promo-video-wrapper" :style="style">
    <div
      class="promo-video"
      :class="{'promo-video_mobile': isMobile}"
    >
      <HlsPlayer
        src="https://vault57.ru/uploads/videos/promo/promo.m3u8"
        poster-url="/preview.jpg"
        :autoplay="true"
        :muted="true"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.promo-video-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  height: 100%;
  background-color: #444441;
}
.promo-video {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  width: 424px;
  height: 100%;
  //margin: 0 auto;

  &_mobile {
    width: 100%;
    max-width: 100%;
    position: relative;

    &:deep(.hls-player-container) {
      width: 100%;
    }

    &:deep(.video-embed) {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &:deep(.hls-player-loading svg) {
      stroke: #3e403b
    }
  }
}
</style>
