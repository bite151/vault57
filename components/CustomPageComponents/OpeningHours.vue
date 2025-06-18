<script setup lang="ts">
import type {Page} from "~/types/Page";
import {findPageByUrl, generateUrl, getPageParams} from "~/helpers/app.helpers";
import {useWindowsStore} from "~/store/windowsStore";

const windowsStore = useWindowsStore()
const { isMobile } = useDevice();

function launchApp(app: Page) {
  const url = generateUrl(app)
  const params = getPageParams(url)

  if (isMobile.value) {
    windowsStore.closeAllWindows()
  }

  windowsStore.setWindow(url, params)

  const windowId = windowsStore.openedWindows.find(item => item.fullUrl === url)!.windowId

  setTimeout(() => {
    windowsStore.setWindowToFront(windowId)
  }, 50)


  if (import.meta.browser) {
    window.history.pushState({}, '', url)
  }
}

function openForm() {
  const page = findPageByUrl('/contacts-info/feedback-form')
  if (!page) return

  launchApp(page)
}
</script>

<template>
  <section class="opening-hours">

    <header class="opening-hours-header">
      <p class="opening-hours-logo">
          Vault57
      </p>
      <p class="text">ретро компьютерный клуб</p>
    </header>

    <div class="opening-hours-content">
      <p class="opening-hours-title">График работы</p>

      <div>
        <p class="opening-hours-time">с 12:00 до 6:00</p>
        <p class="opening-hours-days">ежедневно</p>
        <p class="opening-hours-description">но только по предзаписи*</p>
      </div>
    </div>

    <footer class="opening-hours-footer">
      <p>Друзья!<br/>Мы работаем с индивидуальным подходом к каждому гостю, именно поэтому необходима</p>

      <a
        href="/contacts-info/feedback-form"
        class="feedback-button"
        @click.prevent="openForm"
      >
        предварительная запись
      </a>
    </footer>
  </section>
</template>

<style scoped lang="scss">
.opening-hours {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 48px;
  padding: 48px 24px;
  height: 100%;
  //background-color: #121212;

  p {
    //color: #a3ad9e;
  }

  &-header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .text {
      width: fit-content;
      font-family: PxPlusIBM, sans-serif;
      color: #9b9c98;
      font-size: 24px;
      text-shadow: 0 0 15px hsla(0,0%,100%,.2);
      user-select: none;
    }
  }

  &-logo {
    width: fit-content;
    color: #3e403b;
    font-family: PxPlusIBM, sans-serif;
    font-size: 80px;
    line-height: 56px;
    font-weight: 600;
    text-shadow: 0 0 15px hsla(0,0%,100%,.2);
    user-select: none;
  }

  &-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  &-title {
    margin-bottom: 40px;
    font-family: Play-Bold;
    font-size: 30px;
    color: #9b9c98;
  }

  &-time {
    margin-bottom: 8px;
    font-family: Play-Bold;
    font-size: 32px;
    text-align: center;
    color: #5a5c56;
  }

  &-days {
    margin-bottom:0px;
    font-family: Play-Bold;
    font-size: 31px;
    text-align: center;
    color: #5a5c56;
  }

  &-description {
    font-family: Play;
    font-size: 14px;
    text-align: center;
    color: #85857d;
  }

  &-footer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 12px;
    width: 348px;

    p {
      text-align: center;
      font-family: Play;
      font-size: 14px;
      color: #85857d;
      line-height: 1.4;
    }

    .feedback-button {
      padding: 12px 36px 14px;
      font-family: Play-Bold;
      color: #9b9c98;
      font-size: 18px;
      border: 1px solid #85857d;
      transition: .3s ease-in-out;

      &:hover {
        color: #5a5c56;
        border-color: #5a5c56;
      }
    }
  }
}
</style>
