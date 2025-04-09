<script setup lang="ts">
import {usePagesStore} from "~/store/pagesStore";
import AsyncIcon from "~/components/Common/AsyncIcon.vue";

const emit = defineEmits(['onClose'])
const pagesStore = usePagesStore()
const tabTitle = computed<string>(() => {
  if (pagesStore.editedPage?.desktop.title) {
    return pagesStore.editedPage.desktop.title
  }
  return  pagesStore.editedPage!.type === 'file' ? 'Новый документ' : 'Новая папка'
})
const tabIcon = computed<string>(() => {
  if (pagesStore.editedPage?.desktop.icon) {
    return pagesStore.editedPage.desktop.icon
  }
  return  pagesStore.editedPage!.type === 'file' ? 'File' : 'Folder'
})
</script>

<template>
  <div
    class="tabs-panel"
  >
    <div
      class="tabs-panel__button"
    >
      <AsyncIcon
        :name="tabIcon"
        :size="15"
        :stroke-width="1.8"
      />
      {{ tabTitle }}

      <button
        class="tabs-panel__button-close"
        @click="emit('onClose')"
      >
        <AsyncIcon
          name="X"
          :size="12"
          :stroke-width="1.8"
        />
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.tabs-panel {
  display: flex;
  gap: 8px;
  padding: 4px 8px 0;
  height: 38px;
  background-color: #e8e9e1;
  border-top: 1px solid #f5f5f5;
  overflow: auto;

  &__button {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0 8px 0 10px;
    background-color: #eeeeee;
    border: 1px solid #d3d1d1;
    border-bottom: none;
    border-radius: 4px 4px 0 0;
    font-weight: 300;
    font-size: 13px;
    white-space: nowrap;
    cursor: pointer;
    transition: background-color .2s ease-in-out;

    &:hover {
      //background-color: #e3e1e1;
    }
    &_active {
      background-color: #c0c2be !important;
      border-color: #c0c2be;
    }

    &-close {
      display: flex;
      align-items: center;
      padding: 1px;
      border-radius: 2px;
      transition: background-color .2s ease-in-out;
      &:hover {
        background: #d3d1d1;
      }

    }
  }
}
</style>
