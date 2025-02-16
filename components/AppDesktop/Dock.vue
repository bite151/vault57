<script setup lang="ts">
import {useWindowsStore} from "~/store/windowsStore";
import AsyncIcon from "~/components/common/AsyncIcon.vue";

const windowsStore = useWindowsStore()
const hiddenWindows = computed(() => {
  return windowsStore.openedWindows
    .filter(window => window.isHidden)
    .sort((a, b) => a.hiddenAt! - b.hiddenAt!)
})

function showWindow(windowId: number): void {
  windowsStore.updateWindowParams({
    windowId,
    isHidden: false
  })
  windowsStore.setWindowToFront(windowId)
}
</script>

<template>
<div
  v-if="hiddenWindows.length"
  class="dock"
>
  <div
    v-for="item in hiddenWindows"
    :key="item.id"
    class="dock-item"
    @click="showWindow(item.windowId)"
  >
    <AsyncIcon
      :name="item.icon ? item.icon : 'Folder'"
      :stroke-width="1.4"
      :size="34"
    />
    <p>{{ item.title }}</p>
  </div>
</div>
</template>

<style scoped lang="scss">
.dock {
  position: fixed;
  max-height: 88px;
  max-width: calc(100% - 200px);
  bottom: 24px;
  padding: 8px;
  margin: auto;
  display: flex;
  flex-direction: row;
  gap: 8px;
  border-radius: 20px;
  background-color: rgba(0, 0, 0, 0.2);

  overflow: auto;
  z-index: 0;
}

.dock-item {
  display: flex;
  //justify-content: left;
  align-items: center;
  justify-content: center;
  gap: 10px;
  height: 58px;
  max-width: 180px;
  padding: 8px 16px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 16px;
  background-color: rgba(255, 255, 255, 0.4);

  transition: background-color 0.2s ease-in-out, transform 0.3s ease-in-out, margin 0.3s ease-in-out;
  cursor: pointer;

  svg {
    flex-shrink: 0;
  }
  p {
    font-size: 16px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  &:hover {
    margin-left: 3px;
    margin-right: 3px;
    transform: scale(1.07) translateY(-3px);
    background-color: rgba(255, 255, 255, 0.5);
  }
}
</style>
