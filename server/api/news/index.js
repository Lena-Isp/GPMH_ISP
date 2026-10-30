import { mockNews } from '../../data/news.js'

export default defineEventHandler((event) => {
  const query = getQuery(event)

  // 1. Нормализуем структуру исходных данных.
  // В news.js: mockNews = [{ data: [...], links, meta }]
  const sourceNews = Array.isArray(mockNews)
    ? mockNews.flatMap((entry) =>
        Array.isArray(entry.data) ? entry.data : [entry]
      )
    : []

  // 2. Получаем значения фильтров.
  // Поддерживаем filter[field][0], filter[field][1]
  // и вложенный объект query.filter[field].
  const getFilterValues = (field) => {
    const pattern = new RegExp(
      `^filter\\[${field}\\](?:\\[\\d+\\])?$`
    )

    const flatValues = Object.entries(query)
      .filter(([key]) => pattern.test(key))
      .flatMap(([, value]) =>
        Array.isArray(value) ? value : [value]
      )

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
      .filter((value) => value !== '' && value !== null && value !== undefined)
  }

  // 3. Параметры пагинации.
  const pageValue = Number(query.page)
  const limitValue = Number(query.per_page)

  const page = Number.isInteger(pageValue) && pageValue > 0
    ? pageValue
    : 1

  const per_page = Number.isInteger(limitValue) && limitValue > 0
    ? Math.min(limitValue, 100)
    : 6

  // 4. Фильтр по тегам.
  // filter[tag_id][0]=206
  const tagIds = getFilterValues('tag_id')
    .map(Number)
    .filter((id) => Number.isInteger(id) && id > 0)

  // Старый формат category/tag по slug тоже поддерживаем.
  const category = String(query.category || query.tag || '')
    .trim()
    .toLowerCase()

  // 5. Фильтры по году, месяцу и дню.
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

    january_ru: 1,
    february_ru: 2,
    march_ru: 3,
    april_ru: 4,
    may_ru: 5,
    june_ru: 6,
    july_ru: 7,
    august_ru: 8,
    september_ru: 9,
    october_ru: 10,
    november_ru: 11,
    december_ru: 12
  }

  // Поддержка русских названий месяцев.
  Object.assign(monthNames, {
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
    декабрь: 12
  })

  const parseMonth = (value) => {
    const normalized = String(value).trim().toLowerCase()

    if (monthNames[normalized]) {
      return monthNames[normalized]
    }

    const number = Number(normalized)

    return Number.isInteger(number) && number >= 1 && number <= 12
      ? number
      : null
  }

  const years = [
    ...(query.year ? [query.year] : []),
    ...getFilterValues('year')
  ]
    .map(Number)
    .filter((year) => Number.isInteger(year) && year > 0)

  const months = [
    ...(query.month ? [query.month] : []),
    ...getFilterValues('month')
  ]
    .map(parseMonth)
    .filter((month) => month !== null)

  const days = [
    ...(query.day ? [query.day] : []),
    ...getFilterValues('day')
  ]
    .map(Number)
    .filter((day) => Number.isInteger(day) && day >= 1 && day <= 31)

  // Убираем повторяющиеся значения фильтров.
  const uniqueYears = [...new Set(years)]
  const uniqueMonths = [...new Set(months)]
  const uniqueDays = [...new Set(days)]
  const uniqueTagIds = [...new Set(tagIds)]

  // 6. Поиск.
  const search = String(query.search || '')
    .trim()
    .toLowerCase()

  // 7. Фильтрация новостей.
  let filtered = [...sourceNews]

  // По ID тегов: достаточно совпадения хотя бы одного ID.
  if (uniqueTagIds.length) {
    filtered = filtered.filter((item) =>
      Array.isArray(item.tags) &&
      item.tags.some((tag) =>
        uniqueTagIds.includes(Number(tag.id))
      )
    )
  }

  // По slug категории, если slug присутствует в данных.
  if (category) {
    filtered = filtered.filter((item) =>
      Array.isArray(item.tags) &&
      item.tags.some((tag) =>
        String(tag.slug || '').toLowerCase() === category
      )
    )
  }

  // По дате публикации: YYYY-MM-DD.
  if (uniqueYears.length || uniqueMonths.length || uniqueDays.length) {
    filtered = filtered.filter((item) => {
      if (!item.date) return false

      const [itemYear, itemMonth, itemDay] = item.date
        .split('-')
        .map(Number)

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

  // По названию, SEO и названиям тегов.
  if (search) {
    filtered = filtered.filter((item) => {
      const fields = [
        item.name,
        item.slug,
        item.seo?.title,
        item.seo?.description,
        item.seo?.keywords,
        item.author,
        item.partner_name,
        ...(Array.isArray(item.tags)
          ? item.tags.map((tag) => tag.name)
          : [])
      ]

      return fields.some((value) =>
        String(value || '').toLowerCase().includes(search)
      )
    })
  }

  // 8. Сортировка от новых новостей к старым.
  filtered.sort((a, b) =>
    String(b.date || '').localeCompare(String(a.date || '')) ||
    Number(b.id || 0) - Number(a.id || 0)
  )

  // 9. Пагинация после всех фильтров.
  const total = filtered.length
  const offset = (page - 1) * per_page
  const data = filtered.slice(offset, offset + per_page)

  return {
    data,
    meta: {
      total,
      page,
      per_page,
      to: offset + per_page,
      hasMore: offset + per_page < total
    }
  }
})
