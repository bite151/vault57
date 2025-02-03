<script setup lang="ts">
import {usePagesStore} from "~/store/pagesStore";
import FolderContent from "~/components/AppFolder/FolderContent.vue";

const route = useRoute()
const pagesStore = usePagesStore()
const pages = computed(() => pagesStore.pages);

const routesArr = route.path.split('/')
const folder = routesArr[routesArr.length - 2]
const currentPage = computed(() => pages.value.find(page => page.url === '/' + folder))
</script>

<template>
  <FolderContent
    :current-page="currentPage"
  />
</template>
