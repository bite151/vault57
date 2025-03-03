<script setup lang="ts">
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import FinderHeader from "~/components/Desktop/Finder/FinderHeader.vue";

interface AlertDialogProps {
  title: string;
  message: string;
}

const emits = defineEmits(['on-close'])
const { title, message } = defineProps<AlertDialogProps>()

const alertDialog = ref(null)
provide('parentElement', alertDialog);

onClickOutside(alertDialog, event => emits('on-close'))
</script>

<template>
  <ClientOnly>
    <Teleport to="body">
      <Transition
        enter-active-class="animate__animated animate__fadeIn animate__faster"
        leave-active-class="animate__animated animate__fadeOut animate__faster"
        appear
      >
        <div
          ref="alertDialog"
          class="alert-dialog"
        >
          <FinderHeader
            :moveable="true"
            :buttons="[]"
          >
            {{ title }}
          </FinderHeader>

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
      </Transition>
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

  &.is-move {
    box-shadow: 30px 30px 0 0 var(--folder-shadow-light-color);
    transform: translateY(-5px) translateX(-5px) scale(1.01);

    .title-bar {
      cursor: grabbing
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

    user-select: none;
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

.animate__faster {
  --animate-duration: 0.7s;
}
</style>
