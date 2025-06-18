<script setup lang="ts">
import StartScreen from "~/components/StartScreen.vue";
import {usePagesStore} from "~/store/pagesStore";
import {useMetaTags} from "~/composables/useMetaTags";
import type {Page} from "~/types/Page";

const pagesStore = usePagesStore()
const { seo } = pagesStore.pages.find(page => page.parentId === 0) as Page

const { setMetaTags } = useMetaTags()
setMetaTags(seo, '/')
</script>

<template>
  <StartScreen />
</template>

<style scoped>

</style>
