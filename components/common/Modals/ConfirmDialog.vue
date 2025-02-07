<script setup lang="ts">
import { X } from "lucide-vue-next";
import type { ConfirmDialogProps } from "~/types/ConfirmDialog";
import type {Page} from "~/types/Page";
import {ref} from "vue";
import {onClickOutside} from "@vueuse/core";

const emits = defineEmits(['on-close'])
const { title, dialog, buttons, data } = defineProps<ConfirmDialogProps<Page>>()

const confirmDialog = ref(null)
onClickOutside(confirmDialog, event => emits('on-close'))
</script>

<template>
  <ClientOnly >
    <Teleport to="body">
      <div
        ref="confirmDialog"
        class="confirm-dialog"
      >
        <header class="title-bar">
          <div class="title-bar__buttons">
            <div class="buttons__button" @click="emits('on-close')">
              <X :size="8" :strokeWidth="5" color="#31322d"/>
            </div>
          </div>
          <h1 class="title">{{ title }}</h1>
        </header>

        <div class="content content_rounded">
          <p>{{ dialog }}</p>
          <div class="content__buttons">
            <button
              v-for="button in buttons"
              class="buttons__button"
              @click="button.action(data)"
            >
              <span>{{ button.text }}</span>
            </button>
          </div>
        </div>

      </div>
    </Teleport>
  </ClientOnly>

</template>

<style scoped lang="scss">
.confirm-dialog {
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

  //cursor: move;

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
