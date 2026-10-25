<script setup>
import { ref } from 'vue'
const props = defineProps({
  text: String,
  isRotate: Boolean
});
</script>

<template>
  <button class="button-more">
    <Text
      :font="$font.TTSMALLS_MEDIUM"
      :variant="[$typographyVariant.T_NORMAL_20_MOB, $typographyVariant.T_NORMAL_24]"
    >{{ text }}</Text>
    <IconSvg
      :class="['button-more__plus', {'button-more__plus--rotate': isRotate}]"
      :name="$iconName.PLUS"
      :size="[$iconSize.SMALL_MOB, $iconSize.NEW_MEDIUM]"
    />
  </button>
</template>

<style lang="scss" scoped>
.button-more {
  display: flex;
  align-items: center;
  gap: em(10);
  @include mq('desktop') {
    gap: em(30);
  }
}
.button-more__plus {
  transition: transform .3s ease;
  &--rotate  {
    transform: rotate(135deg);
  }
} 

</style>