<script setup lang="ts">
import { definePageMeta } from "#imports";
import StartScreen from "~/components/StartScreen/StartScreen.vue";

useSeoMeta({
  title: 'Ретро компьютерный клуб',
  description: '',
})

definePageMeta({
  layout: 'start-screen'
})

</script>

<template>
  <StartScreen />
</template>

<style scoped>

</style>
