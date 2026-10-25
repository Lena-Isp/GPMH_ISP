<script setup>
  import { NAVIGATION } from '~/constants/navigation'
  
  const aboutChannels = NAVIGATION.find(item => item.id === 3)?.channels ?? [];
</script>

<template>
  <div class="about-nav">
    <div class="about-nav__item"
      v-for="(item, index) in aboutChannels"
      :key="index"
    >
      <Text
        class="about-nav__title"
        tag="NuxtLinkLocale"
        :variant="[$typographyVariant.T_NORMAL_20_MOB, $typographyVariant.T_BIG_36 ]"
        :font="$font.TTSMALLS_REGULAR"
        :to="item.slug"
        :target="item.external ? '_blank' : undefined"
        :rel="item.external ? 'noopener noreferrer' : undefined"
      >{{ $t(item.name) }}</Text>

      <IconSvg
        class="about-nav__arrow"
        :name="$iconName.ARROW_UP"
        :size="[$iconSize.NEW_MEDIUM_MOB, $iconSize.LARGE]"
        :color="$color.WHITE"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>

.about-nav {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  border: 1px solid var(--color-GRAY_LINE);
  @include mq('desktop') {
    height: em(600);
  }
}

.about-nav__item {
  display: block;
  position: relative;
  width: calc(100% / 2);
  background-color: rgba($color: #0082FF, $alpha: 0);
  transition: background-color .5s;
  border-right: 1px solid var(--color-GRAY_LINE);
  height: em(300);
  padding: em(20) 0 0 em(10);
  &:nth-child(1), &:nth-child(2) {
    border-bottom: 1px solid var(--color-GRAY_LINE);
  }
  &:nth-child(2), &:nth-child(4) {
    border-right: 0;
  }
  &:hover {
    background-color: rgba($color: #0082FF, $alpha: 1);
    cursor: pointer;
    .about-nav__arrow {
      opacity: 1;
      transform: translateX(0);
    }
  }
  @include mq('desktop') {
    width: calc(100% / 4);
    height: 100%;
    padding: em(30) 0 0 em(30);
    &:nth-child(1), &:nth-child(2) {
      border-bottom: 0;
    }
    &:nth-child(2), &:nth-child(4) {
      border-right: 1px solid rgba($color: #939393, $alpha: .5);;
    }
    &:last-child {
      border-right: 0;
    }
  }
}

.about-nav__title {
  display: block;
  height: 100%;
}

.about-nav__arrow {
  position: absolute;
  bottom: em(30);
  right: em(30);
  transition: .5s;
  opacity: 1;
  transform: translateX(0);
  @include mq('desktop') {
    transform: translateX(em(-30));
    opacity: 0;
  }
}

</style>