<script setup>
const props = defineProps({
  date: {
    type: String,
  },
  slug: {
    type: String,
  },
  text: {
    type: String,
  },
});

const formatDate = (isoString) => {
  const date = new Date(isoString);
  
  const months = [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
  ];
  
  const day = date.getUTCDate();
  const month = months[date.getUTCMonth()];
  const year = date.getUTCFullYear();
  
  return `${day} ${month} ${year}`;
}
</script>

<template>
  <NuxtLinkLocale
    class="assets-news"
    :to="`/media/${slug}`"
  >
    <div class="assets-news__left">
      <Text
        tag="span"
        :variant="[$typographyVariant.T_SMALL_16_MOB, $typographyVariant.T_SMALL_20]"
        :color="$color.GRAY"
      >{{ formatDate(date) }}</Text>
    </div>
    <div class="assets-news__right">
      <Text
        tag="span"
        :variant="[$typographyVariant.T_BIG_24_MOB, $typographyVariant.T_BIG_36]"
        :color="$color.BLACK"
      >{{ text }}</Text>
    </div>
    <IconSvg
      :name="$iconName.ARROW_UP" 
      :size="[$iconSize.LARGE, $iconSize.LARGE_MOB]"
      class="assets-news__arrow"
    />
  </NuxtLinkLocale>
</template>

<style lang="scss" scoped>
.assets-news {
  display: block;
  background-color: var(--color-WHITE);
  position: relative;
  padding: em(20) 0 em(25);
  overflow: hidden;
  @include mq('desktop') {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    padding: em(60) 0;
  }
  &::after {
    content: '';
    position: absolute;
    height: 1px;
    left: 0;
    top: 0;
    width: 100%;
    background-color: var(--color-GRAY_LINE);
    @include mq('desktop') {
      transform: translateX(calc(630/1860 * 100%));
      transition: transform .3s linear;
    }
  }
  &:last-child::before {
    content: '';
    position: absolute;
    height: 1px;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: var(--color-GRAY_LINE);
    @include mq('desktop') {
      transform: translateX(calc(630/1860 * 100%));
      transition: transform .3s linear;
    }
  }
  &:hover {
    &::after {
      transform: translateX(0);
    }
    + .assets-news::after {
      transform: translateX(0);
    }
    &:last-child::before {
      transform: translateX(0);
    }
    .assets-news__arrow {
      @include mq('desktop') {
        transition: transform .5s linear, opacity .5s linear;
        transform: translateY(-50%) translateX(0);
        opacity: 1;
      }
    }
  }
}

.assets-news__left {
  padding-bottom: em(12);
  @include mq('desktop') {
    padding-left: calc(315/1860 * 100%);
    padding-bottom: 0;
    padding-top: em(10);
    width: calc(630/1860 * 100%);
  }
}
.assets-news__right {
  @include mq('desktop') {
    width: calc(1230/1860 * 100%);
  }
}
.assets-news__arrow {
  display: none;
  @include mq('desktop') {
    display: block;
    position: absolute;
    top: 50%;
    transform: translateY(-50%) translateX(em(230));
    left: 0;
    opacity: 0;
  }
}
</style>