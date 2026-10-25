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
const newsStore = useNewsStore()
const { currentArticle } = storeToRefs(newsStore)
const { data: result, error } = await useAsyncData(
  `news-${route.params.id}-${locale.value}`, 
  () => newsStore.fetchNewsBySlug(route.params.id)
)

//редирект для страницы, где нет английской версии
if (result.value?.isRedirect) {
  await navigateTo(localePath('/media'), {
    redirectCode: 308,
    replace: true
  })
}

//редирект для несуществующей новости
if (error.value) {
  await navigateTo(localePath('/media'), {
    redirectCode: 301,
    replace: true
  })
}
</script>


<template>
<div class="news-page">
  <div class="news-page__button">
    <ButtonPervious
      to="/media"
      :color="$color.BLACK"
      :text="$t('mediaId.back')"
    />
  </div>
  <div class="news-page__date">
    <Text
      :variant="$typographyVariant.T_SMALL_20"
      :font="$font.MAREGRAPHE_REGULAR"
      :color="$color.GRAY"
    >{{ currentArticle?.date }}</Text>
  </div>
  <div class="news-page__header">
    <Text
      tag="h3"
      :variant="$typographyVariant.T_H3_60"
      :font="$font.MAREGRAPHE_REGULAR"
    >{{ currentArticle?.name }}</Text>
  </div>

  <ContainerSplit>
    <!--справа блок-->
    <template #content>
      <!--Картинка-->
      <img :src="currentArticle?.preview_webp" alt="" class="img">

      <!--Превью текст-->
      <Text
        tag="span"
        :variant="$typographyVariant.T_BIG_36"
        :font="$font.TTSMALLS_REGULAR"
      >{{ currentArticle?.preview_title }}</Text>

      <!--основные блоки из админки-->
      <component
        v-for="(section, idx) in currentArticle?.sections"
        :key="idx"
        :is="getArticleComponent(section.type)"
        :section-data="section" 
      />
    </template>

    <!--нижний блок-->
    <template #sidebar>
      <SocialList
        :color="$color.GRAY"
        mode="share"
      />
    </template>
  </ContainerSplit>
  <br /><br />
  <SplitNav
    textPrev="Предыдущая новость" 
    textNext="Следующая новость" 
    :linkPrev="`/media/${currentArticle?.links?.previous}`"
    :linkNext="`/media/${currentArticle?.links?.next}`"
  />
</div>
</template>

<style lang="scss" scoped>
.news-page__button {
  display: block;
  padding: em(30) 0;
  border-bottom: 1px solid var(--color-GRAY_LINE);
  @include mq('desktop') {
    padding: em(40) 0;
  }
}

.news-page__date {
  margin-top: em(30);
  @include mq('desktop') {
    margin-top: em(40);
  }
}

.news-page__header {
  margin-top: em(30);
  @include mq('desktop') {
    margin-top: em(40);
  }
}

.img {
  width: 100%;
  max-width: auto;
}
</style>