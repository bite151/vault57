<script setup lang="ts">
import {ref} from "vue";
import {useMouse, useMousePressed, useEventListener} from "@vueuse/core";

const emits = defineEmits(['onResizeEnd', 'onResizeStart'])
const resizer = ref(null)
const parentElement = inject<Ref<HTMLElement> | undefined>('parentElement')
const { pressed } = useMousePressed({ target: resizer })
const { x, y } = useMouse()
const clickPosition = ref<{ x: number, y: number }>({ x: 0, y: 0})

let stopListener: (() => void) | null = null

watch(
  () => pressed.value,
  (val) => {
    if (val) {
      stopListener = useEventListener('mousemove', resizeListener)
      document.body.classList.add('nwse-resize')
    } else {
      if (stopListener) {
        stopListener()
        stopListener = null
      }
      document.body.classList.remove('nwse-resize')

      emits('onResizeEnd')
    }
  }
)

function onStartResize() {
  if (!parentElement) return

  clickPosition.value = {
    x: parentElement.value.clientWidth + parentElement.value.offsetLeft,
    y: parentElement.value.clientHeight + parentElement.value.offsetTop
  }

  emits('onResizeStart')
}

const resizeListener = () => {
  if (!parentElement) return

  parentElement.value.style.height = y.value - parentElement.value.offsetTop + 'px'
  parentElement.value.style.width = x.value - parentElement.value.offsetLeft + 'px'
  parentElement.value.style.top = parentElement.value.offsetTop + 'px'
  parentElement.value.style.left = parentElement.value.offsetLeft +'px'
  parentElement.value.style.margin = '0'
}
</script>

<template>
  <footer class="status-bar">
    <slot></slot>
    <div
      ref="resizer"
      class="resizer"
      @mousedown="onStartResize"
    >
      <hr class="line-1" />
      <hr class="line-2" />
    </div>
  </footer>
</template>

<style scoped lang="scss">
.status-bar {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  height: 36px;
  position: relative;
  padding: 0 18px;
  border-top: 3px solid var(--folder-border-color);
  border-radius: 0 0 10px 0;

  background-color: var(--folder-status-bar-bg-color);
  font-weight: 600;
  color: var(--folder-status-bar-color);

  user-select: none;
  -webkit-user-drag: auto;
}

.resizer {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 10px;
  height: 10px;
  border-radius: 0 0 8px 0;
  cursor: nwse-resize;

  hr {
    position: relative;
    height: 1px;
    border: none;
    background-color: #b0b39f;
    transform: rotate(-45deg);
  }
  hr.line-1 {
    width: 16px;
    top: -8px;
    right: 7px;
  }
  hr.line-2 {
    width: 8px;
    top: -14px;
    right: 1px;
  }
}
</style>
