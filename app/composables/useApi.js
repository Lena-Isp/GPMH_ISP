export function useApi() {
  const { $api } = useNuxtApp()

  async function request(url, options = {}) {
    const meta = {
      status: 0,
    }

    const { onResponse, ...requestOptions } = options

    const responseData = await $api(url, {
      ...requestOptions,

      onResponse({ response }) {
        meta.status = response.status

        // Не теряем пользовательский onResponse, если он передан
        onResponse?.({ response })
      },
    })

    // Пустой или некорректный ответ
    if (
      typeof responseData !== 'object' ||
      responseData === null
    ) {
      return {
        data: null,
        status: meta.status,
      }
    }

    // Если сервер вернул массив напрямую
    if (Array.isArray(responseData)) {
      return {
        data: responseData,
        status: meta.status,
      }
    }

    // Сохраняем meta и остальные поля ответа сервера
    return {
      ...responseData,
      data: responseData.data ?? responseData,
      status: meta.status,
    }
  }

  function get(url, options = {}) {
    return request(url, {
      ...options,
      method: 'GET',
    })
  }

  function post(url, body, options = {}) {
    return request(url, {
      ...options,
      method: 'POST',
      body,
    })
  }

  return {
    get,
    post,
  }
}