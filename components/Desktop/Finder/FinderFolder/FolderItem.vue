<script setup lang="ts">
import AsyncIcon from "~/components/Common/AsyncIcon.vue";
import { usePagesStore } from "~/store/pagesStore";
import { useWindowsStore } from "~/store/windowsStore";
import {generateUrl, openWindow, sleep} from "~/helpers/app.helpers";
import type { MenuItem, Page } from "~/types/Page";
import type {PageWindow} from "~/types/Window";
import {useAuthStore} from "~/store/authStore";

const { folderItem, windowId } = defineProps<{
  folderItem: Page,
  windowId: string | undefined
}>()

const emit = defineEmits(['onContextMenu', 'onRemove', 'onShowProps', 'onEdit'])
const authStore = useAuthStore()
const pagesStore = usePagesStore()
const windowsStore = useWindowsStore()
const editName = ref<boolean>(false)

onMounted(async () => {
  if (folderItem?.blank) {
    editName.value = true

    await sleep(50)
    if (textarea.value) {
      textarea.value.focus();
      textarea.value.select();
    }
  }
})

const currentWindow = computed<PageWindow | undefined>(() => windowsStore.openedWindows.find(item => item.windowId === windowId))
const isTrash = computed<boolean>(() => currentWindow.value?.fullUrl === '/trash')
const isAdmin = computed<boolean>(() => authStore.isAuth && authStore.profile.role === 'admin')
const menuItems = computed<ActionKey[]>(() => {
  const items = ['open','remove', 'properties']
  if (isAdmin.value) {
    items.splice(1, 0, 'rename')
    items.splice(1, 0, 'edit')
  }
  return items
})

const fileName = ref<HTMLInputElement | null>(null)
const textarea = ref<HTMLInputElement | null>(null)
const menuItemsList: MenuItem[] = [
  {
    key: 'open',
    title: 'Открыть',
    icon: null,
    action: (page: Page) => openPage(page)
  },
  // {
  //   key: 'open',
  //   title: 'Открыть в новом окне',
  //   icon: null,
  //   action: (page: Page) => openPageInNewWindow(page)
  // },
  {
    key: 'edit',
    title: 'Редактировать',
    icon: null,
    action: (page: Page) => emit('onEdit', page)
  },
  {
    key: 'rename',
    title: 'Переименовать',
    icon: null,
    action: () => {
      editName.value = true

      setTimeout(() => {
        if (!textarea.value) return
        textarea.value.style.height = 'auto';
        textarea.value.style.height = textarea.value.scrollHeight + 'px';
        textarea.value.focus();
        textarea.value.select();
      }, 100)

    }
  },
  {
    key: 'remove',
    title: 'Удалить',
    icon: null,
    action: (page: Page) => emit('onRemove', page)
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
    action: (page: Page) => emit('onShowProps', page)
  },
] as const


type ActionKey = (typeof menuItemsList)[number]['key']

function getMenuItems(keys: ActionKey[]): MenuItem[] {
  return menuItemsList.filter(item => keys.includes(item.key))
}

function openPage (page: Page): void {
  // if (page.blank) {
  //   emit('onEdit', page)
  //   return
  // }

  const hiddenWindow = windowsStore.openedWindows.find(item => item.pageId === page.id && item.isHidden)
  if (hiddenWindow) {
    windowsStore.updateWindowParams({ windowId: hiddenWindow.windowId, isHidden: false })
    windowsStore.setWindowToFront(hiddenWindow.windowId)
    return
  }

  const frontWindowId = windowsStore.openedWindows.find(item => item.isOnFront)?.windowId ?? null
  if (windowId && frontWindowId !== windowId) {
    windowsStore.setWindowToFront(windowId)
  }

  openWindow(page)
}

// function openPageInNewWindow(page: Page): void {
//   const url = generateUrl(page)
//   windowsStore.setWindow(url)
// }

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

function onFilenameChange() {
  if (!textarea.value) return

  textarea.value.style.height = 'auto';
  textarea.value.style.height = textarea.value.scrollHeight + 'px';
}

async function onRename() {
  editName.value = false
  if (authStore.profile.role !== 'admin') return
  if (folderItem.blank) return
  await pagesStore.savePage(folderItem)
}
</script>

<template>
  <div
    class="file"
    :class="{ file_hidden: !folderItem.isPublic && !folderItem.blank }"
  >
    <a
      v-if="!isTrash"
      :href="generateUrl(folderItem)"
      active-class="file_active"
      @click.prevent.stop="openPage(folderItem)"
      @contextmenu.prevent.stop="emit(
        'onContextMenu',
        folderItem,
        getMenuItems(menuItems)
      )"
    >
      <AsyncIcon
        v-if="folderItem.blank"
        class="non-saved-icon"
        name="Save"
        :size="26"
        :stroke-width="1.8"
        color="#646364"
      />
      <AsyncIcon
        :name="folderItem.desktop.icon || 'Folder'"
        :size="52"
        :strokeWidth="1.3"
      />
      <p v-if="!editName" ref="fileName">{{ folderItem.desktop.title }}</p>
      <textarea
        v-if="editName"
        ref="textarea"
        v-model="folderItem.desktop.title"
        :style="`height: ${fileName?.clientHeight}px`"
        class="file-name-input"
        rows="1"
        @click.stop
        @keydown="onFilenameChange"
        @keyup="onFilenameChange"
        @blur="onRename()"
      ></textarea>
    </a>

    <div
      v-else
      class="file-inner"
      @click="() => { emit('onShowProps', folderItem) }"
      @contextmenu.prevent.stop="emit(
        'onContextMenu',
        folderItem,
        getMenuItems(['restore','properties'])
      )"
    >
      <AsyncIcon
        :name="folderItem.desktop.icon || 'Folder'"
        :size="52"
        :strokeWidth="1.3"
      />
      <p>{{ folderItem.desktop.title }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.file {
  display: flex;
  justify-content: center;

  a, .file-inner {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    line-height: 1.1;
    color: #31322d;

    cursor: pointer;
  }

  &_hidden {
    a, .file-inner {
      color: #a7a7a5;
    }
    svg {
      stroke: #a7a7a5;
    }
  }

  svg {
    padding: 3px;
    border-radius: 8px;
    flex-shrink: 0;
    border: 1px dotted transparent;
    transition: background-color .2s ease-in-out;
  }

  .non-saved-icon {
    position: absolute;
    top: 16px;
    border-color: transparent !important;
    background-color: transparent !important;
  }

  p {
    //width: min-content;
    padding: 2px 6px;
    border-radius: 4px;
    border: 1px dotted transparent;
    text-align: center;
    line-height: 1.3;

    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;

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

  &-name-input {
    padding: 3px 6px 2px;
    border-radius: 4px;
    text-align: center;
    font-size: 16px;
    font-family: inherit;
    width: 100%;
    background-color: #e4e5e3;
    resize: none;
    min-height: 28px;
    height: 28px;
    overflow: hidden;
  }
}
</style>
