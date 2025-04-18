<script setup lang="ts">

import ControlPanel from "~/components/CustomPageComponents/ReviewsEditor/ControlPanel.vue";
import Editor from "~/components/CustomPageComponents/ReviewsEditor/Editor.vue";
import {useReviewsStore} from "~/store/reviewsStore";
import {usePagesStore} from "~/store/pagesStore";
import {useWindowsStore} from "~/store/windowsStore";

const reviewsStore = useReviewsStore()
const windowsStore = useWindowsStore()

const { notify, notifyArray } = useNotify()
const review = ref<string>(
  '<p><em>Текст отзыва</em></p>' +
  '<p class="el-tiptap-editor__placeholder"><br></p>' +
  '<p class="el-tiptap-editor__placeholder"><br class="ProseMirror-trailingBreak"></p>' +
  '<p><s>' +
  '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
  '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
  '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
  '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
  '</s></p>' +
  '<p><em>Ваше имя</em></p>'
)

async function saveReview() {
  try {
    await reviewsStore.sendReview(review.value)

    notify('success', 'Спасибо за отзыв!', 'Мы опубликуем его после модерации', 3000)
    windowsStore.openedWindows = windowsStore.openedWindows.filter(window => window.url !== '/add-review')
    return true
  } catch (e: any) {
    if (e?.data?.error && typeof e?.data?.message !== 'string') {
      notifyArray('error', e.data.error, e.data)
    } else if (e?.data?.error) {
      notify('error', e.data.error, e.message)
    } else {
      notify('error', e.statusCode.toString(), e.statusMessage)
    }
    return false
  }
}
</script>

<template>
  <ControlPanel
    key="reviews-control-panel"
    @on-save="saveReview"
  />
  <div class="reviews-editor">
    <Editor
      v-model="review"
    />
  </div>
</template>

<style scoped lang="scss">
.reviews-editor {
  position: sticky;
  display: flex;
  height: calc(100% - 46px);
  background: #f5f5f5;
  border-top: 1px solid #e0dbdb;
}
</style>
