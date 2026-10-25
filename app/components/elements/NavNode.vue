<script setup>
const props = defineProps({
  item: { type: Object, required: true },
  depth: { type: Number, default: 0 }, // для определени уровеня вложенности
  mode: { type: String, default: 'horizontal' }, // 'horizontal' или 'vertical'
  classes: { type: String}, // 'horizontal' или 'vertical'
  links: { type: String}, // 'horizontal' или 'vertical'
})

const { locale } = useI18n()

const route = useRoute()

const menu = useMenuStore()

const theme = computed(() => route.meta.theme || 'dark')

const prefix = `/${locale.value}`

const isOpenDepth = ref(false)//для вертикального меню

const isOpenDepthDesc = ref(false)//для вертикального меню

const toggleDepth = () => {
  if (props.mode === 'vertical' && props.item.channels) {
    isOpenDepth.value = !isOpenDepth.value
  }
}
const setOverlay = (val) => {
  isOpenDepthDesc.value = val
}
const onEnter = () => {
  if (props.mode === 'horizontal' && props.item.channels) {
    setOverlay(true)
  }
  //menu.isDesktopMenuOpen = true
}
const onLeave = (depth) => {
  if (props.mode === 'horizontal' && depth == 0) {
    //menu.isDesktopMenuOpen = false
    setOverlay(false)
  }
}
</script>

<template>
  <div 
    :class="[
      depth > 0 ? `nav-item nav-item--depth-${depth + 1}` : `nav-item nav-item--${theme} is-${mode}`,
      {'nav-item--active': prefix+item.to == route.path },
      classes
    ]"
    :style="{ paddingLeft: depth > 0 ? '15px' : false }"
    @mouseenter="onEnter" 
    @mouseleave="onLeave(depth)"
  >
    <!-- Ссылка (без вложенности) -->
    <Text
      v-if="!item.channels"
      tag="NuxtLinkLocale"
      :to="depth > 1 ? `/business/partner/${item?.slug}` : item?.slug"
      class="nav-link"
      :target="item.external ? '_blank' : undefined"
      :rel="item.external ? 'noopener noreferrer' : undefined"
      :variant="depth > 0 ? $typographyVariant.T_LINKS_20 : $typographyVariant.T_MENU"
      :font="$font.TTSMALLS_REGULAR"
    > {{ $t(item.name) }}</Text>

   <!-- Подменю -->
    <template v-else>
      <div class="nav-toogle">
        <Text
          tag="NuxtLinkLocale"
          :to=" depth > 0 ? links : item.slug"
          active-class="nav-link--active"
          :target="item.external ? '_blank' : undefined"
          :rel="item.external ? 'noopener noreferrer' : undefined"
          :variant="depth > 0 ? $typographyVariant.T_LINKS_20 : $typographyVariant.T_MENU"
          :font="$font.TTSMALLS_REGULAR"
        > {{ $t(item.name) }}</Text>
        <button @click="toggleDepth" class="nav-toogle-button" v-if="item.channels?.length">
          <IconSvg
            :name="$iconName.CROSS_MOB_MENU" 
            :size="[$iconSize.SMALL_CROSS_MOB, $iconSize.SMALL_CROSS]"
            class="arrow-rotated" :class="{ 'is-rotated': isOpenDepth }"
          />
        </button>
      </div>
      <div 
        v-if="(mode === 'horizontal' && isOpenDepthDesc) || (mode === 'vertical' && isOpenDepth)"
        :class="['nav-wrap', `nav-wrap--depth-${(depth+1) + 1}`]"
      >
        <!-- РЕКУРСИЯ: Компонент вызывает сам себя -->
        <NavNode 
          v-for="child in item.channels" 
          :key="child.id" 
          :item="child " 
          :depth="depth + 1"
          :mode="mode"
          :links="depth > 0 ? `/business/partner/${child.slug}` : `/business#${child.slug}`"
          classes="channels-deep"
        />
        <NavNode
          v-for="child in item.assetsDeep" 
          :key="child.id" 
          :item="child" 
          :depth="depth + 1"
          :mode="mode"
          :links="`/business/partner/${child.slug}`"
          classes="assetsDeep"
        />
      </div>
    </template>
    <!-- End Подменю -->
  </div>
</template>

<style lang="scss" scoped>
.is-horizontal.nav-item {
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
    .nav-wrap--depth-2 {
      opacity: 1;
    }
  }
  &--light {
    .nav-wrap--depth-2 {
      color: var(--color-WHITE);
    }
  }
  
  //первая вложенность
  .nav-wrap--depth-2 {
    @include mq('desktop') {
      position: absolute;
      top: 100%;
      left: 0;
      width: max-content;
      opacity: 0;
      transition: opacity .3s ease-in-out;
      padding-top: em(50);
    }
  }
  .nav-item--depth-2 {
    @include mq('desktop') {
      padding-left: em(15)!important;
      padding-bottom: em(22);
      &:hover {
        color: var(--color-C_2101);
      }
    }
  }
  //End первая вложенность
}

//стили для мобильного меню
//отступы
.is-vertical.nav-item {
  padding-top: em(30);
  &:first-child {
    padding-top: 0;
  }
}
.is-vertical .nav-item {
  padding-top: em(20);
  &:first-child {
    padding-top: em(30);
  }
}
.is-vertical .nav-wrap {
  margin-bottom: em(15);
}
//end отступы

.is-vertical {
  .nav-toogle {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
.nav-toogle-button {
   @include mq('desktop') {
    display: none;
  }
}
.arrow-rotated { 
  display: inline-block; 
  transform: rotate(45deg);
  transition: transform .3s ease;
}
.arrow-rotated.is-rotated { 
  transform: rotate(90deg); 
}

.assetsDeep, .channelsDeep {
  position: relative;
}

.channels-deep > .nav-wrap {
  @include mq('desktop') {
    display: none;
    position: absolute;
    left: 0;
    top: em(27);
    z-index: 5;
    width: 300px;
    background-color: whitesmoke;
  }
}

.assetsDeep > .nav-wrap {
  @include mq('desktop') {
    display: none;
    position: absolute;
    left: 100%;
    top: em(25);
    z-index: 5;
    width: 300px;
    background-color: whitesmoke;
  }
}
</style>