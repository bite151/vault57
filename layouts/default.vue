<script setup lang="ts">
import Navigation from "~/components/AppFolder/Navigation/Navigation.vue";
import AppFolder from "~/components/AppFolder/AppFolder.vue";
import AppFile from "~/components/AppFile/AppFile.vue";

const loaded = ref<boolean>(false)
const route = useRoute()

onMounted(() => {
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
  </main>
</template>

<style scoped lang="scss">
main {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #c0c2be;
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
