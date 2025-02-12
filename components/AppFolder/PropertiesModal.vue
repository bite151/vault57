<script setup lang="ts">
import { X } from "lucide-vue-next";
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import type { Page } from "~/types/Page";
import AsyncIcon from "~/components/common/AsyncIcon.vue";
import { generateUrl } from "~/helpers/app.helpers";
import FinderHeader from "~/components/common/Finder/FinderHeader.vue";

interface PropField {
  name: string;
  key: keyof Page;
}
const emits = defineEmits(['on-close'])
const { data } = defineProps<{ data: Page }>()

const propertiesModal = ref(null)
provide('parentElement', propertiesModal);

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
        <FinderHeader
          :moveable="true"
          :buttons="[{
            icon: 'X',
            action: () => emits('on-close'),
          }]"
        >
          <span>{{ data.title }}</span>
          — Свойства
        </FinderHeader>

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

  &:deep(.title) {
    font-weight: 300;
  }
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
