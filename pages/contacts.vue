<script setup lang="ts">
import AsyncIcon from "~/components/Common/AsyncIcon.vue";
import {useMetaTags} from "~/composables/useMetaTags";

const { setMetaTags } = useMetaTags()
setMetaTags(
  {
    title: "Контакты в Орле | Запись на экскурсии и турниры",
    description: "Как нас найти в Орле: адрес, телефон, график работы. Vault57 – ретро-клуб с играми 90-х/2000-х, турнирами и VHS-вечерами",
  },
  '/contacts'
)

const { isMobile } = useDevice()

const Component = computed(() => isMobile.value
  ? defineAsyncComponent(() => import("~/components/CustomPageComponents/SocialLinksMobile.vue"))
  : defineAsyncComponent(() => import("~/components/CustomPageComponents/QrCodesDesktop.vue"))
)
</script>

<template>
  <section class="contacts-page">
    <div
      class="home-link-container"
      :class="{'home-link-container_mobile': isMobile}"
    >
      <a href="/desktop">
        <AsyncIcon name="Home" :size="18" :stroke-width="1.8" color="#a3ad9e"/>
        Web сайт
      </a>
    </div>

    <header class="contacts-page-header">
      <h1>
        <a href="/desktop">
          Vault57
        </a>
      </h1>
      <p class="text">ретро компьютерный клуб</p>
    </header>

    <component
      :is="Component"
      :class="`${isMobile ? 'social-links' : 'qr-codes'}`"
    />

    <div class="address">
      <p class="text">Орёл, ул. Московская, 17</p>
    </div>
  </section>
</template>

<style scoped lang="scss">

.contacts-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8dvh;
  padding: 48px;
  min-height: 100dvh;
  background-color: #121212;

  &-header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h1 a {
      width: fit-content;
      color: #a3ad9e;
      font-family: PxPlusIBM, sans-serif;
      font-size: 80px;
      line-height: 80px;
      font-weight: 600;
      text-shadow: 0 0 15px hsla(0,0%,100%,.2);
      user-select: none;
    }
  }

  .text {
    width: fit-content;
    font-family: PxPlusIBM, sans-serif;
    color: #a3ad9e;
    font-size: 24px;
    text-shadow: 0 0 15px hsla(0,0%,100%,.2);
    user-select: none;
  }
  .address {
    .text {
      font-size: 22px;
      white-space: nowrap;
    }
  }
}

.home-link-container {
  max-width: 640px;
  width: 100%;

  &_mobile {
    width: 100%;
    max-width: 308px;
    min-width: 260px;
    margin-top: -36px;
    //margin-bottom: 0px;
  }

  a {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #bebfb8;
    opacity: .4;
    transition: opacity 0.3s;
    &:hover {
      opacity: 1;
    }
  }
}
.qr-codes {
  height: auto !important;
  max-width: 680px !important;
  padding: 0 !important;
  background-color: #121212 !important;
}

.social-links {
  width: 100%;
  max-width: 360px;
  min-width: 260px;
  margin: 36px 0;
  &:deep(.socials-mobile) {
    display: flex;
    justify-content: center;
    gap: 10%;
    padding: 0;
  }
  &:deep(.icon-block) {
    width: 100%;
    margin-bottom: 4px;
    background-color: #bebfb8;
  }
  &:deep(.socials-mobile-item) {
    width: 33%;
    max-width: 80px;
  }
  &:deep(.socials-mobile-item-title) {
    color: #bebfb8;
  }
}


//@media screen and (max-width: 768px) {
//  .contacts-page {
//    h1 a {
//      font-size: 68px;
//      line-height: 68px;
//    }
//    .text {
//      font-size: 20px;
//    }
//    .address {
//      .text {
//        font-size: 16px;
//      }
//    }
//  }
//}
//
//@media screen and (min-width: 1180px) {
//  .contacts-page {
//    h1 a {
//      font-size: 84px;
//      line-height: 72px;
//    }
//    .text {
//      font-size: 25px;
//    }
//    .address {
//      .text {
//        font-size: 20px;
//      }
//    }
//  }
//}
</style>
