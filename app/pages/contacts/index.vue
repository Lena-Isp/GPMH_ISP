<script setup>

import { 
  YandexMap,
  YandexMapDefaultSchemeLayer,
  YandexMapDefaultFeaturesLayer,
  YandexMapDefaultMarker
} from 'vue-yandex-maps'

const siteStore = useSiteStore()
const { settingsData } = storeToRefs(siteStore)
// Настройки начального экрана карты
const mapSettings = {
  location: {
    center: [30.338065, 59.931733],
    zoom: 16,
  },
}
</script>

<template>
  <div class="contacts" itemscope itemtype="http://schema.org/Organization">
    <meta itemprop="name" content="Газпром-медиа холдинг" />
    <div class="contacts__header">
      <Text 
        tag="h1"
        :variant="[$typographyVariant.T_H1_55_MOB, $typographyVariant.T_H1_150]"
        :font="$font.MAREGRAPHE_REGULAR"
      >{{ $t('contacts.name')}}</Text>
    </div>
    <div itemprop="address" itemscope itemtype="https://schema.org/PostalAddress">
      <meta itemprop="postalCode" content="191023" />
      <meta itemprop="addressLocality" content="Санкт-Петербург" />
      <meta itemprop="streetAddress" content="пл. Островского, д. 2А, литера А" />
    </div>
    <div class="contacts__content">
      <div class="contacts__content-item">
        <Text tag="p"
          :font="$font.TTSMALLS_REGULAR"
          :variant="[$typographyVariant.T_SMALL_16_MOB, $typographyVariant.T_SMALL_20]"
        >Адрес</Text><br />
        <Text tag="p"
          :font="$font.TTSMALLS_REGULAR"
          :variant="[$typographyVariant.T_BIG_24_MOB, $typographyVariant.T_BIG_36]"
        >{{ settingsData?.address }}</Text>
      </div>
      <div class="contacts__content-item">
        <Text tag="p"
          :font="$font.TTSMALLS_REGULAR"
          :variant="[$typographyVariant.T_SMALL_16_MOB, $typographyVariant.T_SMALL_20]"
        >Телефон</Text><br /><br />
        <Text tag="a" itemprop="telephone" :href="`tel:${settingsData.phone_one}`"
          :font="$font.TTSMALLS_REGULAR"
          :variant="[$typographyVariant.T_BIG_24_MOB, $typographyVariant.T_BIG_36]"
        >{{ settingsData?.phone_one }}</Text><br /><br /><br /><br /><br /><br /><br />
        <Text tag="p"
          :font="$font.TTSMALLS_REGULAR"
          :variant="[$typographyVariant.T_SMALL_16_MOB, $typographyVariant.T_SMALL_20]"
        >Факс</Text><br />
        <Text tag="p" itemprop="faxNumber"
          :font="$font.TTSMALLS_REGULAR"
          :variant="[$typographyVariant.T_BIG_24_MOB, $typographyVariant.T_BIG_36]"
        >{{ settingsData?.fax }}</Text>
      </div>
      <div class="contacts__content-item">
        <Text tag="p"
          :font="$font.TTSMALLS_REGULAR"
          :variant="[$typographyVariant.T_SMALL_16_MOB, $typographyVariant.T_SMALL_20]"
        >E-mail</Text><br />
        <Text tag="a" itemprop="email" :href="`mailto:${settingsData.email}`"
          :font="$font.TTSMALLS_REGULAR"
          :variant="[$typographyVariant.T_BIG_24_MOB, $typographyVariant.T_BIG_36]"
        >{{ settingsData?.email }}</Text><br /><br /><br /><br /><br /><br /><br />
        <Text tag="p"
          :font="$font.TTSMALLS_REGULAR"
          :variant="[$typographyVariant.T_SMALL_16_MOB, $typographyVariant.T_SMALL_20]"
        >Пресс-служба</Text>
        <Text tag="a" itemprop="email" :href="`mailto:${settingsData.press_service}`"
          :variant="[$typographyVariant.T_BIG_24_MOB, $typographyVariant.T_BIG_36]"
          :font="$font.TTSMALLS_REGULAR"
        >{{ settingsData?.press_service }}</Text><br /><br /><br /><br /><br /><br /><br />
      </div>
    </div>
    <div class="contacts__map">
      <Map :adress="settingsData?.address" />
    </div>
    <br /><br /><br /><br /><br /><br /><br />
  </div>
</template>

<style lang="scss">
  .contacts__header {
    margin-top: em(90);
    margin-bottom: em(260);
    @include mq('desktop') {
      margin-bottom: em(275);
    }
  }

  .contacts__content {
    display: flex;
    flex-wrap: wrap;
    height: em(390);
  }
  .contacts__content-item {
    width: calc(100% / 3);
  }
  .map-wrapper {
    width: 100%;
    height: em(300);
    margin-top:em(60);
    filter: grayscale(1) invert(90%) brightness(200%)brightness(200%);
    -ms-filter: grayscale(1) invert(90%) brightness(200%);
    -webkit-filter: grayscale(1) invert(90%) brightness(200%);
    -moz-filter: grayscale(1) invert(90%) brightness(200%);
    -o-filter: grayscale(1) invert(90%) brightness(200%);
    opacity: .7;
    @include mq('desktop') {
      width: 100%;
      height: em(900);
    }
  }
</style>