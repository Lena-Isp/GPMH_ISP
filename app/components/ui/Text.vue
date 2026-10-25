<!--
  Использование в компоненте:
  <Text
    tag="h1"
    :variant="$typographyVariant.T_H1_150"
    :font="$font.MAREGRAPHE_REGULAR"
  > {{ $t('home.index') }}</Text>
-->

<script setup>
const props = defineProps({
  tag: String, //для подставления любого тега
  to: String, //ссылка для nuxt-link
  variant: [Array, String], //размер текста
  color: String,
  font: String,
});
</script>

<template>
  <nuxtLinkLocale
    v-if="tag === 'NuxtLinkLocale'"
    :to="to"
    :class="variant"
    :style="{
      color: color,
      'font-family': font,
    }"
  >
    <slot />
  </nuxtLinkLocale>
  <component
    v-else
    :is="tag || 'span'"
    :class="variant"
    :style="{
      color: color,
      'font-family': font,
    }"
  >
    <slot />
  </component>
</template>

<style lang="scss" scoped>
  .t-h0_60-mob {
    font-size: em(60); line-height: 100%;
  }

  .t-h1_55-mob {
    font-size: em(55); line-height: 84%;
  }

  .t-h2_50-mob {
    font-size: em(50); line-height: 80%;
  }
  
  .t-h3_40-mob {
    font-size: em(40); line-height: 100%;
  }

  .t-h4_24-mob {
    font-size: em(24); line-height: 120%;
  }
  
  .t-super_big_30-mob {
    font-size: em(30);line-height: 100%;
  }

  .t-super_big_27-mob {
    font-size: em(27); line-height: 100%;
  }

  .t-big_24-mob {
    font-size: em(24);line-height: 130%;
  }

  .t-normal_20-mob {
    font-size: em(20);line-height: 110%;
  }

  .t-normal_18-mob {
    font-size: em(18); line-height: 120%;
  }
  
  .t-small_16-mob {
    font-size: em(16); line-height: 120%;
  } 

  .t-super_small_14-mob {
    font-size: em(14); line-height: 120%;
  }

  .t-button {
    font-size: em(24); line-height: 120%;
  }

  .t-links {
    font-size: em(20);line-height: 120%;
  }


  .t-h0_250 {
    @include mq('desktop') {
      font-size: em(250); line-height: 100%;
    }
  }

  .t-h1_150 {
    @include mq('desktop') {
      font-size: em(150); line-height: 84%;
    }
  }
  
  .t-h2_100 {
    @include mq('desktop') {
      font-size: em(100); line-height: 80%;
    }
  }

  .t-h3_60 {
    @include mq('desktop') {
      font-size: em(60); line-height: 100%;
    }
  }
  
  .t-h4_36 {
    @include mq('desktop') {
      font-size: em(36); line-height: 120%;
    }
  }
  
  .t-super_big_60 {
    @include mq('desktop') {
      font-size: em(60); line-height: 100%;
    }
  }

  .t-super_big_50 {
    @include mq('desktop') {
      font-size: em(50); line-height: 100%;
    }
  }

  .t-big_36 {
    @include mq('desktop') {
      font-size: em(36); line-height: 130%;
    }
  }
  
  .t-normal_30 {
    @include mq('desktop') {
      font-size: em(30); line-height: 110%;
    }
  }

  .t-normal_24 {
    @include mq('desktop') {
      font-size: em(24); line-height: 120%;
    }
  }
  
  .t-small_20 {
    @include mq('desktop') {
      font-size: em(20); line-height: 120%;
    }
  }

  .t-super_small_16 {
    @include mq('desktop') {
      font-size: em(16);line-height: 120%;
    }
  }


  /*DOP*/
  .t-menu {
    font-size: em(24);line-height: 100%;
    @include mq('desktop') {
      font-size: em(20);
    }
  }
</style>
