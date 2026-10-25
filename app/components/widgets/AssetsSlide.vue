<script setup>
const props = defineProps({
  categories: { type: Array, required: true, default: () => [] },
  modalValue: { type: Boolean, default: true }
})

const route = useRoute()
const router = useRouter()

const getIndexByHash = () => {
  if (!props.categories.length) return 0
  
  // Получаем чистый хэш без знака # (например, 'televidenie')
  const currentHash = route.hash?.slice(1)
  if (!currentHash) return 0

  // Ищем элемент, у которого slug совпадает с хэшем
  const foundIndex = props.categories.findIndex(item => item.slug === currentHash)
  
  // Если нашли — возвращаем индекс, если нет — стартуем с 0
  return foundIndex !== -1 ? foundIndex : 0
}

const activeIndex = ref(getIndexByHash())
const isTransitioning = ref(false)
let transitionTimer = null

watch(() => props.modalValue, (val) => {
  if (val) {
     activeIndex.value = getIndexByHash()
    isTransitioning.value = false
  } else {
    clearTimeout(transitionTimer)
    isTransitioning.value = false
  }
})

const nextIndex = computed(() => {
  if (props.categories.length === 0) return 0
  return (activeIndex.value + 1) % props.categories.length
})

const nextCategoryName = computed(() => {
  if (props.categories.length === 0) return ''
  return props.categories[nextIndex.value].name
})

const goNext = () => {
  if (isTransitioning.value || props.categories.length <= 1) return
  
  // 1. Находим слаг следующей категории, которая сейчас начнет выезжать
  const nextSlug = props.categories[nextIndex.value]?.slug
  
  if (nextSlug) {
    // 2. Меняем хэш в URL. 
    // router.push автоматически обновит route.hash, и заголовок модалки изменится синхронно с анимацией
    router.push({
      hash: `#${nextSlug}`
    })
  }

  // 3. Запускаем стандартную анимацию смены слайдов
  isTransitioning.value = true
  transitionTimer = setTimeout(() => {
    activeIndex.value = nextIndex.value
    isTransitioning.value = false
    transitionTimer = null
  }, 1000) // синхронизация с самой долгой анимацией
}

const clearHash = () => {
  router.push({
    path: route.path,
    query: {},
    hash: ''
  })
}

//очистка при размонтировании, что бы не было утечек памяти
onUnmounted(() => {
  clearTimeout(transitionTimer)
})
</script>

<template>
  <div 
    v-if="categories.length > 0" 
    :class="['assets-slide', 'assets-slide--'+ activeIndex]"
  >

    <!-- Текущий слайд -->
    <div
      :key="categories[activeIndex].id"
      class="assets-slide__block"
      :class="['assets-slide__block--'+ activeIndex, { 'slide-out-up': isTransitioning }]"
    >
        <div class="assets-slide__wrap slide">
          <div class="slide__header">
            <IconSvg
              :name="$iconName.CROSS" 
              :size="[$iconSize.LARGE, $iconSize.MEDIUM_MOB]"
              :color="$color.WHITE"
              @click="clearHash"
            />
            <Text
              tag="span"
              :variant="[$typographyVariant.T_BIG_24_MOB, $typographyVariant.T_BIG_36]"
              :font="$font.TTSMALLS_REGULAR"
              :color="$color.WHITE"
              class="category-title"
            >{{ categories[activeIndex].name }}</Text>
          </div>
          <Text
            tag="span"
            :variant="[$typographyVariant.T_BIG_24_MOB, $typographyVariant.T_SMALL_20]"
            :font="$font.TTSMALLS_REGULAR"
            :color="$color.WHITE"
            class="subcategory-title subcategory-title--televidenie"
            v-if="categories[activeIndex].slug === 'televidenie'"
          >Федеральные телеканалы</Text>
          <AssetsDirection :rawItems="categories[activeIndex]?.channels" variant="line" />
          <template v-for="assetDeep in categories[activeIndex]?.assetsDeep" :key="assetDeep.id">
            <Text
              tag="span"
              :variant="[$typographyVariant.T_BIG_24_MOB, $typographyVariant.T_SMALL_20]"
              :font="$font.TTSMALLS_REGULAR"
              :color="$color.WHITE"
              class="subcategory-title"
              v-if="categories[activeIndex].slug === 'televidenie'"
            >{{ assetDeep.name }}</Text>
            <AssetsDirection
              :rawItems="assetDeep?.channels"
              :assetsDeepSlug="`${assetDeep.slug}#`"
              variant="line"
            />
          </template>
        </div>
    </div>

    <!-- Следующий слайд -->
    <div
      v-if="categories.length > 1"
      class="assets-slide__block assets-slide__block--next"
      :class="[{ 'slide-in-up': isTransitioning }, `assets-slide__block--${nextIndex}`]"
      :key="'next-' + categories[nextIndex].id"
    >
      <div class="assets-slide__wrap">
        <span class="category-title">{{ categories[nextIndex].name }}</span>
        <span class="category-title-tel" v-if="categories[nextIndex].slug === 'televidenie'">фед кналы</span>
        <AssetsDirection :rawItems="categories[nextIndex]?.channels" variant="line" />
        <template v-for="assetDeep in categories[nextIndex]?.assetsDeep" :key="assetDeep.id">
          <span class="subcategory-title">{{ assetDeep.name }}</span>
          <AssetsDirection
            :rawItems="assetDeep?.channels"
            :assetsDeepSlug="`${assetDeep.slug}#`"
            variant="line"
          />
        </template>
      </div>
    </div>
  </div>
  <!--кнопка следующий слайд-->
  <button
    v-if="categories.length > 1"
    class="slideshow-next-btn"
    :class="['slideshow-next-btn--'+ nextIndex, { 'slide-out-up': isTransitioning }]"
    @click="goNext"
  >
    <Text
      tag="span"
      :variant="[$typographyVariant.T_BIG_24_MOB, $typographyVariant.T_NORMAL_24]"
      :font="$font.TTSMALLS_REGULAR"
      :color="$color.WHITE"
      class="slideshow-next-text"
    >{{ nextCategoryName }}</Text>
  </button>
