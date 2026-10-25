<!--
Использование в компоненте:
  <Links
    isRevert
    link="/about"
    :text="$t('index.allAssets.title')"
  />
-->
<script setup>
const props = defineProps({
  isRevert: {
    type: Boolean,
    default: false,
  },
  link: String,
  text: String,
});
</script>

<template>
  <nuxtLinkLocale
    :to="link"
    :class="[ 'links', { 'links--revert': isRevert } ]"
  >
    <IconSvg
      :name="$iconName.ARROW_UP"
      :size="[$iconSize.NEW_MEDIUM, $iconSize.SMALL_MOB]"
      class="links__icon"
    />
    <Text
      tag="span"
      :variant="$typographyVariant.T_LINKS_20"
      :font="$font.TTSMALLS_MEDIUM"
      :color="$color.C_2101"
      class="links__text"
      >{{ text }}</Text>
  </nuxtLinkLocale>
</template>

<style lang="scss" scoped>
.links {
  display: flex;
  align-items: baseline;
  gap: em(20);
  @include mq('desktop') {
    gap: em(30);
  }
  &--revert {
    svg {
      order: 0;
      @include mq('desktop') {
        order: 1;
      }
    }
  }
}

.links__icon, .links__text {
  display: inline-block;
}
</style>
