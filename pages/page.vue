<script setup lang="ts">
const { isMobile } = useDevice()

// const MobileComponent = defineAsyncComponent(() => import("~/components/Mobile/MobileComponent.vue"));
// const DesktopComponent = defineAsyncComponent(() => import("~/components/Desktop/DesktopComponent.vue"));

const PageComponent = computed(() => isMobile.value
  ? defineAsyncComponent(() => import("~/components/Mobile/MobileComponent.vue"))
  : defineAsyncComponent(() => import("~/components/Desktop/DesktopComponent.vue"))
)
</script>

<template>
  <component :is="PageComponent" />
<!--  <component :is="isMobile ? MobileComponent : DesktopComponent " />-->
</template>

<style scoped lang="scss">

</style>
