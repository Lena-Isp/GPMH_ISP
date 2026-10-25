// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-02-26',
   yandexMaps: {
    apikey: process.env.NUXT_PUBLIC_YANDEX_MAPS_API_KEY || '',
    lang: 'ru_RU',
  },

  future: {
    compatibilityVersion: 4 // Включение структуры Nuxt 4
  },

  devtools: {
    enabled: false,
  },

  devServer: {
    port: 5000,
  },

  build: {
    transpile: ['gsap', 'swiper']
  },

  css: [
    'swiper/css',
    'swiper/css/navigation',
    'swiper/css/pagination',
    'swiper/css/autoplay',
    '@/assets/scss/app.scss',
  ],

  vite: {
    optimizeDeps: {
      include: ['gsap', 'gsap/ScrollTrigger']
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "~/assets/scss/base/variables.scss" as *;
            @use "~/assets/scss/base/mixins.scss" as *;
          `,
        },
      },
    },
  },

  components: [
    {
      path: "~/components/elements",
      pathPrefix: false,
    },
    {
      path: "~/components/sections",
      pathPrefix: false,
    },
    {
      path: "~/components/shell",
      pathPrefix: false,
    },
    {
      path: "~/components/ui",
      pathPrefix: false,
    },
    {
      path: "~/components/widgets",
      pathPrefix: false,
    },
    "~/components",
  ],

  modules: ["@nuxtjs/i18n", "@nuxt/icon", "@nuxt/image", '@pinia/nuxt', 'vue-yandex-maps/nuxt'],

  i18n: {
    baseUrl: "https://www.gazprom-media.com",
    locales: [
      { code: "ru", language: "ru-RU", name: "Рус", file: "ru.json" },
      { code: "en", language: "en-US", name: "Eng", file: "en.json" },
    ],
    defaultLocale: "ru",
    strategy: "prefix",
    lazy: true,// ленивая загрузка переводов
    langDir: "locales/",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      //redirectOn: 'all', //'all' для обработки битых ссылок
      alwaysRedirect: true,
    },
    // Автоматически добавляет <link rel="alternate" hreflang="...">
    experimental: {
      strictSeo: true // Автоматически управляет всеми SEO-тегами
    },
    rootRedirect: {
      path: "/ru",
      statusCode: 301,
    },
  },
  
  icon: {
    customCollections: [
      {
        prefix: 'icons',
        dir: './app/assets/icons',
      },
    ],
  },
  image: {
    domains: ['https://www.gazprom-media.com'],
    alias: {
      server: 'https://www.gazprom-media.com'
    }
  },
})