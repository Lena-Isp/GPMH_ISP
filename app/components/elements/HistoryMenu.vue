<script setup>
import { ref } from "vue";
const { $gsap, $ScrollTrigger } = useNuxtApp()

const props = defineProps({
  data: { type: Array, default: () => [] },
});

const visibleMenu = ref(false);

const toggleMenu = () => {
  visibleMenu.value = !visibleMenu.value;
};

const scrollToCard = (id) => {
  visibleMenu.value = false;

  const targetCard = document.getElementById(`card-${id}`);
  
  if (targetCard) {
    const allTriggers = $ScrollTrigger.getAll();

    const currentTrigger = allTriggers.find(trigger => trigger.trigger === targetCard);

    const targetScrollPoint = currentTrigger 
      ? currentTrigger.start 
      : targetCard.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
      top: targetScrollPoint,
      behavior: "smooth"
    });
  }
};
</script>

<template>
  <div class="history-menu">
    <div 
      class="history-menu__burger" 
      :class="{ 'history-menu__burger--open': visibleMenu }"
      @click="toggleMenu"
    >
      <span 
        class="history-menu__burger-item"
        v-for="(item, idx) in 3"
        :key="idx"
      />
    </div>

    <!-- Меню истории -->
    <Transition name="menu-fade" appear>
      <div 
        class="history-menu__box" 
        v-if="visibleMenu"
      >
        <TransitionGroup name="line-list" tag="div" class="history-menu__list" appear>
          <div
            v-for="(item, index) in data"
            :key="item?.id || index" 
            class="history-menu__item"
            :style="{ '--delay': index }"
            @click="scrollToCard(item.id)"
          >
            <div class="history-menu__text">
              <Text
                :variant="[$typographyVariant.T_SMALL_16_MOB, $typographyVariant.T_SMALL_20]"
                :font="$font.TTSMALLS_REGULAR"
                :color="$color.WHITE"
              >
                <!-- Изменено на item.id (или item.name), так как image_alt — плохой тон для навигации -->
                {{ item.id || item.image_alt }}
              </Text>
            </div>
          </div>
        </TransitionGroup>
      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.history-menu {
  position: sticky;
  top: 0; 
  z-index: 90;
  width: 100%;
}

.history-menu__burger {
  position: absolute;
  width: em(75);
  right: 0;
  height: auto;
  overflow: hidden;
  padding: em(40) 0 0;
  margin: 0 em(10);
  cursor: pointer;
  transition: width .3s ease-in-out;
  z-index: 100; 
  
  &:hover {
    width: em(120);
  }
  
  &--open {
    width: calc(100% - em(60));
    @include mq('desktop') {
      width: calc(43% - em(60));
    }
  }
  
  @include mq('desktop') {
    right: 57%;
    padding: em(60) 0 0;
    margin: 0 em(30);
  }
}

.history-menu__burger-item {
  display: block;
  width: 100%;
  height: 1px;
  background: var(--color-GRAY_LINE);
  margin-left: auto;
  margin-bottom: em(15);
  
  &:last-child { 
    background: linear-gradient(to right, var(--color-GRAY_LINE) 50%, transparent 50%);
  }
}

.history-menu__box {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh; 
  z-index: 101;
}


.history-menu__list {
  position: relative;
  z-index: 2;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  padding: em(40) em(10) em(40); /* Увеличили верхний паддинг, чтобы бургер не перекрывал пункты */
  background-color: var(--color-FON);
  z-index: 4;
  
  &::-webkit-scrollbar {
    width: 0 !important;
  }
  
  @include mq('desktop') {
    width: 43%;
    padding: em(60) em(30) em(60);
  } 
}

.history-menu__item {
  border-bottom: 1px solid var(--color-GRAY_LINE);
  cursor: pointer;
  box-sizing: border-box;
  padding: em(15) 0;
  transition: border-bottom-color .3s linear;
  max-height: 200px;
  
  &:first-child {
    border-top: 1px solid var(--color-GRAY_LINE);
  }
  
  &:hover {
    border-bottom: 1px solid var(--color-C_2101);
  }

  /* АНИМАЦИИ (Оставил твою отличную каскадную логику) */
  &.line-list-enter-active {
    transition: padding .5s ease .3s;
  }
  &.line-list-enter-from {
    padding-top: 0;
    padding-bottom: 0;
  }
  &.line-list-enter-active .history-menu__text {
    transition: opacity .7s linear calc(0.1s + var(--delay) * 0.05s);
  }
  &.line-list-enter-from .history-menu__text {
    opacity: 0;
  }
  &.line-list-leave-active {
    transition: opacity .2s ease;
  }
  &.line-list-leave-to {
    opacity: 0;
  }
}

.history-menu__text {
  opacity: 1;
  transform: translateZ(0); 
  will-change: opacity;
}

.menu-fade-enter-active,
.menu-fade-leave-active {
  transition: opacity 0.3s ease;
}
.menu-fade-enter-from,
.menu-fade-leave-to {
  opacity: 0;
}
</style>