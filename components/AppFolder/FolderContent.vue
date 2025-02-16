<script setup lang="ts">
import { ref } from 'vue'
import { usePagesStore } from "~/store/pagesStore";
import { useMouse, useWindowScroll } from "@vueuse/core";
import FolderItem from "~/components/AppFolder/FolderItem.vue";
import ContextMenu from "~/components/AppFolder/ContextMenu.vue";
import EmptyFolder from "~/components/AppFolder/EmptyFolder.vue";
import ConfirmDialog from "~/components/common/Modals/ConfirmDialog.vue";
import PropertiesModal from "~/components/AppFolder/PropertiesModal.vue";
import type { ConfirmDialogProps } from "~/types/ConfirmDialog";
import type { MenuItem, Page } from "~/types/Page";
import type { PageWindow } from "~/types/Window";

const { currentFolder } = defineProps<{
  currentFolder?: PageWindow | undefined
}>();

const pagesStore = usePagesStore()

const files = computed<Page[]>(() => {
  if (currentFolder?.fullUrl === '/my-computer') {
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

const menuItems = ref<MenuItem[]>([])
const isFolderItemActive = ref<boolean | number>(false)

function openContextMenu (page: Page, menuItemsArr: MenuItem[]) {
  isFolderItemActive.value = page.id

  menuItems.value = menuItemsArr

  const top = unref(y) - unref(windowY)
  const left = unref(x)
  menuPosition.value = { top, left }
  contextMenu.value = page
}

function closeContextMenu(): void {
  contextMenu.value = null
  isFolderItemActive.value = false
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
  closeConfirmDialog()
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

function onFolderClick (): void {
  const isTrash = currentFolder?.fullUrl === '/trash'
  const trash: Page = pagesStore.pages.find(page => page.url === '/trash')!
  const isTrashEmpty = !pagesStore.pages.some(page => page.parentId === trash.id)
  if (isTrash && !isTrashEmpty) {
    openContextMenu(currentFolder!, [{
      key: 'restore-all',
      title: 'Восстановить все',
      icon: null,
      action: () => restoreAll()
    }])
  }
}

function restoreAll () {
  const trashId: number = pagesStore.pages.find(page => page.url === '/trash')!.id
  const trashItems = pagesStore.pages.filter(page => page.parentId === trashId)
  trashItems.forEach(item => {
    item.parentId = item.defaultParentId!
    item.defaultParentId = null

    pagesStore.pages = pagesStore.pages.map(page => page.id === item.id ? item : page)
  })
}
</script>

<template>
  <div
    class="content"
    @contextmenu.prevent="onFolderClick"
  >
    <component
      v-if="currentFolder?.contentComponent"
      :is="defineAsyncComponent({
        loader: () => import(`~/components/Pages/${currentFolder?.contentComponent?.component}.vue`)
      })"
    />

    <EmptyFolder v-else-if="!files?.length">
      {{ currentFolder?.fullUrl !== '/trash' ? 'Папка' : 'Корзина' }} пуста
    </EmptyFolder>

    <div
      v-else
      class="files"
    >
      <FolderItem
        v-for="folderItem in files"
        :key="folderItem.id"
        :folder-item="folderItem"
        :window-id="currentFolder?.windowId"
        :class="{'active': isFolderItemActive === folderItem.id}"
        @on-context-menu="openContextMenu"
        @on-remove="openConfirmDialog"
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
  </div>
</template>

<style scoped lang="scss">
.content {
  padding: 18px;
  flex-grow: 1;
}

.files {
  display: grid;
  grid-row-gap: 32px;
  grid-column-gap: 8px;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
}
</style>
