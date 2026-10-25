<script setup>
const props = defineProps({
  name: String,
  link: String,
  active: { type: Boolean, default: false },
  hoverColor: { type: String, default: 'transparent' } 
});
</script>

<template>
<button
  v-if="!link && name"
  type="button"
  class="chips"
  :class="{ 'chips--active': active }"
  :aria-pressed="active ? 'true' : 'false'"
>
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
</button>
<NuxtLinkLocale v-else-if="name" class="chips" :to="link">
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
  background: transparent;
  color: inherit;
  font: inherit;
  cursor: pointer;
  &:hover {
    .chips__bg {
      opacity: 1;
    }
  }
  &--active {
    border-color: var(--color-C_2101);
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