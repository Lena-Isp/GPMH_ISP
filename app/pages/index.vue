<script setup>
//Загрузка данных для видео на главной и блок интро
const siteStore = useSiteStore()
const { homePageData } = storeToRefs(siteStore)
const { data } = await useAsyncData('homepageDataInit', () => siteStore.fetchHomepage())
// Загрузка данных для первых 12 новостей
const newsStore = useNewsStore()
const { newsListSlider } = storeToRefs(newsStore)
await useAsyncData('initialNewsSlider', () => newsStore.fetchInitialSlider())
//данные для аккардеона из стора
const partnerStore = usePartnerStore()
const { categoriesWithAssets } = storeToRefs(partnerStore)
</script>

<template>
  <div class="home">
    <div class="home__preview container-full-under-header">
      <HomePreviewSections :introData="homePageData" />
    </div>

    <!--BlockIntro-->
    <div class="home__intro" v-if="homePageData?.properties?.description">
      <div class="home__intro-text container-indent-left">
        <Text
          :variant="[$typographyVariant.T_SUPER_BIG_27_MOB, $typographyVariant.T_SUPER_BIG_50]"
          :font="$font.TTSMALLS_REGULAR"
        >{{ siteStore?.homePageData?.properties?.description }}</Text>
      </div>
      <div class="home__intro-link">
        <Links 
          link="/about" 
          text="О нас"
        />
      </div>
    </div>
    <!--EndBlockIntro-->

    <div class="home__line container-full" />

    <!--BlockSlider-->
    <div class="home__news">
      <div class="home__news-header">
        <Text 
          tag="h2"
          :variant="[$typographyVariant.T_H0_60_MOB, $typographyVariant.T_H0_250]"
          :font="$font.MAREGRAPHE_REGULAR"
        >Новости</Text>
      </div>
      <div class="container-full">
        <SliderBasic
          v-if="newsListSlider"
          :slides="newsListSlider"
          :slides-per-view="3"
          :slides-per-group="3"
          :autoplay="true"
          loop
        />
      </div>
      <div class="home__news-link">
        <Links 
          link="/media" 
          text="Все новости"
        />
      </div>
    </div>
    <!--EndBlockSlider-->

    <!--BlockAssets-->
    <div class="home__assets">
      <div class="home__assets-header">
        <Text 
          tag="h2"
          :variant="[$typographyVariant.T_H0_60_MOB, $typographyVariant.T_H0_250]"
          :font="$font.MAREGRAPHE_REGULAR"
        >Активы</Text>
      </div>
      <div class="home__assets-accordion">
        <Collapse :categoriesData="categoriesWithAssets" />
      </div>
      <Links 
        link="/business" 
        text="Все активы холдинга"
      />
    </div>
    <!--EndBlockAssets-->
  </div>
</template>

<style lang="scss" scoped>
  .home {
    margin-bottom: em(100);
    @include mq('desktop') {
      margin-bottom: em(150);
    }
  }

  .home__line {
    width: auto;
    height: 1px;
    background-color: var(--color-GRAY_LINE);
  }

  .home__intro-text {
    margin-top: em(70);
    margin-bottom: em(80);
    @include mq('desktop') {
      margin-top: em(150);
      margin-bottom: em(155);
    }
  }

  .home__intro-link {
    margin-bottom: em(80);
    @include mq('desktop') {
      margin-bottom: em(150);
    }
  }

  .home__news {
    position: relative;
  }

  .home__news-header {
    margin: em(60) 0 em(60) 0;
    @include mq('desktop') {
      margin: em(140) 0 em(170) 0;
    }
  }

  .home__news-link {
    margin-top: em(120);
    @include mq('desktop') {
      margin-top: 0;
      position: absolute;
      right: 0;
      top: em(150);
    }
  }

  .home__assets-header {
    margin-top: em(120);
    margin-bottom: em(60);
    @include mq('desktop') {
      margin-top: em(255);
      margin-bottom: em(190);
    }
  }

  .home__assets-accordion {
    margin-bottom: em(80);
    @include mq('desktop') {
      margin-bottom: em(190);
    }
  }
</style>
