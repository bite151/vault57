<script setup lang="ts">
import { shallowRef } from 'vue';

import {
  YandexMap,
  YandexMapDefaultSchemeLayer,
  YandexMapDefaultFeaturesLayer,
  YandexMapMarker,
} from 'vue-yandex-maps';

const map = shallowRef<null>(null);
const location = ref(import.meta.client ? window.location.origin : null);
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
      :settings="{
        customization: [
          {
            elements: 'geometry',
            stylers: [
              {
                opacity: 1,
                saturation: -.9,
              }
            ],
          },
        ]
      }"
    />
    <yandex-map-default-features-layer/>
    <yandex-map-marker
      position="top-center left-center"
      :settings="{
        coordinates: [36.079531, 52.969292]
      }"
    >
      <img :src="`${location}/images/vault57_b1.png`" class="pin"/>
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
  width: 75px;
  height: 75px;
  border-radius: 50%;
}
</style>
