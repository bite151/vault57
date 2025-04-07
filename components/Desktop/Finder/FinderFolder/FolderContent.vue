<script setup lang="ts">
import { ref } from 'vue'
import { usePagesStore } from "~/store/pagesStore";
import {useMouse, useWindowScroll} from "@vueuse/core";
import FolderItem from "~/components/Desktop/Finder/FinderFolder/FolderItem.vue";
import ContextMenu from "~/components/Desktop/Finder/FinderFolder/ContextMenu.vue";
import EmptyFolder from "~/components/Desktop/Finder/FinderFolder/EmptyFolder.vue";
import PropertiesModal from "~/components/Desktop/Modals/PropertiesModal.vue";
import type { MenuItem, Page } from "~/types/Page";
import type { PageWindow } from "~/types/Window";
import {openWindow} from "~/helpers/app.helpers";
import {useWindowsStore} from "~/store/windowsStore";
import {useDialogStore} from "~/store/dialogStore";

const props = defineProps<{ currentFolder?: PageWindow | undefined }>()
const currentFolder = toRef(props, 'currentFolder')

const currentComponent = shallowRef(null);
watch(
  () => currentFolder.value?.desktop.contentComponent,
  (componentName) => {
    if (componentName) {
      currentComponent.value = defineAsyncComponent(() =>
        import(`~/components/CustomPageComponents/${componentName}.vue`)
      );
    }
  },
  { immediate: true }
);

const pagesStore = usePagesStore()
const windowsStore = useWindowsStore()
const dialogStore = useDialogStore()

const files = computed<Page[]>(() => {
  if (currentFolder.value?.fullUrl === '/my-computer') {
    return pagesStore.pages
      .filter(page => page.parentId === 1 && !page.url.includes('/file/') && page.desktop.showInFinder)
      .sort((a, b) => {
        if (a.range < b.range) return -1
        if (a.range > b.range) return 1
        return 0
      })
  }

  return pagesStore.pages
    .filter(page => page.parentId === currentFolder.value?.id)
    .sort((a: Page, b: Page) => {
      if (a.desktop.title < b.desktop.title) return -1
      if (a.desktop.title > b.desktop.title) return 1
      return 0
    })
})

const { x, y } = useMouse()
const { y: windowY } = useWindowScroll()

const contextMenu = ref<Page | null>(null)
const menuPosition = ref<{ top: number, left: number }>({ top: 0, left: 0 })

const menuItems = ref<MenuItem[]>([])
const isFolderItemActive = ref<boolean | number>(false)

function openContextMenu(page: Page, menuItemsArr: MenuItem[]) {
  isFolderItemActive.value = page.id!

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

function editPage(page: Page): void {
  const { pages } = pagesStore
  const pageEditor = pages.find(page => page.url === '/page-editor')!

  pagesStore.editedPage = JSON.parse(JSON.stringify(page))
  localStorage.setItem('editedPage', JSON.stringify(page))

  openWindow(pageEditor)
  const index = windowsStore.openedWindows.findIndex(page => page.url === '/page-editor')
  windowsStore.openedWindows[index].isFullScreen = true
}

function removePage(page: Page): void {
  const { pages } = pagesStore
  const trash: Page = pages.find(page => page.url === '/trash')!
  pagesStore.pages = pages.map((item) => {
    if (item.id === page.id) {
      item.defaultParentId = page.parentId
      item.parentId = trash.id!
    }
    return item
  })
  closeConfirmDialog()
}

function openConfirmDialog (page: Page): void {
  dialogStore.closeAllDialogs()
  dialogStore.confirmDialog = {
    title: 'Подтвердите действие',
    dialog: 'Переместить в корзину?',
    buttons: [{
      text: 'Отмена',
      action: () => closeConfirmDialog(),
    }, {
      text: 'Да',
      action: () => removePage(page),
    }]
  }
}

function closeConfirmDialog (): void {
  dialogStore.confirmDialog = null
}

const propertiesModal = ref<Page | null>(null)
function openPropertiesModal (page: Page): void {
  propertiesModal.value = page
}
function closePropertiesModal (): void {
  propertiesModal.value = null
}

function onFolderClick (): void {
  const isTrash = currentFolder.value?.fullUrl === '/trash'
  const trash: Page = pagesStore.pages.find(page => page.url === '/trash')!
  const isTrashEmpty = !pagesStore.pages.some(page => page.parentId === trash.id)
  if (isTrash && !isTrashEmpty) {
    openContextMenu(currentFolder.value!, [{
      key: 'restore-all',
      title: 'Восстановить все',
      icon: null,
      action: () => restoreAll()
    }])
  }
}

function restoreAll () {
  const trashId: number = pagesStore.pages.find(page => page.url === '/trash')!.id!
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
    <template v-if="currentFolder?.desktop.contentComponent">
      <component
        v-if="currentComponent"
        :is="currentComponent"
      />
    </template>

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
        @on-edit="editPage"
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

.animate__faster {
  --animate-duration: 0.7s;
}
</style>
