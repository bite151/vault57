<script setup lang="ts">
import AsyncIcon from "~/components/Common/AsyncIcon.vue";

defineProps<{
  title: string,
  icon: string | null,
}>()
</script>

<template>
  <div class="app-block">
    <AsyncIcon
      :name="icon"
      :size="56"
      :stroke-width="1.2"
    />
    <p class="app-block__title">
      {{ title }}
    </p>
  </div>
</template>

<style scoped lang="scss">
  .app-block {
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

    &__title {
      margin-top: 4px;
      padding-top: 4px;
      border-top: 1px solid #31322d;
      font-family: Play-Bold, sans-serif;
      font-size: 18px;
      color: #3e403b;
      user-select: none;
    }
  }
</style>
