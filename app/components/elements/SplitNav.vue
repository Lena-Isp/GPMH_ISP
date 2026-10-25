<script setup>
const props = defineProps({
  news: String,
  textPrev: String,
  textNext: String,
  logoPrev: String,
  logoNext: String,
  linkPrev: String,
  linkNext: String
})
</script>

<template> 
  <div class="split-nav container-full">
    <div class="split-nav__block">
      <NuxtLinkLocale
        class="split-nav__item split-nav__item--left" 
        :to="linkPrev"
        @click="console.log('вверх')"  
      >
        <Text
          :variant="[$typographyVariant.T_SMALL_16_MOB, $typographyVariant.T_SMALL_20]"
          :font="$font.TTSMALLS_REGULAR"
          :color="$color.WHITE"
        >{{textPrev}}</Text>
        <span class="split-nav__logo" v-if="logoPrev">
          <img :src="logoPrev" alt="">
        </span>
        <IconSvg
          :name="$iconName.ARROW_LEFT" 
          :size="[$iconSize.NEW_MEDIUM_MOB, $iconSize.NEW_MEDIUM_MOB]"
          :color="$color.WHITE"
          class="split-nav__arrow split-nav__arrow--left"
          v-if="news"
        />
      </NuxtLinkLocale>
      <NuxtLinkLocale  
        class="split-nav__item split-nav__item--right"
        :to="linkNext"
        @click="console.log('вверх')"  
      >
        <Text
          :variant="[$typographyVariant.T_SMALL_16_MOB, $typographyVariant.T_SMALL_20]"
          :font="$font.TTSMALLS_REGULAR"
          :color="$color.WHITE"
        >{{textNext}}</Text>
        <span class="split-nav__logo" v-if="logoNext">
          <img :src="logoNext" alt="">
        </span>
        <IconSvg
          :name="$iconName.ARROW_RIGHT" 
          :size="[$iconSize.LARGE, $iconSize.NEW_MEDIUM_MOB]"
          :color="$color.WHITE"
          class="split-nav__arrow split-nav__arrow--right"
          v-if="news"
        />
      </NuxtLinkLocale>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.split-nav__block {
  display: flex;
  justify-content: space-between;
  height: 300px;
  flex-wrap: wrap;
  overflow: hidden;
  @include mq('desktop') {
    height: 20.8vw;
  }
  .split-nav__item {
    width: 50%;
    height: 100%; 
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: em(20) em($offset-base-mob) em(20) em($offset-base-mob);
    position: relative;
    span {
      max-width: 100px;
      @include mq('desktop') {
        max-width: none;
      }
    }
    @include mq('desktop') {
      padding: em(30) em($offset-base-desc) em(30) em($offset-base-desc);
      max-width: auto;
    }
    &--left {
      background-color: var(--color-C_285);
      .split-nav__logo {
        left: 0;
        @include mq('desktop') {
          left: em(-20);
        }
      }
    }
    &--right {
      background-color: var(--color-C_2726);
      .split-nav__logo{
        right: 0;
        @include mq('desktop') {
          right: em(-20);
        }
      }
      span {
        text-align: right;
        margin-left: auto;
      }
    }
    &:hover {
      .split-nav__logo img {
        @include mq('desktop') {
          width: 18vw;
        }
      }
    }
  }

  .split-nav__logo {
    position: absolute;
    bottom: -20px;
    @include mq('desktop') {
      bottom: em(-30);
    }
  }

  .split-nav__logo img {
    display: block;
    transition: width .4s;
    width: 140px;
    @include mq('desktop') {
      width: 16vw;
    }
  }
  .split-nav__arrow {
    text-align: right;
    @include mq('desktop') {
      display: none;
    }
    &--right {
      margin-left: auto;
    }
  }
}
</style>