<script setup>
const route = useRoute()
const router = useRouter()

const props = defineProps({
  modalTitle: String
})

const clearHash = () => {
  router.push({
    path: route.path,
    query: {},
    hash: ''
  })
}
</script>

<template>
  <Transition name="fade" appear>
    <div class="modal">
      <div class="modal__item modal__item--left" @click="clearHash">
        <Text
          :variant="[$typographyVariant.T_SUPER_BIG_27_MOB, $typographyVariant.T_SUPER_BIG_50,]"
          :font="$font.TTSMALLS_REGULAR"
          :color="$color.WHITE"
          v-if="modalTitle"
        >{{ modalTitle }}</Text>
      </div>
      <div class="modal__item modal__item--right">
        <slot></slot>
      </div>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  z-index: 3;
  background-color: rgba(#121419, .95);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
}

.modal__item {
  &--left {
    display: none;
    @include mq('desktop') {
      display: block;
      width: 49.21875%;
      height: 100vh;
      cursor: url('/icons/cross-white.svg'), pointer;
      padding: em(50) em(30);
    }
  }
  &--right {
    width: 100%;
    //background-color: var(--color-C_2736);
    overflow-y: scroll;
    height: 100vh;
    position: relative;
    transition: transform 0.4s ease-out; 
    @include mq('desktop') {
      width: 50.78125%;
    }
  }
  &::-webkit-scrollbar {
    width: 0!important;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  .modal__item--right {
    transform: translateX(100%);
  }
}
</style>