<script setup>
import { NAVIGATION } from '~/constants/navigation'

const { locale } = useI18n();

const route = useRoute()

const { reloadChangeLang } = useLanguage()

const menu = useMenuStore()

const theme = computed(() => route.meta.theme || 'dark')

const themeColorSvg = computed(() => {
  const { $color } = useNuxtApp() //для использования в computed
  if (menu.isOpen && route.meta.theme === 'light') return $color.WHITE 
  if (route.meta.theme === 'light') return $color.BLACK
  return $color.WHITE
})

</script>

<template>
  <header :class="[ 
    'header container-full', 
    `header--${theme}`,
  ]">
    <Logo class="header__logo" />

    <MenuDesc />
    
    <div class="header__search">
    <NuxtLinkLocale 
      class="header__search-link" 
      to="/search"
    >
      <IconSvg 
        :name="$iconName.SEARCH_ICON" 
        :size="[$iconSize.SMALL_MOB, $iconSize.SMALL]"
        :color="themeColorSvg"
      />
    </NuxtLinkLocale>
    </div>

    <Text
      tag="a"
      href="#"
      class="header__lang hide-mobile"
      to="/search"
      :variant="$typographyVariant.T_SMALL_20"
      :font="$font.TTSMALLS_REGULAR"
      @click.prevent="reloadChangeLang"
    > {{ $t('lang')}} </Text>

    <MenuBurger class="header__burger" />
  </header>

  <Teleport to="#teleports">
    <MenuMobile />
  </Teleport>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  min-height: em($header-height-mob);
  z-index: 2;
  @include mq('desktop') {
    min-height: em($header-height-desc);
    z-index: 2;
    &::before {
      content: "";
      transition: opacity .3s ease;
      opacity: 0;
      left: 0;
      bottom: 0;
      width: 100%;
      height: em(1);
      background-color: var(--color-GRAY_LINE);
      position: absolute;
      z-index: 0;
    }
  }
  &--line {
    @include mq('desktop') {
      &::before {
        opacity: 1;
        left: 0;
      }
    }
  }
  &--light {
    @include mq('desktop') {
      background-color: var(--color-WHITE);
    }
  }
}

.header__logo {
  position: relative;
  z-index: 3;
}


.header__lang {
  @include mq('desktop') {
    margin-right: em(30);
  }
}

.header__search {
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: auto;
  text-align: right;
  margin-right: em(38);
  line-height: 0;
  @include mq('desktop') {
    margin-right: calc(436/1920 * 100%);
    line-height: auto;
  }
}

</style>