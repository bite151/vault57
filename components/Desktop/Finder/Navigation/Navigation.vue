<script setup lang="ts">
import MenuBlock from "~/components/Desktop/Finder/Navigation/MenuBlock.vue";
import AsyncIcon from "~/components/Common/AsyncIcon.vue";
</script>

<template>
  <p>
    <AsyncIcon
      name="Laptop2"
      class="icon"
      :size="20"
      :strokeWidth="2"
      color="#31322d"
    />
    VAULT-57
  </p>
  <MenuBlock />
</template>

<style scoped lang="scss">
p {
  display: flex;
  flex-grow: 1;
  width: 100%;
  align-items: center;
  gap: 8px;
  padding: 6px 0;
  margin-bottom: 4px;
  font-weight: 600;
  color: var(--folder-navigation-color);
  user-select: none;
}
</style>
