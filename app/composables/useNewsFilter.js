const activeFilter = ref(null)
const isModal = ref(false)
const filterOptions = [
  { name: 'Все', value: null },
  { name: 'Активы', value: 'assets' },
  { name: 'Теги', value: 'tags' },
  { name: 'Дата', value: 'date' },
]

export const useNewsFilter = () => {
  const openModalFilter = (value) => {
    isModal.value = true
    activeFilter.value = value
  }
  const closeModalFilter = () => {
    isModal.value = false
    activeFilter.value = null
  }
  
  return {
    activeFilter,
    isModal,
    filterOptions,
    openModalFilter,
    closeModalFilter
  }
}