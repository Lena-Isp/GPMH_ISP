export const useNewsStore = defineStore('media', () => {
  const { get } = useApi()

  //---------------------------------------------- STATE ---------------------------------------------------------

  const newsList = ref([])
  const newsListSlider = ref([])
  const newsListFilter = ref({})

  const currentNews = ref(null)
  const currentArticle = ref(null)

  // Следующая страница для загрузки
  const currentPage = ref(2)

  // Количество новостей на странице
  const perPage = 6

  // Есть ли ещё новости
  const hasMore = ref(true)

  // Раздельные состояния загрузки
  const isInitialLoading = ref(false)
  const isMoreLoading = ref(false)

  // Общее состояние для интерфейса
  const isLoading = computed(() => {
    return isInitialLoading.value || isMoreLoading.value
  })
    

  // Информация о пагинации от сервера
  const paginationMeta = ref(null)

  // Текущие параметры фильтрации
  const currentQuery = ref({})

  // Защита от устаревших ответов при быстрой смене фильтров
  let initialRequestId = 0

  //---------------------------------------------- HELPERS ---------------------------------------------------------

  // Получаем массив новостей из ответа API
  const getNewsData = response => {
    if (Array.isArray(response?.data)) {
      return response.data
    }

    if (Array.isArray(response)) {
      return response
    }

    return []
  }

  // Проверяем, остались ли новости для загрузки
  const checkHasMore = (data, meta) => {
    if (typeof meta?.hasMore === 'boolean') {
      return meta.hasMore
    }

    return data.length >= perPage
  }

  // Добавляем новости без повторов по ID
  const appendUniqueNews = (current, incoming) => {
    const existingIds = new Set(
      current
        .filter(item => item?.id != null)
        .map(item => String(item.id))
    )

    const uniqueIncoming = incoming.filter(item => {
      if (item?.id == null) return true

      const id = String(item.id)

      if (existingIds.has(id)) return false

      existingIds.add(id)

      return true
    })

    return [...current, ...uniqueIncoming]
  }

  //---------------------------------------------- ACTIONS ---------------------------------------------------------

  // Получение новости по slug
  async function fetchNewsBySlug(slug) {
    try {
      const response = await get(`/news/${slug}`, {
        redirect: 'manual',
      })

      const payload = response?.data ?? response

      // Проверяем пустой ответ
      if (
        !payload ||
        (
          typeof payload === 'object' &&
          !Array.isArray(payload) &&
          Object.keys(payload).length === 0
        )
      ) {
        return {
          isRedirect: true,
        }
      }

      // Проверяем отсутствие новости
      if (
        payload?.status === 308 ||
        payload?.statusCode === 308 ||
        response?.status === 308 ||
        response?.status === 0
      ) {
        return {
          isRedirect: true,
          status: response?.status,
        }
      }

      currentArticle.value = payload

      return {
        isRedirect: false,
      }
    } catch (err) {
      currentArticle.value = null
      throw err
    }
  }

  // Первоначальная загрузка новостей
  async function fetchInitialNews(query = {}) {
    const requestId = ++initialRequestId
  
    const page = Math.max(Number(query.page) || 1, 1)
    const pageSize = Math.max(Number(query.per_page) || perPage, 1)
  
    const filters = Object.fromEntries(
      Object.entries(query).filter(([key]) => {
        return key !== 'page' && key !== 'per_page'
      })
    )
  
    currentQuery.value = filters
  
    // Сбрасываем предыдущую выдачу
    newsList.value = []
    paginationMeta.value = null
    hasMore.value = false
    currentPage.value = page + 1
  
    // Начинается новая загрузка — старую дополнительную отменяем логически
    isInitialLoading.value = true
    isMoreLoading.value = false
  
    try {
      const response = await get('/news', {
        query: {
          ...filters,
          page,
          per_page: pageSize,
        },
      })
  
      // Игнорируем ответ предыдущего запроса
      if (requestId !== initialRequestId) {
        return []
      }
  
      const data = getNewsData(response)
      const meta = response?.meta || null
  
      newsList.value = data
      paginationMeta.value = meta
  
      currentPage.value = (Number(meta?.page) || page) + 1
      hasMore.value = checkHasMore(data, meta)
  
      return data
    } catch (err) {
      if (requestId === initialRequestId) {
        newsList.value = []
        hasMore.value = false
      }
  
      throw err
    } finally {
      if (requestId === initialRequestId) {
        isInitialLoading.value = false
      }
    }
  }

  // Загрузка новостей для слайдера
  async function fetchInitialSlider() {
    if (newsListSlider.value.length > 0) {
      return newsListSlider.value
    }

    const response = await get('/news', {
      query: {
        page: 1,
        per_page: 12,
      },
    })

    const data = getNewsData(response)

    newsListSlider.value = data

    return data
  }

  // Загрузка следующей страницы
  async function fetchMoreNews() {
    // Не загружаем следующую страницу параллельно с другой загрузкой
    if (
      isInitialLoading.value ||
      isMoreLoading.value ||
      !hasMore.value
    ) {
      return {
        status: 'no_more',
        data: [],
      }
    }
  
    // Запоминаем версию запроса и параметры текущей выдачи
    const requestId = initialRequestId
    const querySnapshot = { ...currentQuery.value }
    const pageSnapshot = currentPage.value
  
    isMoreLoading.value = true
  
    try {
      const response = await get('/news', {
        query: {
          ...querySnapshot,
          page: pageSnapshot,
          per_page: perPage,
        },
      })
  
      // Пока выполнялся запрос, могли изменить фильтры
      if (requestId !== initialRequestId) {
        return []
      }
  
      const data = getNewsData(response)
      const meta = response?.meta || null
  
      newsList.value = appendUniqueNews(
        newsList.value,
        data
      )
  
      paginationMeta.value = meta
  
      currentPage.value = (Number(meta?.page) || pageSnapshot) + 1
      hasMore.value = checkHasMore(data, meta)
  
      return data
    } catch (err) {
      // currentPage не меняем — запрос можно повторить
      throw err
    } finally {
      // Не меняем состояние загрузки более нового запроса
      if (requestId === initialRequestId) {
        isMoreLoading.value = false
      }
    }
  }

  // Получение справочников фильтров
  async function fetchNewsFilters() {
    if (Object.keys(newsListFilter.value).length > 0) {
      return newsListFilter.value
    }

    const response = await get('/news/filters')
    const payload = response?.data ?? response

    const filters = {}

    for (const [key, items] of Object.entries(payload || {})) {
      if (!Array.isArray(items)) {
        filters[key] = []
        continue
      }

      filters[key] = items.map(el => {
        const isObject = typeof el === 'object' && el !== null

        const id = String(isObject ? el.id : el)
        const name = isObject
          ? (el.name ?? id)
          : String(el)

        return {
          id,
          name,
        }
      })
    }

    newsListFilter.value = filters

    return filters
  }

  //---------------------------------------------- RETURN ---------------------------------------------------------

  return {
    // State
    newsList,
    newsListSlider,
    newsListFilter,
    currentNews,
    currentArticle,

    currentPage,
    perPage,
    hasMore,
    isLoading,
    paginationMeta,

    // Actions
    fetchInitialNews,
    fetchInitialSlider,
    fetchNewsFilters,
    fetchMoreNews,
    fetchNewsBySlug,
  }
})