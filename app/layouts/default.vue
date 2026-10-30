<script setup>
const route = useRoute()
const theme = computed(() => route.meta.theme || 'dark')
//для меню
const partnerStore = usePartnerStore()
await useAsyncData('partnerDef', () => partnerStore.fetchPartners())
//для футера
const siteStore = useSiteStore()
await useAsyncData('settingsDef', () => siteStore.fetchSettings())
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