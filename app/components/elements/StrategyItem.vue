<script setup>
  const props = defineProps({
    topNumb: {
      type: [String, Number],
    },
    text: {
      type: String,
    },
  });

  const formatNumber = (num, size = 2)=> {
    num = num.toString();
    if (num.length < size) num = "0" + num;
    return num;
  }
</script>

<template>
  <div class="strategy-item__number">
    <div class="strategy-item__top">
      <Text
        :variant="[$typographyVariant.T_BIG_36, $typographyVariant.T_BIG_24_MOB]"
        :font="$font.TTSMALLS_REGULAR"
        :color="$color.WHITE"
      >{{ formatNumber(topNumb) }}</Text>
    </div>
    <div class="strategy-item__bottom">
      <Text
        :variant="[$typographyVariant.T_BIG_36, $typographyVariant.T_BIG_24_MOB]"
        :font="$font.TTSMALLS_REGULAR"
        :color="$color.WHITE"
      >{{ text }}</Text>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.strategy-item__number {
  width: 100%;
  padding: em(30) 0 em(30) em(10);
  height: em(270);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: auto;
  border-bottom: 1px solid rgba(#939393, .5);
  &:after {
    content: "";
    position: absolute;
    top: -1px;
    left: 0;
    height: 1px;
    background-color: #917DFF;
    width: 0;
    transition: width .5s;
  }
  &:hover {
    &:after {
      width: 0;
      opacity: 0;
      @include mq('desktop') {
        width: 100%;
        opacity: 1;
      }
    }
    .strategy-item__top {
      color: #fff;
      @include mq('desktop') {
        color: #917DFF;
      }
    }
  }
  @include mq('desktop') {
    display: block;
    width: calc(100% / 3);
    border-bottom: 1px solid rgba(#939393, .5);
    padding: em(20) 0 em(60) em(30);
    position: relative;
  }
}

.strategy-item__top {
  padding-bottom: em(92);
  @include mq('desktop') {
    padding-bottom: em(140);
    transition: color .5s;
  }
}
</style>