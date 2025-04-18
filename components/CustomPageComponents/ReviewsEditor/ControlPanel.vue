<script setup lang="ts">
import AsyncIcon from "~/components/Common/AsyncIcon.vue";

const emits = defineEmits(['onSave'])
</script>

<template>
<div class="control-panel">
  <button
    class="control-panel__button"
    @click="emits('onSave')"
  >
    <AsyncIcon
      name="Save"
      :size="18"
      :stroke-width="1.8"
    />
    Сохранить
  </button>
</div>
</template>

<style scoped lang="scss">
.control-panel {
  display: flex;
  gap: 8px;
  padding: 8px;
  height: 48px;
  margin-top: -1px;
  background-color: #eee;
  border-top: 1px solid #d3d1d1;
  border-bottom: 1px solid #f5f5f5;
  &__button {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 4px 10px;
    background-color: #f5f5f5;
    border: 1px solid #aaa;
    border-radius: 4px;
    font-weight: 300;
    font-size: 14px;
    white-space: nowrap;
    transition: background-color .2s ease-in-out;

    &:hover {
      background-color: #d4d6d3;
    }
    &_active {
      background-color: #c0c2be !important;
      border-color: #c0c2be;
    }
    &:last-of-type {
      margin-left: 8px;
    }
  }
}
</style>
