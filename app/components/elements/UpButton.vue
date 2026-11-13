<script setup>
const route = useRoute()
const iconScroll = ref(null)
const isVisible = ref(false)

const updateVisibility = () => {
  if (!import.meta.client) return 

  const isPassedScreen = window.scrollY >= window.screen.height - 50
  const isBottom = !route.name && 
    (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 10)

  isVisible.value = isPassedScreen || isBottom
}

const moveUp = () => {
  if (!import.meta.client) return

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

onMounted(() => window.addEventListener('scroll', updateVisibility))
onUnmounted(() => window.removeEventListener('scroll', updateVisibility))
</script>

<template>
  <div 
    class="up-button" 
    :class="{ 'up-button--visible': isVisible }" 
    @click="moveUp"
  >
    <IconSvg
      :name="$iconName.ARROW_TOP" 
      :size="[$iconSize.MEDIUM_MOB, $iconSize.UP_BUTTON]"
      :color="$color.WHITE"
    />
  </div>
</template>

<style lang="scss" scoped>
  .up-button {
    position: fixed;
    bottom: em(30);
    right: em(10);
    cursor: pointer;
    opacity: 0;
    transition: opacity .3s;
    @include mq('desktop') {
      right: em(30);
    }
    &--visible {
      opacity: 1;
    }
  }
</style>