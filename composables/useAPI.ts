type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH"
interface ApiError {
  message: string;
  status: number;
  data: any;
}

export function useAPI() {
  const config = useRuntimeConfig()

  async function fetch<T>(url: string, method: Method, options: any): Promise<T | ApiError> {
    try {
      return await $fetch<T>(config.public.API_BASE_URL + url, {
        ...options,
        credentials: 'include',
        method
      });
    } catch (e) {
      throwError(e)
    }
  }
  
  async function fetchRaw(url: string, method: Method, options: any) {
    try {
      return await $fetch.raw(config.public.API_BASE_URL + url, {
        ...options,
        credentials: 'include',
        method
      });
    } catch (e) {
      throwError(e)
    }
  }
  
  function transformNitroError(error: any): ApiError {
    if (error?.response?._data) {
      return {
        message: error.response._data.message || 'Server error',
        status: error.response.status,
        data: error.response._data
      };
    }
    
    if (error?.name === 'FetchError') {
      return {
        message: 'Network error: Could not connect to server',
        status: 0,
        data: null
      };
    }
    
    return {
      message: 'Unknown API error',
      status: -1,
      data: null
    };
  }
  
  function throwError(e: any): never {
    const error = transformNitroError(e);
    
    throw createError({
      statusCode: error.status,
      message: error.message,
    })
  }
  
  return { fetch, fetchRaw }
}
