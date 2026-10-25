<script setup>
import { onMounted, onUnmounted, nextTick, ref } from "vue";

const props = defineProps({
  historyData: { type: Array, default: () => [] },
});

const { $gsap, $ScrollTrigger } = useNuxtApp();
const historyBoxRef = ref(null);
let ctx;
let refreshOnLoad;

const initAnimatedScroll = () => {
  if (!historyBoxRef.value) return;

  ctx = $gsap.context(() => {
    const cards = $gsap.utils.toArray(".history-card__item");
    const lastCard = cards[cards.length - 1];
    
    cards.forEach((card, index) => {     
      // Пиннинг карточки
      $ScrollTrigger.create({
        trigger: card,
        start: "top top",
        endTrigger: cards[index + 1],
        end: "top top",
        pin: true,
        pinSpacing: false,
        onLeave: () => {
          // Добавляем класс, когда последний слайд полностью прокручен
          if (cards.length - 1 == index) {
            historyBoxRef.value.classList.add('history-card--completed');
          }
        },
        onEnterBack: () => {
          // Убираем класс, когда возвращаемся назад
          if (cards.length - 1 == index) {
            historyBoxRef.value.classList.remove('history-card--completed');
          }
        }
      });
    });   
  }, historyBoxRef.value);
};

onMounted(async () => {
  await nextTick();
  
  initAnimatedScroll();
  
  refreshOnLoad = () => {
    if ($ScrollTrigger) $ScrollTrigger.refresh();
  };
  
  window.addEventListener('load', refreshOnLoad);
});

onUnmounted(() => {
  if (ctx) ctx.revert();
  if (refreshOnLoad) window.removeEventListener('load', refreshOnLoad);
});
</script>

<template>
  <div 
    v-if="historyData && historyData.length" 
    ref="historyBoxRef" 
    class="history-card"
  >
    <HistoryMenu :data="historyData" />
    
    <div class="history-card__timeline">
      <span class="history-card__timeline-line" />
    </div>
    
    <div 
      v-for="(item, i) in historyData" 
      :key="item?.id || i"
      :id="'card-' + (item?.id || i)"
      class="history-card__item"
      :style="{ zIndex: i + 1 }" 
    >
      <div class="history-card__left">
        <div class="history-card__header">
          <Text
            :variant="[$typographyVariant.T_H3_40_MOB, $typographyVariant.T_H3_60]"
            :font="$font.MAREGRAPHE_REGULAR"
            :color="$color.WHITE"
          >{{ item.id }}</Text>
        </div>
        <div class="history-card__text">
          <Text
            :variant="[$typographyVariant.T_NORMAL_18_MOB, $typographyVariant.T_NORMAL_24]"
            :font="$font.TTSMALLS_REGULAR"
            :color="$color.WHITE"
          >{{ item.name }}</Text>
        </div>
      </div>
      <div class="history-card__right">
        <picture>
          <source :srcset="item.imageWebp" type="image/webp">
          <img :src="item.image" alt="Описание" width="100%" height="100%" loading="lazy">
        </picture>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$top-desc: 60;
$top-mob: 40;

.history-card {
  position: relative;
  width: 100%;
}

.history-card--completed {
  .history-card__timeline {
    position: absolute;
    top: auto;
    bottom: em(365);
    @include mq('desktop') {
      bottom: 100vh;
    }
  }
  .history-card__timeline-line {
    height: calc(em(365) - em($top-mob));
    @include mq('desktop') {
      height: calc(100vh - em($top-desc));
    }
  }
  .history-menu {
    position: absolute;
    top: auto;
    bottom: em(365);
    @include mq('desktop') {
      bottom: 100vh;
    }
  }
}

.history-card__timeline {
  position: sticky;
  top: 0;
  left: em($offset-base-mob);
  height: 0;
  width: 1px;
  z-index: 50;
  background-color: var(--color-GRAY_LINE);
  
  @include mq('desktop') {
    left: em($offset-base-desc);
  }
}

.history-card__timeline-line {
  position: absolute;
  top: em($top-mob);
  left: 0;
  width: 1px;
  height: 100vh;
  background-color: var(--color-GRAY_LINE);
  
  @include mq('desktop') {
    top: em($top-desc);
  }
}

.history-card__item {
  display: flex;
  width: 100%;
  height: em(365);
  background-color: var(--color-FON);
  
  @include mq('desktop') {
    height: 100vh;
  }
}

.history-card__left {
  position: relative;
  width: 100%;
  padding-left: em(20);
  margin-left: em($offset-base-mob);
  background-color: var(--color-FON);
  
  @include mq('desktop') {
    width: 43%;
    padding-left: em(40);
    margin-left: em($offset-base-desc);
  }
}

.history-card__header {
  margin-top: em($top-mob);
  margin-bottom: em(20);
  position: relative;
  
  @include mq('desktop') {
    margin-top: em($top-desc);
    margin-bottom: em(40);
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: em(-20);
    width: 1px;
    height: 100%;
    background-color: var(--color-C_2101);
    z-index: 100;
    
    @include mq('desktop') {
      left: em(-40);
    }
  }
}

.history-card__text {
  background-color: var(--color-FON);
  max-width: em(497);
  
  @include mq('desktop') {
    max-width: 54%;
  }
}

.history-card__right {
  display: none;
  
  @include mq('desktop') {
    display: block;
    width: 57%;
    height: 100vh;
  }
}
</style>