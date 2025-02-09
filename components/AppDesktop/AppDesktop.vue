<script setup lang="ts">
import AsyncIcon from "~/components/common/AsyncIcon.vue";
import AlertDialog from "~/components/common/Modals/AlertDialog.vue";

const icons = ref([
  {
    key: 1,
    title: 'My computer',
    url: '/my-computer',
    icon: 'Laptop2'
  },
  {
    key: 2,
    title: 'Network',
    url: '#',
    icon: 'Network'
  },
  {
    key: 3,
    title: 'Trash',
    url: '/trash',
    icon: 'Trash2'
  },
  {
    key: 4,
    title: 'Settings',
    url: '#',
    icon: 'Settings'
  },
  {
    key: 5,
    title: 'Games',
    url: '/games',
    icon: 'Gamepad2'
  }
])
const showAlertDialog = ref<boolean>(false)
</script>

<template>
  <div class="desktop-grid">
    <template v-for="block in icons">
      <nuxt-link
        v-if="block.url !== '#'"
        :key="block.key"
        class="block"
        :class="`block${block.key}`"
        :to="block.url"
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

  <AlertDialog
    v-if="showAlertDialog"
    title="Error"
    message="A component in development"
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
    color: var(--desctop-icon-color);
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
