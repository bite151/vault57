<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import AsyncIcon from "~/components/Common/AsyncIcon.vue";

const props = defineProps({
  src: { type: String, required: true },
  posterUrl: { type: String, default: '' },
  autoplay: { type: Boolean, default: false },
  muted: { type: Boolean, default: false }
});

const videoEl = ref(null);
const hlsInstance = ref(null);
const isLoading = ref(true);
const error = ref(null);
const isPlaying = ref(false);
const duration = ref(0);
const volume = ref(false);
const showControls = ref(false);
const isMobile = ref(false);


const loadHls = async () => {
  try {
    const Hls = (await import('hls.js')).default;
    return Hls;
  } catch (e) {
    error.value = 'Не удалось загрузить видеоплеер';
    return null;
  }
};

const initPlayer = async () => {
  if (!process.client) return;

  try {
    isMobile.value = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

    const Hls = await loadHls();
    if (!Hls) return;

    if (hlsInstance.value) {
      hlsInstance.value.destroy();
    }

    const hls = new Hls({
      maxBufferLength: 15,
      maxMaxBufferLength: 30,
      enableWorker: true,
      lowLatencyMode: true
    });

    hls.on(Hls.Events.MEDIA_ATTACHED, () => {
      hls.loadSource(props.src);
    });

    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      if (props.autoplay) {
        videoEl.value.play().catch(e => {
          console.warn('Autoplay blocked:', e);
          videoEl.value.muted = props.muted;
          videoEl.value.play();
        });
      }
      duration.value = videoEl.value.duration;
      isLoading.value = false;
    });

    hls.on(Hls.Events.ERROR, (_, data) => {
      if (data.fatal) {
        switch (data.type) {
          case Hls.ErrorTypes.NETWORK_ERROR:
            error.value = 'Ошибка сети';
            hls.startLoad();
            break;
          case Hls.ErrorTypes.MEDIA_ERROR:
            error.value = 'Ошибка медиа';
            hls.recoverMediaError();
            break;
          default:
            error.value = 'Критическая ошибка';
            initPlayer();
            break;
        }
      }
    });

    hls.attachMedia(videoEl.value);
    hlsInstance.value = hls;

    let controlsTimeout;
    const resetControlsTimer = () => {
      clearTimeout(controlsTimeout);
      showControls.value = true;
      controlsTimeout = setTimeout(() => {
        showControls.value = false;
      }, 3000);
    };

    resetControlsTimer();

  } catch (err) {
    error.value = err.message;
    isLoading.value = false;
  }
};

const togglePlay = () => {
  if (videoEl.value.paused) {
    videoEl.value.play().then(() => {
      isPlaying.value = true;
    });
  } else {
    videoEl.value.pause();
    isPlaying.value = false;
  }
};

const setVolume = () => {
  volume.value = !volume.value
  videoEl.value.muted = !volume.value
};

onMounted(() => {
  initPlayer();
  volume.value = false
  videoEl.value.muted = true
});

onBeforeUnmount(() => {
  if (hlsInstance.value) {
    hlsInstance.value.destroy();
  }
});
</script>

<template>
  <div class="hls-player-container" :class="{ 'is-loading': isLoading }">
    <video
      ref="videoEl"
      playsinline
      :poster="posterUrl"
      class="video-embed"
      @click="togglePlay"
    />

    <div class="custom-controls" :class="{ 'is-hidden': !showControls }">
      <button class="control-btn" @click="setVolume">
        <AsyncIcon v-if="volume" name="Volume2" color="#fff" :size="18" :stroke-width="1.9"/>
        <AsyncIcon v-if="!volume" name="VolumeOff" color="#fff" :size="18" :stroke-width="1.9"/>
      </button>
    </div>
  </div>
</template>


<style scoped lang="scss">
.hls-player-container {
  position: relative;
  max-width: 100%;
  height: 100%;
  //background: #000;
  overflow: hidden;
}

.video-embed {
  width: 100%;
  display: block;
  cursor: pointer;
}

.custom-controls {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: opacity 0.3s;
}

.custom-controls.is-hidden {
  //opacity: 0;
}

.control-btn {
  //background: rgba(0, 0, 0, 0.5);
  border: none;
  color: #fff;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
}

.volume-slider {
  width: 80px;
}

.time-display {
  color: #31322d;
  font-size: 12px;
  margin-left: auto;
}

.loader,
.error-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #31322d;
}
</style>
