<script setup>
const { locale } = useI18n();
</script>

<template>
<nuxtLinkLocale class="logo" to="/">
  <IconSvg
    :name="locale === 'ru' ? $iconName.LOGO_RU : $iconName.LOGO_EN"
    :size="$iconSize.LOGO_SIZE"
  />
</nuxtLinkLocale>
</template>

<style lang="scss" scoped>
.logo {
  display: inline-block;
  height: em($header-height-mob);
  @include mq('desktop') {
    height: em($header-height-desc);
  }
  svg {
    height: 100%;
  }
}
</style>