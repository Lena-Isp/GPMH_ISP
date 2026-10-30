<script setup>
const props = defineProps({
  name: String,
  optionId: [String, Number]
});

const newsFilterStore = useNewsFilterStore()
const { selectedFilters } = storeToRefs(newsFilterStore)

const dateFilterTypes = ['years', 'months']

const isFilterActive = (value) => {
  if (value === null) {
    return selectedFilters?.value?.length === 0
  }

  if (value === 'date') {
    return selectedFilters?.value?.some((item) =>
      dateFilterTypes.includes(item?.type)
    )
  }
  
  return selectedFilters?.value?.some(
    (item) => {
      return item?.type === value
    }
  )
}
</script>

<template>
  <div class="filter" :class="{'filter--active': isFilterActive(optionId)}">
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
    transition: border-bottom .3s ease;
    &:hover {
      border-bottom:  1px solid var(--color-C_2101);
    }
  }
</style>