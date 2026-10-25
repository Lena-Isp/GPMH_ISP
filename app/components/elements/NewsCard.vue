<script setup>
const props = defineProps({
  news: Object,
  numb: Number
})
const formatted = computed(() => {
  return new Date(props.news.created_at).toLocaleString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).replace(' г.', '')
})
</script>

<template>
  <NuxtLinkLocale class="news-card" :to="`/media/${news.slug}`">
    <div class="news-card__image">
      <picture>
        <source :srcset="news?.image_webp ? news?.image_webp : '/news_plug.webp'" type="image/webp" />
        <img
          :src="news?.image ? news?.image : '/news_plug.png'"
          :alt="news?.image_alt"
          width="100%"
          height="100%"
          :rel="numb <= 2 ? 'preload' : false"
          :fetchpriority="numb <= 2 ? 'high' : false"
        />
      </picture>
    </div>
    <div class="news-card__date">
      <Text
        :variant="[$typographyVariant.T_SMALL_16_MOB, $typographyVariant.T_SMALL_20]"
        :font="$font.TTSMALLS_REGULAR"
        :color="$color.GRAY"
      > {{ formatted }}</Text>
    </div>
    <div class="news-card__text">
      <Text
        :variant="[$typographyVariant.T_BIG_24_MOB, $typographyVariant.T_BIG_36]"
        :font="$font.MAREGRAPHE_REGULAR"
        :color="$color.WHITE"
      > {{ news.name }}</Text>
    </div>
  </NuxtLinkLocale>
</template>

<style lang="scss" scoped>
.news-card {
  width: 100%;
  display: block;
  height: 100%;

  @include mq('desktop') {
    //width: calc((100% - em(60)) / 3);
    position: relative;

    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      height: 0;
      //transform: translateY(20px);
      background-color: var(--color-C_2101);
      width: 100%;
      opacity: 0;
      transition: opacity .7s, height .3s;
    }

    &:hover {
      &::after {
        opacity: 1;
        height: em(20);
      }
      .news-card__image img {
        transform: scale(1.07);
      }
    }
  }
}

.news-card__image {
  margin-bottom: em(10);
  overflow: hidden;
  @include mq('desktop') {
    margin-bottom: em(30);
  }
  img {
    width: 100%;
    height: auto;
    transition: transform linear .3s;
    @include mq('desktop') {
      width: 100%;
      height: em(400);
      object-fit: cover;
    }
  }
}

.news-card__date {
  margin-bottom: em(10);
  @include mq('desktop') {
    margin-bottom: em(24);
  }
}

.news-card__text {
  margin-bottom: em(50);
  @include mq('desktop') {
    margin-bottom: em(92);
  }
}
</style>