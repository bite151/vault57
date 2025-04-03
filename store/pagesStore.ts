import type {DesktopItem, Page} from "~/types/Page";

export const usePagesStore = defineStore('pages', () => {
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
    const data = await $fetch<any>('/api/pages/getAll')
    loading.value = false
    if (data) {
      pages.value = data
      return data
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
