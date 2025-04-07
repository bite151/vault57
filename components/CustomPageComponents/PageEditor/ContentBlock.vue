<script setup lang="ts">
import {ElFormItem, ElInput, ElButton} from "element-plus";
import ContentBlockParagraph from "~/components/CustomPageComponents/PageEditor/ContentBlockParagraph.vue";
import ContentBlockImages from "~/components/CustomPageComponents/PageEditor/ContentBlockImages.vue";
import ContentBlockSingleImage from "~/components/CustomPageComponents/PageEditor/ContentBlockSingleImage.vue";

const { block } = defineProps<{
  block: any,
  n: number
}>()
const emits = defineEmits(['addBlock', 'removeBlock'])

function randomKey() {
  const randomString = Math.random().toString(36).substring(2, 10);
  return randomString + '-' + new Date().getTime()
}
</script>

<template>
  <div class="content-block">

    <ContentBlockSingleImage
      :image="block.img"
      class="content-block-images"
      @update:image="block.img = $event"
    />

    <el-form-item
      label="Subtitle"
      prop="content.block.title"
      style="padding-right: 52px;"
    >
      <el-input
        size="large"
        v-model="block.title"
      />
    </el-form-item>

    <ContentBlockParagraph
      v-for="(_, n) in block.p"
      :key="randomKey"
      :paragraph="block.p"
      :n="n"
      class="content-block-paragraph"
    />

    <el-button
      size="small"
      type="primary"
      @click="() => block.p.push('')"
    >
      Add paragraph
    </el-button>

    <ContentBlockImages
      :images="block.images"
      class="content-block-images"
      @update:images="block.images = $event"
    />

    <el-button
      size="default"
      type="primary"
      @click="emits('addBlock', n)"
    >
      Add block
    </el-button>

    <el-button
      size="default"
      type="primary"
      plain
      @click="emits('removeBlock', n)"
    >
      Remove block
    </el-button>
  </div>
</template>

<style scoped lang="scss">
.content-block {
  border-left: 2px solid #8f938c;
  padding-left: 24px;
  margin-bottom: 36px;

  &-paragraph {
    display: flex;
    flex-direction: row;
    gap: 16px;

    &:deep(.el-form-item) {
      flex-grow: 1;
    }
  }

  &-images {
    margin-top: 28px;
    margin-bottom: 16px;
  }
}
</style>
