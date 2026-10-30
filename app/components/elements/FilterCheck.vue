<script setup>
const props = defineProps({
  name: String
});

</script>

<template>
  <div class="filter-checked" :class="{'filter-checked--all': !name }">
    <Text
      class="filter-checked__text"
      :variant="[$typographyVariant.T_SMALL_16_MOB, $typographyVariant.T_SMALL_20]"
      :font="$font.TTSMALLS_REGULAR"
      :color="$color.white"
    >{{ name }} ×</Text>
  </div>
</template>

<style lang="scss" scoped>
  .filter-checked {
    display: flex;
    align-items: center;
    gap: 0 em(0);
    border: 1px solid var(--color-GRAY_LINE);
    border-radius: 250px;
    padding: em(10) em(10) em(7);
    cursor: pointer;
    &--all {
      padding: em(16) em(14) em(14);
      height: em(40);
    }
  }
</style>