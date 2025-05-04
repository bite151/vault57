<script setup lang="ts">
import AsyncIcon from "~/components/Common/AsyncIcon.vue";
import AlertDialog from "~/components/Desktop/Dialogs/AlertDialog.vue";
import {useWindowsStore} from "~/store/windowsStore";
import Dock from "~/components/Desktop/Desktop/Dock.vue";
import {usePagesStore} from "~/store/pagesStore";
import {findPageByUrl, generateUrl, getPageParams} from "~/helpers/app.helpers";
import {useDialogStore} from "~/store/dialogStore";
import type {AlertDialogProps} from "~/types/AlertDialog";
import ConfirmDialog from "~/components/Desktop/Dialogs/ConfirmDialog.vue";
import type {ConfirmDialogProps} from "~/types/ConfirmDialog";

const windowsStore = useWindowsStore()
const pagesStore = usePagesStore()
const dialogStore = useDialogStore()

const alertDialog = computed<AlertDialogProps | null>(() => dialogStore.alertDialog)
const confirmDialog = computed<ConfirmDialogProps | null>(() => dialogStore.confirmDialog)

const icons = computed(() => pagesStore.desktopItems)

function openWindow(url: string): void {
  const page = findPageByUrl(url)
  if (!page) return

  const params = getPageParams(url)

  const hiddenWindow = windowsStore.openedWindows.find(item => item.isHidden && generateUrl(item) === url)
  if (hiddenWindow) {
    windowsStore.updateWindowParams({ windowId: hiddenWindow.windowId, isHidden: false })
    return
  }
  windowsStore.setWindow(url, params)
}

function handleAlertDialog() {
  dialogStore.closeAllDialogs()
  dialogStore.alertDialog = {
    title: 'Error',
    message: 'This component in the development stage',
  }
}
</script>

<template>
  <div class="desktop-grid">
    <template v-for="block in icons">
      <nuxt-link
        v-if="block.url !== '#'"
        :key="block.key"
        class="block"
        :class="`block${block.key}`"
        @click.prevent="openWindow(block.url)"
      >
        <AsyncIcon
          :name="block.icon"
          :stroke-width="1.4"
        />
        <span>{{ block.title }}</span>
      </nuxt-link>
      <div
        v-else
        class="block"
        :class="`block${block.key}`"
        @click="handleAlertDialog"
      >
        <AsyncIcon
          :name="block.icon"
          :stroke-width="1.4"
        />
        <span>{{ block.title }}</span>
      </div>
    </template>
  </div>

  <ClientOnly>
    <Dock />
  </ClientOnly>

  <AlertDialog
    v-if="alertDialog"
  />

  <ConfirmDialog
    v-if="confirmDialog"
  />
</template>

<style scoped lang="scss">
.desktop-grid {
  max-width: 1900px;
  width: 100%;
  min-width: 360px;
  height: 95vh;
  //padding: 8px 0;

  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(6, 1fr);
  grid-column-gap: 8px;
  grid-row-gap: 8px;
}

.block {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  user-select: none;

  span {
    font-weight: 400;
    text-align: center;
    color: var(--desktop-icon-color);
  }

  svg {
    stroke: #3e403b;
  }
}
.block1 { grid-area: 1 / 1 / 2 / 2; }
.block2 { grid-area: 2 / 1 / 3 / 2; }
.block3 { grid-area: 7 / 12 / 8 / 13; }
.block4 { grid-area: 2 / 12 / 3 / 13; }
.block5 { grid-area: 1 / 11 / 2 / 12; }

.block6 { grid-area: 3 / 12 / 4 / 12; }

.block7 { grid-area: 2 / 12 / 1 / 11; }
.block8 { grid-area: 2 / 12 / 2 / 11; }
.block9 { grid-area: 2 / 11/ 1 / 10; }

.block11 { grid-area: 1 / 8 / 2 / 7; }
.block10 { grid-area: 1 / 7 / 2 / 6; }
.block12 { grid-area: 1 / 12 / 2 / 12; }
</style>
