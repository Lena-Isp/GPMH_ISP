<script setup>
definePageMeta({
  theme: 'light' 
})

const route = useRoute();
const { locale } = useI18n()
const localePath = useLocalePath()

//composables
const { getArticleComponent } = useArticleComponent()

// Загрузка данных для страницы
const partnerStore = usePartnerStore()
const { currentPartners } = storeToRefs(partnerStore)
const { data: result, error } = await useAsyncData(
  `prtners-${route.params.id}-${locale.value}`, 
  () => partnerStore.fetchPartnersBySlug(route.params.id)
)

//редирект для страницы, где нет английской версии
if (result.value?.isRedirect) {
  await navigateTo(localePath('/business'), {
    redirectCode: 308,
    replace: true
  })
}

//редирект для несуществующей новости
if (error.value) {
 throw error
}
</script>

<template>
<div class="business-page">
  <div class="business-page__preview-bg container-full">
    <!--видео-->
    <video 
      autoplay muted loop playsinline=""
      class="business-page__video"
      v-if="currentPartners?.video"
    >
      <source
        :src="currentPartners?.video"
        type="video/mp4"
      >
      <source
        :src="currentPartners?.video"
        type="video/webm"
      >
    </video>
    <!--END видео-->
    <!--изображение-->
    <img 
      v-if="currentPartners?.image"
      class="business-page__image"
      :src="currentPartners?.image" 
      alt=""
    >
    <!--END изображение-->
    <ButtonPervious class="business-page__button"
      link="/business"
      :text="$t('partnerId.back')"
    />
    <img class="business-page__logo" 
      :src="currentPartners?.logo" 
      :alt="currentPartners?.logo_alt"
    >
  </div>
  <ContainerSplit :visible-bottom="false">
    <template #content>
      <Text 
        :variant="[$typographyVariant.T_SUPER_BIG_27_MOB, $typographyVariant.T_SUPER_BIG_50]"
        :font="$font.TTSMALLS_REGULAR"
      >{{currentPartners?.text}}</Text>
      <!--основные блоки из админки-->
      <component
        v-for="(section, idx) in currentPartners?.sections"
        :key="idx"
        :is="getArticleComponent(section.type)"
        :section-data="section"
      />
    </template>
    <template #sidebar>
      <Text 
        :variant="[$typographyVariant.T_SMALL_16_MOB, $typographyVariant.T_SMALL_20]"
        :font="$font.TTSMALLS_REGULAR"
        :color="$color.GRAY"
      >{{currentPartners?.link}}</Text>
      <br /><br />
      <SocialList
        :socials="currentPartners?.socials"
        :color="$color.GRAY"
        mode="link"
      />
    </template>
  </ContainerSplit>
  <div>
    <Text 
      :variant="[$typographyVariant.T_H2_50_MOB, $typographyVariant.T_H2_100]"
      :font="$font.MAREGRAPHE_REGULAR"
    >Новости</Text>
    <Links
      link="/business"
      :text="`Все новости ${currentPartners?.name}`"
    />
  </div>
  <AssetsNews
    v-for="item in currentPartners?.last_news"
    :key="item.id"
    :date="item.created_at" 
    :text="item.name"
    :slug="item.slug"
  />
  <br /><br />
  <SplitNav
    :textPrev="`${currentPartners?.links?.previous}`" 
    :textNext="`${currentPartners?.links?.next}`" 
    :logoPrev="currentPartners?.logo" 
    :logoNext="currentPartners?.logo"
    :linkPrev="`/business/partner/${currentPartners?.links?.previous}`"
    :linkNext="`/business/partner/${currentPartners?.links?.next}`"
  />
</div>
</template>

<style lang="scss" scoped>
  .business-page__preview-bg {
    position: relative;
    min-height: em(540);
    @include mq('desktop') {
      min-height: em(700);
    }
  }

  .business-page__button {
    position: relative;
    z-index: 1;
  }

  .business-page__video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    left: 0;
    top: 0;
    will-change: transform;
    z-index: 0;
  }

  .business-page__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    left: 0;
    top: 0;
    will-change: transform;
    z-index: 0;
  }

  .business-page__logo {
    position: absolute;
    left: 0;
    bottom: em(-20);
    width: em(170);
    height: em(170);
    z-index: 1;
    @include mq('desktop') {
      width: em(350);
      height: em(350);
      bottom: em(-50);
    }
  }
</style>