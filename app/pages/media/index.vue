<script setup>
const { locale } = useI18n()
const route = useRoute()
const router = useRouter()
const newsStore = useNewsStore()
// Загрузка данных для первых 6 новостей
const { newsList } = storeToRefs(newsStore)
await useAsyncData('initialNewsMedia', () => newsStore.fetchInitialNews())
// Загрузка фильтров
const { newsListFilter } = storeToRefs(newsStore)
await useAsyncData('newsFilters', () => newsStore.fetchNewsFilters())

const isOpen = ref(false)
const activeFilter = ref(null)

// Открываем модалку при выборе любого фильтра, кроме "Все"
watch(activeFilter, (value) => {
  isOpen.value = value !== null
})

// Источником истины выбранных фильтров служит URL query
const FILTER_GROUPS = ['assets', 'tags', 'years', 'months']

function filtersFromQuery(query) {
  const result = {}
  for (const group of FILTER_GROUPS) {
    const raw = query[group]
    if (typeof raw === 'string' && raw.length > 0) {
      result[group] = raw.split(',').filter(Boolean)
    }
  }
  return result
}

const appliedFilters = ref(filtersFromQuery(route.query))

// Синхронизируем стор и список при изменении query (в т.ч. назад/вперёд, прямая ссылка)
watch(
  () => route.query,
  async (query) => {
    const next = filtersFromQuery(query)
    const changed = JSON.stringify(next) !== JSON.stringify(appliedFilters.value)
    appliedFilters.value = next
    if (changed) {
      await newsStore.applyFilters(next)
    }
  }
)

// Применение фильтров из модалки → обновляем URL (watch выше перезапросит данные)
async function onApplyFilters(draft) {
  const query = { ...route.query }
  for (const group of FILTER_GROUPS) {
    const ids = draft[group]
    if (ids && ids.length > 0) {
      query[group] = ids.join(',')
    } else {
      delete query[group]
    }
  }
  await router.push({ query })
}

useHead({
  bodyAttrs: {
    style: computed(() => isOpen.value ? 'overflow: hidden' : '')
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
    >Новости</Text>
  </div>

  <div class="news-filter">
    <FilterItem name="Все" :active="activeFilter == null" />
    <FilterItem name="Активы" :active="activeFilter == 'assets'" @click="activeFilter = 'assets'" />
    <FilterItem name="Теги" :active="activeFilter == 'tags'" @click="activeFilter = 'tags'" />
    <FilterItem name="Дата" :active="activeFilter == 'date'" @click="activeFilter = 'date'" />
  </div>

  <div class="news">
    <div class="news__item" v-for="(items, index) in newsList" :key="items.id">
      <NewsCard :news="items" :numb="index"/>
    </div>
  </div>
  <div class="news-button container-full">
    <ButtonMore text="Показать ещё" @click="newsStore?.fetchMoreNews()"/>
  </div>
  <div class="news-next container-full">
    <PaginationPage 
      :text="$t('contacts.name')"
      :link="`/${$i18n.locale}/contacts`"
    />
  </div>
</div>
  <ClientOnly>
    <FilterModal 
      v-model:show="isOpen"
      v-model:active="activeFilter"
      :modalTitle="newsListFilter"
      :appliedFilters="appliedFilters"
      @apply="onApplyFilters"
    />
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
  margin-bottom: em(20);
  @include mq('desktop') {
    gap: em(30);
    margin-bottom: em(55);
  }
}

.news {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: em(20) 0;
  @include mq('desktop') {
    gap: em(30);
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