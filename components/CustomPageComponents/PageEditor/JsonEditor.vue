<script setup lang="ts">

const { modelValue } = defineProps<{
  modelValue: any
}>()
const emit = defineEmits(['update:modelValue'])
const json = ref('')

onMounted(() => {
  json.value = JSON.stringify(modelValue, undefined, 2);
})
</script>

<template>
  <textarea
    readonly
    class="json-editor"
    :value="json"
  />
</template>

<style scoped lang="scss">
.json-editor {
  width: 100%;
  height: 100%;
  background: #f5f5f5;
  font-size: 14px;
}
</style>
