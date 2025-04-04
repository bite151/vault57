type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH"
interface Options {
  method: Method;
  credentials?: RequestCredentials;
  headers?: { Cookie: string };
}

export function useAPI() {
  const config = useRuntimeConfig()
  
  async function apiRequest<T>(url: string, method: Method, params: any = {}): Promise<T> {
    const session = useCookie<string | null>('session');
    const options: Options = {
      method,
      credentials: 'include'
    }
    if (session) {
      options.headers = {
        Cookie: `session=${session.value}`
      }
    }
    
    try {
      return await $fetch<T>(config.public.API_BASE_URL + url, {
        ...options,
        ...params
      });
    } catch (e) {
      throwError(e)
    }
  }
  
  function throwError(e: any): never {
    // console.dir(e)
    throw createError({
      statusCode: e?.data?.statusCode || 500,
      statusMessage: e?.data?.message instanceof Array ? e?.data?.message.join(', ') : e?.data?.message || e?.message || 'Unknown API error',
      data: e?.data
    })
  }
  
  return { apiRequest }
}
