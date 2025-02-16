<script setup lang="ts">
import { useWindowsStore } from "~/store/windowsStore";
import AppFolder from "~/components/AppFolder/AppFolder.vue";
import AppFile from "~/components/AppFile/AppFile.vue";

const windowsStore = useWindowsStore()
const openedWindows = computed(() => windowsStore.openedWindows.filter(window => !window.isHidden))
const loaded = computed(() => windowsStore.isLoaded)
</script>

<template>
  <component
    class="window-component"
    :class="{'window-component_visible': loaded}"
    v-for="window in openedWindows"
    :is="!window.routeParams?.file ? AppFolder : AppFile"
    :key="window.windowId"
    :current-window="window"
  />
</template>

<style scoped lang="scss">
.window-component {
  transform: translateY(100vh) scale(.5);
  opacity: 0;
  visibility: hidden;

  &_visible {
    transform: translateY(0) scale(1);
    opacity: 1;
    visibility: visible;
  }
}
</style>
