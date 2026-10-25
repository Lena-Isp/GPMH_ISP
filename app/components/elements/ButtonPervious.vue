<!--
Использование в компоненте:
  <ButtonPervious
    link="/about"
    :text="$t('index.allAssets.title')"
  />
-->
<script setup>
const props = defineProps({
  link: String,
  text: String,
  color: String,
});
</script>

<template>
  <nuxtLinkLocale class="button-pervious" :to="link">
    <IconSvg
      :name="$iconName.ARROW_GALLERY_LEFT"
      :color="color || $color.WHITE"
      :size="[$iconSize.SMALL_PREV_MOB, $iconSize.SPEC_SMALL]"
    />
    <Text
      :variant="[$typographyVariant.T_SMALL_16_MOB, $typographyVariant.T_SMALL_20]"
      :color="color || $color.WHITE"
      :font="$font.TTSMALLS_MEDIUM"
    >{{ text }}</Text>
  </nuxtLinkLocale>
</template>

<style lang="scss" scoped>
.button-pervious {
  display: flex;
  gap: em(10);
  align-items: center;
}
</style>