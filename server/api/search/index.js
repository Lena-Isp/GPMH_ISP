
import { mockNews } from '../../data/news.js'

export default defineEventHandler((event) => {
  const query = getQuery(event)

  // Нормализация текста
  const normalizeText = value => {
    return String(value ?? '')
      .normalize('NFKC')
      .trim()
      .toLowerCase()
      .replace(/ё/g, 'е')
      .replace(/[«»"']/g, '')
      .replace(/\s+/g, ' ')
  }

  // Параметры поиска
  const search = normalizeText(query.q || '')
  const searchWords = search.split(' ').filter(Boolean)

  // Сортировка: -date — сначала новые, date — сначала старые
  const sort = query.sort === 'date' ? 'date' : '-date'

  // Пагинация
  const pageValue = Number(query.page)
  const perPageValue = Number(query.per_page)

  const page = Number.isInteger(pageValue) && pageValue > 0
    ? pageValue
    : 1

  const per_page = Number.isInteger(perPageValue) && perPageValue > 0
    ? Math.min(perPageValue, 100)
    : 15

  // Получаем новости
  const sourceNews = Array.isArray(mockNews)
    ? mockNews.flatMap(entry => {
        return Array.isArray(entry?.data)
          ? entry.data
          : [entry]
      })
    : []

  // Формируем текст для поиска
  const getSearchableText = item => {
    const tagNames = Array.isArray(item.tags)
      ? item.tags.map(tag => {
          return typeof tag === 'object' ? tag.name : tag
        })
      : []

    return normalizeText([
      item.name,
      item.slug,
      item.preview_title,
      item.seo?.title,
      item.seo?.description,
      item.seo?.keywords,
      item.author,
      item.partner_name,
      item.partner?.name,
      item.content,
      item.description,
      ...tagNames,
    ].filter(Boolean).join(' '))
  }

  // Поиск: все слова запроса должны встретиться в новости
  let filtered = searchWords.length
    ? sourceNews.filter(item => {
        const searchableText = getSearchableText(item)

        return searchWords.every(word => {
          return searchableText.includes(word)
        })
      })
    : []

  // Сортировка по дате публикации
  filtered.sort((a, b) => {
    const dateA = String(a.date || a.created_at || '')
    const dateB = String(b.date || b.created_at || '')

    const dateCompare = dateA.localeCompare(dateB)
    const idCompare = Number(a.id || 0) - Number(b.id || 0)

    return sort === '-date'
      ? -dateCompare || -idCompare
      : dateCompare || idCompare
  })

  // Пагинация после поиска и сортировки
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
