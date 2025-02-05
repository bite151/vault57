<script setup lang="ts">
// import AsyncIcon from "~/components/common/AsyncIcon.vue";
//
// const icons = ref([
//   {
//     key: 1,
//     title: 'My computer',
//     url: '/about',
//     icon: 'Laptop2'
//   },
//   {
//     key: 2,
//     title: 'Network',
//     url: '',
//     icon: 'Network'
//   },
//   {
//     key: 3,
//     title: 'Trash',
//     url: '',
//     icon: 'Trash2'
//   }
// ])
</script>

<template>
<!--  <div class="desktop-grid">-->
<!--    <nuxt-link-->
<!--      v-for="(block, n) in icons"-->
<!--      class="block"-->
<!--      :class="`block${block.key}`"-->
<!--      :key="block.key"-->
<!--      :to="block.url"-->
<!--    >-->
<!--      <AsyncIcon-->
<!--        :name="block.icon"-->
<!--        :stroke-width="1.6"-->
<!--      />-->
<!--      <span>{{ block.title }}</span>-->
<!--    </nuxt-link>-->
<!--  </div>-->
</template>

<style scoped lang="scss">
//.desktop-grid {
//  max-width: 1366px;
//  width: 100%;
//  min-width: 360px;
//  height: 90vh;
//
//  display: grid;
//  grid-template-columns: repeat(12, 1fr);
//  grid-template-rows: repeat(6, 1fr);
//  grid-column-gap: 8px;
//  grid-row-gap: 8px;
//}
//
//.block {
//  display: flex;
//  flex-direction: column;
//  justify-content: center;
//  align-items: center;
//  gap: 6px;
//
//  span {
//    font-weight: 600;
//    color: var(--desctop-icon-color);
//  }
//}
//.block1 { grid-area: 1 / 1 / 2 / 2; }
//.block2 { grid-area: 2 / 1 / 3 / 2; }
//.block3 { grid-area: 7 / 12 / 8 / 13; }
</style>
