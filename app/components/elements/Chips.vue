<script setup>
const props = defineProps({
  name: String,
  id: [String, Number],
  link: String,
  filterType: String,

  hoverColor: {
    type: String,
    default: 'transparent',
  },
})

const newsFilterStore = useNewsFilterStore()

const { draftFilters } = storeToRefs(newsFilterStore)

// Проверяем активность чипа по типу и ID
const isActive = computed(() => {
  if (props.link || !props.filterType) return false

  return draftFilters.value.some(item => {
    return (
      item.type === props.filterType &&
      String(item.id) === String(props.id)
    )
  })
})

const handleClick = event => {
  if (props.link) return

  event.preventDefault()
}
</script>

<template>
  <NuxtLinkLocale
    v-if="name"
    class="chips"
    :class="{ 'chips--active': isActive }"
    :to="link || undefined"
    @click="handleClick"
  >
    <Text
      :variant="[$typographyVariant.T_SMALL_16_MOB, $typographyVariant.T_BIG_36]"
      :font="$font.TTSMALLS_REGULAR"
      :color="$color.WHITE"
      class="chips__text"
    >
      {{ name }}
    </Text>

    <span
      class="chips__bg"
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
  transition: border-radius 0.2s ease;

  &:hover {
    cursor: pointer;
    border-radius: 0;

    .chips__bg {
      opacity: 1;
      border-radius: 0;
    }
  }

  &--active {
    border-radius: 0;

    .chips__bg {
      opacity: 1;
      border-radius: 0;
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
  transition: opacity 0.2s ease, border-radius 0.2s ease;
}
</style>