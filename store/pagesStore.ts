import type {DesktopItem, Page} from "~/types/Page";

export const usePagesStore = defineStore('pages', () => {
  const { apiRequest } = useAPI();
  const config = useRuntimeConfig()
  const loading = ref<boolean>(false)
  
  const pages = ref<Page[]>([])
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
    const data = await apiRequest<Page[]>('/pages', 'GET')
    loading.value = false
    
    if (data) {
      pages.value = data.map(page => ({
        ...page,
        content: typeof page.content === 'string' ? JSON.parse(page.content) : page.content,
      }))
      return pages.value
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
