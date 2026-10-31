<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'

const props = defineProps({
  sectionData: {
    type: Object,
    default: null,
  }
})

const modules = [Autoplay]
const swiperInstance = ref(null)

// Реактивный индекс активного слайда
const activeIndex = ref(0)

// Общее количество слайдов — считаем из данных
const countAll = computed(() => {
  return props.sectionData?.config?.slider?.slides?.length || 0
})

const onSwiperInit = (swiper) => {
  swiperInstance.value = swiper
  // Инициализируем индекс при старте
  activeIndex.value = swiper.realIndex
}

// Обновляем индекс при смене слайда
const onSlideChange = (swiper) => {
  activeIndex.value = swiper.realIndex
}

// Переход к предыдущему слайду
const goPrev = () => {
  if (!swiperInstance.value) return
  swiperInstance.value.slidePrev()
}

// Переход к следующему слайду
const goNext = () => {
  if (!swiperInstance.value) return
  swiperInstance.value.slideNext()
}

defineExpose({
  getSwiper: () => swiperInstance.value
})

</script>

<template>
  <ClientOnly>
    <Swiper
      :modules="modules"
      :slides-per-view="1"
      :autoplay="false"
      :loop="true"
      @swiper="onSwiperInit"
      @slideChange="onSlideChange"
      class="article-slider"
    >     
      <SwiperSlide v-for="(slide, idx) in sectionData?.config?.slider?.slides" :key="slide.id || idx">
        <div class="article-slider__content">
          <picture>
            <source :srcset="slide?.image_webp" type="image/webp">
            <img :src="slide?.image" :alt="slide?.preview_image" class="article-slider__img" width="100%" height="100%">
          </picture>
        </div>
      </SwiperSlide>
    </Swiper>
    <div class="article-slider__pagination" role="tablist">
      <PaginationNumber
        :numbCurrent="activeIndex + 1"
        :numbAll="countAll"
        :prev="goPrev"
        :next="goNext"
      />
    </div>
  </ClientOnly>
</template>

<style lang="scss">
.article-slider__content {
  height: em(770);
  position: relative;
}

.article-slider__img {
  display: block;
  height: 100%;
  width: 100%;
  object-fit: cover;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
}

.article-slider__pagination {
  margin-top: em(60);
}

</style>