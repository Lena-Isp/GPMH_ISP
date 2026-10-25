<script setup>
const props = defineProps({
  name: String,
  link: String,
  hoverColor: { type: String, default: 'transparent' } 
});
</script>

<template>
<NuxtLinkLocale class="chips" :to="link" v-if="name" >
  <Text
    :variant="[$typographyVariant.T_SMALL_16_MOB, $typographyVariant.T_BIG_36]"
    :font="$font.TTSMALLS_REGULAR"
    :color="$color.WHITE"
    class="chips__text"
  > {{ name }}</Text>
  <span class="chips__bg"
    :style="{ 
      'background-color': hoverColor
    }"
/>
</NuxtLinkLocale>
</template>

<style lang="scss" scoped>
.chips {
  border: 1px solid var(--color-GRAY_LINE);
  padding: em(15) em(20) em(10);
  border-radius: 245px;
  position: relative;
  z-index: 1;
  display: inline-block;
  overflow: hidden;
  text-transform: uppercase;
  &:hover {
    .chips__bg {
      opacity: 1;
    }
  }
}

.chips__text {
  position: relative;
  z-index: 1;
}

.chips__bg {
  position: absolute;
  display: block;
  width: calc(100% + 2px);
  height: calc(100% + 2px);
  left: -1px;
  top: -1px;
  opacity: 0;
  z-index: 0;
}
</style>