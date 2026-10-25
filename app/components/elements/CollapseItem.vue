<script setup>
const props = defineProps({
  headerName: String,
  number: Number,
});

const isOpen = ref(false);

const openAccordion = () => {
  isOpen.value = !isOpen.value;
};
</script>

<template>
<div :class="['accordion', { 'accordion--active': isOpen }]" @click="openAccordion">
  <div class="accordion__header">
    <div class="accordion__header-numb">
      <Text
        :variant="[$typographyVariant.T_SUPER_BIG_30_MOB, $typographyVariant.T_SUPER_BIG_60]"
        :font="$font.TTSMALLS_MEDIUM"
        :color="$color.WHITE"
      >  {{ number }} </Text>
    </div>
    <Text
      class="accordion__header-text"
      :variant="[$typographyVariant.T_SUPER_BIG_30_MOB, $typographyVariant.T_SUPER_BIG_60]"
      :font="$font.TTSMALLS_MEDIUM"
      :color="$color.WHITE"
    >  {{ headerName }} </Text>
    <IconSvg
      class="accordion__icon accordion__icon--down"
      :name="$iconName.ARROW_DOWN"
      :size="[$iconSize.NEW_MEDIUM_MOB, $iconSize.LARGE]"
    />
    <IconSvg
      class="accordion__icon accordion__icon--close"
      :name="$iconName.CROSS"
      :size="[$iconSize.NEW_MEDIUM_MOB, $iconSize.LARGE]"
    />
  </div>
  <div class="accordion__content"> 
    <div class="accordion__content-hidden">
      <slot />
    </div>
  </div>
</div>
</template>

<style lang="scss" scoped>
.accordion {
  border-top: 1px solid var(--color-GRAY_LINE);
  border-bottom: 1px solid var(--color-GRAY_LINE);
  cursor: pointer;
  padding: em(40) 0;
  position: relative;
  
  &--active {
    .accordion__content {
      grid-template-rows: 1fr;
    }
    .accordion__icon {
      opacity: 1;
      &--down {
        z-index: -1;
      }
    }
  }

  &:hover {
    .accordion__icon--down {
      opacity: 1;
      right: em(0);
    }
  }
}

.accordion__header {
  display: flex;
  align-items: center;
  text-align: left;
  position: relative;
}

.accordion__header-numb {
  margin-right: em(27);
  width: em(40);
  @include mq('desktop') {
    margin-right: em(0);
    position: absolute;
    left: em(-157);
  }
}

.accordion__header-text {
  display: block;
  padding-right: 40px;
  @include mq('desktop') {
    padding-right: 0;
    width: calc(100% - em(40));
  }
}

.accordion__icon {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 0;
  transition: right .6s, opacity .4s;

  &--down {
    opacity: 1;
    right: 0;
    @include mq('desktop') {
      opacity: 0;
      right: em(40);
    }
  }

  &--close {
    opacity: 0;
  }

}

.accordion__content {
  display: grid;
  grid-template-rows: 0fr;
  overflow: hidden;
  transition: grid-template-rows 0.3s ease-out;
  max-width: em(900);
}

.accordion__content-hidden {
  min-height: 0;
}

</style>