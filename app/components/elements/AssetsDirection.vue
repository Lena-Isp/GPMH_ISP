<script setup>
const props = defineProps({
  rawItems: {
    type: Array,
    required: true,
    default: () => []
  },
  variant: {
    type: String,
    default: 'bg',
    validator: (value) => ['bg', 'line'].includes(value)
  }, 
  assetsDeepSlug: {
    type: String,
    default: '',
  }
});

// Добавление ячеек, если они не кратны 3
const fullItems = computed(() => {
  const currentLength = props?.rawItems?.length;
  const remainder = currentLength % 3;

  if (remainder === 0) return props.rawItems;

  const emptyCount = 3 - remainder;
  
  const emptyItems = Array.from({ length: emptyCount }, (_, index) => ({
    id: `empty-${currentLength}-${index}`, 
    isEmpty: true
  }));

  return [...props.rawItems, ...emptyItems];
});
</script>

<template>
  <div 
    class="grid-container"
    :class="`grid-container--${variant}`"
  >
    <NuxtLink
      v-for="value in fullItems" 
      :key="value?.id"
      class="grid-item" 
      :class="[`grid-item--${value.slug}`, { 'is-empty': value?.isEmpty }]"
      :to="variant == 'bg' 
        ? !value?.isEmpty && `#${value.slug}` || ''
        : !value?.isEmpty && `business/partner/${assetsDeepSlug}${value?.slug}` || ''
      "
    >
      <Text
        tag="span"
        :variant="[$typographyVariant.T_BIG_24_MOB, $typographyVariant.T_BIG_36]"
        :font="$font.TTSMALLS_REGULAR"
        :color="$color.WHITE"
        v-if="variant == 'bg'"
      >{{ value.name }}</Text>
      <IconSvg
        :name="$iconName.ARROW_UP" 
        :size="[$iconSize.NEW_MEDIUM_MOB, $iconSize.LARGE ]"
        :color="$color.WHITE"
        class="grid-item__icon" 
        v-if="variant == 'bg'"
      />
      <img :src="value.logo" alt="" v-else />
    </NuxtLink>
  </div>
</template>

<style lang="scss" scoped>
.grid-container {
  display: grid;
  box-sizing: border-box;
  &--bg {
    grid-template-columns: 1fr;
    grid-auto-rows: minmax(em(200), auto);
    @include mq('desktop') {
      grid-template-columns: repeat(3, 1fr);
      grid-auto-rows: em(360);
    }
    .grid-item {
      padding: em(20) 0 0  em(10);
      @include mq('desktop') {
        padding: em(30) 0 0  em(30);
      }
    }
    span {
      @include mq('desktop') {
        display: inline-block;
        max-width: em(148);
      }
    }
  }
  &--line {
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 33.2vw;
    @include mq('desktop') {
      grid-auto-rows: 16.8vw;
    }
    img {
      display: block;
      height: 100%;
      max-width: 100%;
    }
  }
}

.grid-item {
  box-sizing: border-box;
  border: 1px solid var(--color-GRAY_LINE);
  background-color: transparent;
  color: #ffffff;
  position: relative;
  transition: background-color .5s linear;
}

.grid-container--bg {
  .grid-item {
    position: relative;
    // Мобилка: логика для 1 колонки
    &:nth-child(n+2) {
      border-top: none;
    }
    &.is-empty {
      display: none;
    }
    // Десктоп: логика для 3-х колонок
    @media (min-width: 1050px) {
      &.is-empty {
        display: flex;
        cursor: default;
        &:hover {
          .grid-item__icon {
            opacity: 0;
            transform: translateX(0);
          }
        }
      }
      &:nth-child(n+2) {
        border-top: 1px solid var(--color-GRAY_LINE);
      }
      &:nth-child(n+4) {
        border-top: none;
      }
      &:not(:nth-child(3n+1)) {
        border-left: none;
      }
    }
    &--televidenie:not(.is-empty):hover { background-color: var(--color-C_2726); }
    &--cifrovie-platformi:not(.is-empty):hover { background-color: var(--color-C_2925); }
    &--digital-technologies:not(.is-empty):hover { background-color: var(--color-C_2101); }
    &--proizvodstvo-i-distribucia-kontenta:not(.is-empty):hover { background-color: var(--color-C_285); }
    &--production_center:not(.is-empty):hover { background-color: var(--color-C_2728); }
    &--radio:not(.is-empty):hover { background-color: var(--color-C_2736); }
    &--pressa-i-online-izdania:not(.is-empty):hover { background-color: var(--color-C_2758); }
    &--reklama:not(.is-empty):hover { background-color: var(--color-C_2925); }
    &--nedvijimost:not(.is-empty):hover { background-color: var(--color-C_285); }
    &:hover {
      .grid-item__icon {
        opacity: 1;
        transform: translateX(0);
      }
    }
  }
}

.grid-item__icon {
  position: absolute;
  right: em(20);
  bottom: em(20);
  opacity: 1;
  transform: translateX(0);
  transition: opacity .3s linear, transform .3s linear;
  // Десктоп: логика для 3-х колонок
  @media (min-width: 1050px) {
    display: block;
    position: absolute;
    right: em(30);
    bottom: em(30);
    opacity: 0;
    transform: translateX(em(-40));
  }
}

.grid-container--line {
  .grid-item {
    border: 1px solid rgba(#D9D9D9, .2);
    // Пустые ячейки всегда видны как flex-боксы, чтобы держать сетку 3х3
    &.is-empty {
      display: flex;
      cursor: default;
    }

    // Правила схлопывания для 3-х колонок (работают на любом разрешении)
    &:nth-child(n+4) {
      border-top: none;
    }
    &:not(:nth-child(3n+1)) {
      border-left: none;
    }

    // Интерактив: утолщение линии
    &:not(.is-empty) {
      &::after {
        content: '';
        position: absolute;
        bottom: -1px;
        left: 0;
        width: 100%;
        height: 0px;
        background-color: #ffffff; 
        transition: height .4s ease;
      }

      &:hover {
        &::after {
          height: em(10);
        }
      }
    }
  }
}
</style>