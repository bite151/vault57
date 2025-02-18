<script setup lang="ts">
import AsyncIcon from "~/components/common/AsyncIcon.vue";
import {ref} from "vue";
import {useMouse, useMousePressed} from "@vueuse/core";
import type { WindowPosition } from "~/types/Window";

interface Button<T = MouseEvent> {
  icon: string,
  action: (arg: T) => void
}

defineProps<{
  buttons: Button[],
  moveable: boolean,
}>()

const emits = defineEmits(['onMoveEnd'])
const parentElement = inject<Ref<HTMLElement> | undefined>('parentElement');

const header = ref<HTMLElement | null>(null)
const { pressed } = useMousePressed({ target: header })
const { x, y } = useMouse()
const clickPosition = ref<WindowPosition>({ y: 0, x: 0 })

watch(
  () => pressed.value,
  () => {
    if (pressed.value) {
      document.addEventListener('mousemove', moveListener)
      parentElement?.value.classList.add('is-move')
    } else {
      document.removeEventListener('mousemove', moveListener)
      parentElement?.value.classList.remove('is-move')

      emits('onMoveEnd')
    }
  }
)

const moveListener = () => {
  if (pressed.value) {
    let top = y.value - clickPosition.value.y
    let left = x.value - clickPosition.value.x
    if (parentElement) {
      const xMin = clickPosition.value.x
      const xMax = window.innerWidth - (header.value!.offsetWidth - clickPosition.value.x + parentElement.value.clientLeft*2)
      if (xMin >= x.value) {
        left = xMin - clickPosition.value.x
      } else if (xMax <= x.value) {
        left = xMax - clickPosition.value.x
      }

      const yMin = clickPosition.value.y
      const yMax = window.innerHeight - parentElement.value.offsetHeight + clickPosition.value.y
      if (yMin >= y.value) {
        top = yMin - clickPosition.value.y
      } else if (yMax <= y.value) {
        top = yMax - clickPosition.value.y
      }

      if (top < 0) {
        top = 0
      }

      parentElement.value.style.top = `${top}px`
      parentElement.value.style.left = `${left}px`
    }
  }
}

function onStartMove(e : MouseEvent) {
  clickPosition.value = {  x: e.layerX, y: e.layerY }
  if (parentElement) {
    const top = y.value - clickPosition.value.y - parentElement.value.clientTop
    const left = x.value - clickPosition.value.x - parentElement.value.clientLeft

    parentElement.value.style.top = `${top}px`
    parentElement.value.style.left = `${left}px`
    parentElement.value.style.right = `inherit`
    parentElement.value.style.bottom = `inherit`
    parentElement.value.style.margin = '0'
  }
}
</script>

<template>
  <header class="title-bar">
    <div class="title-bar__buttons">
      <div
        v-for="(button, i) in buttons"
        :key="i"
        class="buttons__button"
        @click="button.action"
      >
        <AsyncIcon
          :name="button.icon"
          :size="8"
          :strokeWidth="5"
          color="#31322d"
        />
      </div>
    </div>
    <div class="title">
      <slot></slot>
    </div>
    <div
      v-if="moveable"
      class="move-handle"
      ref="header"
      @mousedown="onStartMove"
    />
  </header>
</template>

<style scoped lang="scss">
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
    display: flex;
    justify-content: center;
    flex-grow: 1;
    max-width: 100%;
    overflow: hidden;
    white-space: nowrap;

    & > * {
      max-width: calc(100% - 104px);
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
  .title, .title > * {
    font-weight: 600;
    color: var(--folder-title-bar-color);
  }

  .move-handle {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border-radius: 8px 8px 0 0;
    z-index: 1;
  }
  &__buttons {
    position: absolute;
    display: flex;
    gap: 6px;
    left: 12px;
    z-index: 2;

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
</style>
