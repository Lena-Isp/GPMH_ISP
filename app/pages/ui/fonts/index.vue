<script setup>

</script>

<template>
  <br /><br />
  <Text
    tag="a"
    href="https://www.figma.com/design/OptUgmAKrnoawquDh5z5Kh/GPM_SAIT_final_pages_UI_new?node-id=1558-3216&t=z1Yeb8u5dgK9SYgr-0"
    target="_blank"
    :variant="$typographyVariant.T_NORMAL_30"
    :font="$font.TTSMALLS_DEMIBOLD"
  > ФИГМА</Text>
  <br /><br /><br />
  <Text tag="span" :variant="$typographyVariant.T_H4_36">Шрифты</Text>
  <br />
  <Text tag="span" 
    :variant="$typographyVariant.T_NORMAL_30"
    :font="$font.TTSMALLS_REGULAR"
  >
    - TTSmallsRegular
  </Text>  <br />
  <Text tag="span" 
    :variant="$typographyVariant.T_NORMAL_30"
    :font="$font.TTSMALLS_MEDIUM"
  >
    - TTSmallsMedium
  </Text>  <br />
  <Text tag="span" 
    :variant="$typographyVariant.T_NORMAL_30"
    :font="$font.TTSMALLS_DEMIBOLD"
  >
    - TTSmallsDemibold
  </Text>  <br />
  <Text tag="span" 
    :variant="$typographyVariant.T_NORMAL_30"
    :font="$font.MAREGRAPHE_REGULAR"
  >
    - MaregrapheRegular
  </Text>  <br />
  <Text tag="span" 
    :variant="$typographyVariant.T_NORMAL_30"
    :font="$font.MAREGRAPHE_BOLD"
  >
    - MaregrapheBold
  </Text>

<br /><br /><br />
<Text tag="span" :variant="$typographyVariant.T_H4_36">Размер текста</Text>
<div class="line">
  <div class="line__item line__item--left"> name </div>
  <div class="line__item line__item--right"> 
      <span class="hide-mobile">DESC_1920</span>
      <span class="hide-desktop">MOB_360</span>
  </div>
</div>
<div class="line">
  <div class="line__item line__item--left"> 
    <span class="hide-mobile">H0_250</span>
    <span class="hide-desktop">H0_mob_60</span>
  </div>
  <div class="line__item line__item--right">
    <Text
      tag="span"
      :variant="[$typographyVariant.T_H0_250, $typographyVariant.T_H0_60_MOB,]"
      :font="$font.TTSMALLS_REGULAR"
    > Текст</Text>
  </div>
</div>
<div class="line">
  <div class="line__item line__item--left"> 
    <span class="hide-mobile">H1_150</span>
    <span class="hide-desktop">H1_55</span>
  </div>
  <div class="line__item line__item--right"> 
    <Text
      tag="span"
      :variant="[$typographyVariant.T_H1_150, $typographyVariant.T_H1_55_MOB,]"
      :font="$font.TTSMALLS_REGULAR"
    > Текст</Text>
  </div>
</div>
<div class="line">
  <div class="line__item line__item--left"> 
    <span class="hide-mobile">H2_100</span>
    <span class="hide-desktop">H2_mob_50</span>
  </div>
  <div class="line__item line__item--right"> 
    <Text
      tag="span"
      :variant="[$typographyVariant.T_H2_100, $typographyVariant.T_H2_50_MOB]"
      :font="$font.TTSMALLS_REGULAR"
    > Текст</Text>
  </div>
</div>
<div class="line">
  <div class="line__item line__item--left">
    <span class="hide-mobile">H3_60</span>
    <span class="hide-desktop">H3_mob_40</span>
  </div>
  <div class="line__item line__item--right">  
    <Text
      tag="span"
      :variant="[$typographyVariant.T_H3_60, $typographyVariant.T_H3_40_MOB]"
      :font="$font.TTSMALLS_REGULAR"
    > Текст</Text>
  </div>
</div>
<div class="line">
  <div class="line__item line__item--left">
    <span class="hide-mobile">H4_36</span>
    <span class="hide-desktop">H4_mob_24</span>
  </div>
  <div class="line__item line__item--right">  
    <Text
      tag="span"
      :variant="[$typographyVariant.T_H4_36, $typographyVariant.T_H4_24_MOB]"
      :font="$font.TTSMALLS_REGULAR"
    > Текст</Text>
  </div>
