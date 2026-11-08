import { NAVIGATION } from '~/constants/navigation'

export const useNavigation = () => {
  const partnerStore = usePartnerStore()
  const menuNavigation = computed(() =>
    NAVIGATION.map(item =>
      item.id === 1
        ? {
            ...item,
            channels: partnerStore.categoriesWithAssets
          }
       : item
      )
    )
  return { menuNavigation }
}