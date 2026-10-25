<script setup>
  const historyDataMock = {
    "data": [
      {
        "id": 2023,
        "name": "2023",
        "slug": "2023",
        "history": [
          {
            "id": 2023,
            "image": "https://www.gazprom-media.com/storage/uploads/history/image/0/10/934/10934/617d0c33d8193506b623b787f00320ee.jpg",
            "image_webp": "https://www.gazprom-media.com/storage/uploads/history/image/0/10/934/10934/617d0c33d8193506b623b787f00320ee-webp.webp",
            "image_alt": "Фото 2023",
            "video": null,
            "slug": "gazprom-media-holding-stal-vladelcem-kontroliruyushchey-doli-krupneyshego-v-rossii-blogerskogo-agentstva-insayt-lyudi",
            "name": "«Газпром-Медиа Холдинг» стал владельцем контролирующей доли продюсерского центра и крупнейшего блогерского агентства «Инсайт Люди».",
            "description": "<p>&laquo;Газпром-Медиа Холдинг&raquo; стал владельцем контролирующей доли продюсерского центра и крупнейшего блогерского агентства &laquo;Инсайт Люди&raquo;</p>",
            "seo": {
              "title": "«Газпром-Медиа Холдинг» стал владельцем контролирующей доли продюсерского центра и крупнейшего блогерского агентства «Инсайт Люди».",
              "description": "«Газпром-Медиа Холдинг» стал владельцем контролирующей доли продюсерского центра и крупнейшего блогерского агентства «Инсайт Люди»",
              "keywords": ""
            }
          }
        ]
      },
      {
        "id": 2024,
        "name": "2024",
        "slug": "2024",
        "history": [
          {
            "id": 2024,
            "image": "https://www.gazprom-media.com/storage/uploads/history/image/0/13/297/13297/6822028c1ef90.png",
            "image_webp": "https://www.gazprom-media.com/storage/uploads/history/image/0/13/297/13297/6822028c1ef90-webp.webp",
            "image_alt": "Фото 2024",
            "video": null,
            "slug": "razvlekatelnye-onlain-resursy-vokrugtv-i-srsly-integrirovany-v-strukturu-obieedinennoi-redakcii-izdatelstva-sem-dnei",
            "name": "Развлекательные онлайн-ресурсы ВокругТВ и SRSLY интегрированы в структуру объединенной редакции Издательства «Семь Дней» .",
            "description": null,
            "seo": {
              "title": "Развлекательные онлайн-ресурсы ВокругТВ и SRSLY интегрированы в структуру объединенной редакции Издательства «Семь Дней» .",
              "description": "",
              "keywords": ""
            }
          },
          {
            "id": 2025,
            "image": "https://www.gazprom-media.com/storage/uploads/history/image/0/10/934/10934/617d0c33d8193506b623b787f00320ee.jpg",
            "image_webp": "https://www.gazprom-media.com/storage/uploads/history/image/0/10/934/10934/617d0c33d8193506b623b787f00320ee-webp.webp",
            "image_alt": "Фото 2023",
            "video": null,
            "slug": "gazprom-media-holding-stal-vladelcem-kontroliruyushchey-doli-krupneyshego-v-rossii-blogerskogo-agentstva-insayt-lyudi",
            "name": "«Газпром-Медиа Холдинг» стал владельцем контролирующей доли продюсерского центра и крупнейшего блогерского агентства «Инсайт Люди».",
            "description": "<p>&laquo;Газпром-Медиа Холдинг&raquo; стал владельцем контролирующей доли продюсерского центра и крупнейшего блогерского агентства &laquo;Инсайт Люди&raquo;</p>",
            "seo": {
              "title": "«Газпром-Медиа Холдинг» стал владельцем контролирующей доли продюсерского центра и крупнейшего блогерского агентства «Инсайт Люди».",
              "description": "«Газпром-Медиа Холдинг» стал владельцем контролирующей доли продюсерского центра и крупнейшего блогерского агентства «Инсайт Люди»",
              "keywords": ""
            }
          }
        ]
      }
    ]
  }
  const flatHistory = historyDataMock.data.flatMap(year => year.history);
  // Данные слайдов
  const slides = ref([
    { id: 1, image: 'https://www.gazprom-media.com/storage/uploads/news/image/0/31/424/31424/6a3542eba3fb8.png', title: 'Слайд 1', description: 'Описание первого слайда' },
    { id: 2, image: 'https://www.gazprom-media.com/storage/uploads/news/image/0/31/421/31421/6a3541a5a3e68.png', title: 'Слайд 2', description: 'Описание второго слайда' },
    { id: 3, image: 'https://www.gazprom-media.com/storage/uploads/news/image/0/31/418/31418/6a353f2c238e0.png', title: 'Слайд 3', description: 'Описание третьего слайда' },
    { id: 4, image: 'https://www.gazprom-media.com/storage/uploads/news/image/0/31/415/31415/6a353e51b60cd.png', title: 'Слайд 4', description: 'Описание четвёртого слайда' },
    { id: 5, image: 'https://www.gazprom-media.com/storage/uploads/news/image/0/31/412/31412/6a3517326ef49.png', title: 'Слайд 5', description: 'Описание пятого слайда' },
  ])
  //данные для аккардеона из стора
  const partnerStore = usePartnerStore()
  const { categoriesWithAssets } = storeToRefs(partnerStore)
</script>
<template>
  <div>
    <br />
    <br />
    <Text :variant="$typographyVariant.T_NORMAL_24" :font="$font.TTSMALLS_REGULAR"> 
      WIDGETS
    </Text>

    <!--SliderBasic-->
    <br /><br />
    <Text :variant="$typographyVariant.T_NORMAL_24" :font="$font.TTSMALLS_REGULAR"> 
      SliderBasic
    </Text>
    <br /><br />
    <div class="container-full">
      <SliderBasic
        :slides="slides"
        :slides-per-view="3"
        :slides-per-group="3"
        loop
        autoplay
      />
    </div>

    <!--HistoryCard-->
    <br /><br />
    <Text :variant="$typographyVariant.T_NORMAL_24" :font="$font.TTSMALLS_REGULAR"> 
      HistoryCard
    </Text>
    <br /><br />
    <div class="container-full">
      <HistoryCard
        :historyData="flatHistory"
      />
    </div>

    <!--Collapse-->
    <br /><br />
    <Text :variant="$typographyVariant.T_NORMAL_24" :font="$font.TTSMALLS_REGULAR"> 
      Collapse
    </Text>
    <br /><br />
    <div class="line collapse">
      <Collapse :categoriesData="categoriesWithAssets" />
    </div>

    <!--End-padding-->
    <br /> <br /><br /><br /><br /> <br /><br /><br />
    <br /> <br /><br /><br /><br /> <br /><br /><br />
  </div>
</template>

<style lang="scss" scoped>
.line {
  display: flex;
  gap: em(30);
  padding: em(40) 0;
  &--notflex {
    display: block;
  }
}
.collapse {
  display: block;
  margin: 0;
  @include mq('desktop') {
    gap: em(30);
    margin: em(40) 0 em(40) em(30);
  }
}
</style>