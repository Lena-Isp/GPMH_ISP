<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'

const props = defineProps({
  slides: {
    type: Array,
    default: () => []
  },
  slidesPerView: {
    type: Number,
    default: 1
  },
  slidesPerGroup: {
    type: Number,
    default: 1
  },
  loop: {
    type: Boolean,
    default: false
  },
  autoplay: {
    type: [Boolean, Object],
    default: false
  }
})

const modules = [Autoplay]

const swiperInstance = ref(null)
const currentSlide = ref(0)
const isPaused = ref(false)

// Фактическое количество слайдов в группе, которое использует Swiper
const actualSlidesPerGroup = ref(props.slidesPerGroup || 1)

const onSwiperInit = (swiper) => {
  swiperInstance.value = swiper
  actualSlidesPerGroup.value = swiper.params.slidesPerGroup || 1
}

defineExpose({
  getSwiper: () => swiperInstance.value
})

// Breakpoints: на мобильных показываем 1 слайд и листаем по 1,
// на десктопе – значения из props
const swiperBreakpoints = computed(() => ({
  0: {
    slidesPerView: 1.20,
    slidesPerGroup: 1
  },
  1051: {
    slidesPerView: props.slidesPerView,
    slidesPerGroup: props.slidesPerGroup
  }
}))

const paginationSlides = computed(() => {
  const group = props.slidesPerGroup || 1
  return props.slides.filter((_, index) => index % group === 0)
})

const goToSlide = (index) => {
  if (!swiperInstance.value) return
  if (index === currentSlide.value) return

  const targetSlide = index * (props.slidesPerGroup || 1)

  swiperInstance.value.autoplay?.stop()

  if (props.loop) {
    swiperInstance.value.slideToLoop(targetSlide)
  } else {
    swiperInstance.value.slideTo(targetSlide)
  }
}

const onSlideChange = (swiper) => {
  const group = props.slidesPerGroup || 1
  currentSlide.value = Math.floor(swiper.realIndex / group)
}

const onBreakpoint = (swiper) => {
  actualSlidesPerGroup.value = swiper.params.slidesPerGroup || 1
  onSlideChange(swiper)
}

const onTransitionEnd = () => {
  if (
    !props.autoplay ||
    !swiperInstance.value?.autoplay ||
    isPaused.value ||
    swiperInstance.value.animating
  ) return

  swiperInstance.value.autoplay.start()
}

const autoplayDelay = computed(() => {
  if (!props.autoplay) return null

  if (typeof props.autoplay === 'object') {
    return props.autoplay.delay || 3000
  }

  return 3000
})

// Длительность анимации буллета с учётом мобильной адаптации
const bulletAnimationDuration = computed(() => {
  if (!autoplayDelay.value) return 100 // fallback, если автоплей выключен

  const paginationGroup = props.slidesPerGroup || 1
  const actualGroup = actualSlidesPerGroup.value || 1

  // Если фактическая группа меньше группы пагинации (мобильный режим),
  // то буллет активен дольше -> умножаем на количество слайдов в группе
  if (actualGroup < paginationGroup) {
    return autoplayDelay.value * paginationGroup
  }

  return autoplayDelay.value
})

const onMouseEnter = () => {
  if (!swiperInstance.value?.autoplay) return

  isPaused.value = true
  swiperInstance.value.autoplay.pause()
}

const onMouseLeave = () => {
  if (!swiperInstance.value?.autoplay) return

  isPaused.value = false
  swiperInstance.value.autoplay.resume()
}
</script>

<template>
  <ClientOnly>
    <Swiper
      :modules="modules"
      :slides-per-view="slidesPerView"
      :slides-per-group="slidesPerGroup"
      :loop="loop"
      :autoplay="autoplay"
      :breakpoints="swiperBreakpoints"
      @swiper="onSwiperInit"
      @slideChange="onSlideChange"
      @breakpoint="onBreakpoint"
      @transitionEnd="onTransitionEnd"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
      class="news-slider"
    >
      <SwiperSlide v-for="(slide, idx) in slides" :key="slide.id || idx">
        <div class="news-slider__content">
          <NewsCard :news="slide" />
        </div>
      </SwiperSlide>
    </Swiper>
    <div class="news-slider__pagination" role="tablist">
      <PaginationBullet
        v-for="(slide, idx) in paginationSlides"
        :key="slide.id || idx"
        :animationDuration="bulletAnimationDuration"
        :isAnimationActive="idx === currentSlide"
        :isPaused="isPaused"
        @click="goToSlide(idx)"
      />
    </div>
  </ClientOnly>
</template>

<style lang="scss" scoped>
.news-slider {
  margin: 0 auto;
  border-bottom: 1px solid var(--color-WHITE_LINE);
  :deep(.swiper-wrapper) {
    align-items: stretch;
  }
  :deep(.swiper-slide) {
    height: auto;
    display: flex;
  }
}

.news-slider__content {
  width: 90%;
  padding: 0 em(11) 0 em(11);
  display: flex;
  flex: 1;
}

.news-slider__pagination {
  display: flex;
  gap: em(5);
  justify-content: center;
  max-width: 60%;
  margin: em(60) auto 0 auto;
  @include mq('desktop') {
    margin: em(156) auto 0 auto;
    max-width: auto;
  }
}

/* Fallback для SEO и предотвращения CLS */
.app-slider__fallback {
  display: grid;
  grid-template-columns: repeat(3, 1fr); 
  gap: em(10); 
  padding: em(10);
  width: 100%;
}

.fallback-slide {
  text-align: center;

  img {
    width: 100%;
    max-width: 610px; 
    height: auto;
    aspect-ratio: calc(610 / 400);
    object-fit: cover;
  }

  &__content {
    margin-top: 12px;
  }

  &__title {
    font-size: 20px;
    color: #ccc;
    margin: 0 0 8px;
  }

  &__desc {
    color: #ccc;
    font-size: 14px;
    margin: 0;
  }
}
</style>