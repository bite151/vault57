<script setup lang="ts">
import { X } from "lucide-vue-next";
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import type { Page } from "~/types/Page";
import AsyncIcon from "~/components/common/AsyncIcon.vue";
import { generateUrl } from "~/helpers/app.helpers";

interface PropField {
  name: string;
  key: keyof Page;
}
const emits = defineEmits(['on-close'])
const { data } = defineProps<{ data: Page }>()

const propertiesModal = ref(null)
const propFields = ref<PropField[]>([
  { name: 'Имя', key: 'title' },
  { name: 'Путь', key: 'url' },
  { name: 'Создан', key: 'createdAt' },
  { name: 'Изменен', key: 'updatedAt' },
  { name: 'Автор', key: 'createdBy' },
])

onClickOutside(propertiesModal, event => emits('on-close'))
</script>

<template>
  <ClientOnly >
    <Teleport to="body">
      <div
        ref="propertiesModal"
        class="properties-modal"
      >
        <header class="title-bar">
          <div class="title-bar__buttons">
            <div class="buttons__button" @click="emits('on-close')">
              <X :size="8" :strokeWidth="5" color="#31322d"/>
            </div>
          </div>
          <p class="title">
            <span>{{ data.title }}</span>
            — Свойства
          </p>
        </header>

        <div class="content content_rounded">
          <div class="icon-wrapper">
            <AsyncIcon
              :name="data.icon"
              :size="72"
              :stroke-width="1"
            />
          </div>

          <div class="props">
            <p
              v-for="field in propFields"
              :key="field.key"
            >
              {{ field.name }}:
              <span>{{ field.key !== 'url' ? data[field.key] : generateUrl(data) }}</span>
            </p>
          </div>
        </div>
      </div>
    </Teleport>
  </ClientOnly>
</template>

<style scoped lang="scss">
.properties-modal {
  display: flex;
  flex-direction: column;
  max-width: 430px;
  width: 100%;
  min-width: 360px;
  min-height: 150px;
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
  padding: 10px 40px;
  border-bottom: 3px solid var(--folder-border-color);
  border-radius: 8px 8px 0 0;
  background: var(--folder-title-bar-bg-color);

  user-select: none;

  //cursor: move;

  .title {
    display: flex;
    align-items: center;
    white-space: nowrap;
    font-weight: 600;
    color: var(--folder-title-bar-color);
    span {
      max-width: 252px;
      margin-right: 4px;
      display: inline-block;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
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
  padding: 16px 8px;

  .icon-wrapper{
    padding: 8px;
    margin: 16px 0 20px;
    border: 1px solid #dcddd7;
    border-radius: 8px;
    background-color: #ebece6;
  }

  .props {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-bottom: 16px;
    p {
      color: #858583;
      text-align: center;
      span {
        color: #3e403b;
      }
    }
  }
}
</style>
