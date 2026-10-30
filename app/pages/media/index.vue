<script setup>
  const { locale } = useI18n()
  const route = useRoute()
  const newsStore = useNewsStore()
  const newsFilterStore = useNewsFilterStore()

  // Загрузка данных для первых 6 новостей
  const { newsList, newsListFilter } = storeToRefs(newsStore)
  const { fetchMoreNews } = newsStore
  await useAsyncData(
    'initialNewsMedia', 
    () => newsStore.fetchInitialNews(route.query),
    {
      watch: [() => route.fullPath],
    }
  )

  // для модального окна и фильтров
  const { activeFilter, isModal, filterOptions, selectedFilters } = storeToRefs(newsFilterStore)
  const { openModalFilter, clearFilters, deleteFilters, syncFiltersFromQuery} = newsFilterStore

  const dictionaries = computed(() => ({
    partners: newsListFilter.value?.partners || [],
    tags: newsListFilter.value?.tags || [],
    years: newsListFilter.value?.years || [],
    months: newsListFilter.value?.months || [],
  }))

  watch(
    [
      () => route.query,
      dictionaries,
    ],
    ([query, options]) => {
      syncFiltersFromQuery(query, options)
    },
    {
      immediate: true,
    }
  )

  useHead({
    bodyAttrs: {
      style: computed(() => isModal.value ? 'overflow: hidden' : '')
    }
  })
</script>

<template>
<div>
  <div class="news-header">
    <Text
      tag="h1"
      :variant="[$typographyVariant.T_H1_55_MOB, $typographyVariant.T_H1_150]"
      :font="$font.MAREGRAPHE_REGULAR"
      :color="$color.WHITE"
    >Новости </Text>
  </div>

  <div class="news-filter">
    <FilterItem
      v-for="option in filterOptions"
      :key="option?.value"
      :name="option?.name"
      :optionId="option?.value"
      @click="openModalFilter(option?.value)"
    />
  </div>
  <div class="news-filter news-filter--checked" v-if="selectedFilters?.length">
    <FilterCheck 
      @click="clearFilters"
    />
    <FilterCheck 
      v-for="(item, idx) in selectedFilters" 
      :key="idx"
      :name="item?.name"
      @click="deleteFilters(item?.id)"
    />
  </div>

  <div class="news">
    <div class="news__item" v-for="(items, index) in newsList" :key="items.id">
      <NewsCard :news="items" :numb="index"/>
    </div>
  </div>
  <div class="news-button container-full">
    <ButtonMore text="Показать ещё" @click="fetchMoreNews()"/>
  </div>
  <div class="news-next container-full">
    <PaginationPage 
      :text="$t('contacts.name')"
      :link="`/${$i18n.locale}/contacts`"
    />
  </div>
</div>
  <ClientOnly>
    <FilterModal v-show="isModal" />
  </ClientOnly>
</template>

<style lang="scss" scoped>
.news-header {
  display: block;
  margin: em(57) 0 em(100);
  @include mq('desktop') {
    margin: em(88) 0 em(125);
  }
}

.news-filter {
  display: flex;
  align-items: center;
  gap: em(15);
  @include mq('desktop') {
    gap: em(30);
  }
  &--checked {
    gap: em(6);
    flex-wrap: wrap;
    margin-top: em(20);
  }
}

.news {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: em(20) 0;
  margin-top: em(20);
  @include mq('desktop') {
    gap: em(30);
    margin-top: em(55);
  }
}

.news__item {
  position: relative;
  width: 100%;
  &::after {
    content: "";
    width: 100%;
    height: 1px;
    background-color: var(--color-GRAY_LINE);
    position: absolute;
    left: 0;
    bottom: 0;
  }
  @include mq('desktop') {
    width: calc((100% - em(60)) / 3);
    &::after {
      width: calc(100% + em(30));
      left: em(-15);
    }
  }
}

.news-button {
  display: flex;
  justify-content: center;
  padding: em(80) 0;
  position: relative;
  @include mq('desktop') {
  padding: em(100) 0;
    &::after {
      content: "";
      width: 100%;
      height: 1px;
      background-color: var(--color-GRAY_LINE);
      position: absolute;
      bottom: -1px;
      left: 0;
    }
  }
}
</style>