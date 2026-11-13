<script setup>
const props = defineProps({
  text: { type: String, default: '' },
  lines: { type: Number, default: 3 },
  duration: { type: Number, default: 350 },
  fadeHeight: { type: String, default: '2.5em' }
})

const isExpanded = ref(false)
const isOverflowing = ref(false)
const isReady = ref(false)

const collapsedHeight = ref(0)
const fullHeight = ref(0)
const contentRef = ref(null)

// Раздельный замер: сначала полная высота без line-clamp, затем свернутая с line-clamp
const measure = () => {
  const el = contentRef.value
  if (!el) return

  // 1. Временно открываем блок на полную высоту (без transition)
  el.classList.add('is-measuring-full')
  fullHeight.value = el.scrollHeight
  el.classList.remove('is-measuring-full')

  // 2. Включаем line-clamp и замеряем точную высоту N строк
  el.classList.add('is-measuring-clamped')
  collapsedHeight.value = el.clientHeight
  el.classList.remove('is-measuring-clamped')

  isOverflowing.value = fullHeight.value - collapsedHeight.value > 2
}

watch(() => [props.text, props.lines], async () => {
  isExpanded.value = false
  await nextTick()
  measure()
})

let observer = null

onMounted(() => {
  measure()
  requestAnimationFrame(() => {
    isReady.value = true
  })

  document.fonts?.ready.then(measure)

  let lastWidth = contentRef.value?.offsetWidth
  observer = new ResizeObserver(([entry]) => {
    if (Math.abs(entry.contentRect.width - lastWidth) > 1) {
      lastWidth = entry.contentRect.width
      measure()
    }
  })
  if (contentRef.value) observer.observe(contentRef.value)
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <div class="expandable-text">
    <div
      ref="contentRef"
      class="expandable-text__content"
      :class="{
        'is-ready': isReady,
        'is-expanded': isExpanded,
        'has-fade': isOverflowing && !isExpanded
      }"
      :style="{
        '--lines': lines,
        '--collapsed-h': collapsedHeight ? `${collapsedHeight}px` : undefined,
        '--full-h': fullHeight ? `${fullHeight}px` : undefined,
        '--duration': `${duration}ms`,
        '--fade': fadeHeight
      }"
    >
      <slot>{{ text }}</slot>
    </div>

    <ButtonMore
      v-if="isOverflowing || isExpanded"
      class="expandable-text__button"
      :text="isExpanded ? $t('career.buttonClose') : $t('career.buttonOpen')"
      :is-rotate="isExpanded"
      :aria-expanded="isExpanded"
      @click="isExpanded = !isExpanded"
    />
  </div>
</template>

<style lang="scss" scoped>
.expandable-text__content {
  overflow: hidden;
  overflow-wrap: break-word;

  max-height: var(--collapsed-h, calc(var(--lines, 3) * 1.4em));
  max-height: var(--collapsed-h, calc(var(--lines, 3) * 1lh));

  &.is-ready {
    transition: max-height var(--duration) cubic-bezier(0.25, 1, 0.5, 1);
  }

  &.is-expanded {
    max-height: var(--full-h, none);
  }

  &.has-fade {
    -webkit-mask-image: linear-gradient(to bottom, #000 calc(100% - var(--fade)), transparent);
    mask-image: linear-gradient(to bottom, #000 calc(100% - var(--fade)), transparent);
  }

  &.is-measuring-full {
    max-height: none !important;
    transition: none !important;
  }

  &.is-measuring-clamped {
    display: -webkit-box;
    -webkit-line-clamp: var(--lines);
    -webkit-box-orient: vertical;
    max-height: none !important;
    transition: none !important;
  }
}

.expandable-text__button {
  margin-top: em(50);
  cursor: pointer;
}
</style>
