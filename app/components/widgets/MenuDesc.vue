<script setup>
import { NAVIGATION } from '~/constants/navigation'

const partnerStore = usePartnerStore()
const menu = useMenuStore()
const route = useRoute()

const theme = computed(() => route.meta.theme || 'dark')

//Добавление партнеров в массив NAVIGATION
const addsPartnerNav = (nav) => {
  return nav.map((item, index)=> {
    if (item.id == 1) item.channels = partnerStore?.categoriesWithAssets
    return item
  })
}

const partnerNav = computed(() => addsPartnerNav(NAVIGATION))

const onOpen = () => {
  menu.isDeskHide = true
}

const onLeave = () => {
  menu.isDeskHide = false
}
</script>

<template>
  <div :class="`navigation navigation--${theme}`" @mouseleave="onLeave">
    <div
      v-for="navItem in partnerNav" 
      :key="navItem.id" 
      :item="navItem"
      class="navigation__item"
      @mouseenter="onOpen"
    >
      <Text
        :to="navItem.slug"
        :target="navItem.external ? '_blank' : undefined"
        :rel="navItem.external ? 'noopener noreferrer' : undefined"
        :variant="$typographyVariant.T_LINKS_20"
        :font="$font.TTSMALLS_REGULAR"
        tag="NuxtLinkLocale"
        class="navigation__link"
      > {{ $t(navItem?.name) }}</Text>

      <!--блок появляющийся при наведении-->
      <div class="navigation__deep" v-if="menu.isDeskHide">
        <template 
          v-for="navItemDeep in navItem?.channels" 
          :key="navItemDeep.id" 
        >
        <NuxtLinkLocale 
          :to="navItemDeep.static ? navItemDeep.slug : `/business#${navItemDeep.slug}`"
          class="navigation__link-wrap"
        >
          <Text
            :variant="$typographyVariant.T_LINKS_20"
            :font="$font.TTSMALLS_REGULAR"
            :color="$color.GRAY_LINE"
            class="navigation__count"
          >{{ navItemDeep?.assetsCount }}</Text>
          <Text
            :variant="$typographyVariant.T_LINKS_20"
            :font="$font.TTSMALLS_REGULAR"
            class="navigation__link navigation__link--deep"
          >{{ navItemDeep.static ? $t(navItemDeep.name) : navItemDeep?.name }}</Text>
        </NuxtLinkLocale>
        </template>
      </div>
      <!--end блок появляющийся при наведении-->

    </div>
  </div>
  <Teleport to="#teleports">
    <Transition name="fade">
      <MenuOverlay v-if=" menu.isDeskHide"/>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
.navigation {
  display: none;
  @include mq('desktop') {
    display: flex;
    align-self: stretch;
    align-items: center;
    margin-left: calc(129/1920 * 100%);
  }
  &--light {
    .navigation__deep {
      color: var(--color-WHITE);
    }

  }
}

.navigation__item {
  position: relative;
  display: flex;
  align-self: stretch;
  align-items: center;
  cursor: pointer;
  overflow: hidden;
  padding-left: em(15);
  padding-right: em(15);
   &::before {
    content: "";
    position: absolute;
    left: em(15);
    bottom: 0;
    width: calc(100% - em(30));
    height: em(6);
    background-color: var(--color-C_2101);
    transform: translateY(em(7)) scaleY(0);
    transition: transform .3s ease-in-out;
  }
  &--active, &:hover {
    overflow: visible;
    &::before {
      transform: translateY(0) scaleY(1);
    }
    .navigation__deep {
      opacity: 1;
    }
  }

  &--light {
    .navigation__deep {
      color: var(--color-WHITE);
    }
  }
}

.navigation__deep {
  position: absolute;
  top: 100%;
  padding-top: em(44);
  width: max-content;
  opacity: 0;
  transition: opacity .3s ease-in-out;
  max-width: em(250);
}

.navigation__link-wrap {
  display: block;
  padding-bottom: em(22);
}

.navigation__link {
  display: block;
  position: relative;
  &--deep {
    &:hover {
      color: var(--color-C_2101);
      .navigation__text {
        color: var(--color-C_2101);
      }
    }
  }
}

.navigation__count {
  position: absolute;
  right: calc(100% + em(15));
  color: var(--color-C_2101);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .3s ease;
}

.fade-enter-from {
  opacity: 0;
}

.fade-leave-to {
  opacity: 0;
}
</style>