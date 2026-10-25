<script setup>
const props = defineProps({
  animationDuration: [Number, String],
  isAnimationActive: Boolean,
  isPaused: Boolean
})
</script>

<template>
  <div 
    :class="[
      'pagination-bullet',
      {
        'pagination-bullet--active': isAnimationActive,
        'pagination-bullet--pause': isPaused && isAnimationActive
      }
    ]"
    :style="{ '--animation-duration': `${animationDuration}ms` }"
  />
</template>

<style lang="scss" scoped>
.pagination-bullet {
  position: relative;
  display: flex;
  align-items: center;
  width: 25%;
  max-width: em(140);
  height: 10px;
  cursor: pointer;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: var(--color-WHITE);
    transition: transform .4s ease;
    z-index: 0;
  }

  &::after {
    content: '';
    position: absolute;
    left: 0%;
    width: 100%;
    height: 1px;
    transform: translateX(-100%);
    background-color: var(--color-C_2101);
    z-index: 0;
    transition: height .4s ease;
  }

  &:hover::before {  
    @include mq('desktop') {
      transform: translateY(50%) scaleY(10); // расширение вверх и вниз
    }
  }

  &:hover::after {
    @include mq('desktop') {
      height: 10px;
    }
  }
}

@keyframes bulletColorLine {
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(0);
  }
}

.pagination-bullet--active::after {
  animation-name: bulletColorLine;
  animation-duration: var(--animation-duration);
  animation-timing-function: linear;
  animation-fill-mode: forwards;
}

.pagination-bullet--pause::after {
  animation-play-state: paused;
}
</style>