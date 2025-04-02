import {splitCookiesString} from "h3";
import {FetchError} from "ofetch";
type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH"

export function useAPI() {
  const config = useRuntimeConfig()

  async function fetch(url: string, method: Method, options: any) {
    try {
      return await $fetch(config.public.API_BASE_URL + url, {
        ...options,
        credentials: 'include',
        method
      });
    } catch (e) {
      errorHandling(e)
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
      errorHandling(e)
    }
  }
  
  function errorHandling(error: unknown): never {
    let statusCode = 500;
    let errorData: any = 'Unknown error';
    
    if (error instanceof FetchError) {
      statusCode = error.response?.status || 500;
      errorData = error.data || error.message || 'Unknown API error';
    } else if (error instanceof Error) {
      errorData = error.message;
    }
    
    throw createError({
      statusCode,
      ...errorData,
    });
  }
  
  return { fetch, fetchRaw, errorHandling }
}
