<script setup lang="ts">
const props = withDefaults(defineProps<{
  content: {
    review: string
  }
}>(), {
  content: () => ({
    review: ''
  })
})

const { content } = props
</script>

<template>
  <div
    class="reviews-viewer"
    v-html="content.review"
  ></div>
</template>

<style scoped lang="scss">
.reviews-viewer {
  padding: 16px;
}
</style>
