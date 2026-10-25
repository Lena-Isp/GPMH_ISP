<script setup>
const { locale } = useI18n()
const route = useRoute()
const router = useRouter()
const newsStore = useNewsStore()

// URL query — источник истины фильтров: filter[partner_id][0]=1043&filter[partner_id][1]=4&page=1&per_page=6
const PER_PAGE = 6
const FILTER_GROUPS = ['assets', 'tags', 'years', 'months']

// Ключи групп модалки → имена параметров API
const FILTER_PARAM_MAP = {
  assets: 'partner_id',
  tags: 'tag_id',
  years: 'year',
  months: 'month',
}

// Разбирает query-параметры вида filter[partner_id][0] в { assets: [id...], ... }
function filtersFromQuery(query) {
  const byParam = {}
  for (const key of Object.keys(query)) {
    const m = key.match(/^filter\[(\w+)\]\[(\d+)\]$/)
    if (!m) continue
    const param = m[1]
    const group = Object.keys(FILTER_PARAM_MAP).find((g) => FILTER_PARAM_MAP[g] === param)
    if (!group) continue
    ;(byParam[param] ||= []).push({ index: Number(m[2]), value: String(query[key]) })
  }
  const result = {}
  for (const [param, items] of Object.entries(byParam)) {
    const group = Object.keys(FILTER_PARAM_MAP).find((g) => FILTER_PARAM_MAP[g] === param)
    result[group] = items.sort((a, b) => a.index - b.index).map((i) => i.value)
  }
  return result
}

// Собирает объект query для router.push в формате API
function buildRouteQuery(filters, page = 1) {
  const query = {}
  for (const group of FILTER_GROUPS) {
    const ids = filters[group]
    if (Array.isArray(ids)) {
      const param = FILTER_PARAM_MAP[group]
      ids.forEach((id, i) => {
        query[`filter[${param}][${i}]`] = String(id)
      })
    }
  }
  query.page = String(page)
  query.per_page = String(PER_PAGE)
  return query
}

const appliedFilters = ref(filtersFromQuery(route.query))

// Синхронизируем стор с фильтрами из URL до первого запроса (SSR и прямые ссылки)
newsStore.setFilters(appliedFilters.value)

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
  await router.push({ query: buildRouteQuery(draft, 1) })
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