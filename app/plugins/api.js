export default defineNuxtPlugin((nuxtApp) => {
  const i18n = nuxtApp.$i18n

  const api = $fetch.create({
    //baseURL: 'https://www.gazprom-media.com/api',
    //baseURL: 'https://backend-dev-gpmh.umaws.ru/api',
    baseURL: '/api',

    onRequest({ options }) {
      const currentLocale = i18n.locale.value || 'ru'

      options.headers = {
        ...options.headers,
        'X-localization': currentLocale
      }
    },
    onResponseError({ response }) {
      if (import.meta.server || import.meta.dev) {
        const env = import.meta.server ? 'SERVER' : 'CLIENT'
        console.error(`[API ERROR ${env}]`, {
          url: response.url,
          status: response.status,
          statusText: response.statusText
        })
      }
    }
  })
  return {
    provide: { api }
  }
})

