<script setup lang="ts">
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import type { MenuItem, Page } from "~/types/Page";

const { folderItem } = defineProps<{
  folderItem: Page
  menuPosition: { top: number; left: number }
  menuItems: MenuItem[]
}>()

const emit = defineEmits(['onClose'])

const contextMenu = ref(null)
onClickOutside(contextMenu, event => emit('onClose'))
function action({ action }: MenuItem) {
  emit('onClose')
  return action(folderItem)
}
</script>

<template>
  <ClientOnly>
    <Teleport to="body">
      <div
        ref="contextMenu"
        class="context-menu"
        :style="`top:${menuPosition.top - 8}px; left:${menuPosition.left - 4}px;`"
      >
        <button
          v-for="item in menuItems"
          class="menu-item"
          @click="action(item)"
        >
          {{ item.title }}
        </button>
      </div>
    </Teleport>
  </ClientOnly>
</template>

<style scoped lang="scss">
.context-menu {
  position: fixed;
  //width:100px;
  //height:100px;
  padding: 4px 0;
  background: #fcfcfc;
  border-radius: 6px;
  border: 2px solid #a2a2a2;
  box-shadow: 6px 6px 0 0 rgba(0, 0, 0, 0.15);

  z-index: 1000;
}

.menu-item {
  display: flex;
  flex-grow: 1;
  width: 100%;
  align-items: center;
  gap: 8px;
  padding: 6px 16px;
  font-size: 15px;
  color: var(--folder-navigation-color);
  border-radius: 2px;
  transition: background-color 0.2s;

  white-space: nowrap;

  svg {
    stroke: var(--folder-navigation-color);
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
}
</style>
