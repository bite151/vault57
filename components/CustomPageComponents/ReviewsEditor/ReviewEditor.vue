<script setup lang="ts">
import "element-tiptap-vue3-fixed/lib/style.css";
import { ElementTiptap } from "element-tiptap-vue3-fixed";

import {
  Doc,
  Text,
  Paragraph,
  Bold,
  Underline,
  Italic,
  FontSize,
  // CodeView,
  Strike,
  // Blockquote,
  FormatClear,
  SelectAll,
  Commands,
  getSuggestionItems,
  renderItems,
} from "element-tiptap-vue3-fixed";

const extensions = [
  Doc,
  Text,
  Paragraph,
  Bold.configure({}),
  Underline.configure({}),
  Italic.configure({}),
  Strike.configure({}),
  // CodeView,
  FontSize,
  // Blockquote,
  FormatClear,
  SelectAll,
  Commands.configure({
    suggestion: {
      items: getSuggestionItems,
      render: renderItems,
    },
  }),
]

const content = defineModel({ default: '' });
const editor = ref()

function onUpdate() {}
</script>

<template>
  <div class="editor">
    <element-tiptap
      ref="editor"
      v-model:content="content"
      :extensions="extensions"
      :enable-char-count="false"
      editor-bubble-menu-class="hidden-bubble"
      lang="ru"
      height="100%"
      output="html"
      @onUpdate="onUpdate"
    />
  </div>
</template>

<style scoped lang="scss">
.editor {
  margin: 0;
  width: 100%;

  &:deep(.el-tiptap-editor__menu-bar) {
    padding: 8px 16px;
    gap: 8px;
    background: #eee;
    border: none;
    border-bottom: 1px solid #f5f5f5;
    &::before {
      margin: 0;
      background: none;
    }
  }

  &:deep(.el-tiptap-editor__content) {
    border-top: 1px solid #e0dbdb;
    padding: 16px;
    background: #f5f5f5;
  }

  &:deep(.el-tiptap-editor__command-button) {
    width: 30px;
    height: 30px;
    margin: 0;
    display: flex;
    align-items: center;
    padding: 8px;
    background-color: #f5f5f5;
    border: 1px solid #aaa;
    border-radius: 4px;
    font-weight: 300;
    font-size: 14px;
    white-space: nowrap;
    transition: background-color 0.2s ease-in-out;
    &:hover {
      background-color: #d4d6d3;
    }
  }

  &:deep(.el-tiptap-editor__command-button--active) {
    background-color: #c0c2be;
    border-color: #c0c2be;
    color: #4d4d4d;
  }
  &:deep(.hidden-bubble) {
    display: none;
  }
  &:deep(.el-tiptap-editor__content blockquote) {
    border-left-color: #c0c2be;
  }
}
</style>
