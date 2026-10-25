import { defineStore } from 'pinia'

export const useMenuStore = defineStore('menu', () => {
  const route = useRoute()
  
//---------------------------------------------- STATE ---------------------------------------------------------
  const isOpen = ref(false)
  const isDeskHide = ref(false)

//---------------------------------------------- ACTIONS ---------------------------------------------------------
  const toggle = () => {
    isOpen.value = !isOpen.value
  }
  const close = () => {
    isOpen.value = false
  }
  const closeDesk = () => {
    isDeskHide.value = false
  }

  //---------------------------------------------- WATCH ---------------------------------------------------------
  //следит за сменой роута, чтобы закрывать меню при переходе по страницам
  //следит за открытием/закрытием для блокировки скролла в мобильном меню
  watch(
    () => route.fullPath, 
    () => {
      if (isOpen.value) close()
      if (isDeskHide.value) closeDesk()
    }
  )
  //следит за открытием/закрытием для блокировки скролла в мобильном меню
  watch(
    isOpen, 
    (newValue) => {
      if (!import.meta.client) return
      if (newValue) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
      }
    }
  )

  return { isOpen, toggle, close, isDeskHide }
})