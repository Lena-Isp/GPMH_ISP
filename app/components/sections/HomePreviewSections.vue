<script setup>
const props = defineProps({
  introData: {
    type: Object,
    default: []
  },
})
</script>

<template>
  <div class="preview">
    <div class="preview__header">
      <Text 
        tag="h1"
        :variant="[$typographyVariant.T_H2_50_MOB, $typographyVariant.T_H2_100]"
        :font="$font.MAREGRAPHE_REGULAR"
      >{{introData?.name}}</Text>
    </div>
    <div class="preview__content">
      <!--видео-->
      <template v-if="introData?.properties?.type === 'video'">
        <video 
          autoplay muted loop playsinline=""
          class="preview__video"
          v-for="(video, index) in introData?.media?.video"
          :key="index"
        >
          <source
            :src="video.src"
            type="video/mp4"
          >
          <source
            :src="video.src"
            type="video/webm"
          >
        </video>
      </template>
      <!--END видео-->

      <!--картинка-->
      <template v-if="introData?.properties?.type === 'image'">
        <img
          v-for="(image, index) in introData?.media?.image"
          class="preview__image"
          :src="image.src" 
          :alt="image.alt"  
          :key="index"
        >
      </template>
      <!--END картинка-->
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .preview {
    min-height: 100vh;
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  .preview__header {
    position: absolute;
    z-index: 1;
    bottom: em(100);
    left: em(10);
    max-width: em(270);
    opacity: .8;
    @include mq('desktop') {
      bottom: em(66);
      left: em(30);
      max-width: em(450);
    }
  }

  .preview__video, .preview__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    will-change: transform;
    opacity: .7;
  }
</style>
