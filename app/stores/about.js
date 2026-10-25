export const useAboutStore = defineStore('about', () => {
  const { get } = useApi()

  //---------------------------------------------- STATE ---------------------------------------------------------
    const aboutData = ref(null)

  //---------------------------------------------- ACTIONS ---------------------------------------------------------
    async function fetchAbout() {
    if (aboutData?.value) return aboutData?.value
    const response = await get('/pages/homepage')
    const payload = response?.data || response
    aboutData.value = payload
    return payload
  }

  //---------------------------------------------- GETTERS ---------------------------------------------------------


  return {
    // state
    aboutData,
    // actions
    fetchAbout,
  }
})
