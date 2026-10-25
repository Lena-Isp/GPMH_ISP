<script setup>
const props = defineProps({
  visibleBottom: {
    type: Boolean,
    default: true
  },
});

const networksNew = [
  { link: 'https://t.me/tv3russia', title: 'Telegram' },
  { link: 'https://vk.com/kanal_tv3', title: 'ВКонтакте' },
  { link: 'https://vk.com/kanal_tv3', title: 'Одноклассники' },
];
</script>

<template>
<div :class="['container-split', { 'container-split--news': visibleBottom }]">
  <div class="container-split__content" >
    <div class="container-split__content-top">
      <slot name="content" />
    </div>
    <!--Блок с тегами и второй соцсетью-->
    <template v-if="visibleBottom">
      <div class="container-split__bottom-tags">
        <span class="container-split__text">
          {{ $t('containerSplit.tags') }}
        </span>
        Партнерство
      </div>
      <div class="container-split__bottom-soc">
        <span class="container-split__text">
          {{ $t('containerSplit.soc') }}
        </span>
        <SocialList
          :socials="networksNew"
          :color="$color.GRAY"
          mode="share"
        />
      </div>
    </template>
    <!--END Блок с тегами и второй соцсетью-->
  </div>
  <div :class="['container-split__sidebar', { 'container-split__sidebar--news': visibleBottom }]" >
    <slot name="sidebar" />
  </div>
</div>
</template>

<style lang="scss" scoped>
.container-split {
  display: flex;
  flex-direction: column;
  @include mq('desktop') {
    flex-direction: row-reverse;
    flex-wrap: wrap;
    margin-top: em(90);
  }
  &--news {
    margin-top: em(180);
  }
}

.container-split__content {
  flex-grow: 1;
  @include mq('desktop') {
    width: calc(1230/1860 * 100%);
  }
}

.container-split__content-top {
  //margin-bottom: em(60);
  @include mq('desktop') {
    //margin-bottom: em(100);
  }
}

.container-split__sidebar {
  @include mq('desktop') {
    width: calc(630/1860 * 100%);
  }
  &--news {
    display: none;
    @include mq('desktop') {
      display: block;
    }
  }
}

.container-split__bottom-tags {
  padding: em(40) 0 em(60) 0;
  border-top: 1px solid var(--color-GRAY_LINE);
  border-bottom: 1px solid var(--color-GRAY_LINE);
  @include mq('desktop') {
    position: relative;
    padding: em(60) 0 em(60) 0;
  }
}

.container-split__bottom-soc {
  margin-top: em(40);
  @include mq('desktop') {
    position: relative;
    margin-top: em(60);
  }
}

.container-split__text {
  display: block;
  padding-bottom: em(40);
  @include mq('desktop') {
    position: absolute;
    top: 0;
    left: -24.1%;
    .container-split__bottom-tags & {
      top: em(60);
    }
  }
}
</style>