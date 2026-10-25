<script setup>
const props = defineProps({
  sectionData: {
    type: Object,
    default: null,
  },
})
const { locale } = useI18n();

const text = computed(() => {
  const config = props.sectionData?.config
  const currentLocale = locale.value

  if (config && currentLocale) {
    return config[`text_${currentLocale}`] ?? ''
  }
  
  return ''
})

</script>

<template>
  <div class="article-text">
    <div  
      class="article-text__content"
      v-html="text"
    />
  </div>
</template>

<style lang="scss">
.article-text {
  margin-top: em(60);
  @include mq('desktop') {
    margin-top: em(100);
  }
}

.article-text__content, .page-career__intro-bottom {
  font-family: var(--font-ttsmalls-regular);
  font-weight: 400;
  p {
    margin-bottom: em(25);
    font-size: em(24);
    line-height: 110%;
    @include mq('desktop') {
      font-size: em(36); 
    }
    &:last-child {
      margin-bottom: 0;
    }
  }
  h2 {
    margin-bottom: em(8);
    font-size: em(36); 
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
    padding-left: em(25);
    margin-bottom: em(50);
    li {
      padding-left: 0;
      font-size: em(24);
      line-height: 110%;
      @include mq('desktop') {
        font-size: em(36);
      }
    }
  }
  p + ul, p + ol {
    margin-top: em(-35);
    @include mq('desktop') {
      margin-top: em(-50);
    }
  }
  ul, ol{
    margin-left: em(30);
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
  iframe {
    width: 100%;
    height: auto;
    aspect-ratio: 16 / 9;
  }
  li[data-list="bullet"] {
    list-style-type: disc;
  }
  br {
    display: none;
  }
}
</style>