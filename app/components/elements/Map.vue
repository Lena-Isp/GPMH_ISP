<script setup>
  import { 
    YandexMap,
    YandexMapDefaultSchemeLayer,
    YandexMapDefaultFeaturesLayer,
    YandexMapMarker,
    YandexMapControls,
    YandexMapZoomControl
  } from 'vue-yandex-maps'

  const props = defineProps({
    adress: String
  });
</script>

<template>
  <div class="map-wrapper custom-tint" >
    <ClientOnly>
      <!-- Базовая обертка карты -->
      <yandex-map 
        :settings="{
          location: {
            center: [30.338065, 59.931733],
            zoom: 16,
          },
          showScaleInCopyrights: true,
          behaviors: ['drag', 'pan'], 
          showScaleInCopyrights: true,
        }"
      >
        <yandex-map-default-scheme-layer />
        <yandex-map-default-features-layer />

        <!-- Встроенные элементы управления Яндекс Карт -->
        <yandex-map-controls :settings="{ position: 'top right' }">
          <yandex-map-zoom-control />
        </yandex-map-controls>

        <!-- Кастомная метка -->
        <yandex-map-marker
          position="top-center left-center"
          :settings="{ 
            coordinates: [30.338065, 59.931733],
          }"
        >
          <a 
            href="https://yandex.ru/maps/2/saint-petersburg/house/ploshchad_ostrovskogo_2a/Z0kYdQRoSUMCQFtjfXVycHtgZw==/?from=api-maps&ll=30.338065%2C59.931733&origin=jsapi_3&utm_source=jsapi&z=16" 
            target="_blank"
            class="pin"
            >
            <img
              alt="Маркер"
              class="pin"
              src="~/assets/map-marker.svg"
            />
          </a>
          <div class="popup">
            {{adress}}
          </div>
        </yandex-map-marker>
      </yandex-map>
    </ClientOnly>
  </div>
</template>

<style lang="scss" scoped>
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
.pin {
  cursor: pointer;
  max-width: unset;
  width: em(40);
  height: em(70);
  z-index: 1000;
  position: relative;
  top: em(-7);
  &:hover+.popup {
    opacity: 1;
  }
}

.popup {
  position: absolute;
  top: 80%;
  right: -140px;
  background: #fff;
  border-radius: 10px;
  padding: 10px;
  color: black;
  width: max-content;
  display: flex;
  font-size: 12px;
  opacity: 0;
  transition: opacity .3s;
}
</style>