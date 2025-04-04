<script setup lang="ts">

import DefaultAppMenu from "~/components/Mobile/DefaultApp/DefaultAppMenu.vue";
import DefaultAppScreen from "~/components/Mobile/DefaultApp/DefaultAppScreen.vue";
import {useWindowsStore} from "~/store/windowsStore";
import type {PageWindow} from "~/types/Window";
import {useAppStatesStore} from "~/store/appStatesStore";

const windowsStore = useWindowsStore()
const screens = computed<PageWindow[]>(() => windowsStore.openedWindows)
const currentScreenBackground = computed<string | undefined>(() => windowsStore.currentScreen?.mobile.background)

const appStatesStore = useAppStatesStore()
const { isMobileMenuOpened } = storeToRefs(appStatesStore);

const windowIndex = ref<number | null>(null)
</script>

<template>
  <div
    v-if="screens.length > 0"
    class="default-app"
    :class="{'default-app_menu' : isMobileMenuOpened}"
    :style="`background: ${ currentScreenBackground || '#dededc' }`"
  >

    <DefaultAppScreen
      v-for="(screen, n) in screens"
      :key="screen.windowId"
      :screen="screen"
      :isMenuOpened="isMobileMenuOpened"
      class="app-screen"
      :class="{'app-screen_hide-animate': windowIndex !== null && n > windowIndex }"
      @show-menu="(flag) => isMobileMenuOpened = flag"
      @select-window="(index) => windowIndex = index"
    />

    <Transition
      enter-active-class="animate__animated animate__fadeInLeft animate__faster"
      leave-active-class="animate__animated animate__fadeOutLeft animate__faster"
    >
      <DefaultAppMenu
        v-if="isMobileMenuOpened"
        @show-menu="(flag) => isMobileMenuOpened = flag"
        @select-window="(index) => windowIndex = index"
      />
    </Transition>
  </div>

</template>

<style scoped lang="scss">
.default-app {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;

  background: #dededc;
  transition: background-color .3s ease-in-out;
  z-index: 99;

  .app-screen_hide-animate {
    transform: translateX(100%) scale(.93);
  }

  &_menu {
    background: #3e403b !important;
    .app-screen {
      width: 100vw;
      border-radius: 36px;
      box-shadow: 10px 0 30px 0 rgba(0, 0, 0, 0.7);
      overflow: hidden;
      &_hide-animate {
        transform: translateX(100%) scale(.93);
      }
      &:nth-last-of-type(3) {
        transform: translateX(35%) translateY(4%) scale(0.55);
      }
      &:nth-last-of-type(2) {
        transform: translateX(51.5%) translateY(2%) scale(0.78);
        &.app-screen_hide-animate {
          transform: translateX(100%) translateY(2%) scale(0.78);
        }
      }
      &:nth-last-of-type(1) {
        transform: translateX(67%) scale(.93);
        &.app-screen_hide-animate {
          transform: translateX(100%) scale(.93);
        }
      }
      &:nth-last-of-type(n+4) {
        display: none;
      }
    }
  }
}
</style>
