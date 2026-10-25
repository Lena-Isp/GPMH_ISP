<!--
Использование в компоненте:
  <IconSvg
    :name="$iconName.ARROW_UP"
    :color="$color.WHITE"
    :size="[$iconSize.LARGE, $iconSize.NEW_MEDIUM_MOB]"
  />
-->
<script setup>
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  color: String,
  size: [Array, String],
});

</script>

<template>
  <Icon
    :name="`icons:${name}`"
    :class="[size || 'large--mob']"
    :style="{ color: color || $color.C_2101 }"
    mode="svg"
    size="100%"
  />
</template>

<style lang="scss" scoped>
//мобильная версия
.small-cross-mob {
  width: em(20);
  height: em(20);
}
.small--mob {
  width: em(20);
  height: em(20);
}
.spec-small--mob {
  width: em(40);
  height: em(20);
}
.medium--mob {
  width: em(40);
  height: em(40);
}
.new-medium--mob {
  width: em(32);
  height: em(32);
}
.spec-medium--mob {
  width: em(80);
  height: em(40);
}
.large--mob {
  width: em(80);
  height: em(80);
}
.mega-large--mob { //для иконок плеера
  width: em(140);
  height: em(140);
}
.small-prev--mob {
  width: em(20);
  height: em(10);
}
//end мобильная версия

.small-cross {
  @include mq('desktop') {
    width: em(16);
    height: em(16);
  }
}
.small {
  @include mq('desktop') {
    width: em(20);
    height: em(20);
  }
}
.spec-small {
  @include mq('desktop') {
    width: em(40);
    height: em(20);
  }
}
.medium-search {
  @include mq('desktop') {
    width: em(30);
    height: em(30);
  }
}
.medium {
  @include mq('desktop') {
    width: em(40);
    height: em(40);
  }
}
.new-medium {
  @include mq('desktop') {
    width: em(32);
    height: em(32);
  }
}
.spec-medium {
  @include mq('desktop') {
    width: em(80);
    height: em(40);
  }
}
.large {
  @include mq('desktop') {
    width: em(80);
    height: em(80);
  }
}
.mega-large--mob { //для иконок плеера
  @include mq('desktop') {
    width: em(140);
    height: em(140);
  }
}
.small-prev {
  @include mq('desktop') {
    width: em(20);
    height: em(10);
  }
  }
  
  //доп размеры
  .logo-size { //для иконки на главной
    width: auto;
    height: em($header-height-desc);
  }
  //для плагина
  .nuxt-icon {
    margin-bottom: 0;
  }
</style>