</div>
<div class="line">
  <div class="line__item line__item--left">
    <span class="hide-mobile">Super_big_text_60</span>
    <span class="hide-desktop">Super_big_text_mob_30</span>
  </div>
  <div class="line__item line__item--right">  
    <Text
      tag="span"
      :variant="[$typographyVariant.T_SUPER_BIG_60, $typographyVariant.T_SUPER_BIG_30_MOB]"
      :font="$font.TTSMALLS_REGULAR"
    > Текст</Text>
  </div>
</div>
<div class="line">
  <div class="line__item line__item--left"> 
    <span class="hide-mobile">Super_big_text_50</span>
    <span class="hide-desktop">Super_big_text_mob_27</span>
  </div>
  <div class="line__item line__item--right">  
    <Text
      tag="span"
      :variant="[$typographyVariant.T_SUPER_BIG_50, $typographyVariant.T_SUPER_BIG_27_MOB]"
      :font="$font.TTSMALLS_REGULAR"
    > Текст</Text>
  </div>
</div>
<div class="line">
  <div class="line__item line__item--left">
    <span class="hide-mobile">Big_text_36</span>
    <span class="hide-desktop">Big_text_mob_24</span>
  </div>
  <div class="line__item line__item--right">  
    <Text
      tag="span"
      :variant="[$typographyVariant.T_BIG_36, $typographyVariant.T_BIG_24_MOB]"
      :font="$font.TTSMALLS_REGULAR"
    > Текст</Text>
  </div>
</div>
<div class="line">
  <div class="line__item line__item--left">
    <span class="hide-mobile">Normal_text_30</span>
    <span class="hide-desktop">Normal_text_mob_20</span>
  </div>
  <div class="line__item line__item--right">  
    <Text
      tag="span"
      :variant="[$typographyVariant.T_NORMAL_30, $typographyVariant.T_NORMAL_20_MOB]"
      :font="$font.TTSMALLS_REGULAR"
    > Текст</Text>
  </div>
</div>
<div class="line">
  <div class="line__item line__item--left">
    <span class="hide-mobile">Normal_text_24</span>
    <span class="hide-desktop">Normal_text_18</span>
  </div>
  <div class="line__item line__item--right">  
    <Text
      tag="span"
      :variant="[$typographyVariant.T_NORMAL_24, $typographyVariant.T_NORMAL_18_MOB]"
      :font="$font.TTSMALLS_REGULAR"
    > Текст</Text>
  </div>
</div>
<div class="line">
  <div class="line__item line__item--left">
    <span class="hide-mobile">Small_text_20</span>
    <span class="hide-desktop">Small_text_16</span>
  </div>
  <div class="line__item line__item--right">  
    <Text
      tag="span"
      :variant="[$typographyVariant.T_SMALL_20, $typographyVariant.T_SMALL_16_MOB]"
      :font="$font.TTSMALLS_REGULAR"
    > Текст</Text>
  </div>
</div>
<div class="line">
  <div class="line__item line__item--left">
    <span class="hide-mobile">Super small_text_16</span>
    <span class="hide-desktop">small_text_14</span>
  </div>
  <div class="line__item line__item--right">  
    <Text
      tag="span"
      :variant="[$typographyVariant.T_SUPER_SMALL_16, $typographyVariant.T_SUPER_SMALL_14_MOB]"
      :font="$font.TTSMALLS_REGULAR"
    > Текст</Text>
  </div>
</div>
<div class="line">
  <div class="line__item line__item--left">
    <span class="hide-mobile">Button_24</span>
    <span class="hide-desktop">отсутствует</span>
  </div>
  <div class="line__item line__item--right">  
    <Text
      tag="span"
      :variant="$typographyVariant.T_BUTTON_24"
      :font="$font.TTSMALLS_REGULAR"
    > Текст</Text>
  </div>
</div>
<div class="line">
  <div class="line__item line__item--left">
    <span class="hide-mobile">Links_20</span>
    <span class="hide-desktop">Links_20</span>
  </div>
  <div class="line__item line__item--right">  
    <Text
      tag="span"
      :variant="$typographyVariant.T_LINKS_20"
      :font="$font.TTSMALLS_REGULAR"
    > Текст</Text>
  </div>
</div>
<br />
<br />
</template>

<style lang="scss" scoped>
.line {
  display: flex;
  width: auto;
  flex-wrap: wrap;
  align-items: stretch;
  justify-content: flex-start;
  div {
    padding-top: 15px;
    padding-bottom: 15px;
  }
}
.line__item--left {
  border-right: 1px solid rgba(#fff, .1);
  border-bottom: 1px solid rgba(#fff, .1);
  word-break: break-all;
  width: em(140);
  @include mq('desktop') {
    width: em(180);
  }
}
.line__item--right {
  border-bottom: 1px solid rgba(#fff, .1);
  flex-grow: 1;
  padding-left: em(10);
}
</style>