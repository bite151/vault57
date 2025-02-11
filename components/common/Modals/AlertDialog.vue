<script setup lang="ts">
import { X } from "lucide-vue-next";
import { ref } from "vue";
import {onClickOutside, useMouse } from "@vueuse/core";
import { useMousePressed } from '@vueuse/core'

interface AlertDialogProps {
  title: string;
  message: string;
}

const emits = defineEmits(['on-close'])
const { title, message } = defineProps<AlertDialogProps>()

const alertDialog = ref(null)
onClickOutside(alertDialog, event => emits('on-close'))

const header = ref(null)
const { pressed } = useMousePressed({ target: header })
const { x, y } = useMouse()
const resetMargin = ref<boolean>(false)

onMounted(() =>  document.addEventListener('mousemove', moveListener))
onBeforeUnmount(() => document.removeEventListener('mousemove', moveListener))

const moveListener = (e: MouseEvent) => {
  if (pressed.value) {
    let top = y.value - clickPosition.value.top
    let left = x.value - clickPosition.value.left

    const xMin = clickPosition.value.left
    const xMax = window.innerWidth - (header.value.offsetWidth - clickPosition.value.left + 6)
    if (xMin >= x.value) {
      left = xMin - clickPosition.value.left
    } else if (xMax <= x.value) {
      left = xMax - clickPosition.value.left
    }

    const yMin = clickPosition.value.top
    const yMax = window.innerHeight - alertDialog.value.offsetHeight + clickPosition.value.top
    if (yMin >= y.value) {
      top = yMin - clickPosition.value.top
    } else if (yMax <= y.value) {
      top = yMax - clickPosition.value.top
    }

    movePosition.value = {
      top,
      left,
    }
  }
}

const movePosition = ref<{ top: number, left: number }>({ top: 0, left: 0 })
const clickPosition = ref<{ top: number, left: number }>({ top: 0, left: 0 })

function onStartMove(e : MouseEvent) {
  clickPosition.value = { top: e.layerY, left: e.layerX }
  movePosition.value = {
    top: y.value - clickPosition.value.top,
    left: x.value - clickPosition.value.left
  }
  resetMargin.value = true
}
</script>

<template>
  <ClientOnly>
    <Teleport to="body">
      <div
        ref="alertDialog"
        class="alert-dialog"
        :class="{
          'alert-dialog_reset-margin': resetMargin,
          'alert-dialog_shift-shadow': pressed
        }"
        :style="`
          top: ${movePosition.top}px;
          left: ${movePosition.left}px;
        `"
      >
        <header
          ref="header"
          class="title-bar"
          @mousedown="onStartMove"
        >
          <div class="title-bar__buttons">
            <div class="buttons__button" @click="emits('on-close')">
              <X :size="8" :strokeWidth="5" color="#31322d"/>
            </div>
          </div>
          <h1 class="title">{{ title }}</h1>
        </header>

        <div class="content content_rounded">
          <p>{{ message }}</p>
          <div class="content__buttons">
            <button
              class="buttons__button"
              @click="emits('on-close')"
            >
              <span>OK</span>
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </ClientOnly>
</template>

<style scoped lang="scss">
.alert-dialog {
  display: flex;
  flex-direction: column;
  max-width: 430px;
  width: 100%;
  min-width: 360px;
  min-height: 150px;
  max-height: 300px;
  height: fit-content;
  margin: auto;

  background-color: var(--folder-bg-color);
  border: 3px solid var(--folder-border-color);
  border-radius: 12px;
  box-shadow: 20px 20px 0 0 var(--folder-shadow-color);

  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 1001;

  &_reset-width {
    width: auto;
    max-width: none;
  }

  &_reset-margin{
    margin: 0;
  }

  &_shift-shadow {
    margin: -5px 0 0 -5px;
    box-shadow: 30px 30px 0 0 var(--folder-shadow-color);

    .title-bar {
      cursor: grabbing
    }
  }
}

.title-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 44px;

  position: relative;
  padding: 10px 84px 10px 84px;
  border-bottom: 3px solid var(--folder-border-color);
  border-radius: 8px 8px 0 0;
  background: var(--folder-title-bar-bg-color);

  user-select: none;

  cursor: grab;

  .title {
    font-weight: 600;
    color: var(--folder-title-bar-color);
  }

  &__buttons {
    position: absolute;
    display: flex;
    gap: 6px;
    left: 12px;

    .buttons__button {
      width: 16px;
      height: 16px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 2px solid #4d4d4d;
      border-radius: 50%;

      background-color: var(--folder-bg-color);
      transition: background-color .2s ease-in-out;
      cursor: pointer;

      svg {
        transition: opacity .2s ease-in-out;
        opacity: 0.6;
      }

      &:hover {
        background-color: rgba(#4d4d4d, 0.3);

        svg {
          opacity: 1;
        }
      }
    }
  }
}

.content {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 16px 8px;

  p {
    text-align: center;
    font-weight: 600;
    font-size: 17px;
    padding: 8px;
  }

  &__buttons {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    gap: 16px;
  }

  .buttons__button {
    width: 100px;
    padding: 3px;
    background-color: #dcddd7;
    border-radius: 4px;
    transition: background-color .2s ease-in-out;

    span {
      display: block;
      padding: 5px 13px;
      border-radius: 3px;
      border: 1px dotted transparent;
      transition: border-color .2s ease-in-out;
    }

    &:hover {
      background-color: #cfcfca;
      span {
        border-color: #a5a69f;
      }
    }
  }
}
</style>
