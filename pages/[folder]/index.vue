<script setup lang="ts">
import { usePagesStore } from "~/store/pagesStore";
import FolderContent from "~/components/AppFolder/FolderContent.vue";

const route = useRoute()
const pagesStore = usePagesStore()

const pages = computed(() => pagesStore.pages);
const currentPage = computed(() => pages.value.find(page => page.url === '/' + route.params.folder));
</script>

<template>
  <FolderContent
    :current-folder="currentPage"
  />
</template>
