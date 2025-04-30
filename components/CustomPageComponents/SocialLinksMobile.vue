<script setup lang="ts">
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
  <div>
    <div class="socials-mobile">
      <a
        v-for="item in blocks"
        :key="item.id"
        :href="item.link"
        target="_blank"
        rel="nofollow"
        class="socials-mobile-item"
      >
        <div class="icon-block">
          <div>
            <img :src="`/qr/${item.id}-2.svg`" :alt="`${item.name} Link`" />
          </div>
        </div>
        <span class="socials-mobile-item-title">{{ item.name }}</span>
      </a>
    </div>
  </div>
</template>

<style scoped lang="scss">
.socials-mobile {
  padding: 24px;

  display: grid;
  grid-row-gap: 24px;
  grid-column-gap: 24px;
  grid-template-columns: repeat(auto-fill, minmax(calc(25% - 24px), 1fr));

  &-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    position: relative;
    &-title {
      height: 20px;
      font-size: 14px;
      line-height: 1.2;
      text-align: center;
      color: #31322d;
      user-select: none;
    }
  }
}

.icon-block {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  min-width: 64px;
  margin-left: -3px;
  border: 2px solid #31322d;
  border-radius: 16px;
  background: #f5f5f5;
  box-shadow: 6px 6px 0 0 #31322d;
  padding-top: 100%;
  position: relative;
  &>div {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    padding: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

</style>
