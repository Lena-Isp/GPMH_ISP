<script setup>
const { locale } = useI18n()

const props = defineProps({
  slug: {
    type: String,
  },
  thumb: {
    type: String,
  },
  date: {
    type: String,
  },
  name: {
    type: String,
  },
  partnerName: {
    type: [String, Array],
  },
});

const { getFormatted } = useFormattedDate()
</script>

<template>
  <div class="search-item">
    <NuxtLinkLocale class="search-item__link" :to="`/media/${slug}`">
      <div class="search-item__img">
        <img loading="lazy" :src="thumb ? thumb : '/news_plug.png'" alt="" />
      </div>
      <div class="search-item__text">
        <Text
          :variant="[$typographyVariant.T_H4_24_MOB, $typographyVariant.T_H4_36]"
          :font="$font.TTSMALLS_REGULAR"
          :color="$color.WHITE"
        >{{ name }}</Text>
        <div class="search-item__date search-item__date--mob">
          <Text
            :variant="[$typographyVariant.T_SMALL_16_MOB, $typographyVariant.T_SMALL_20]"
            :font="$font.TTSMALLS_REGULAR"
            :color="$color.WHITE"
          >{{ getFormatted(date) }}</Text>
        </div>
        <div class="search-item__text-partner">
          <Text
            :variant="[$typographyVariant.T_SUPER_SMALL_14_MOB, $typographyVariant.T_SUPER_SMALL_16]"
            :font="$font.TTSMALLS_REGULAR"
            :color="$color.WHITE"
          >{{ partnerName }}</Text>
        </div>
      </div>
      <div class="search-item__date">
        <Text
          :variant="[$typographyVariant.T_SMALL_16_MOB, $typographyVariant.T_SMALL_20]"
          :font="$font.TTSMALLS_REGULAR"
          :color="$color.GRAY"
        >{{ getFormatted(date) }}</Text>
      </div>
    </NuxtLinkLocale>
  </div>
</template>

<style lang="scss" scoped>
  .search-item {
    border-top: 1px solid var(--color-GRAY_LINE);
    padding: em(20) 0 em(40);
    position: relative;
    overflow: hidden;
    &:hover {
      &::after  {
        transform: translateX(0);
      }
    }
    @include mq('desktop') {
      padding: em(40) 0;
    }
    &:last-child {
      border-bottom: 1px solid var(--color-GRAY_LINE);
    }
    &::after  {
      content: "";
      position: absolute;
      width: 100%;
      height: 1px;
      top: 0;
      background-color: var(--color-C_2736);
      transform: translateX(-100%);
      transition: transform .5s;
    }
  }

  .search-item__link {
    display: flex;
    flex-wrap: wrap;
    gap: 0;
    width: 100%;
    justify-content: space-between;
    @include mq('desktop') {
      gap: em(30);
    }
  }

  .search-item__img {
    flex-basis: auto;
    width: 100%;
    height: auto;
    margin-bottom: em(30);
    @include mq('desktop') {
      width: em(600);
      height: em(401);
      margin-bottom: auto;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .search-item__text {
    flex-grow: 1;
    flex-basis: auto;
    width: 100%;
    order: 1;
    @include mq('desktop') {
      width: em(800);
      order: auto;
      order: 0;
    }
  }

  .search-item__text-partner {
    @include mq('desktop') {
      margin-top: em(30);
    }
    span {
      border: 1px solid var(--color-GRAY_LINE);
      display: inline-block;
      padding: em(14) em(14) em(10);
      border-radius: 250px;
      text-transform: uppercase;
      @include mq('desktop') {
        padding: em(14) em(14) em(12);
      }
    }
  }

  .search-item__date {
    width: em(200);
    text-align: right;
    color: var(--color-GRAY);
    display: none;
    @include mq('desktop') {
      display: block;
    }
    &--mob {
      display: block;
      text-align: left;
      margin: em(30) 0;
      @include mq('desktop') {
        display: none;
      }
    }
  }

</style>