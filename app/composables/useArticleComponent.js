
import ArticleQuote from '~/components/elements/ArticleQuote.vue'
import ArticleText from '~/components/elements/ArticleText.vue'
import ArticleImage from '~/components/elements/ArticleImage.vue'
import ArticleSlider from '~/components/elements/ArticleSlider.vue'
import ArticleVideo from '~/components/elements/ArticleVideo.vue'
import ArticleRutube from '~/components/elements/ArticleRutube.vue'

const ARTICLE_COMPONENTS = {
  quote: ArticleQuote,
  text: ArticleText,
  image: ArticleImage,
  slider: ArticleSlider,
  video: ArticleVideo,
  rutube: ArticleRutube
}

export const useArticleComponent = () => {
  const getArticleComponent = (sectionType) => {
    return ARTICLE_COMPONENTS[sectionType] ?? null
  }

  return { getArticleComponent }
}