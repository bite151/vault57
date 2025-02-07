<script setup lang="ts">
import { usePagesStore } from "~/store/pagesStore";
import FolderContent from "~/components/AppFolder/FolderContent.vue";
import type { Page } from "~/types/Page";

const pagesStore = usePagesStore()
const currentPage = computed<Page | undefined>(() => pagesStore.pages.find(page => page.parentId === 0));


// const pages = computed(() => pagesStore.pages.filter(page => page.parentId === 1 && !page.url.includes('/file/') && page.showInFinder))
</script>

<template>
  <FolderContent
    :current-folder="currentPage"
  />
</template>

<style scoped lang="scss">

</style>
