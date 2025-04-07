import type {DesktopItem, Page} from "~/types/Page";
import {useWindowsStore} from "~/store/windowsStore";

export const usePagesStore = defineStore('pages', () => {
  const windowsStore = useWindowsStore();
  const { apiRequest } = useAPI();
  
  const config = useRuntimeConfig()
  const loading = ref<boolean>(false)
  
  const pages = ref<Page[]>([])
  const editedPage = ref<Page | null>(null)
  const editorHasChanges = ref<boolean>(false)
  
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
      pages.value = data
      return data
    }
    return []
  }
  
  async function savePage(page: Page): Promise<Page | null> {
    loading.value = true

    page.content = JSON.stringify(page.content)
    
    const data = (page.id)
      ? await apiRequest<Page>(`/pages/${page.id}`, 'PATCH', { body: page })
      : await apiRequest<Page>(`/pages`, 'POST', { body: page })
    
    editedPage.value = structuredClone(data)

    if (page.id) {
      pages.value = pages.value.map(page =>
        page.id === data.id
          ? data
          : page
      )
      
      windowsStore.openedWindows = windowsStore.openedWindows.map(window =>
        window.id === data.id
          ? { ...window, ...data }
          : window
      )
    } else {
      pages.value = [...pages.value, data]
    }

    loading.value = false
    return data
  }

  return {
    loading,
    pages,
    editedPage,
    editorHasChanges,
    desktopItems,
    fetchDesktopItems,
    fetchPages,
    savePage,
  }
})
