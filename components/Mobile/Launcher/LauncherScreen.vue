<script setup lang="ts">
import {usePagesStore} from "~/store/pagesStore";
import AsyncIcon from "~/components/Common/AsyncIcon.vue";
import type {Page} from "~/types/Page";
import {findPageByUrl, generateUrl, getPageParams} from "~/helpers/app.helpers";
import {useWindowsStore} from "~/store/windowsStore";
import {usePWA} from "@/composables/usePWA";
import {useThemeColor} from "~/composables/useThemeColor";

const pagesStore = usePagesStore()
const windowsStore = useWindowsStore()
const mainScreenIcons = computed<Page[]>(() => pagesStore.pages.filter(page => page.mobile.showInLauncher))

const { installPWA, installPromptEvent, isInstalled } = usePWA();

function launchApp(app: Page) {
  const url = generateUrl(app)
  const params = getPageParams(url)

  windowsStore.closeAllWindows()
  windowsStore.setWindow(url, params)
  if (import.meta.browser) {
    window.history.pushState({}, '', url)
  }
}

function launchWidget(url: string) {
  const page = findPageByUrl(url)
  if (!page) return

  launchApp(page)
}
</script>

<template>
  <div class="launcher">
    <div class="launcher-item launcher-item-1">
      <div class="launcher-widget">
        <AsyncIcon
          name="Rocket"
          :size="42"
          :stroke-width="1.5"
        />
        <p class="widget-title">
          VAULT 57
        </p>
      </div>
    </div>
    <div
      class="launcher-item launcher-item-2"
      @click="launchWidget('/contacts/social-networks')"
    >
      <div class="launcher-widget">
        <AsyncIcon
          name="QrCode"
          :size="56"
          :stroke-width="1.2"
        />
        <p class="widget-title">
          Наши соцсети
        </p>
      </div>
      <div class="launcher-title">
        Title
      </div>
    </div>
    <div
      v-for="(item, n) in mainScreenIcons"
      :key="item.id"
      class="launcher-item"
      :class="`launcher-item-${n + 3}`"
      @click="launchApp(item)"
    >
      <div class="launcher-icon">
        <div>
          <AsyncIcon
            :name="item.mobile.icon || item.desktop.icon"
            :size="40"
            :stroke-width="1.5"
          />
        </div>
      </div>
      <div class="launcher-item-title">
        {{ item.mobile.shortTitle || item.mobile.title }}
      </div>
    </div>

    <div
      v-if="installPromptEvent && !isInstalled"
      class="launcher-item"
      @click="installPWA"
    >
      <div class="launcher-icon">
        <div>
          <AsyncIcon
            name="ArrowBigDownDash"
            :size="40"
            :stroke-width="1.5"
          />
        </div>
      </div>
      <div class="launcher-item-title">
        Установить
      </div>
    </div>

  </div>
</template>

<style scoped lang="scss">
  .launcher {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    //grid-template-rows: repeat(8, 130px);
    grid-column-gap: 24px;
    grid-row-gap: 18px;
    align-content: start;
    height: 100dvh;
    padding: 24px;
    overflow: auto;

    &-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      position: relative;
      &-title {
        height: 20px;
        font-size: 14px;
        color: #f5f5f5;
        line-height: 1.2;
        text-align: center;
        user-select: none;
      }
      &-1 {
        grid-area: 1 / 1 / 3 / 5;
        height: 124px;
        margin-bottom: 8px;
        .launcher-widget {
          flex-grow: 1;
        }
      }
      &-2 { grid-area: 3 / 3 / 5 / 5;
        .launcher-widget {
          flex-grow: 1;
        }
      }
      &-3 { grid-area: 3 / 1 / 4 / 2; }
      &-4 { grid-area: 3 / 2 / 4 / 3; }
      &-5 { grid-area: 4 / 1 / 5 / 2; }
      &-6 { grid-area: 4 / 2 / 5 / 3; }
      &-7 { grid-area: 5 / 1 / 6 / 2; }
      &-8 { grid-area: 5 / 2 / 6 / 3; }
      &-9 { grid-area: 5 / 3 / 6 / 4; }
      &-10 { grid-area: 5 / 4 / 6 / 5; }
      &-11 { grid-area: 6 / 1 / 7 / 2; }
      &-12 { grid-area: 6 / 2 / 7 / 3; }
      &-13 { grid-area: 6 / 3 / 7 / 4; }
      &-14 { grid-area: 6 / 4 / 7 / 5; }
      &-15 { grid-area: 7 / 1 / 8 / 2; }
      &-16 { grid-area: 7 / 2 / 8 / 3; }
      &-17 { grid-area: 7 / 3 / 8 / 4; }
      &-18 { grid-area: 7 / 4 / 8 / 5; }
      &-19 { grid-area: 8 / 1 / 9 / 2; }
      &-20 { grid-area: 8 / 2 / 9 / 3; }
      &-21 { grid-area: 8 / 3 / 9 / 4; }
      &-22 { grid-area: 8 / 4 / 9 / 5; }
    }

    &-icon {
      display: flex;
      align-items: center;
      justify-content: center;
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
        display: flex;
        justify-content: center;
        align-items: center;
      }

      &_full {
        width: 100%;
      }
    }

    &-widget {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-end;
      padding: 12px 16px;
      gap: 4px;

      width: 100%;
      margin-left: -3px;
      border: 2px solid #31322d;
      border-radius: 16px;
      background: #f5f5f5;
      box-shadow: 6px 6px 0 0 #31322d;

      .widget-title {
        margin-top: 4px;
        padding-top: 4px;
        border-top: 1px solid #31322d;
        font-family: Play-Bold, sans-serif;
        font-size: 18px;
        user-select: none;
      }
    }
  }
</style>
