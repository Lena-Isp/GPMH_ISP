export const useLanguage = () => {
  const switchLocalePath = useSwitchLocalePath()
  const { locale } = useI18n()

  const reloadChangeLang = () => {
    const nextLocale = locale.value === 'ru' ? 'en' : 'ru'
    const newPath = switchLocalePath(nextLocale)
    if (process.client && newPath) {
      window.location.assign(newPath)
    }
  }

  return { reloadChangeLang }
}