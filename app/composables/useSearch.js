
import { ref } from 'vue'

const isVisibleSearch = ref(false)

export const useSearchModal = () => {
  const route = useRoute()

  const openModal = () => {
    const isSearchPage = route.name && route.name.startsWith('search')
    if (isSearchPage) return

    isVisibleSearch.value = true
  }
  
  const closeModal = () => { 
    isVisibleSearch.value = false 
  }

  return { 
    isVisibleSearch, 
    openModal, 
    closeModal
  }
}