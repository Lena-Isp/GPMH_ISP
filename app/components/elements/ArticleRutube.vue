<script setup>
const props = defineProps({
  sectionData: {
    type: Object,
    default: null
  },
})

const videoRutube = computed(() => {
  if (props.sectionData && props.sectionData.config && props.sectionData.config.embed) {
    return props.sectionData.config.embed;
  }
})

const previewText = computed(() => {
  if (props.sectionData && props.sectionData.config && props.sectionData.config.caption) {
    return props.sectionData.config.caption;
  }
})
</script>

<template>
  <div class="article-rutube">
    <iframe  
      :src="videoRutube"
      class="article-rutube__video"
      frameBorder="0" allow="clipboard-write; autoplay" 
      webkitAllowFullScreen 
      mozallowfullscreen 
      allowFullScreen
    ></iframe>  
    <div class="article-rutube__text" v-if="PreviewText">
      <Text
        :variant="[$typographyVariant.T_NORMAL_18_MOB, $typographyVariant.T_NORMAL_24]"
        :font="$font.TTSMALLS_REGULAR"
        :color="$color.GRAY"
      >{{ previewText }}</Text>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .article-rutube {
    margin-top: em(60);
    @include mq('desktop') {
      margin-top: em(100);
    }
  }

  .article-rutube__video {
    width: 100%;
    height: auto;
    aspect-ratio: 16 / 9;
  }

  .article-rutube__text {
    margin-top: em(40);
    max-width: em(730);
  }
</style>
