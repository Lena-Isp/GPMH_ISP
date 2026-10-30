export const useNewsFilterStore = defineStore('newsFilter', () => {
  const route = useRoute()
  const router = useRouter()

  // Состояние (State)
  const activeFilter = ref(null)
  const isModal = ref(false)
  const selectedFilters = ref([])

  const filterOptions = ref([
    { name: 'Все', value: null },
    { name: 'Активы', value: 'partner_id' },
    { name: 'Теги', value: 'tag_id' },
    { name: 'Дата', value: 'date' },
  ])

  // Действия (Actions)


  const updateFiltersQuery = () => {
    const query = { ...route.query }
  
    const groups = {
      partner_id: 'partner_id',
      tag_id: 'tag_id',
      years: 'year',
      months: 'month',
    }
  
    // Удаляем старые фильтры
    Object.values(groups).forEach(group => {
      Object.keys(query).forEach(key => {
        if (key.startsWith(`filter[${group}]`)) {
          delete query[key]
        }
      })
    })
  
    // Добавляем актуальные фильтры
    for (const [type, param] of Object.entries(groups)) {
      const ids = [
        ...new Set(
          selectedFilters.value
            .filter(filter => filter.type === type)
            .map(filter => filter.id)
        ),
      ]
  
      ids.forEach((id, index) => {
        query[`filter[${param}][${index}]`] = id
      })
    }
  
    query.page = 1
    query.per_page = 6
  
    router.push({ query })
  }

  const syncFiltersFromQuery = (query, dictionaries) => {
    const typeMap = {
      partner_id: {
        type: 'partner_id',
        options: dictionaries.partners,
      },
      tag_id: {
        type: 'tag_id',
        options: dictionaries.tags,
      },
      year: {
        type: 'years',
        options: dictionaries.years,
      },
      month: {
        type: 'months',
        options: dictionaries.months,
      },
    }
  
    const restoredFilters = []
  
    Object.entries(query).forEach(([key, value]) => {
      const match = key.match(
        /^filter\[(partner_id|tag_id|year|month)\]\[(\d+)\]$/
      )
  
      if (!match || value == null) return
  
      const config = typeMap[match[1]]
      const ids = Array.isArray(value) ? value : [value]
  
      ids.forEach(id => {
        const option = config.options?.find(
          item => String(item.id) === String(id)
        )
  
        if (!option) return
  
        restoredFilters.push({
          type: config.type,
          id: String(option.id),
          name: option.name,
        })
      })
    })
  
    selectedFilters.value = restoredFilters
  }

  const clearFilters = () => {
    selectedFilters.value = []
    updateFiltersQuery()
  }
  
  const deleteFilters = (id) => {
    const indx = selectedFilters.value.findIndex(
      item => item?.id === id
    )

    if (indx !== -1) {
      selectedFilters.value.splice(indx, 1)
      updateFiltersQuery()
    }
  }

  const openModalFilter = (value) => {
    if(value == null) {
      activeFilter.value = value
      clearFilters()
      return
    }
    isModal.value = true
    activeFilter.value = value
  }

  const closeModalFilter = () => {
    isModal.value = false
    activeFilter.value = null
    clearFilters()
  }
  
  const checkedFilter = (type, id, name) => {
    const index = selectedFilters.value.findIndex(
      filter => filter.type === type && filter.id === id
    ) 
    if (index !== -1) {
      selectedFilters.value.splice(index, 1)
    } else {
      selectedFilters.value.push({type, id, name})
    }
  }

  const onApplyFilters = () => {
    isModal.value = false
    updateFiltersQuery()
  }

  return {
    activeFilter,
    isModal,
    filterOptions,
    selectedFilters,
    syncFiltersFromQuery,
    clearFilters,
    deleteFilters,
    checkedFilter,
    openModalFilter,
    closeModalFilter, 
    onApplyFilters
  }
})