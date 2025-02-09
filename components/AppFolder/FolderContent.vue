<script setup lang="ts">
import { ref } from 'vue'
import { usePagesStore } from "~/store/pagesStore";
import { useMouse, useWindowScroll } from "@vueuse/core";

import FolderItem from "~/components/AppFolder/FolderItem.vue";
import ContextMenu from "~/components/AppFolder/ContextMenu.vue";
import EmptyFolder from "~/components/AppFolder/EmptyFolder.vue";
import ConfirmDialog from "~/components/common/Modals/ConfirmDialog.vue";
import type { MenuItem, Page } from "~/types/Page";
import type { ConfirmDialogProps } from "~/types/ConfirmDialog";
import PropertiesModal from "~/components/AppFolder/PropertiesModal.vue";
import { generateUrl } from "~/helpers/app.helpers";

const { currentFolder } = defineProps<{
  currentFolder: Page | undefined
}>();

const { $bus } = useNuxtApp()
const route = useRoute()
const router = useRouter()
const pagesStore = usePagesStore()

const files = computed<Page[]>(() => {
  if (route.path === '/my-computer') {
    return pagesStore.pages.filter(page => page.parentId === 1 && !page.url.includes('/file/') && page.showInFinder)
  }

  return pagesStore.pages
    .filter(page => page.parentId === currentFolder?.id)
    .sort((a: Page, b: Page) => {
      if (a.title < b.title) return -1
      if (a.title > b.title) return 1
      return 0
    })
})

const { x, y } = useMouse()
const { y: windowY } = useWindowScroll()

const contextMenu = ref<Page | null>(null)
const menuPosition = ref<{ top: number, left: number }>({ top: 0, left: 0 })

const menuItemsList = ref<MenuItem[]>([
  {
    key: 'open',
    title: 'Открыть',
    icon: null,
    action: (page: Page) => openPage(page)
  },
  {
    key: 'remove',
    title: 'Удалить',
    icon: null,
    action: (page: Page) => openConfirmDialog(page)
  },
  {
    key: 'restore',
    title: 'Восстановить',
    icon: null,
    action: (page: Page) => restorePage(page)
  },
  {
    key: 'properties',
    title: 'Свойства',
    icon: null,
    action: (page: Page) => openPropertiesModal(page)
  },
])

const menuItems = ref<MenuItem[]>([])
const isFolderItemActive = ref<boolean | number>(false)

function openContextMenu (page: Page) {
  isFolderItemActive.value = page.id

  const itemsArr: string[] = (route.path === '/trash')
    ? ['restore','properties']
    : ['open','remove','properties']

  menuItems.value = menuItemsList.value.filter((item: MenuItem) => itemsArr.includes(item.key))

  const top = unref(y) - unref(windowY)
  const left = unref(x)
  menuPosition.value = { top, left }
  contextMenu.value = page
}

function closeContextMenu(): void {
  contextMenu.value = null
  isFolderItemActive.value = false
}

function openPage (page: Page): void {
  $bus.$emit('file:show')
  const url = generateUrl(page)
  router.push(url)
}

function removePage (page: Page): void {
  const { pages } = pagesStore
  const trash: Page = pages.find(page => page.url === '/trash')!
  pagesStore.pages = pages.map((item) => {
    if (item.id === page.id) {
      item.defaultParentId = page.parentId
      item.parentId = trash.id
    }
    return item
  })

  $bus.$emit('file:close', page.id)
  closeConfirmDialog()
}

function restorePage (page: Page): void {
  pagesStore.pages = pagesStore.pages.map((item: Page) => {
    if (item.id === page.id) {
      if (item.defaultParentId) {
        page.parentId = item.defaultParentId
        item.defaultParentId = null
      }
    }
    return item
  })
}

const confirmDialog = ref<Page | null>(null)
const confirmDialogProps = ref<ConfirmDialogProps<Page>>({
  title: 'Подтвердите действие',
  dialog: 'Переместить в корзину?',
  buttons: [{
    text: 'Отмена',
    action: () => closeConfirmDialog(),
  }, {
    text: 'Да',
    action: (page) => removePage(<Page>page),
  }]
})
function openConfirmDialog (page: Page): void {
  confirmDialog.value = page
}
function closeConfirmDialog (): void {
  confirmDialog.value = null
}

const propertiesModal = ref<Page | null>(null)
function openPropertiesModal (page: Page): void {
  propertiesModal.value = page
}
function closePropertiesModal (): void {
  propertiesModal.value = null
}
</script>

<template>
  <EmptyFolder v-if="!files?.length">
    {{ route.path !== '/trash' ? 'Папка' : 'Корзина' }} пуста
  </EmptyFolder>

  <div
    v-else
    class="files"
  >
    <FolderItem
      v-for="folderItem in files"
      :key="folderItem.id"
      :folder-item="folderItem"
      :class="{'active': isFolderItemActive === folderItem.id}"
      @on-context-menu="openContextMenu"
      @on-show-props="openPropertiesModal"
    />

    <ContextMenu
      v-if="contextMenu"
      :folder-item="contextMenu"
      :menuItems="menuItems"
      :menu-position="menuPosition"
      @on-close="closeContextMenu"
    />

    <ConfirmDialog
      v-if="confirmDialog"
      v-bind="confirmDialogProps"
      :data="confirmDialog"
      @on-close="closeConfirmDialog"
    />

    <PropertiesModal
      v-if="propertiesModal"
      :data="propertiesModal"
      @on-close="closePropertiesModal"
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
