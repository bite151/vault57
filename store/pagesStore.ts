import type {DesktopItem, Page} from "~/types/Page";

export const usePagesStore = defineStore('pages', () => {
  const config = useRuntimeConfig()
  const pages = ref<Page[]>([])
  
  const loading = ref<boolean>(false)
  
  const desktopItems = ref<DesktopItem[]>([])
  
  async function fetchDesktopItems(): Promise<DesktopItem[]> {
    loading.value = true
    const { data } = await useFetch<DesktopItem[]>(config.public.API_URL + '/desktop.json')
    loading.value = false
    if (data.value) {
      desktopItems.value = data.value
      return data.value
    }
    return []
  }
  
  async function fetchPages(): Promise<Page[]> {
    loading.value = true
    const { data } = await useFetch<Page[]>(config.public.API_URL + '/pages.json')
    loading.value = false
    if (data.value) {
      pages.value = data.value
      return data.value
    }
    return []
  }

  return {
    loading,
    pages,
    desktopItems,
    fetchDesktopItems,
    fetchPages,
  }
})
