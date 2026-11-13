<script setup>
const props = defineProps({
  src: {
    type: String,
    required: true,
  },

  poster: {
    type: String,
    default: "",
  },

  autoplay: {
    type: Boolean,
    default: false,
  },

  muted: {
    type: Boolean,
    default: false,
  },

  loop: {
    type: Boolean,
    default: false,
  },

  controls: {
    type: Boolean,
    default: true,
  },

  preload: {
    type: String,
    default: "metadata",
    validator: (value) => ["none", "metadata", "auto"].includes(value),
  },
});

const emit = defineEmits(["play", "pause", "ended", "error", "ready"]);
const videoRef = ref(null);
const isPlaying = ref(false);
const isReady = ref(false);
const hasError = ref(false);
const showPoster = ref(true)

const play = async () => {
  if (!videoRef.value) return

  try {
    await videoRef.value.play()
  } catch (error) {
    console.warn('Video playback failed:', error)
  }
}

const pause = () => {
  videoRef.value?.pause();
};

const onPlay = () => {
  isPlaying.value = true
  showPoster.value = false
  emit('play')
}

const onPause = () => {
  isPlaying.value = false;
  emit("pause");
};

const onReady = () => {
  isReady.value = true;
  emit("ready");
};

const onEnded = () => {
  isPlaying.value = false;
  emit("ended");
};

const onError = () => {
  hasError.value = true;
  isPlaying.value = false;
  emit("error");
};

const reset = () => {
  if (!videoRef.value) return

  videoRef.value.pause()
  videoRef.value.currentTime = 0

  isPlaying.value = false
  showPoster.value = true
}

watch(
  () => props.src,
  () => {
    isReady.value = false;
    hasError.value = false;
    isPlaying.value = false;
    nextTick(() => {
      videoRef.value?.load();
    });
  }
);

onBeforeUnmount(() => {
  pause();
});

defineExpose({
  play,
  pause,
  reset,
  isPlaying
})
</script>

<template>
  <div :class="['app-video', {'app-video--bg': showPoster && poster}]">
    <video
      ref="videoRef"
      :src="src"
      :autoplay="autoplay"
      :muted="muted || autoplay"
      :loop="loop"
      :controls="controls"
      :preload="preload"
      playsinline
      @playing="onPlay"
      @pause="onPause"
      @loadeddata="onReady"
      @ended="onEnded"
      @error="onError"
    />

    <img
      v-if="showPoster && poster"
      class="app-video__poster"
      :src="poster"
      alt=""
    />

    <picture>
      <source 
        media="(min-width:1920px)" 
        srcset="/video/bg-video-career_2x.webp" type="image/webp">
      <source 
        media="(min-width:1920px)"
        srcset="//video/bg-video-career_2x.png">
      <source 
        media="(min-width:1051px)" 
        srcset="/video/bg-video-career_desc.webp" type="image/webp">
      <source 
        media="(min-width:1051px)"
        srcset="/video/bg-video-career_desc.png">
      <source srcset="/video/bg-video-career_mob.webp" type="image/webp">
      <img 
        v-if="showPoster && poster"
        class="app-video__poster"
        :src="poster"
        alt="изображение для видео" 
        width="100%" 
        height="100%"
      />
    </picture>

    <slot v-if="hasError" name="error">
      <span class="app-video__error">
        Не удалось загрузить видео
      </span>
    </slot>
  </div>
</template>

<style lang="scss" scoped>
  .app-video {
    position: relative;
    width: 100%;
    overflow: hidden;
    &--bg {
      &::after {
        content: "";
        background-color: rgba(#121419, .5);
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 1;
      }
    }
    video {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &__poster {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  }
</style>

