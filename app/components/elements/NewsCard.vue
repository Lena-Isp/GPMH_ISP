
<script setup>
const props = defineProps({
  news: Object,
  numb: Number
})

const formatted = computed(() => {
  if (!props.news?.created_at) return ''

  return new Date(props.news.created_at)
    .toLocaleString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
    .replace(' г.', '')
})

const imageLoading = computed(() => {
  return props.numb === 0 ? 'eager' : 'lazy'
})

const imagePriority = computed(() => {
  return props.numb === 0 ? 'high' : null
})
</script>

<template>
  <NuxtLinkLocale class="news-card" :to="`/media/${news.slug}`">
    <div class="news-card__image">
      <picture>
        <source
          v-if="news?.image_webp"
          :srcset="news.image_webp"
          type="image/webp"
        />

        <img
          :src="news?.image || '/news_plug.png'"
          :alt="news?.image_alt || news?.name || ''"
          :loading="imageLoading"
          :fetchpriority="imagePriority"
          decoding="async"
        />
      </picture>
    </div>

    <div class="news-card__date">
      <Text
        :variant="[$typographyVariant.T_SMALL_16_MOB, $typographyVariant.T_SMALL_20]"
        :font="$font.TTSMALLS_REGULAR"
        :color="$color.GRAY"
      >
        {{ formatted }}
      </Text>
    </div>

    <div class="news-card__text">
      <Text
        :variant="[$typographyVariant.T_BIG_24_MOB, $typographyVariant.T_BIG_36]"
        :font="$font.MAREGRAPHE_REGULAR"
        :color="$color.WHITE"
      >
        {{ news.name }}
      </Text>
    </div>
  </NuxtLinkLocale>
</template>

<style lang="scss" scoped>
.news-card {
  width: 100%;
  display: block;
  height: 100%;

  @include mq('desktop') {
    position: relative;

    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      height: 0;
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
  width: 100%;
  aspect-ratio: 16 / 9;
  margin-bottom: em(10);
  overflow: hidden;

  picture {
    display: block;
    width: 100%;
    height: 100%;
  }

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform linear .3s;
  }

  @include mq('desktop') {
    height: em(400);
    aspect-ratio: auto;
    margin-bottom: em(30);
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
