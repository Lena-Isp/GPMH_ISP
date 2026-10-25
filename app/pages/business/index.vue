<script setup>
const route = useRoute();
const partnerStore = usePartnerStore()

const currentHash = computed(() => route?.hash?.slice(1))

const currentCategory = computed(() => {
  if (!currentHash.value) return null
  return partnerStore?.categoriesData?.find(item => 
    item?.slug === currentHash.value
  )
})

const modalState = computed(() => {
  return !!currentCategory.value 
})

useHead({
  bodyAttrs: {
    style: computed(() => modalState.value ? 'overflow: hidden' : '')
  }
})
</script>

<template>
  <div class="page-business">
    <div class="page-business__background">
      <video autoplay="autoplay" playsinline="true" loop="loop" muted="muted" class="video-player__video">
        <source 
          src="" 
          type="video/mp4"
        > 
      </video>
    </div>
    <div class="page-business__header container-full-small">
      <Text
        tag="h1"
        :variant="[$typographyVariant.T_H1_150, $typographyVariant.T_H1_55_MOB]"
        :font="$font.MAREGRAPHE_REGULAR"
        :color="$color.WHITE"
      >{{ $t('business.header') }}</Text>
    </div>
    <div class="page-business__content container-full-small">
      <AssetsDirection 
        :rawItems="partnerStore?.categoriesData"
        variant="bg" 
      />
    </div>
    <div class="page-business__next container-full">
      <PaginationPage 
        :text="$t('menu.about')" 
        link="/about"
      />
    </div>
  </div>
  <ClientOnly>
    <AssetsModal 
      v-show="modalState"
      :modalTitle="currentCategory?.name || ''"
    >
      <AssetsSlide
        :categories="partnerStore?.categoriesWithAssets" 
        :modalValue="modalState"
      />
    </AssetsModal>
  </ClientOnly>
</template>

<style lang="scss" scoped>
.page-business {
}

.page-business__background {
  position: fixed;
  opacity: .4;
  display: block;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 0;
}

.page-business__header {
  position: relative;
  z-index: 0;
  max-width: em(450);
  height: calc(100vh - em($header-height-mob));
  min-height: 590px;
  padding-top: em(88);
  @include mq('desktop') {
    min-height: auto;
    height: calc(100vh - em($header-height-desc));
  }
}

.page-business__content {
  position: relative;
  z-index: 0;
  margin-top: em(-320);
  @include mq('desktop') {
    margin-top: em(-290);
  }
}
</style>