<script setup lang="ts">
import AsyncIcon from "~/components/common/AsyncIcon.vue";
import { usePagesStore } from "~/store/pagesStore";
import { useWindowsStore } from "~/store/windowsStore";
import { generateUrl } from "~/helpers/app.helpers";
import type { MenuItem, Page } from "~/types/Page";
import type {PageWindow} from "~/types/Window";

const { folderItem, windowId } = defineProps<{
  folderItem: Page,
  windowId: number | undefined
}>()

const emit = defineEmits(['onContextMenu', 'onRemove', 'onShowProps'])
const router = useRouter()
const pagesStore = usePagesStore()
const windowsStore = useWindowsStore()

const currentWindow = computed<PageWindow | undefined>(() => windowsStore.openedWindows.find(item => item.windowId === windowId))
const isTrash = computed<boolean>(() => currentWindow.value?.fullUrl === '/trash')

const menuItemsList: MenuItem[] = [
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
  const frontWindowId = windowsStore.openedWindows.find(item => item.isOnFront)?.windowId ?? null;
  if (windowId && frontWindowId !== windowId) {
    windowsStore.setWindowToFront(windowId)
  }

  const url = generateUrl(page)
  router.push(url)
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

</script>

<template>
  <div class="file">
    <nuxt-link
      v-if="!isTrash"
      :to="generateUrl(folderItem)"
      active-class="file_active"
      @click.stop="openPage(folderItem)"
      @contextmenu.prevent="emit(
        'onContextMenu',
        folderItem,
        getMenuItems(['open','remove','properties'])
      )"
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
      @click="() => { emit('onShowProps', folderItem) }"
      @contextmenu.prevent.stop="emit(
        'onContextMenu',
        folderItem,
        getMenuItems(['restore','properties'])
      )"
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
