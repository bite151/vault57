<script setup lang="ts">
import AsyncIcon from "~/components/Common/AsyncIcon.vue";
import AlertDialog from "~/components/Desktop/Dialogs/AlertDialog.vue";
import {useWindowsStore} from "~/store/windowsStore";
import Dock from "~/components/Desktop/Desktop/Dock.vue";
import {usePagesStore} from "~/store/pagesStore";
import {findPageByUrl, generateUrl} from "~/helpers/app.helpers";

const windowsStore = useWindowsStore()
const pagesStore = usePagesStore()

const icons = computed(() => pagesStore.desktopItems)
const showAlertDialog = ref<boolean>(false)

function openWindow(url: string): void {
  const page = findPageByUrl(url)
  if (!page) return

  const hiddenWindow = windowsStore.openedWindows.find(item => item.isHidden && generateUrl(item) === url)
  if (hiddenWindow) {
    windowsStore.updateWindowParams({ windowId: hiddenWindow.windowId, isHidden: false })
    return
  }
  windowsStore.setWindow(url)
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
        @click="() => showAlertDialog = true"
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
    v-if="showAlertDialog"
    title="Error"
    message="This component in the development stage"
    @on-close="() => showAlertDialog = false"
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
  justify-content: center;
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
.block4 { grid-area: 1 / 12 / 2 / 13; }
.block5 { grid-area: 1 / 11 / 2 / 12; }
</style>
