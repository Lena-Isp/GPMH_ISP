
import type { DefineComponent, SlotsType } from 'vue'
type IslandComponent<T> = DefineComponent<{}, {refresh: () => Promise<void>}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, SlotsType<{ fallback: { error: unknown } }>> & T

type HydrationStrategies = {
  hydrateOnVisible?: IntersectionObserverInit | true
  hydrateOnIdle?: number | true
  hydrateOnInteraction?: keyof HTMLElementEventMap | Array<keyof HTMLElementEventMap> | true
  hydrateOnMediaQuery?: string
  hydrateAfter?: number
  hydrateWhen?: boolean
  hydrateNever?: true
}
type LazyComponent<T> = DefineComponent<HydrationStrategies, {}, {}, {}, {}, {}, {}, { hydrated: () => void }> & T

interface _GlobalComponents {
  AboutNavigation: typeof import("../../app/components/elements/AboutNavigation.vue")['default']
  ArticleImage: typeof import("../../app/components/elements/ArticleImage.vue")['default']
  ArticleQuote: typeof import("../../app/components/elements/ArticleQuote.vue")['default']
  ArticleRutube: typeof import("../../app/components/elements/ArticleRutube.vue")['default']
  ArticleSlider: typeof import("../../app/components/elements/ArticleSlider.vue")['default']
  ArticleText: typeof import("../../app/components/elements/ArticleText.vue")['default']
  ArticleVideo: typeof import("../../app/components/elements/ArticleVideo.vue")['default']
  AssetsDirection: typeof import("../../app/components/elements/AssetsDirection.vue")['default']
  AssetsNews: typeof import("../../app/components/elements/AssetsNews.vue")['default']
  ButtonMore: typeof import("../../app/components/elements/ButtonMore.vue")['default']
  ButtonPervious: typeof import("../../app/components/elements/ButtonPervious.vue")['default']
  Chips: typeof import("../../app/components/elements/Chips.vue")['default']
  CollapseItem: typeof import("../../app/components/elements/CollapseItem.vue")['default']
  FilterItem: typeof import("../../app/components/elements/FilterItem.vue")['default']
  HistoryMenu: typeof import("../../app/components/elements/HistoryMenu.vue")['default']
  Links: typeof import("../../app/components/elements/Links.vue")['default']
  Logo: typeof import("../../app/components/elements/Logo.vue")['default']
  Map: typeof import("../../app/components/elements/Map.vue")['default']
  MenuBurger: typeof import("../../app/components/elements/MenuBurger.vue")['default']
  MenuOverlay: typeof import("../../app/components/elements/MenuOverlay.vue")['default']
  NavNode: typeof import("../../app/components/elements/NavNode.vue")['default']
  NewsCard: typeof import("../../app/components/elements/NewsCard.vue")['default']
  PaginationBullet: typeof import("../../app/components/elements/PaginationBullet.vue")['default']
  PaginationNumber: typeof import("../../app/components/elements/PaginationNumber.vue")['default']
  PaginationPage: typeof import("../../app/components/elements/PaginationPage.vue")['default']
  SocialList: typeof import("../../app/components/elements/SocialList.vue")['default']
  SplitNav: typeof import("../../app/components/elements/SplitNav.vue")['default']
  HomeIntroSections: typeof import("../../app/components/sections/HomeIntroSections.vue")['default']
  HomePreviewSections: typeof import("../../app/components/sections/HomePreviewSections.vue")['default']
  AppFooter: typeof import("../../app/components/shell/AppFooter.vue")['default']
  AppHeader: typeof import("../../app/components/shell/AppHeader.vue")['default']
  ContainerSplit: typeof import("../../app/components/shell/ContainerSplit.vue")['default']
  IconSvg: typeof import("../../app/components/ui/IconSvg.vue")['default']
  Text: typeof import("../../app/components/ui/Text.vue")['default']
  AssetsModal: typeof import("../../app/components/widgets/AssetsModal.vue")['default']
  AssetsSlide: typeof import("../../app/components/widgets/AssetsSlide.vue")['default']
  Collapse: typeof import("../../app/components/widgets/Collapse.vue")['default']
  FilterModal: typeof import("../../app/components/widgets/FilterModal.vue")['default']
  HistoryCard: typeof import("../../app/components/widgets/HistoryCard.vue")['default']
  MenuDesc: typeof import("../../app/components/widgets/MenuDesc.vue")['default']
  MenuMobile: typeof import("../../app/components/widgets/MenuMobile.vue")['default']
  SliderBasic: typeof import("../../app/components/widgets/SliderBasic.vue")['default']
  TokensGlobalStyles: typeof import("../../app/components/tokens/_globalStyles")['default']
  TokensColors: typeof import("../../app/components/tokens/colors")['default']
  TokensFonts: typeof import("../../app/components/tokens/fonts")['default']
  TokensIcons: typeof import("../../app/components/tokens/icons")['default']
  TokensTypography: typeof import("../../app/components/tokens/typography")['default']
  NuxtWelcome: typeof import("../../node_modules/nuxt/dist/app/components/welcome.vue")['default']
  NuxtLayout: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
  NuxtErrorBoundary: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
  ClientOnly: typeof import("../../node_modules/nuxt/dist/app/components/client-only")['default']
  DevOnly: typeof import("../../node_modules/nuxt/dist/app/components/dev-only")['default']
  ServerPlaceholder: typeof import("../../node_modules/nuxt/dist/app/components/server-placeholder")['default']
  NuxtLink: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-link")['default']
  NuxtLoadingIndicator: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
  NuxtTime: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
  NuxtRouteAnnouncer: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
  NuxtAnnouncer: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-announcer")['default']
  NuxtImg: typeof import("../../node_modules/@nuxt/image/dist/runtime/components/NuxtImg.vue")['default']
  NuxtPicture: typeof import("../../node_modules/@nuxt/image/dist/runtime/components/NuxtPicture.vue")['default']
  NuxtLinkLocale: typeof import("../../node_modules/@nuxtjs/i18n/dist/runtime/components/NuxtLinkLocale")['default']
  SwitchLocalePathLink: typeof import("../../node_modules/@nuxtjs/i18n/dist/runtime/components/SwitchLocalePathLink")['default']
  Icon: typeof import("../../node_modules/@nuxt/icon/dist/runtime/components/index")['default']
  NuxtPage: typeof import("../../node_modules/nuxt/dist/pages/runtime/page")['default']
  NoScript: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['NoScript']
  Link: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Link']
  Base: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Base']
  Title: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Title']
  Meta: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Meta']
  Style: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Style']
  Head: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Head']
  Html: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Html']
  Body: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Body']
  NuxtIsland: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-island")['default']
  LazyAboutNavigation: LazyComponent<typeof import("../../app/components/elements/AboutNavigation.vue")['default']>
  LazyArticleImage: LazyComponent<typeof import("../../app/components/elements/ArticleImage.vue")['default']>
  LazyArticleQuote: LazyComponent<typeof import("../../app/components/elements/ArticleQuote.vue")['default']>
  LazyArticleRutube: LazyComponent<typeof import("../../app/components/elements/ArticleRutube.vue")['default']>
  LazyArticleSlider: LazyComponent<typeof import("../../app/components/elements/ArticleSlider.vue")['default']>
  LazyArticleText: LazyComponent<typeof import("../../app/components/elements/ArticleText.vue")['default']>
  LazyArticleVideo: LazyComponent<typeof import("../../app/components/elements/ArticleVideo.vue")['default']>
  LazyAssetsDirection: LazyComponent<typeof import("../../app/components/elements/AssetsDirection.vue")['default']>
  LazyAssetsNews: LazyComponent<typeof import("../../app/components/elements/AssetsNews.vue")['default']>
  LazyButtonMore: LazyComponent<typeof import("../../app/components/elements/ButtonMore.vue")['default']>
  LazyButtonPervious: LazyComponent<typeof import("../../app/components/elements/ButtonPervious.vue")['default']>
  LazyChips: LazyComponent<typeof import("../../app/components/elements/Chips.vue")['default']>
  LazyCollapseItem: LazyComponent<typeof import("../../app/components/elements/CollapseItem.vue")['default']>
  LazyFilterItem: LazyComponent<typeof import("../../app/components/elements/FilterItem.vue")['default']>
  LazyHistoryMenu: LazyComponent<typeof import("../../app/components/elements/HistoryMenu.vue")['default']>
  LazyLinks: LazyComponent<typeof import("../../app/components/elements/Links.vue")['default']>
  LazyLogo: LazyComponent<typeof import("../../app/components/elements/Logo.vue")['default']>
  LazyMap: LazyComponent<typeof import("../../app/components/elements/Map.vue")['default']>
  LazyMenuBurger: LazyComponent<typeof import("../../app/components/elements/MenuBurger.vue")['default']>
  LazyMenuOverlay: LazyComponent<typeof import("../../app/components/elements/MenuOverlay.vue")['default']>
  LazyNavNode: LazyComponent<typeof import("../../app/components/elements/NavNode.vue")['default']>
  LazyNewsCard: LazyComponent<typeof import("../../app/components/elements/NewsCard.vue")['default']>
  LazyPaginationBullet: LazyComponent<typeof import("../../app/components/elements/PaginationBullet.vue")['default']>
  LazyPaginationNumber: LazyComponent<typeof import("../../app/components/elements/PaginationNumber.vue")['default']>
  LazyPaginationPage: LazyComponent<typeof import("../../app/components/elements/PaginationPage.vue")['default']>
  LazySocialList: LazyComponent<typeof import("../../app/components/elements/SocialList.vue")['default']>
  LazySplitNav: LazyComponent<typeof import("../../app/components/elements/SplitNav.vue")['default']>
  LazyHomeIntroSections: LazyComponent<typeof import("../../app/components/sections/HomeIntroSections.vue")['default']>
  LazyHomePreviewSections: LazyComponent<typeof import("../../app/components/sections/HomePreviewSections.vue")['default']>
  LazyAppFooter: LazyComponent<typeof import("../../app/components/shell/AppFooter.vue")['default']>
  LazyAppHeader: LazyComponent<typeof import("../../app/components/shell/AppHeader.vue")['default']>
  LazyContainerSplit: LazyComponent<typeof import("../../app/components/shell/ContainerSplit.vue")['default']>
  LazyIconSvg: LazyComponent<typeof import("../../app/components/ui/IconSvg.vue")['default']>
  LazyText: LazyComponent<typeof import("../../app/components/ui/Text.vue")['default']>
  LazyAssetsModal: LazyComponent<typeof import("../../app/components/widgets/AssetsModal.vue")['default']>
  LazyAssetsSlide: LazyComponent<typeof import("../../app/components/widgets/AssetsSlide.vue")['default']>
  LazyCollapse: LazyComponent<typeof import("../../app/components/widgets/Collapse.vue")['default']>
  LazyFilterModal: LazyComponent<typeof import("../../app/components/widgets/FilterModal.vue")['default']>
  LazyHistoryCard: LazyComponent<typeof import("../../app/components/widgets/HistoryCard.vue")['default']>
  LazyMenuDesc: LazyComponent<typeof import("../../app/components/widgets/MenuDesc.vue")['default']>
  LazyMenuMobile: LazyComponent<typeof import("../../app/components/widgets/MenuMobile.vue")['default']>
  LazySliderBasic: LazyComponent<typeof import("../../app/components/widgets/SliderBasic.vue")['default']>
  LazyTokensGlobalStyles: LazyComponent<typeof import("../../app/components/tokens/_globalStyles")['default']>
  LazyTokensColors: LazyComponent<typeof import("../../app/components/tokens/colors")['default']>
  LazyTokensFonts: LazyComponent<typeof import("../../app/components/tokens/fonts")['default']>
  LazyTokensIcons: LazyComponent<typeof import("../../app/components/tokens/icons")['default']>
  LazyTokensTypography: LazyComponent<typeof import("../../app/components/tokens/typography")['default']>
  LazyNuxtWelcome: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
  LazyNuxtLayout: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
  LazyNuxtErrorBoundary: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
  LazyClientOnly: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/client-only")['default']>
  LazyDevOnly: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/dev-only")['default']>
  LazyServerPlaceholder: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
  LazyNuxtLink: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
  LazyNuxtLoadingIndicator: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
  LazyNuxtTime: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
  LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
  LazyNuxtAnnouncer: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-announcer")['default']>
  LazyNuxtImg: LazyComponent<typeof import("../../node_modules/@nuxt/image/dist/runtime/components/NuxtImg.vue")['default']>
  LazyNuxtPicture: LazyComponent<typeof import("../../node_modules/@nuxt/image/dist/runtime/components/NuxtPicture.vue")['default']>
  LazyNuxtLinkLocale: LazyComponent<typeof import("../../node_modules/@nuxtjs/i18n/dist/runtime/components/NuxtLinkLocale")['default']>
  LazySwitchLocalePathLink: LazyComponent<typeof import("../../node_modules/@nuxtjs/i18n/dist/runtime/components/SwitchLocalePathLink")['default']>
  LazyIcon: LazyComponent<typeof import("../../node_modules/@nuxt/icon/dist/runtime/components/index")['default']>
  LazyNuxtPage: LazyComponent<typeof import("../../node_modules/nuxt/dist/pages/runtime/page")['default']>
  LazyNoScript: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
  LazyLink: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Link']>
  LazyBase: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Base']>
  LazyTitle: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Title']>
  LazyMeta: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Meta']>
  LazyStyle: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Style']>
  LazyHead: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Head']>
  LazyHtml: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Html']>
  LazyBody: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Body']>
  LazyNuxtIsland: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-island")['default']>
}

declare module 'vue' {
  export interface GlobalComponents extends _GlobalComponents { }
}

export {}
