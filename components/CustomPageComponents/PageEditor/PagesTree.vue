<script setup lang="ts">
import {usePagesStore} from "~/store/pagesStore";
import type {Page} from "~/types/Page";
import TreeView from "~/components/CustomPageComponents/PageEditor/TreeView.vue";

interface TreeNode extends Page{
  children?: TreeNode[];
}

const pagesStore = usePagesStore()
const pages = computed<Page[]>(() => pagesStore.pages)
const pagesTree = computed<TreeNode[]>(() => buildTree(pages.value))

const emits = defineEmits(['on-page-click'])

function buildTree(items: TreeNode[]): TreeNode[] {
  const itemMap: Record<number, TreeNode> = {};

  items.forEach(item => {
    itemMap[item.id!] = { ...item, children: [] };
  });

  const tree: TreeNode[] = [];

  items.forEach(item => {
    const node = itemMap[item.id!];

    if (item.parentId === 0) {
      tree.push(node);
    } else {

      const parent = itemMap[item.parentId];
      if (parent) {
        parent.children!.push(node);
      }
    }
  });

  tree.forEach((root) => {
    if (root.children?.length) {
      root.children.sort((a, b) => (a.range || 0) - (b.range || 0));

      const sortChildren = (node: TreeNode) => {
        if (node.children?.length) {
          node.children.sort((a, b) => a.desktop.title.localeCompare(b.name));
          node.children.forEach(sortChildren);
        }
      };
      root.children.forEach(sortChildren);
    }
  });

  return tree;
}
</script>

<template>
  <TreeView
    :nodes="pagesTree"
    :level="0"
    @on-page-click="(page) => emits('on-page-click', page)"
  />
</template>

<style scoped lang="scss">

</style>
