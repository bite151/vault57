<script setup lang="ts">
import Navigation from "~/components/AppFolder/Navigation/Navigation.vue";
import AppFolder from "~/components/AppFolder/AppFolder.vue";
import AppFile from "~/components/AppFile/AppFile.vue";

const loaded = ref<boolean>(false)
const route = useRoute()

onMounted(() => {
  // if (import.meta.client) {
  //   const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  //   console.log('prefers-color-scheme: dark', darkModeMediaQuery.matches);
  //   darkModeMediaQuery.addEventListener('change', (e) => {
  //     const darkModeOn = e.matches;
  //     console.log(`Dark mode is ${darkModeOn ? '🌒 on' : '☀️ off'}.`);
  //   });
  // }
  setTimeout(() => loaded.value = true, 500)
})
</script>

<template>
  <main
    :class="{ loaded }"
    id="main-content"
  >
    <AppFolder
      class="content-window"
      :class="{ 'content-window_visible': loaded }"
    >
      <template #navigation>
        <Navigation />
      </template>
      <NuxtPage />
    </AppFolder>

    <AppFile
      v-if="route.params.file"
      class="content-file"
      :class="{ 'content-file_visible': loaded }"
    />
    <div class="background"></div>
  </main>
</template>

<style scoped lang="scss">
main {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: var(--desctop-bg-color);

  overflow: hidden;
  //background-image: url("/images/vault57_b1.png");
  //background-repeat: no-repeat;
  //background-position: center center;
}

.content-window, .content-file {
  transform: translateY(100vh) scale(.5);
  opacity: 0;
  visibility: hidden;

  transition: transform .3s ease-in-out, opacity .4s ease-in-out,  visibility .4s ease-in-out;

  &_visible {
    transform: translateY(0) scale(1);
    opacity: 1;
    visibility: visible;
  }
}

//.content-file{ transition-delay: 1s }
</style>
