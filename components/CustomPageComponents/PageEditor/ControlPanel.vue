<script setup lang="ts">
import AsyncIcon from "~/components/Common/AsyncIcon.vue";

const buttons = [
  {
    name: 'general',
    title: 'General',
    icon: 'AppWindow'
  },
  {
    name: 'seo',
    title: 'SEO',
    icon: 'Chrome'
  },
  {
    name: 'desktop',
    title: 'Desktop',
    icon: 'Monitor'
  },
  {
    name: 'mobile',
    title: 'Mobile',
    icon: 'Smartphone'
  },
  {
    name: 'content',
    title: 'Content',
    icon: 'FileText'
  },
  {
    name: 'json',
    title: 'JSON',
    icon: 'Braces'
  },
  {
    name: 'preview',
    title: 'Preview',
    icon: 'ScanEye'
  }
]
const { tree } = defineProps<{
  tree: boolean,
  tab: string
}>()

const emits = defineEmits(['update:tree', 'update:tab', 'onSave', 'onCreate', 'onDelete'])
</script>

<template>
<div class="control-panel">
  <button
    class="control-panel__button"
    @click="emits('onCreate')"
  >
    <AsyncIcon
      name="FilePlus"
      :size="18"
      :stroke-width="1.8"
    />
    <!--    Create-->
  </button>
  <button
    class="control-panel__button"
  >
    <AsyncIcon
      name="FolderOpen"
      :size="18"
      :stroke-width="1.8"
    />
<!--    Open-->
  </button>
  <button
    class="control-panel__button"
    @click="emits('onSave')"
  >
    <AsyncIcon
      name="Save"
      :size="18"
      :stroke-width="1.8"
    />
<!--    Save-->
  </button>

  <button
    class="control-panel__button"
    @click="emits('onDelete')"
  >
    <AsyncIcon
      name="Trash2"
      :size="18"
      :stroke-width="1.8"
    />
    <!--    Save-->
  </button>

  <span></span>

  <button
    class="control-panel__button"
    :class="{ 'control-panel__button_active': tree }"
    @click="emits('update:tree', !tree)"
  >
    <AsyncIcon
      name="FolderTree"
      :size="15"
      :stroke-width="2"
    />
    Pages
  </button>

  <span></span>

  <button
    class="control-panel__button"
    v-for="button in buttons"
    :key="button.name"
    :class="{ 'control-panel__button_active': button.name === tab }"
    @click="emits('update:tab', button.name)"
  >
    <AsyncIcon
      :name="button.icon"
      :size="15"
      :stroke-width="2"
    />
    {{ button.title }}
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
    //&:first-of-type {
    //  margin-right: 8px;
    //}
    &:last-of-type {
      margin-left: 8px;
    }
  }
}
</style>
