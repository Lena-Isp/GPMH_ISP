<script setup>
const route = useRoute()
const theme = computed(() => route.meta.theme || 'dark')
//для меню и футера — параллельно, чтобы не сумировать сетевые задержки на SSR
const partnerStore = usePartnerStore()
const siteStore = useSiteStore()
await Promise.all([
  useAsyncData('partnerDef', () => partnerStore.fetchPartners()),
  useAsyncData('settingsDef', () => siteStore.fetchSettings()),
])
</script>

<template>
<div :class="['layout', `layout--${theme}`]">
  <AppHeader />
  <main class="layout__content">
    <slot />
  </main>
  <AppFooter />
</div>
</template>