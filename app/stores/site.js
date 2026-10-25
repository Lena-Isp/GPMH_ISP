export const useSiteStore = defineStore('site', () => {
  const { get } = useApi()

  //---------------------------------------------- STATE ---------------------------------------------------------
  const settingsData = ref(null)
  const homePageData = ref(null)

  //---------------------------------------------- ACTIONS ---------------------------------------------------------
  async function fetchSettings() {
    if (settingsData?.value) return settingsData?.value
    const response = await get('/settings') 
    const payload = response?.data || response
    settingsData.value = payload
    return payload
  }

  async function fetchHomepage() {
    if (homePageData?.value) return homePageData?.value
    const response = await get('/pages/homepage')
    const payload = response?.data || response
    homePageData.value = payload
    return payload
  }
  
  //---------------------------------------------- GETTERS ---------------------------------------------------------
  //социальные сети для подвала(на всех страницах)
  const socialNetworks = computed(() => { 
    if (!settingsData.value) return []

    const mapping = [
      { key: 'social_telegram', title: 'Telegram' },
      { key: 'social_vkontakte', title: 'ВКонтакте' },
      { key: 'social_odnoklassniki', title: 'Одноклассники' },
      { key: 'social_yappy', title: 'Yappy' },
      { key: 'social_rutube', title: 'RuTube' },
    ]
    
    return mapping
      .map(({ key, title }) => ({
        link: settingsData?.value[key],
        title
      }))
      .filter(item => item?.link && typeof item?.link === 'string')
  })
  
  return { 
    settingsData,
    homePageData,
    socialNetworks,
    fetchSettings,
    fetchHomepage
  }
})
