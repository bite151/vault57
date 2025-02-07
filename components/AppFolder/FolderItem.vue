<script setup lang="ts">
import {usePagesStore} from "~/store/pagesStore";
import AsyncIcon from "~/components/common/AsyncIcon.vue";

import type { Page } from "~/types/Page";

const { folderItem } = defineProps<{
  folderItem: Page
}>()

const emit = defineEmits(['onContextMenu'])

const { $bus } = useNuxtApp()
const pagesStore = usePagesStore()

function generateUrl(currentPage: Page, url: string[] = []): string {
  const child = pagesStore.pages.find(page => page.id === currentPage.parentId)
  url.unshift(currentPage.url)
  if (child) {
    return generateUrl(child, url)
  }
  return url.filter(url => url !== '/').join('')
}

function resetFrontPosition() {
  setTimeout(() => $bus.$emit('resetFront', false), 5)
}

</script>

<template>
  <div class="file">
    <nuxt-link
      :to="generateUrl(folderItem)"
      active-class="file_active"
      @click="resetFrontPosition()"
      @contextmenu.prevent="emit('onContextMenu', folderItem)"
    >
      <AsyncIcon
        :name="folderItem.icon"
        :size="52"
        :strokeWidth="1.3"
      />
      <p>{{ folderItem.title }}</p>
    </nuxt-link>
  </div>
</template>

<style scoped lang="scss">
.file {
  display: flex;
  justify-content: center;
  width: calc((100% - 80px) / 5);
  min-width: 166px;
  margin-bottom: 12px;

  a {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    line-height: 1.1;
    color: #31322d;

    cursor: pointer;
  }

  svg {
    padding: 3px;
    border-radius: 8px;
    flex-shrink: 0;
    transition: background-color .2s ease-in-out;
  }

  p {
    padding: 2px 6px;
    border-radius: 4px;
    border: 1px solid transparent;
    text-align: center;
    line-height: 1.3;
    transition: color .2s ease-in-out, background-color .2s ease-in-out, border-color .2s ease-in-out;
  }
  &:hover, &_active {
    p {
      //color: #0164c6;
      border-color: #e4e5e3;
      background-color: #e4e5e3;
    }

    svg {
      border-color: #e4e5e3;
      background-color: #e4e5e3;
    }
  }

  &_active {
    p, svg {
      border: 1px dotted #aaa !important;
    }
  }
}
</style>
