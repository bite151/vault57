<script setup lang="ts">
import {ElButton, ElFormItem, ElInput} from "element-plus";
import ContentBlock from "~/components/CustomPageComponents/PageEditor/ContentBlock.vue";
const emptyBlock = {
  type: 'text',
  title: '',
  img: '',
  p: [''],
  images: []
}

const { modelValue } = defineProps<{
  modelValue?: any
}>()

function addBlock(n: number) {
  modelValue.blocks = [
    ...modelValue.blocks.slice(0, n + 1),
    { ...JSON.parse(JSON.stringify(emptyBlock)) },
    ...modelValue.blocks.slice(n + 1)
  ]
}

function removeBlock(n: number) {
  modelValue.blocks = [
    ...modelValue.blocks.slice(0, n),
    ...modelValue.blocks.slice(n + 1)
  ]
}

function randomKey() {
  const randomString = Math.random().toString(36).substring(2, 10);
  return randomString + '-' + new Date().getTime()
}
</script>

<template>
  <div class="content-editor">
    <el-form-item
      label="Title"
      prop="content.title"
    >
      <el-input
        size="large"
        v-model="modelValue.h1"
      />
    </el-form-item>

    <ContentBlock
      v-for="(block, n) in modelValue.blocks"
      :key="randomKey"
      :block="block"
      :n="n"
      @add-block="addBlock"
      @remove-block="removeBlock"
    />

    <div v-if="!modelValue.blocks.length">
      <el-button
        size="default"
        type="primary"
        @click="addBlock(0)"
      >
        Add block
      </el-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.content-editor {
  padding-bottom: 24px;
  max-width: 676px;
}
</style>
