<script setup>
</script>

<template>
<!--BlockSlider-->
<div class="about">
  <br /><br /><br />
  <div class="about__header">
    <Text 
      tag="h1"
      :variant="[$typographyVariant.T_H0_60_MOB, $typographyVariant.T_H0_250]"
      :font="$font.MAREGRAPHE_REGULAR"
    >{{ $t('about.name') }}</Text>
  </div>
  <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
  <div class="about__navigation container-full">
    <AboutNavigation />
  </div>
  <div class="about__next container-full">
    <PaginationPage 
      :text="$t('menu.media')"
      :link="`/${$i18n.locale}/media`"
    />
  </div>
</div>
</template>

<style scoped>
</style>
