<script setup lang="ts">
import type {PageWindow} from "~/types/Window";

const { screen } = defineProps<{
  screen: PageWindow
}>()

const fullHeightComponents = ['MapComponent']
const currentComponent = shallowRef(null)

watch(
  () => screen.mobile.contentComponent,
  (componentName) => {
    if (componentName) {
      currentComponent.value = defineAsyncComponent(() =>
        import(`~/components/CustomPageComponents/${componentName}.vue`)
      );
    }
  },
  { immediate: true }
);
</script>

<template>
  <div
    class="app-main app-custom"
  >
    <div
      class="app-title app-title_offset app-title_transition-none"
      :style="`${screen.mobile.background ? 'background: ' + screen.mobile.background : ''}`"
    >
      <h1>{{ screen.mobile?.title || screen.title }}</h1>
    </div>
    <component
      v-if="currentComponent"
      :is="currentComponent"
      class="custom-component-content"
      :class="{
        'content_full-height': fullHeightComponents.includes(screen.mobile.contentComponent),
      }"
    />
  </div>
</template>

<style scoped lang="scss">
.app {
  &-screen {
    position: fixed;
    width: 100%;
    height: 100%;
    max-width: 480px;
    background: #dededc;

    overflow-y: auto;
    overflow-x: hidden;
    transition: transform .4s ease, top .2s ease;
    z-index: 9;

    .blocker {
      position: fixed;
      width: 100%;
      height: 99999%;
      max-width: 480px;
      background: rgba(0, 0, 0, 0.2);
      z-index: 100;
    }
  }
  &-header {
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    height: 60px;
    display: flex;
    justify-content: center;
    z-index: 99;

    .header-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      max-width: 480px;
      height: 60px;
      padding: 12px 24px;
    }

    .menu-button {
      //margin-left: -4px;
      width: min-content;

      &_home {
        margin-top: 3px;
      }
    }
  }

  &-title {
    position: sticky;
    top: 0;
    padding: 12px 24px 0;
    background-color: #dededc;
    margin-bottom: 12px;
    transition: .3s ease-in-out;
    h1 {
      font-family: Play-Bold, sans-serif;
      font-size: 32px;
      font-weight: 600;
      line-height: 36px;
      transition: .5s ease-in-out;
    }

    &_transition-none {
      transition: none;
    }
    &_offset {
      margin-bottom: 0;
      padding: 12px 64px 12px 72px;
      h1 {
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 100%;
        overflow: hidden;
      }

      &::before {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        width: 100%;
        height: 24px;
        bottom: -24px;
        background: linear-gradient(180deg, rgba(222,222,220,1) 0%, rgba(255,255,255,0) 100%);
      }
    }
  }

  &-description {
    padding: 0 24px;
    font-size: 14px;
  }
  &-main {
    margin-top: -12px;
    &.app-custom {
      margin-top: -60px;

      .app-title {
        z-index: 1;
        background: rgba(#dededc, .5);
        &:before {
          display: none;
        }
      }

      .custom-component-content {
        height: calc(100dvh - 60px) !important;
        background: #dededc;

        &.content_full-height {
          height: 100dvh !important;
          margin-top: -60px;
        }
      }
    }
    .main-content {
      &_grid {
        padding: 24px;
        display: grid;
        grid-row-gap: 24px;
        grid-column-gap: 24px;
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      }
    }
  }
}
.component-wrapper {
  //height: calc(100dvh - 60px);
  height: 100dvh;
  margin-top: -60px;
}
.animate__faster {
  --animate-duration: 0.2s;
}
</style>