</template>

<style lang="scss" scoped>
.assets-slide {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.assets-slide__block {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  box-sizing: border-box;
  background-color: var(--color-C_2726);
  transition: transform .3s linear, opacity .3s linear;
  z-index: 2;
  &::-webkit-scrollbar {
    width: 0!important;
  }
  &--next {
    transform: translateY(100vh);
    z-index: 3;
    transition: transform .3s linear;
    .assets-slide__wrap {
      transform: translateY(100vh);
      transition: transform .5s linear;
      transition-delay: .5s;
    }
  }
  &--0 { background-color: var(--color-C_2726); }
  &--1 { background-color: var(--color-C_2925); }
  &--2 { background-color: var(--color-C_2101); }
  &--3 { background-color: var(--color-C_285); }
  &--4 { background-color: var(--color-C_2728); }
  &--5 { background-color: var(--color-C_2736); }
  &--6 { background-color: var(--color-C_2758); }
  &--7 { background-color: var(--color-C_2925); }
  &--8 { background-color: var(--color-C_285); }
}

.assets-slide__block.slide-out-up {
  transform: translateY(-100vh);
  //opacity: 0;
}

.assets-slide__block--next.slide-in-up {
  transform: translateY(0);
  .assets-slide__wrap {
    transform: translateY(0);
  }
}

.assets-slide__wrap {
  margin-bottom: em(100);
  @include mq('desktop') {
    margin-bottom: em(50);
  }
}

.category-title {
  display: block;
  @include mq('desktop') {
    height: 5vh;
    display: none;
  }
}

.slide__header {
  display: flex;
  gap: em(20);
  padding: 24px 20px;
  border: 1px solid rgba(#D9D9D9, .2);
  align-items: center;
  @include mq('desktop') {
    padding: 0;
    border: 0;
  }
  svg {
    cursor: pointer;
    @include mq('desktop') {
      display: none;
    }
  }
}

.subcategory-title {
  display: inline-block;
  padding: 24px 20px;
  @include mq('desktop') {
    padding: em(32) em(24);
  }
}

.slideshow-next-btn {
  position: absolute;
  width: 100%;
  height: em(100);
  left: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  color: #fff;
  border: none;
  overflow: hidden;
  z-index: 10;
  padding-left: em(30);
  transition: height .3s linear, transform 0s linear;
  @include mq('desktop') {
    height: em(20);
  }
  &:hover {
    height: em(100)!important;
    .slideshow-next-text {
      opacity: 1;
    }
  }
  &--0 { background-color: var(--color-C_2726); }
  &--1 { background-color: var(--color-C_2925); }
  &--2 { background-color: var(--color-C_2101); }
  &--3 { background-color: var(--color-C_285); }
  &--4 { background-color: var(--color-C_2728); }
  &--5 { background-color: var(--color-C_2736); }
  &--6 { background-color: var(--color-C_2758); }
  &--7 { background-color: var(--color-C_2925); }
  &--8 { background-color: var(--color-C_285); }
}

.modal__item--right:hover {
  .slideshow-next-btn {
    @include mq('desktop') {
      height: em(50);
    }
  }
}

.slideshow-next-text {
  opacity: 1;
  transition: opacity .3s linear;
  @include mq('desktop') {
    opacity: 0;
  }
}

.slideshow-next-btn.slide-out-up {
  transition: transform .3s linear;
  transform: translateY(-100vh);
}

</style>