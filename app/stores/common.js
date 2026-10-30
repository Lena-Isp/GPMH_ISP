export const useNewsFilterStore = defineStore('newsFilter', () => {
  const route = useRoute()
  const router = useRouter()

  // Состояние
  const activeFilter = ref(null)
  const isModal = ref(false)

  // Применённые фильтры
  const selectedFilters = ref([])

  // Временные фильтры в модальном окне
  const draftFilters = ref([])

  const filterOptions = ref([
    { name: 'Все', value: null },
    { name: 'Активы', value: 'partner_id' },
    { name: 'Теги', value: 'tag_id' },
    { name: 'Дата', value: 'date' },
  ])

  // Соответствие типов фильтров и параметров URL
  const filterGroups = {
    partner_id: 'partner_id',
    tag_id: 'tag_id',
    years: 'year',
    months: 'month',
  }

  // Приводим все ID к строке для корректного сравнения
  const normalizeId = id => String(id)

  // Обновление query-параметров
  const updateFiltersQuery = async () => {
    const query = { ...route.query }

    // Удаляем предыдущие параметры фильтров
    Object.values(filterGroups).forEach(param => {
      Object.keys(query).forEach(key => {
        if (key.startsWith(`filter[${param}]`)) {
          delete query[key]
        }
      })
    })

    // Добавляем актуальные фильтры
    Object.entries(filterGroups).forEach(([type, param]) => {
      const ids = [
        ...new Set(
          selectedFilters.value
            .filter(filter => filter.type === type)
            .map(filter => normalizeId(filter.id))
        ),
      ]

      ids.forEach((id, index) => {
        query[`filter[${param}][${index}]`] = id
      })
    })

    // При изменении фильтров начинаем с первой страницы
    query.page = 1
    query.per_page = 6

    await router.push({ query })
  }

  // Восстановление фильтров из URL
  const syncFiltersFromQuery = (query, dictionaries = {}) => {
    const typeMap = {
      partner_id: {
        type: 'partner_id',
        options: dictionaries.partners || [],
      },
      tag_id: {
        type: 'tag_id',
        options: dictionaries.tags || [],
      },
      year: {
        type: 'years',
        options: dictionaries.years || [],
      },
      month: {
        type: 'months',
        options: dictionaries.months || [],
      },
    }

    const filterQueryEntries = Object.entries(query).filter(([key]) => {
      return /^filter\[(partner_id|tag_id|year|month)\]\[\d+\]$/.test(key)
    })

    // Если фильтры есть в URL, но справочники ещё не загружены,
    // не затираем ранее восстановленное состояние.
    const dictionariesAreReady = filterQueryEntries.every(([key]) => {
      const match = key.match(
        /^filter\[(partner_id|tag_id|year|month)\]\[\d+\]$/
      )

      return typeMap[match[1]].options.length > 0
    })

    if (filterQueryEntries.length && !dictionariesAreReady) {
      return
    }

    const restoredFilters = []

    filterQueryEntries.forEach(([key, value]) => {
      if (value == null) return

      const match = key.match(
        /^filter\[(partner_id|tag_id|year|month)\]\[(\d+)\]$/
      )

      if (!match) return

      const config = typeMap[match[1]]
      const ids = Array.isArray(value) ? value : [value]

      ids.forEach(id => {
        const normalizedId = normalizeId(id)

        const option = config.options.find(item => {
          return normalizeId(item.id) === normalizedId
        })

        if (!option) return

        // Не добавляем дубликаты
        const alreadyExists = restoredFilters.some(item => {
          return (
            item.type === config.type &&
            item.id === normalizedId
          )
        })

        if (alreadyExists) return

        restoredFilters.push({
          type: config.type,
          id: normalizedId,
          name: option.name,
        })
      })
    })

    selectedFilters.value = restoredFilters

    // Не перезаписываем черновик, пока пользователь работает в модалке
    if (!isModal.value) {
      draftFilters.value = restoredFilters.map(item => ({ ...item }))
    }
  }

  // Очистка всех фильтров
  const clearFilters = async () => {
    selectedFilters.value = []
    draftFilters.value = []

    await updateFiltersQuery()
  }

  // Удаление конкретного применённого фильтра
  const deleteFilters = async (type, id) => {
    const normalizedId = normalizeId(id)

    selectedFilters.value = selectedFilters.value.filter(item => {
      return !(
        item.type === type &&
        normalizeId(item.id) === normalizedId
      )
    })

    // Синхронизируем черновик с применёнными фильтрами
    draftFilters.value = selectedFilters.value.map(item => ({ ...item }))

    await updateFiltersQuery()
  }

  // Открытие модального окна
  const openModalFilter = value => {
    // Кнопка «Все»
    if (value == null) {
      clearFilters()
      return
    }

    // При каждом открытии начинаем с применённых фильтров
    draftFilters.value = selectedFilters.value.map(item => ({ ...item }))

    activeFilter.value = value
    isModal.value = true
  }

  // Закрытие без применения изменений
  const closeModalFilter = () => {
    // Отменяем временный выбор
    draftFilters.value = selectedFilters.value.map(item => ({ ...item }))

    isModal.value = false
    activeFilter.value = null
  }

  // Выбор фильтра внутри модального окна
  const checkedFilter = (type, id, name) => {
    const normalizedId = normalizeId(id)

    const index = draftFilters.value.findIndex(item => {
      return (
        item.type === type &&
        normalizeId(item.id) === normalizedId
      )
    })

    if (index !== -1) {
      draftFilters.value.splice(index, 1)
      return
    }

    draftFilters.value.push({
      type,
      id: normalizedId,
      name,
    })
  }

  // Применение временных фильтров
  const onApplyFilters = async () => {
    selectedFilters.value = draftFilters.value.map(item => ({ ...item }))

    isModal.value = false
    activeFilter.value = null

    await updateFiltersQuery()
  }

  return {
    activeFilter,
    isModal,
    filterOptions,
    selectedFilters,
    draftFilters,

    syncFiltersFromQuery,
    clearFilters,
    deleteFilters,
    checkedFilter,
    openModalFilter,
    closeModalFilter,
    onApplyFilters,
  }
})