<script setup lang="ts">
import {ElFormItem, ElInput, ElButton} from "element-plus";
import AsyncIcon from "~/components/Common/AsyncIcon.vue";

const { paragraph } = defineProps<{
  paragraph: string[]
  n: number
}>()
</script>

<template>
  <div>
    <el-form-item
      prop="content.block.p"
    >
      <el-input
        v-model="paragraph[n]"
        type="textarea"
        size="large"
        autosize
      />
    </el-form-item>

    <el-button
      size="small"
      plain
      @click="() => { paragraph.splice(n, 1) }"
    >
      <AsyncIcon
        name="Minus"
        :size="16"
        :stroke-width="1.7"
      />
    </el-button>
  </div>
</template>

<style scoped lang="scss">
.el-button {
  padding: 16px 9px;
}
</style>
