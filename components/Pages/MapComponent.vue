<script setup lang="ts">
import { shallowRef } from 'vue';
import {
  YandexMap,
  YandexMapDefaultSchemeLayer,
  YandexMapDefaultFeaturesLayer,
  YandexMapMarker,
} from 'vue-yandex-maps';
import type {VectorCustomization} from "@yandex/ymaps3-types";

const map = shallowRef<null>(null);
const location = ref(import.meta.client ? window.location.origin : null);
const customization = shallowRef<VectorCustomization>([
  {
    elements: 'geometry',
    stylers: [
      {
        opacity: 1,
        saturation: -.9,
      }
    ],
  },
]);
</script>

<template>
  <yandex-map
    v-model="map"
    :settings="{
        location: {
          center: [36.079531, 52.969292],
          zoom: 17,
          zoomRange: [17, 18]
        },
        behaviors: ['scrollZoom', 'drag'],
      }"
    class="map"
  >
    <yandex-map-default-scheme-layer
      :settings="{ customization }"
    />
    <yandex-map-default-features-layer/>
    <yandex-map-marker
      position="top-center left-center"
      :settings="{
        coordinates: [36.079531, 52.969292]
      }"
    >
      <img :src="`${location}/images/map-logo.png`" class="pin"/>
    </yandex-map-marker>
  </yandex-map>
</template>

<style scoped lang="scss">
.map {
  width: 100%;
  height: 100%;
}
.pin {
  cursor: pointer;
  max-width: unset;
  width: 160px;
  height: 160px;
  border-radius: 50%;
}
</style>
