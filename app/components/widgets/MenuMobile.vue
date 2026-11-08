<script setup>
const { menuNavigation } = useNavigation()
const { reloadChangeLang } = useLanguage()
const menu = useMenuStore()
const route = useRoute()
const theme = computed(() => route.meta.theme || 'dark')
</script>

<template>
  <Transition name="fade-slide">
    <div :class="`menu-mob-wrap menu-mob-wrap--${theme}`" v-if="menu.isOpen">
      <div class="menu-mob-inner">
        <!--пункты меню-->
        <NavNode
          v-for="node in menuNavigation" 
          :key="node.id" 
          :item="node"
        />
        <!--end пункты меню-->
        <div class="menu-mob-item menu-mob-item--lang">
          <Text
            tag="a" 
            href="#"
            @click.prevent="reloadChangeLang"
            :variant="$typographyVariant.T_MENU"
            :font="$font.TTSMALLS_REGULAR"
          > {{ $t('lang') }} </Text>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.menu-mob-wrap {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  padding-top: em($header-height-mob);
  background-color: var(--color-BLACK);
  display: flex;
  flex-direction: column;
  //gap: em(30);
  z-index: 1;
  padding-left: em(35);
  padding-right: em(10);
  color: var(--color-WHITE);
  overflow: hidden;
  &--light {
    color: var(--color-WHITE);
  }
  @include mq('desktop') {
    z-index: -1;
    opacity: 0;
    display: none;
  }
}
.menu-mob-inner {
  padding: em(40) 0;
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
}

.menu-mob-item {
  &--lang {
    margin-top: em(160);
  }
}

/* Стили для анимации */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: transform 0.4s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  transform: translateX(-100%); 
}
</style>
