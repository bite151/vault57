<script setup lang="ts">

import AsyncIcon from "~/components/Common/AsyncIcon.vue";

const blocks = [
  {
    id: 'tg',
    name: 'Telegram',
    link: 'https://t.me/+BpqDSb_NCVAyZjgy'
  },
  {
    id: 'vk',
    name: 'VK',
    link: 'https://vk.com/vault57'
  },
  {
    id: 'insta',
    name: 'Instagram',
    link: 'https://www.instagram.com/vault57club'
  }
]
</script>

<template>
  <div class="qr-codes-desktop">
    <div
      v-for="item in blocks"
      :key="item.id"
      class="qr-block"
    >
      <img :src="`/qr/${item.id}-qr.svg`" :alt="`${item.name} QR Code`" />
      <a
        class="qr-name"
        :class="`qr-${item.id}`"
        :href="item.link"
        target="_blank"
        rel="nofollow"
      >
        <span>{{ item.name }}</span>
        <AsyncIcon
          name="ExternalLink"
          color="#bebfb8"
          :size="16"
          :stroke-width="2"
        />
      </a>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .qr-codes-desktop {
    display: flex;
    gap: 24px;
    height: 100%;
    padding: 56px;
    background-color: #31322d;
  }

  .qr {
    &-block {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      min-width: 160px;
    }

    &-name {
      display: flex;
      gap: 8px;
      padding-left: 24px;
      align-items: center;
      width: fit-content;
      text-align: center;
      color: #bebfb8;
      transition: color .3s ease-in-out;
      svg {
        opacity: 0.3;
        //visibility: hidden;
        transition: .3s ease-in-out;
      }

      &:hover {
        svg {
          opacity: 1;
          //visibility: visible;
        }
        &.qr-vk {
          svg {
            stroke: #0077FF;
          }
          color: #0077FF;
        }
        &.qr-tg {
          svg {
            stroke: #24A1DE;
          }
          color: #24A1DE;
        }
        &.qr-insta {
          svg {
            stroke: #e1306c;
          }
          color: #e1306c;
        }
      }
      &:hover span {
        text-decoration: underline;
      }
    }
  }
</style>
