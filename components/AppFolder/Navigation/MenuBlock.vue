<script setup lang="ts">
import { Folder, FolderOpen } from 'lucide-vue-next';
import { usePagesStore } from "~/store/pagesStore";
import { useWindowsStore } from "~/store/windowsStore";
import MenuBlock from "~/components/AppFolder/Navigation/MenuBlock.vue";
import AsyncIcon from "~/components/common/AsyncIcon.vue";
import type { Page } from "~/types/Page";
import type { PageWindow } from "~/types/Window";
import {openWindow} from "~/helpers/app.helpers";

const windowsStore = useWindowsStore()
const pagesStore = usePagesStore()

const pageWindow: PageWindow | undefined = inject('currentWindow')
const currentWindow = computed(() => windowsStore.openedWindows.find(i => i.windowId === pageWindow?.windowId))

const { parentPageId = 1 } = defineProps(['parentPageId'])

const pages = computed<Page[]>(() => {
  const pages = pagesStore.pages.filter(page => page.parentId === parentPageId && !page.url.includes('/file/') && page.showInFinder);
  if (parentPageId === 1) {
    return pages
  }
  return pages.sort((a, b) => {
    if (a.title < b.title) return -1
    if (a.title > b.title) return 1
    return 0
  })
})

function isActive (url: string): boolean {
  return currentWindow.value!.fullUrl.includes(url)
}

function activeClassName (url: string): boolean {
  const routesArr = currentWindow.value!.fullUrl.split('/')
  const level = (!currentWindow.value?.routeParams?.file) ? 1 : 2
  return url === '/' + routesArr[routesArr.length - level]
}

function hasChildren (pageId: number): boolean {
  const childIds = pagesStore.pages.filter(page => page.parentId === pageId).map(({id}) => id)
  return pagesStore.pages.some(page => childIds.includes(page.parentId))
}

function itemIcon (page: Page) {
  return !isActive(page.url) ? Folder : FolderOpen
}

function redirectTo(page: Page) {
  const windowId = windowsStore.openedWindows.find(item => item.isOnFront)?.windowId ?? null;
  if (windowId && currentWindow.value!.windowId !== windowId) {
    windowsStore.setWindowToFront(currentWindow.value!.windowId)
  }

  openWindow(page)
}
</script>

<template>
  <ul class="folder-navigation">
    <li
      v-for="page in pages"
      :key="page.id"
    >
      <nuxt-link
        :class="{ active: activeClassName(page.url) }"
        @click="redirectTo(page)"
      >
        <AsyncIcon
          v-if="page.icon && page.icon !== 'Folder'"
          :name="page.icon"
          class="icon"
          :size="20"
          :strokeWidth="2"
          color="#31322d"
        />
        <component
          v-else
          :is="itemIcon(page)"
          class="icon"
          :size="20"
          :strokeWidth="2"
          color="#31322d"
        />
        <span>{{ page.title }}</span>
      </nuxt-link>

      <MenuBlock
        v-if="isActive(page.url) && hasChildren(page.id)"
        :parent-page-id="page.id"
      />
    </li>
  </ul>
</template>

<style scoped lang="scss">
.folder-navigation {
  padding-left: 15px;
  li {
    display: flex;
    flex-direction: column;
    //align-items: flex-start;
    margin-bottom: 4px;
    width: 100%;
    & ul {
      //position: relative;
      margin-top: 4px;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding-left: 27px;

      //&::before {
      //  content: '';
      //  position: absolute;
      //  width: 2px;
      //  //height: 100%;
      //  background: rgba(0, 0, 0, 0.1);
      //  left: 20px;
      //  border-radius: 2px;
      //  top: -4px;
      //  bottom: 16px;
      //}
      //li {
      //  position: relative;
      //
      //  &::before {
      //    content: '';
      //    position: absolute;
      //    width: 16px;
      //    height: 2px;
      //    background: rgba(0, 0, 0, 0.1);
      //    left: -6px;
      //    top: 16px;
      //    border-radius: 2px;
      //  }
      //}
    }
    &.opened {
      margin-bottom: 0;
    }
    &:last-of-type {
      margin-bottom: 0;
    }
  }
  a {
    display: flex;
    flex-grow: 1;
    width: 100%;
    align-items: center;
    gap: 8px;
    padding: 6px 12px;
    font-weight: 600;
    color: var(--folder-navigation-color);
    border-radius: 8px;
    transition: background-color 0.2s;

    white-space: nowrap;

    cursor: pointer;
    user-select: none;

    svg {
      flex-shrink: 0;
      stroke: var(--folder-navigation-color);
    }

    span {
      flex-grow: 1;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    &:hover {
      background-color: rgba(0, 0, 0, 0.04);
    }

    &.active {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
}
</style>
