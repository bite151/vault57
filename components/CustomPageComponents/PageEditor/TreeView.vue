<script setup lang="ts">
import Page from "~/pages/page.vue";
import AsyncIcon from "~/components/Common/AsyncIcon.vue";

interface TreeNode extends Page{
  children?: TreeNode[];
}

const props = defineProps<{
  nodes: TreeNode[],
  level: number,
}>();

const sortedNodes = computed(() => {
  if (!props.nodes || !props.nodes.length) return [];

  if (props.level === 1) {
    return [...props.nodes].sort((a, b) => (a.range || 0) - (b.range || 0));
  }
  // const sortedNodes =
    return [...props.nodes].sort((a, b) => a.desktop.title.localeCompare(b.desktop.title));
  // return [
  //   ...sortedNodes.filter(n => n.type === 'Folder'),
  //   ...sortedNodes.filter(n => n.type === 'File')
  // ];
});

function getIcon(page: Page) {
  if (page.desktop.icon) {
    return page.desktop.icon
  }
  return  page.type === 'file' ? 'File' : 'Folder'
}

const emits = defineEmits(['on-page-click'])
</script>

<template>
  <ul>
    <li
      v-for="page in sortedNodes"
      :key="page.id"
    >
      <button
        class="title"
        @click="emits('on-page-click', page)"
      >
        <AsyncIcon
          :name="getIcon(page)"
          :size="15"
          :stroke-width="1.8"
        />
        <span>{{ page.desktop.title }}</span>
      </button>

      <TreeView
        v-if="page.children?.length"
        :nodes="page.children"
        :level="level + 1"
        @on-page-click="(childPage) => emits('on-page-click', childPage)"
      />
    </li>
  </ul>
</template>

<style lang="scss" scoped>
ul {
  width: 100%;
  list-style-type: none;
  li ul {
    padding-left: 16px;
  }
  &:first-child {
    padding: 8px 12px 8px 8px;
  }
}
li {
  display: flex;
  flex-direction: column;
  width: 100%;
  cursor: default;
}

.title {
  display: flex;
  flex-grow: 1;
  width: 100%;
  align-items: center;
  gap: 4px;
  margin: 1px 0;
  padding: 2px 8px 2px 4px;
  border-radius: 2px;
  font-size: 13px;
  text-align: left;
  white-space: nowrap;
  transition: .2s ease-in-out;
  svg {
    flex-shrink: 0;
  }
  span {
    flex-grow: 1;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  &:hover {
    background: #ebece6;
  }
}
</style>
