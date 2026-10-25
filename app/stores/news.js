export const useNewsStore = defineStore('media', () => {
  const { get } = useApi()

  //---------------------------------------------- STATE ---------------------------------------------------------
  
  const newsList = ref([])
  const newsListSlider = ref([])  
  const newsListFilter = ref({})
  const currentNews = ref(null)
  const currentArticle = ref(null)
  
  const currentPage = ref(2)  
  const perPage = 6
  const hasMore = ref(true)
  const isLoading = ref(false)
  // Выбранные фильтры: { assets: [id...], tags: [id...], years: [...], months: [...] }
  const activeFilters = ref({})

  //---------------------------------------------- HELPERS ---------------------------------------------------------

  // Ключи групп фильтров модалки → параметры API
  const FILTER_PARAM_MAP = {
    assets: 'partner_id',
    tags: 'tag_id',
    years: 'year',
    months: 'month',
  }

  // Собирает строку фильтров в формате API: filter[partner_id][0]=1043&filter[partner_id][1]=4
  function buildFilterQuery() {
    const parts = []
    for (const [group, ids] of Object.entries(activeFilters.value)) {
      const param = FILTER_PARAM_MAP[group] ?? group
      if (Array.isArray(ids)) {
        ids.forEach((id, i) => {
          parts.push(`filter%5B${param}%5D%5B${i}%5D=${encodeURIComponent(id)}`)
        })
      } else if (ids !== undefined && ids !== null && ids !== '') {
        parts.push(`filter%5B${param}%5D=${encodeURIComponent(ids)}`)
      }
    }
    return parts.length > 0 ? `&${parts.join('&')}` : ''
  }

  function resetPagination() {
    newsList.value = []
    currentPage.value = 2
    hasMore.value = true
  }
  //---------------------------------------------- ACTIONS ---------------------------------------------------------
  
  async function fetchNewsBySlug(slug) {
    try {
      const response = await get(`/news/${slug}`, {
        redirect: 'manual'
      })
      // Если ответ пришел в обертке { data: { ... } }, достаем чистое значение:
      const payload = response?.data || response
      // Проверка на пустой объект
      if (!payload || (Object.keys(payload).length === 0 && payload.constructor === Object)) {
        return { isRedirect: true }
      }
      // для отсутствующей новости(есть одна локаль)
      if (payload?.status === 308 || payload?.statusCode === 308 || payload?.status === 0) {
        return { isRedirect: true, status: response?.status }
      }
      // Сохраняем сразу чистый объект без .data
      currentArticle.value = payload
      return { isRedirect: false }
    } catch (err) {
      currentArticle.value = null
      throw err
    }
  }

  // Устанавливает выбранные фильтры (ключи групп модалки → списки id)
  function setFilters(filters) {
    activeFilters.value = { ...filters }
  }

  async function fetchInitialNews() {
    if (newsList?.value?.length > 0) return newsList?.value
    const response = await get(`/news?page=1&per_page=${perPage}${buildFilterQuery()}`)
    const payload = response?.data || response
    newsList.value = payload
    return payload
  }

  async function fetchInitialSlider() {
    if (newsListSlider?.value?.length > 0) return newsListSlider?.value
    const response = await get(`/news?page=1&per_page=12`)  
    const payload = response?.data || response
    newsListSlider.value = payload
    return payload
  }
  
  async function fetchMoreNews() {
    // Не загружаем, если уже идёт загрузка или данных больше нет
    if (isLoading.value || !hasMore.value) return { status: 'no_more' }

    isLoading.value = true
    try {
      const response = await get(
        `/news?page=${currentPage.value}&per_page=${perPage}${buildFilterQuery()}`
      )

      if (response?.data) {
        // Добавляем новые данные к существующим
        newsList.value = [...newsList.value, ...response.data]
        // Проверяем, есть ли ещё страницы
        hasMore.value = response.data.length === perPage
        currentPage.value += 1
        return response.data
      } else {
        hasMore.value = false
        return []
      }
    } finally {
      isLoading.value = false
    }
  }

  // Применяет выбранные фильтры и перезапрашивает первую страницу
  async function applyFilters(filters) {
    activeFilters.value = { ...filters }
    resetPagination()
    const response = await get(`/news?page=1&per_page=${perPage}${buildFilterQuery()}`)
    const payload = response?.data ?? response
    newsList.value = Array.isArray(payload) ? payload : []
    hasMore.value = Array.isArray(payload) && payload.length === perPage
    currentPage.value = 2
    return payload
  }
  
  async function fetchNewsFilters() {
    if (Object.keys(newsListFilter.value).length > 0) return newsListFilter.value
    const response = await get(`/news/filters`)
    const payload = response?.data ?? response

    const filters = {}

    for (const [key, items] of Object.entries(payload)) {
      filters[key] = items.map(el => {
        const isObj = typeof el === 'object' && el !== null
        const id = String(isObj ? el.id : el)
        const name = isObj ? (el.name ?? id) : String(el)
        
        return { id, name }
      })
    } 
    newsListFilter.value = filters
    return filters
  }

  //---------------------------------------------- GETTERS ---------------------------------------------------------
  // const total = computed(() => {
  //   return newsData.value.length
  // })

  return {
    // state
    newsList,
    newsListSlider,
    newsListFilter,
    currentNews,
    currentArticle,
    isLoading,
    activeFilters,
    // actions
    setFilters,
    fetchInitialNews,
    fetchInitialSlider,
    fetchNewsFilters,
    fetchMoreNews,
    applyFilters,
    fetchNewsBySlug,
  }
})
