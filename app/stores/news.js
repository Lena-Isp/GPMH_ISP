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

  async function fetchInitialNews() {
    if (newsList?.value?.length > 0) return newsList?.value
    const response = await get('/news?page=1&per_page=6')
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

    const response = await get(
      `/news?page=${currentPage.value}&per_page=${perPage}`
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
    // actions
    fetchInitialNews,
    fetchInitialSlider,
    fetchNewsFilters,
    fetchMoreNews,
    fetchNewsBySlug,
  }
})
