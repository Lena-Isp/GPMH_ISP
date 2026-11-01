
export const useFormattedDate = () => {
  const getFormatted = (date) => {
    return new Date(date)
      .toLocaleString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
      .replace(' г.', '')
  }

  return { getFormatted }
}