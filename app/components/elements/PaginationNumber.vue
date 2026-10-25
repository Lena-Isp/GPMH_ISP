<script setup>
const props = defineProps({
  numbCurrent: [Number, String],
  numbAll: [Number, String],
  prev: Function,
  next: Function
});
</script>

<template>
  <div class="gallery-navigation">
  <IconSvg
    class="gallery-navigation__left"
    :name="$iconName.ARROW_GALLERY_LEFT"
    :size="[$iconSize.SPEC_SMALL_MOB, $iconSize.SPEC_MEDIUM]"
    :color="numbCurrent <= 1 ? $color.GRAY : $color.C_2101"
    @click="prev"
  />
  <div class="gallery-navigation__numb">
    <Text
      :variant="[$typographyVariant.T_NORMAL_20_MOB, $typographyVariant.T_NORMAL_30]"
      :font="$font.TTSMALLS_REGULAR"
      :color="$color.BLACK"
      >{{ numbCurrent }}/</Text>
    <Text
      :variant="[$typographyVariant.T_NORMAL_20_MOB, $typographyVariant.T_NORMAL_30]"
      :font="$font.TTSMALLS_REGULAR"
      :color="$color.BLACK"
      >{{ numbAll }}</Text>
  </div>
  <IconSvg
    class="gallery-navigation__right"
    :name="$iconName.ARROW_GALLERY_RIGHT"
    :size="[$iconSize.SPEC_SMALL_MOB, $iconSize.SPEC_MEDIUM]"
    :color="(numbCurrent == numbAll || numbCurrent > numbAll) ? $color.GRAY : $color.C_2101"
    @click="next"
  />
  </div>
</template>

<style lang="scss" scoped>
  .gallery-navigation {
    display: flex;
    align-items: center;
    gap: em(10);
  }
  .gallery-navigation__left, .gallery-navigation__right {
    cursor: pointer;
  }
</style>