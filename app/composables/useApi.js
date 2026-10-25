export function useApi() {
  const { $api } = useNuxtApp()

  async function request(url, options = {}) {  
    const meta = { status: 0 }
    const responseData = await $api(url,  {
      ...options,
      onResponse({ response }) {
        meta.status = response.status
      }
    })
    if (typeof responseData !== 'object' || responseData === null) {
      return { data: null, status: meta.status }
    }
    return {
      data: responseData.data ?? responseData,
      status: meta.status
    }
  }
  
  function get(url, options = {}) {
    return request(url, { ...options, method: 'GET' })
  }

  function post(url, body, options = {}) {
    return request(url, { ...options, method: 'POST', body })
  }

  return { get, post }
}