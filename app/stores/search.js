
export const useSearchStore = defineStore('search', () => {
  const { get } = useApi()

  // ---------------------------------------------- STATE ---------------------------------------------------------

  const searchList = ref([])
  const paginationMetaSearch = ref(null)
  const currentQuery = ref({})

  const currentPage = ref(1)
  const total = ref(0)
  const perPage = ref(1)
  const loading = ref(false)

  const lastPage = computed(() => {
    return Math.ceil(total.value / perPage.value)
  })

  const hasMore = computed(() => {
    return currentPage.value < lastPage.value
  })

  // ---------------------------------------------- HELPERS ---------------------------------------------------------

  const getSearchData = (response) => {
    if (Array.isArray(response?.data)) {
      return response.data
    }

    if (Array.isArray(response)) {
      return response
    }

    return []
  }

  // ---------------------------------------------- ACTIONS ---------------------------------------------------------
  async function fetchSearch(query = {}) {
    const page = Math.max(Number(query.page) || 1, 1)
    const pageSize = Math.max(Number(query.per_page) || perPage.value, 1)

    currentQuery.value = { ...query }

    const response = await get('/search', {
      query: {
        ...currentQuery.value,
        page: page,
        per_page: pageSize,
      },
    })
    
    const data = getSearchData(response)

    searchList.value = data

    currentPage.value = response.meta.page
    total.value = response.meta.total
    perPage.value = response.meta.per_page

    return data
  }
  

  const fetchLoadMore = async () => {
    if (loading.value || !hasMore.value) return

    loading.value = true

    try {
      const nextPage = currentPage.value + 1

      const response = await get('/search', {
        query: {
          ...currentQuery.value,
          page: nextPage,
          per_page: perPage.value
        }
      })
      
      searchList.value.push(...response?.data)
  
      currentPage.value = response.meta.page
      total.value = response.meta.total
      perPage.value = response.meta.per_page
  
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }

  }



  // ---------------------------------------------- RETURN ---------------------------------------------------------

  return {
    searchList,
    paginationMetaSearch,
    currentQuery,
    currentPage,
    total,
    perPage,
    loading,
    hasMore,
    fetchSearch,
    fetchLoadMore
  }
})
