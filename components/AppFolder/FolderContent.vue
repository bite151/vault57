<script setup lang="ts">
import { ref } from 'vue'
import { usePagesStore } from "~/store/pagesStore";
import { useMouse, useWindowScroll } from "@vueuse/core";

import FolderItem from "~/components/AppFolder/FolderItem.vue";
import ContextMenu from "~/components/AppFolder/ContextMenu.vue";
import EmptyFolder from "~/components/AppFolder/EmptyFolder.vue";
import type {MenuItem, Page} from "~/types/Page";


const { currentFolder } = defineProps(['currentFolder']);
const pagesStore = usePagesStore()
const files = computed(() => pagesStore.pages
  .filter(page => page.parentId === currentFolder.id)
  .sort((a, b) => {
    if (a.title < b.title) return -1
    if (a.title > b.title) return 1
    return 0
  })
)

const { x, y } = useMouse()
const { y: windowY } = useWindowScroll()

const contextMenu = ref<Page | null>(null)
const menuPosition = ref<{ top: number, left: number }>({ top: 0, left: 0 })

const route = useRoute()
const router = useRouter()

const menuItems = ref<MenuItem[]>([
  {
    title: 'Открыть',
    icon: null,
    action: (page: Page) => router.push(route.path + page.url),
  },
  {
    title: 'Удалить',
    icon: null,
    action: (page: Page) => {
      console.log('delete', page)
    }
  },
  {
    title: 'Свойства',
    icon: null,
    action: (page: Page) => {
      console.log('properties', page)
    }
  },
])

function openContextMenu (page: Page) {
  const top = unref(y) - unref(windowY)
  const left = unref(x)
  menuPosition.value = { top, left }
  contextMenu.value = page
}

function closeContextMenu() {
  contextMenu.value = null
}

function openPage (page: Page) {}
</script>

<template>
  <EmptyFolder v-if="!files?.length">
    Папка пуста
  </EmptyFolder>

  <div class="files" v-else>
    <FolderItem
      v-for="folderItem in files"
      :key="folderItem.id"
      :folder-item="folderItem"
      @on-context-menu="openContextMenu"
    />

    <ContextMenu
      v-if="contextMenu"
      :folder-item="contextMenu"
      :menuItems="menuItems"
      :menu-position="menuPosition"
      @on-close="closeContextMenu"
    />
  </div>
</template>

<style scoped lang="scss">
.files {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
}
</style>
