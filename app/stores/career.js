export const useCareerStore = defineStore('career', () => {
  const { get } = useApi()

  //---------------------------------------------- STATE ---------------------------------------------------------
  const careerData = ref(null) 
  const faqsData = ref(null)
  const careerNewsData = ref(null)

  //---------------------------------------------- ACTIONS ---------------------------------------------------------
  async function fetchCareer() {
    if (careerData?.value) return careerData?.value
    const response = await get('/career/page') 
    const payload = response?.data || response
    careerData.value = payload
    return payload
  }
  
  async function fetchFaqs() {
    if (faqsData?.value) return faqsData?.value
    const response = await get('/career/faqs') 
    const payload = response?.data || response
    faqsData.value = payload
    return payload
  }

  async function fetchCareerNews() {
    if (careerNewsData?.value) return careerNewsData?.value
    const response = await get('/career/news', {
      query: {
        page: 1,
        per_page: 3,
      },
    }) 
    const payload = response?.data || response
    careerNewsData.value = payload
    return payload
  }
  
  return { 
    careerData,
    faqsData,
    careerNewsData,
    fetchCareer,
    fetchFaqs,
    fetchCareerNews
  }
})
