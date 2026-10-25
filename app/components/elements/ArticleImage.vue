<script setup>
const props = defineProps({
  sectionData: {
    type: Object,
    default: null,
  },
})

const { locale } = useI18n()

const image = computed(() => {
  if (props.sectionData && props.sectionData.config && props.sectionData.config.img) {
    return props.sectionData.config?.img;
  }
})

const previewText = computed(() => {
  if (
    props.sectionData &&
    props.sectionData.config &&
    props.sectionData.config["preview_text_" + locale.value]
  ) {
    return props.sectionData.config["preview_text_" + locale.value];
  }
})
</script>

<template>
  <div class="article-image">
    <img class="article-image__picture" :src="process.env.API_URL + Image" :alt="PreviewText"/>
    <div class="article-image__text" v-if="previewText">
      <Text
        :variant="[$typographyVariant.T_NORMAL_18_MOB, $typographyVariant.T_NORMAL_24]"
        :font="$font.TTSMALLS_REGULAR"
        :color="$color.GRAY"
      >{{ previewText }}</Text>
    </div>
  </div>
</template>

<style lang="scss">
.article-image {
  margin-top: em(60);
  @include mq('desktop') {
    margin-top: em(100);
  }
}

.article-image__picture {
  width: 100%;
  height: auto;
}

.article-image__text {
  margin-top: em(40);
  max-width: em(730);
}
</style>