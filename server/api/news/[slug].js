import { mockNews } from '../../data/news.js'
import { newsArticles } from '../../data/news-articles.js'

export default defineEventHandler((event) => {
  const slug = getRouterParam(event, 'slug')

  // Получаем новости из общего списка
  const sourceNews = mockNews.flatMap(entry => {
    return Array.isArray(entry?.data)
      ? entry.data
      : [entry]
  })

  // Ищем краткую информацию о новости
  const article = sourceNews.find(item => item.slug === slug)

  if (!article) {
    throw createError({
      statusCode: 404,
      statusMessage: 'News not found'
    })
  }

  // Дополняем новость полным содержимым
  const articleContent = newsArticles[slug] || {}

  return {
    data: {
      ...article,
      ...articleContent
    }
  }
})