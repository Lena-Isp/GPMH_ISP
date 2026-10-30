import { mockNews } from '../../data/news.js'
import { mockFilters } from '../../data/filters.js'

export default defineEventHandler((event) => {
  const query = getQuery(event)

  //---------------------------------------------- HELPERS ---------------------------------------------------------

  // Нормализация строк для сравнения названий
  const normalizeText = value => {
    return String(value ?? '')
      .normalize('NFKC')
      .trim()
      .toLowerCase()
      .replace(/ё/g, 'е')
      .replace(/[«»"']/g, '')
      .replace(/\s+/g, ' ')
  }

  // Получение значений фильтра из query
  // Поддерживаем:
  // filter[tag_id][0]=6
  // filter[tag_id][1]=188
  // filter[tag_id]=6
  // filter[tag_id][1]=188
  // filter[tag_id][]=6
  // filter[tag_id][]=188
  // filter[tag_id][0]=6&filter[tag_id][1]=188
  const getFilterValues = field => {
    const pattern = new RegExp(
      `^filter\\[${field}\\](?:\\[\\d*\\])?$`
    )

    const flatValues = Object.entries(query)
      .filter(([key]) => pattern.test(key))
      .flatMap(([, value]) => {
        return Array.isArray(value) ? value : [value]
      })

    // Поддержка вложенного объекта query.filter
    const nestedValue = query.filter?.[field]

    let nestedValues = []

    if (Array.isArray(nestedValue)) {
      nestedValues = nestedValue
    } else if (
      nestedValue !== null &&
      typeof nestedValue === 'object'
    ) {
      nestedValues = Object.values(nestedValue)
    } else if (nestedValue !== undefined) {
      nestedValues = [nestedValue]
    }

    return [...flatValues, ...nestedValues]
      .flat()
      .filter(value => {
        return value !== '' && value !== null && value !== undefined
      })
      .map(String)
  }

  // Убираем дубликаты
  const uniqueValues = values => {
    return [...new Set(values)]
  }

  //---------------------------------------------- SOURCE DATA ---------------------------------------------------------

  // Получаем новости из mockNews
  const sourceNews = Array.isArray(mockNews)
    ? mockNews.flatMap(entry => {
        return Array.isArray(entry?.data)
          ? entry.data
          : [entry]
      })
    : []

  // Справочник партнёров
  const partners = Array.isArray(mockFilters?.partners)
    ? mockFilters.partners
    : []

  // Сопоставляем ID партнёра с названием
  const partnersMap = new Map(
    partners.map(partner => [
      String(partner.id),
      normalizeText(partner.name),
    ])
  )

  //---------------------------------------------- FILTER VALUES ---------------------------------------------------------

  // Партнёры
  const partnerIds = uniqueValues(
    getFilterValues('partner_id')
  )

  const partnerNames = partnerIds
    .map(id => partnersMap.get(id))
    .filter(Boolean)

  const selectedPartnerNames = new Set(partnerNames)

  // Теги
  const tagIds = getFilterValues('tag_id')
    .map(Number)
    .filter(id => Number.isInteger(id) && id > 0)

  const uniqueTagIds = uniqueValues(tagIds)

  // Годы
  const years = [
    ...(query.year ? [query.year] : []),
    ...getFilterValues('year'),
  ]
    .map(Number)
    .filter(year => Number.isInteger(year) && year > 0)

  const uniqueYears = uniqueValues(years)

  // Месяцы
  const monthNames = {
    january: 1,
    february: 2,
    march: 3,
    april: 4,
    may: 5,
    june: 6,
    july: 7,
    august: 8,
    september: 9,
    october: 10,
    november: 11,
    december: 12,

    январь: 1,
    февраль: 2,
    март: 3,
    апрель: 4,
    май: 5,
    июнь: 6,
    июль: 7,
    август: 8,
    сентябрь: 9,
    октябрь: 10,
    ноябрь: 11,
    декабрь: 12,
  }

  const parseMonth = value => {
    const normalized = normalizeText(value)

    if (monthNames[normalized]) {
      return monthNames[normalized]
    }

    const number = Number(normalized)

    return Number.isInteger(number) && number >= 1 && number <= 12
      ? number
      : null
  }

  const months = [
    ...(query.month ? [query.month] : []),
    ...getFilterValues('month'),
  ]
    .map(parseMonth)
    .filter(month => month !== null)

  const uniqueMonths = uniqueValues(months)

  // Дни — оставляем поддержку на будущее
  const days = [
    ...(query.day ? [query.day] : []),
    ...getFilterValues('day'),
  ]
    .map(Number)
    .filter(day => Number.isInteger(day) && day >= 1 && day <= 31)

  const uniqueDays = uniqueValues(days)

  // Старый формат фильтрации по slug категории
  const category = normalizeText(query.category || query.tag || '')

  // Поиск
  const search = normalizeText(query.search || '')

  //---------------------------------------------- PAGINATION ---------------------------------------------------------

  const pageValue = Number(query.page)
  const limitValue = Number(query.per_page)

  const page = Number.isInteger(pageValue) && pageValue > 0
    ? pageValue
    : 1

  const per_page = Number.isInteger(limitValue) && limitValue > 0
    ? Math.min(limitValue, 100)
    : 6

  //---------------------------------------------- FILTERING ---------------------------------------------------------

  let filtered = [...sourceNews]

  // 1. Фильтр по партнёрам
  // Несколько партнёров работают по OR:
  // достаточно совпадения хотя бы одного.
  if (partnerIds.length) {
    filtered = filtered.filter(item => {
      // Если в новости есть прямой partner_id — используем его
      const itemPartnerId =
        item.partner_id ??
        item.partner?.id

      if (itemPartnerId != null) {
        return partnerIds.includes(String(itemPartnerId))
      }

      // В mockNews используется partner_name,
      // поэтому сопоставляем название с ID из справочника
      const itemPartnerName = normalizeText(
        item.partner_name ?? item.partner?.name
      )

      return (
        itemPartnerName !== '' &&
        selectedPartnerNames.has(itemPartnerName)
      )
    })
  }

  // 2. Фильтр по тегам
  // Несколько тегов работают по OR.
  if (uniqueTagIds.length) {
    filtered = filtered.filter(item => {
      if (!Array.isArray(item.tags)) return false

      return item.tags.some(tag => {
        const tagId = typeof tag === 'object'
          ? Number(tag.id)
          : Number(tag)

        return uniqueTagIds.includes(tagId)
      })
    })
  }

  // 3. Фильтр по slug категории
  if (category) {
    filtered = filtered.filter(item => {
      if (!Array.isArray(item.tags)) return false

      return item.tags.some(tag => {
        return normalizeText(tag.slug) === category
      })
    })
  }

  // 4. Фильтр по дате
  // Годы работают по OR.
  // Месяцы работают по OR.
  // Но год и месяц между собой работают по AND.
  if (
    uniqueYears.length ||
    uniqueMonths.length ||
    uniqueDays.length
  ) {
    filtered = filtered.filter(item => {
      const dateValue = item.date || item.created_at

      if (!dateValue) return false

      const match = String(dateValue).match(
        /^(\d{4})-(\d{1,2})-(\d{1,2})/
      )

      if (!match) return false

      const itemYear = Number(match[1])
      const itemMonth = Number(match[2])
      const itemDay = Number(match[3])

      if (
        uniqueYears.length &&
        !uniqueYears.includes(itemYear)
      ) {
        return false
      }

      if (
        uniqueMonths.length &&
        !uniqueMonths.includes(itemMonth)
      ) {
        return false
      }

      if (
        uniqueDays.length &&
        !uniqueDays.includes(itemDay)
      ) {
        return false
      }

      return true
    })
  }

  // 5. Поиск по новостям
  if (search) {
    filtered = filtered.filter(item => {
      const fields = [
        item.name,
        item.slug,
        item.seo?.title,
        item.seo?.description,
        item.seo?.keywords,
        item.author,
        item.partner_name,
        ...(Array.isArray(item.tags)
          ? item.tags.map(tag => {
              return typeof tag === 'object' ? tag.name : tag
            })
          : []),
      ]

      return fields.some(value => {
        return normalizeText(value).includes(search)
      })
    })
  }

  //---------------------------------------------- SORTING ---------------------------------------------------------

  // Сначала новые новости
  filtered.sort((a, b) => {
    return (
      String(b.date || '').localeCompare(String(a.date || '')) ||
      Number(b.id || 0) - Number(a.id || 0)
    )
  })

  //---------------------------------------------- PAGINATED RESULT ---------------------------------------------------------

  // Пагинация применяется после всех фильтров
  const total = filtered.length
  const offset = (page - 1) * per_page

  const data = filtered.slice(offset, offset + per_page)

  const from = data.length ? offset + 1 : null
  const to = data.length ? offset + data.length : null

  return {
    data,

    meta: {
      total,
      page,
      per_page,
      from,
      to,
      hasMore: offset + data.length < total,
    },
  }
})