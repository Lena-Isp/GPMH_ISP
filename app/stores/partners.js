export const usePartnerStore = defineStore('partner', () => {
  const { get } = useApi()

  //---------------------------------------------- STATE ---------------------------------------------------------
  const categoriesData = ref([])
  const assetsData = ref([])
  const currentPartners = ref(null)

  //---------------------------------------------- ACTIONS ---------------------------------------------------------
  async function fetchPartners() {
    if (categoriesData.value?.length > 0 && assetsData.value?.length > 0) {
      return { status: 'already_loaded' }
    }

    const [catsRes, partnersRes] = await Promise.all([
      get('/partners/categories'),
      get('/partners')
    ])
    
    if (catsRes.error || partnersRes.error) {
      console.error('API Request failed', catsRes.error || partnersRes.error)
      return { 
        status: 'error', 
        error: catsRes.error || partnersRes.error 
      }
    }

    if (!catsRes?.data || !partnersRes?.data) {
      throw new Error('Invalid API response structure')
    }

    categoriesData.value = catsRes?.data
    assetsData.value = partnersRes?.data
    return { status: 'success' }
  }

  async function fetchPartnersBySlug(slug) {
    try {
      const response = await get(`/partners/${slug}`, {
        redirect: 'manual'
      })
      // Если ответ пришел в обертке { data: { ... } }, достаем чистое значение:
      const payload = response?.data || response
      // // Проверка на пустой объект
      // if (!payload || (Object.keys(payload).length === 0 && payload.constructor === Object)) {
      //   return { isRedirect: true }
      // }
      // // для отсутствующей новости(есть одна локаль)
      // if (payload?.status === 308 || payload?.statusCode === 308 || payload?.status === 0) {
      //   return { isRedirect: true, status: response?.status }
      // }
      // Сохраняем сразу чистый объект без .data
      currentPartners.value = payload
      return { isRedirect: false }
    } catch (err) {
      currentPartners.value = null
      throw err
    }
  }

  //---------------------------------------------- GETTERS ---------------------------------------------------------
  const categoriesWithAssets = computed(() => {
  const rawCategories = Array.isArray(categoriesData.value) ? categoriesData.value : []
  const rawAssets = Array.isArray(assetsData.value) ? assetsData.value : []
  
  const assetsByCategory = {}
  const assetsDeepByCategory = {}
    
    // //распределение активов по категориям (читаемый вариант)
    // const categoryMap = rawCategories.map(catItem => {
    //   return {
    //     ...catItem,
    //     assets: rawAssets.filter(assetItem => 
    //       assetItem.categories?.some(cat => cat.slug === catItem.slug)
    //     )
    //   }
    // })

    // распределение активов по категориям (быстрый вариант)
    // добавляем assets в категории(определяем в какую именно по slug )
    rawAssets?.forEach(asset => {
      asset.categories?.forEach(cat => {
        const slug = cat.slug
    
        // --- assets ---
        if (!assetsByCategory[slug]) {
          assetsByCategory[slug] = []
        }
    
        // добавляем если нет channels
        if (!asset.channels?.length) {
          assetsByCategory[slug].push(asset)
        }
    
        // --- assetsDeep ---
        if (asset.channels?.length) {
          let x = 0
          if (!assetsDeepByCategory[slug]) {
            assetsDeepByCategory[slug] = []
          }
  
          assetsDeepByCategory[slug].push(asset)
        }
      })
    })

    // Считем количество вложенныx активов
    const totalChannels = (obj) => {
      return obj?.reduce((sum, item) => sum + (item.channels?.length || 0), 0)
    }

    //собираем общий массив
    const categoryMap = rawCategories.map(catItem => ({
      ...catItem,
      channels: assetsByCategory[catItem.slug] || [],
      assetsDeep: assetsDeepByCategory[catItem.slug] || [],
      assetsCount: assetsByCategory[catItem.slug]?.length + (totalChannels(assetsDeepByCategory[catItem?.slug]) || 0)
    }))
    return Object.values(categoryMap)
  })

  return {
    categoriesData,
    assetsData,
    categoriesWithAssets,
    currentPartners,
    fetchPartners,
    fetchPartnersBySlug
  }
})