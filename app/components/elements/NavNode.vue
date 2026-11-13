<script setup>
const props = defineProps({
  item: { type: Object, required: true },
  depth: { type: Number, default: 0 }, // для определени уровня вложенности
  classes: { type: String},
  links: { type: String},
})

const { locale } = useI18n()
const route = useRoute()
const menu = useMenuStore()

const isOpenDepth = ref(false)
const isOpenDepthDesc = ref(false)

const theme = computed(() => route.meta.theme || 'dark')
const currentPartnerId = computed(() => String(route.params.id || ''))

const containsCurrentPartner = (item) => {
  const children = [
    ...(item.channels || []),
    ...(item.assetsDeep || [])
  ]
  return children.some(child => String(child.slug) === currentPartnerId.value || containsCurrentPartner(child))
}

const normalizeHash = (hash = '') => {
  try {
    return decodeURIComponent(String(hash).replace(/^#/, '')).trim()
  } catch {
   return String(hash).replace(/^#/, '').trim()
  }
}

// Убираем префикс текущей локали из адреса страницы.
const currentPath = computed(() => {
  const localePrefix = `/${locale.value}`
  if (route.path === localePrefix) return '/'
  return route.path.startsWith(`${localePrefix}/`)
    ? route.path.slice(localePrefix.length)
    : route.path
})

// Получаем реальный адрес пункта меню.
const getItemPath = (item) => {
  if (item.external) return null
  if (item.static || props?.depth === 0) item.link
  return props.links || item.link
}

// Проверяем активность пункта меню.
const isItemActive = (item) => {
  const target = getItemPath(item)

  if (!target) return false

  const [targetPath, ...hashParts] = target.split('#')
  const targetHash = hashParts.join('#')

  // Для категорий активность определяется по hash.
  if (targetHash) {
    return (
      currentPath.value === targetPath &&
      normalizeHash(route.hash) === normalizeHash(targetHash)
    )
  }

  // Для обычных страниц учитываем вложенные маршруты.
  return (
    currentPath.value === targetPath ||
    currentPath.value.startsWith(`${targetPath}/`)
  )
}

// Первый уровень отвечает за подчёркивание родительского пункта.
// Вложенные уровни получают цвет активной цепочки.
const isActiveBranch = computed(() => {
  if (isItemActive(props.item)) return true
  // Проверяем категорию и её вложенные элементы.
  if (props?.depth === 1 && currentPartnerId.value) {
    return containsCurrentPartner(props.item)
  }
  return false
})

const isActiveLink = computed(() => {
  return isActiveBranch.value
})

const toggleDepth = () => {
  if (props.item.channels) {
    isOpenDepth.value = !isOpenDepth.value
  }
}
</script>

<template>
  <div
    :class="[`nav-item nav-item--depth-${depth + 1}`, classes]"
    :style="{ paddingLeft: depth == 2 ? '46px' : false }"
  >
    <!-- Пункт меню(без выпдающего меню) -->
    <Text
      v-if="!item.channels"
      tag="NuxtLinkLocale"
      :to="item?.link"
      :variant="depth > 0
        ? $typographyVariant.T_LINKS_20
        : $typographyVariant.T_MENU"
      :font="$font.TTSMALLS_REGULAR"
      class="nav-link"
      :class="depth == 0 
        ?  { 'nav-link--active': isActiveBranch }
        :  { 'nav-link--active-depth': isActiveBranch }
      "
      :target="item.external ? '_blank' : undefined"
      :rel="item.external ? 'noopener noreferrer' : undefined"
    >{{ $te(item.name) ? $t(item.name) : item.name }}</Text>
    <!-- END Пункт меню(без выпдающего меню) -->

    <template v-else>
      <!-- Пункт меню(с выпдающим меню) -->
      <div :class="`nav-toogle`">
        <div class="nav-toogle__block">
          <Text
            class="nav-toogle__block-numb"
            :variant="$typographyVariant.T_LINKS_20"
            :font="$font.TTSMALLS_REGULAR"
            :color="$color.GRAY_LINE"
            v-if="item?.assetsCount"
          > {{ item?.assetsCount }}</Text>
          <Text
            tag="NuxtLinkLocale"
            :to="item?.link"
            class="nav-link"
            :class="depth == 0 
              ?  { 'nav-link--active': isActiveBranch }
              :  { 'nav-link--active-depth': isActiveBranch }
            "
            :target="item.external ? '_blank' : undefined"
            :rel="item.external ? 'noopener noreferrer' : undefined"
            :variant="depth > 0
              ? $typographyVariant.T_LINKS_20
              : $typographyVariant.T_MENU"
            :font="$font.TTSMALLS_REGULAR"
            >{{ $te(item.name) ? $t(item.name) : item.name }}</Text>
        </div>
        <button @click="toggleDepth" class="nav-toogle-button" v-if="item.channels?.length">
          <IconSvg
            :name="$iconName.CROSS_MOB_MENU"
            :size="[$iconSize.SMALL_CROSS_MOB, $iconSize.SMALL_CROSS]"
            class="arrow-rotated" :class="{ 'is-rotated': isOpenDepth }"
          />
        </button>
      </div>
      <!-- END пункт меню(с выпдающим меню) -->
      <!-- выпдающее меню -->
      <Transition name="submenu">
        <div 
          v-if="isOpenDepth"
          class="nav-wrap submenu-transition"
        >
          <!-- РЕКУРСИЯ: Компонент вызывает сам себя -->
          <NavNode 
            v-for="child in item.channels" 
            :key="child.id" 
            :item="child " 
            :depth="depth + 1"
            :links="child?.link"
            classes="channels-deep"
          />
          <NavNode
            v-for="child in item.assetsDeep" 
            :key="child.id" 
            :item="child" 
            :depth="depth + 1"
            :links="child?.link"
            classes="assets-deep"
          />
        </div>
      </Transition>
      <!-- выпдающее меню -->
    </template>
  </div>
</template>

<style lang="scss" scoped>
  .nav-wrap {
    display: flex;
    flex-direction: column;
    gap: em(20);
    .nav-item:first-child {
      padding-top: em(20);
    }
  }

  .nav-toogle {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .nav-toogle__block {
    display: flex;
    align-items: flex-start;
    gap: em(20);
  }
  
  //стили для активных ссылок
  .nav-link--active {
    color: var(--color-WHITE);
    border-bottom: 2px solid var(--color-C_2101);
  }
  .nav-link--active-depth {
    color: var(--color-C_2101);
  }
  //end стили для активных ссылок

  .nav-toogle__block-numb {
    width: 24px;
  }

  .nav-toogle-button {
    display: inline-flex;
    @include mq('desktop') {
      display: none;
    }
  }

  .arrow-rotated { 
    display: inline-block; 
    transition: transform .3s ease;

    &.is-rotated { 
      transform: rotate(135deg); 
    }
  }

  .assets-deep, .channels-deep {
    position: relative;
  }

  .channels-deep > .nav-wrap, .assets-deep > .nav-wrap  {
    @include mq('desktop') {
      display: none;
    }
  }

  //Анимация
  .submenu-enter-active,.submenu-leave-active {
    max-height: 500px;
    opacity: 1;
    overflow: hidden;
    transition:
    max-height 0.35s ease,
    opacity 0.25s ease;
  }

  .submenu-enter-from, .submenu-leave-to {
    max-height: 0;
    opacity: 0;
  }

</style>