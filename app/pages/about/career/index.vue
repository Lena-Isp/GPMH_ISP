<script setup>//Загрузка данных
const careerStore = useCareerStore()
const { careerData, faqsData, careerNewsData } = storeToRefs(careerStore)
await useAsyncData('careerDataInit', () => careerStore.fetchCareer())
await useAsyncData('fetchDataInit', () => careerStore.fetchFaqs())
await useAsyncData('fetchCareerInit', () => careerStore.fetchCareerNews())

const video = ref(null)
const isPlaying = false

const startVideo = () => {
  video.value?.play()
}
const pauseVideo = () => {
  video.value?.pause()
}

const closeVideo = () => {
  video.value?.reset()
}

</script>

<template>
  <div class="page-career">

    <!-- Видео -->
    <div class="page-career__video container-full-under-header">
      <video autoplay muted loop playsinline class="page-career__bg-video">
        <source :src="careerData?.header_video" type="video/mp4">
      </video>
      <div class="page-career__header">
        <Text
          tag="span"
          :variant="[$typographyVariant.T_H1_55_MOB, $typographyVariant.T_H1_150]"
          :font="$font.MAREGRAPHE_REGULAR"
          :color="$color.WHITE"
        >{{ $t('career.name') }}</Text>
      </div>
    </div>
    <!-- END Видео -->

    <!-- intro -->
    <div class="page-career__intro container-indent-left">
      <div class="page-career__intro-top">
        <div class="page-career__intro-header" v-html="careerData.header_title" />
      </div>

      <div class="page-career__intro-label">
        <div class="page-career__intro-text" v-html="careerData.text" />
      </div>
    </div>
    <!-- END intro -->

    <!-- Video-quote -->
    <div class="page-career__video-quote">
      <Video
        :src="careerData.quote_video"
        poster="/video/bg-video-career_mob.png"
        preload="metadata"
        ref="video"
        :controls="video?.isPlaying"
        muted
        loop
      />
      <button 
        v-if="!video?.isPlaying"
        class="page-career__video-play" 
        type="button"
        @click="startVideo"
      >
        <Text
          :variant="[$typographyVariant.T_SMALL_16_MOB, $typographyVariant.T_SMALL_16_MOB]"
          :font="$font.MAREGRAPHE_REGULAR"
          :color="$color.WHITE"
        >Смотреть</Text>
      </button>
      <button
        v-else
        class="page-career__video-close" 
        type="button"
        @click="closeVideo"
      >
        <IconSvg
          :name="$iconName.CROSS_MOB_MENU"
          :color="$color.WHITE"
          :size="[$iconSize.SMALL_MOB, $iconSize.SMALL]"
        />
      </button>
    </div>
    <!-- End Video-quote -->

    <!-- Quote -->
    <div class="page-career__quote">
      <div class="page-career__quote-title">
        <Text
          tag="p"
          :variant="[$typographyVariant.T_SMALL_16_MOB, $typographyVariant.T_SMALL_20]"
          :font="$font.TTSMALLS_REGULAR"
          :color="$color.GRAY_LINE"
        >{{ careerData.quote_title }}</Text>
      </div>
      <div class="page-career__quote-text container-indent-left">
        <ExpandableText class="page-career__quote-expandable" :lines="3">
          <div class="page-career__text-content" v-html="careerData.quote_text" />
        </ExpandableText>
      </div>
    </div>
    <!-- End Quote -->

    <!-- Questions -->
      <div class="page-career__questions">
        <div class="page-career__questions-headrer">
          <Text
            :variant="[$typographyVariant.T_H3_40_MOB, $typographyVariant.T_H3_60]"
            :font="$font.MAREGRAPHE_REGULAR"
            :color="$color.WHITE"
          >{{ $t('career.questions') }}</Text>
        </div>

        <div class="page-career__questions-collapse container-indent-left">
          <template v-for="item in faqsData" :key="item.id">
            <CollapseItem :headerHtml="item?.question" career>
              <Text 
                tag="div" 
                :variant="$typographyVariant.T_NORMAL_24" 
                :html="item.answer" 
              />
              <div class="page-career__questions-content" v-html="item.answer" />
            </CollapseItem>
          </template>
        </div>
      </div>
    <!-- END Questions -->

    <!-- Новости -->
    <div class="page-career__news">
      <div class="page-career__news-header">
        <Text
          tag="h2"
          :variant="[$typographyVariant.T_H3_40_MOB, $typographyVariant.T_H3_60]"
          :font="$font.MAREGRAPHE_REGULAR"
          :color="$color.WHITE"
        >{{ $t('career.news') }}</Text>
        <div class="page-career__header-link-block">
          <Links
            isRevert
            link="/media"
            :text="$t('career.newsLink')"
          />
        </div>
      </div>
      <div class="page-career__news-wrap">
        <div class="page-career__news-items" v-for="items in careerNewsData" :key="items.id">
          <NewsCard :news="items" />
        </div>
      </div>
      <div class="page-career__header-link-bottom">
        <Links
          isRevert
          link="/media"
          :text="$t('career.newsLink')"
        />
      </div>
    </div>
    <!-- END Новости -->

    <div class="page-career__next container-full">
      <PaginationPage 
        :text="$t('career.next')"
        link="/about/history"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .page-career__video {
    height: 72.9vh;
    overflow: hidden;
    position: relative;
  }

  .page-career__bg-video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    display: block;
  }

  .page-career__header {
    margin-top: em(91);
    padding-top: em(60);
    position: absolute;
    width: 100%;
    top: 0;
    left: em(10);
    @include mq('desktop') {
      left: em(30);
    }
  }

  .page-career__intro{
    margin-top: em(80);
    margin-bottom: em(100);
    @include mq('desktop') {
      margin-top: em(90);
      margin-bottom: em(150);
    }
  }
  
  .page-career__intro-label {
    margin-top: em(60);
    @include mq('desktop') {
      margin-top: em(100);
    }
  }

  .page-career__intro-header {
    font-size: em(27);
    line-height: 100%;
    font-family: var(--font-ttsmalls-regular);
    @include mq('desktop') {
      font-size: em(50);
    }
  }

  .page-career__intro-text {
    font-size: em(24);
    line-height: 100%;
    font-family: var(--font-ttsmalls-regular);
    @include mq('desktop') {
      font-size: em(36);
    }
  }

  .page-career__quote {
    position: relative;
    margin-top: em(30);
    padding-bottom: em(100);
    border-bottom: 1px solid var(--color-WHITE_LINE);
    margin-bottom: em(100);
    @include mq('desktop') {
      margin-top: em(100);
      padding-bottom: em(150);
      margin-bottom: em(150);
    }
  }

  .page-career__quote-title {
    margin-bottom: em(60);
    @include mq('desktop') {
      position: absolute;
      left: 0;
      top: 0;
      max-width: em(335);
      margin-bottom: em(0);
    }
  }

  .page-career__text-content {
    font-size: em(24);
    line-height: 100%;
    font-family: var(--font-ttsmalls-regular);
    @include mq('desktop') {
      font-size: em(36);
    }
  }
  .page-career__video-quote {
    position: relative;
  }

  .page-career__video-play {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    z-index: 1;
    width: em(200);
    height: em(200);
    border: 2px solid var(--color-WHITE_LINE);
    border-radius: 50%;
  }

  .page-career__video-close {
    position: absolute;
    right: em(30);
    top: em(30);
    z-index: 1;
    transform: rotate(45deg);
  }
  
  .page-career__questions-collapse {
    margin-top: em(100);
    margin-bottom: em(100);
    @include mq('desktop') {
      margin-top: em(100);
      margin-bottom: em(150);
    }
  }

  .page-career__news-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: em(120);
    @include mq('desktop') {
      margin-bottom: em(140);
    }
  }

  .page-career__news-wrap {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .page-career__news-items {
    width: 100%;
    @include mq('desktop') {
      width: calc((100% - em(60)) / 3);
    }
  }

  .page-career__next {
    margin-top: em(100);
    @include mq('desktop') {
      border-top: 1px solid var(--color-GRAY_LINE);
      margin-top: 0;
    }
  }
  .page-career__header-link-block {
    display: none;
    @include mq('desktop') {
      display: block;
    }
  }

  .page-career__header-link-bottom {
    display: block;
    @include mq('desktop') {
      display: none;
    }
  }

  :deep(.accordion__content) {
    max-width:100%;
  }
</style>

<style lang="scss"> 
.page-career__questions-content {
    padding-top: em(60);
    @include mq('desktop') {
      padding-top: em(40);
    }
    p {
      font-family: var(--font-ttsmalls-regular);
      font-size: em(18);
      line-height: 120%;
      font-weight: 400;
      margin-bottom: em(10);
      color: #939393;
      @include mq('desktop') {
        font-size: em(36);
      }
    }
    li {
      font-family: var(--font-ttsmalls-regular);
      font-size: em(18);
      line-height: 120%;
      font-weight: 400;
      padding-bottom: em(10);
      color: #939393;
      @include mq('desktop') {
        font-size: em(36);
      }
    }
    a {
      border-bottom: 1px solid #939393;
    }
  }

  .accordion__header-text-block {
    display: block;
    width: calc(100% - em(50));
    @include mq('desktop') {
      width: 100%;
    }
    p {
      display: block;
      width: 100%;
      font-family: var(--font-ttsmalls-regular);
      font-size: em(18);
      line-height: 120%;
      font-weight: 400;
        @include mq('desktop') {
          font-size: em(36);
        }
    }
  }
</style>
