<script setup>
const props = defineProps({
  name: String,
  active: true
});
</script>

<template>
  <div class="filter" :class="{'filter--active': active}">
    <Text
      class="filter__text"
      :variant="[$typographyVariant.T_NORMAL_18_MOB, $typographyVariant.T_NORMAL_24]"
      :font="$font.TTSMALLS_REGULAR"
      :color="$color.GRAY"
    >{{ name }}</Text>
    <Text
      class="filter__plus"
      :variant="[$typographyVariant.T_NORMAL_18_MOB, $typographyVariant.T_NORMAL_24]"
      :font="$font.TTSMALLS_REGULAR"
      :color="$color.GRAY"
    > + </Text>
  </div>
</template>

<style lang="scss" scoped>
.filter  {
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: em(6);
  &--active {
    .filter__text {
      border-bottom: 1px solid var(--color-C_2101);
    }
  }
}

.filter__plus, .filter__text {
  padding-bottom: 10px;
}

.filter__text {
  border-bottom: 1px solid transparent;
  &:hover {
    border-bottom:  1px solid var(--color-C_2101);
  }
}
</style>