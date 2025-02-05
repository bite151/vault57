<script setup lang="ts">

import FolderContent from "~/components/AppFolder/FolderContent.vue";
import {usePagesStore} from "~/store/pagesStore";
import AsyncIcon from "~/components/common/AsyncIcon.vue";

const pagesStore = usePagesStore()
const pages = computed(() => pagesStore.pages.filter(page => page.parentId === 1 && !page.url.includes('/file/') && page.showInFinder))
</script>

<template>
  <div class="files">
    <div class="file"
      v-for="item in pages"
      :key="item.id"
    >
      <nuxt-link
        :to="item.url"
        active-class="file_active"
      >
        <AsyncIcon
          :name="item.icon || 'Folder'"
          :size="52"
          :strokeWidth="1.3"
        />
        <p>{{ item.title }}</p>
      </nuxt-link>
    </div>
  </div>
</template>

<style scoped lang="scss">
.files {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
}

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
