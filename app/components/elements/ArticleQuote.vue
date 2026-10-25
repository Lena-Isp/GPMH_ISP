<script setup>
const props = defineProps({
  sectionData: {
    type: Object,
    default: []
  },
})

const { locale } = useI18n()

const fio = computed(() => props.sectionData?.config?.[`fio_${locale.value}`] ?? '')
const position = computed(() => props.sectionData?.config?.[`position_${locale.value}`] ?? '')
const text = computed(() => props.sectionData?.config?.[`text_${locale.value}`] ?? '')
const img = computed(() => props.sectionData?.config?.img ?? null)
</script>

<template>
  <div class="article-quote" v-if="fio || position || text">
    <div class="article-quote__text" v-html="text"></div>
    <div class="article-quote__autor-space" v-if="fio || position"></div>
    <div class="article-quote__autor" v-if="fio || position">
      <div class="article-quote__autor-img" v-if="img">
        <img :src="`/${img}`" alt="image">
      </div>
      <div class="article-quote__autor-label">
        <Text
          :variant="[$typographyVariant.T_NORMAL_18_MOB, $typographyVariant.T_NORMAL_24]"
          :font="$font.TTSMALLS_REGULAR"
        >{{ sectionData?.config?.fio_ru }}</Text>
        <Text
          :variant="[$typographyVariant.T_NORMAL_18_MOB, $typographyVariant.T_NORMAL_24]"
          :font="$font.TTSMALLS_REGULAR"
        >{{ sectionData?.config?.position_ru }}</Text>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.article-quote {
  display: block;
  margin-top: em(60);
  padding: em(30) 0 0;
  border-bottom: 0;
  padding-bottom: 0;
  @include mq('desktop') {
    display: flex;
    margin-top: em(100);
    padding: em(60) 0;
    border-bottom: 1px solid var(--color-C_285);
    border-top: 1px solid var(--color-C_285);
    position: relative;
  }
  & + .article-quote {
    margin-top: em(0);
    border-top: 0;
  }
}

.article-quote__text {
  p {
    margin-bottom: em(16);
    font-size: em(27);
    line-height: 100%;
    @include mq('desktop') {
      font-size: em(50);
    }
    &:last-child {
      margin-bottom: 0;
    }
  }
  h2 {
    margin-bottom: em(8);
    font-size: em(50);
    line-height: 90%;
    @include mq('desktop') {
      font-size: em(100);
    }
    &:last-child {
      margin-bottom: 0;
    }
  }
  h3 {
    margin-bottom: em(13.4);
    font-size: em(40);
    line-height: 100%;
    @include mq('desktop') {
      font-size: em(60);
    }
    &:last-child {
      margin-bottom: 0;
    }
  }
  ol, ul {
    padding-left: em(70);
    margin-bottom: em(50);
    li {
      padding-left: 0;
      font-size: em(27);
      line-height: 100%;
      @include mq('desktop') {
        font-size: em(50);
      }
    }
  }
  p + ul, p + ol {
    margin-top: em(-15);
    @include mq('desktop') {
      margin-top: em(-50);
    }
  }
  s {
    text-decoration: line-through;
  }
  sub {
    font-size: em(8);
    position: relative;
    bottom: -3px;
  }
  sup {
    font-size: em(8);
    position: relative;
    top: -3px;
  }
  .ql-align-center {
    text-align: center;
  }
  .ql-align-right {
    text-align: right;
  }
  .ql-align-justify {
    text-align: justify;
  }
  br {
    display: none;
  }
}

.article-quote__autor-img {
  background-color: #c4c4c4;
  border-radius: 50%;
  width: em(104);
  height: em(104);
  margin-bottom: em(20);
  overflow: hidden;
  @include mq('desktop') {
    width: em(127);
    height: em(127);
    margin-bottom: em(45);
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: center;
  }
}

.article-quote__autor {
  left: 0;
  position: static;
  border-top: 1px solid var(--color-GRAY);
  padding-top: em(30);
  margin-top: em(30);
  max-width: none;
  width: 100%;
  font-family: var(--font-ttsmalls-medium);
  @include mq('desktop') {
    max-width: em(340);
    position: absolute;
    left: em(-630);
    top: 0;
  }
  span {
    display: block;
    color:  var(--color-GRAY);
  }
}

.article-quote__autor-space {
  display: none;
  @include mq('desktop') {
    display: block;
    height: em(220);
  }
}

</style>