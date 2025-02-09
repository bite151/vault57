<script setup lang="ts">
import AsyncIcon from "~/components/common/AsyncIcon.vue";

import type { Page } from "~/types/Page";
import { generateUrl } from "~/helpers/app.helpers";

const { folderItem } = defineProps<{
  folderItem: Page
}>()

const emit = defineEmits(['onContextMenu', 'onShowProps'])
const route = useRoute()
const { $bus } = useNuxtApp()

const isTrash = computed<boolean>(() => route.path === '/trash')

function resetFrontPosition() {
  setTimeout(() => $bus.$emit('resetFront', false), 5)
}

</script>

<template>
  <div class="file">
    <nuxt-link
      v-if="!isTrash"
      :to="generateUrl(folderItem)"
      active-class="file_active"
      @click="() => { resetFrontPosition(); $bus.$emit('file:show') }"
      @contextmenu.prevent="emit('onContextMenu', folderItem, ['open','remove','properties'])"
    >
      <AsyncIcon
        :name="folderItem.icon || 'Folder'"
        :size="52"
        :strokeWidth="1.3"
      />
      <p>{{ folderItem.title }}</p>
    </nuxt-link>

    <div
      v-else
      class="file-inner"
      @click="() => { resetFrontPosition(); emit('onShowProps', folderItem) }"
      @contextmenu.prevent.stop="emit('onContextMenu', folderItem, ['restore','properties'])"
    >
      <AsyncIcon
        :name="folderItem.icon || 'Folder'"
        :size="52"
        :strokeWidth="1.3"
      />
      <p>{{ folderItem.title }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.file {
  display: flex;
  justify-content: center;
  width: calc((100% - 80px) / 5);
  min-width: 166px;
  margin-bottom: 12px;

  a, .file-inner {
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
    border: 1px dotted transparent;
    transition: background-color .2s ease-in-out;
  }

  p {
    padding: 2px 6px;
    border-radius: 4px;
    border: 1px dotted transparent;
    text-align: center;
    line-height: 1.3;
    transition: color .2s ease-in-out, background-color .2s ease-in-out, border-color .2s ease-in-out;
    user-select: none;
  }
  &:hover {
    p, svg  {
      border-color: #e4e5e3;
      background-color: #e4e5e3;
    }
  }

  &_active,
  &.active {
    p, svg {
      border-color: #aaa;
      background-color: #e4e5e3;
    }
  }
}
</style>
