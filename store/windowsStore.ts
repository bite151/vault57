import {findPageByUrl} from "~/helpers/app.helpers";
import type {PageWindow, WindowParams} from "~/types/Window";
import type {Page} from "~/types/Page";
import type {RouteParams} from "vue-router";

export const useWindowsStore = defineStore('windowsStore', () => {
  const openedWindows = ref<PageWindow[]>([])
  const isLoaded = ref<boolean>(false)
  
  const currentScreen = computed<PageWindow | undefined>(() => openedWindows.value[openedWindows.value.length - 1])
  
  function setWindow(toUrl: string, params : RouteParams | null = null): void {
    const page: Page | null = findPageByUrl(toUrl)
    
    if (
      page && page.parentId > 0 && !['/desktop'].includes(page.url)
      && !openedWindows.value.some(item => item.id === page.id)
    ) {
      const randomString = Math.random().toString(36).substring(2, 10);
      const windowId = randomString + '-' + new Date().getTime()
      let x = 0, y = 0
      if (openedWindows.value.length) {
        x = 66 * (openedWindows.value.length)
        y = 44 * (openedWindows.value.length)
      }
      
      openedWindows.value.push({
        ...page,
        windowId,
        pageId: page.id,
        isOnFront: true,
        isHidden: false,
        fullUrl: page.fullUrl ?? '',
        routeParams: params,
        position: {
          x,
          y,
          margin: 'auto',
        }
      })
      
      setWindowToFront(windowId)
    } else if (page && openedWindows.value.some(item => item.id === page.id)) {
      const id = openedWindows.value.find(item => item.id === page.id)!.windowId
      setWindowToFront(id)
    }
  }
  
  function updateWindowContent(fromUrl: string, toUrl: string, params: RouteParams | null = null): void {
    if (params?.file) {
      setWindow(toUrl, params)
      return
    }
    
    const pageTo = findPageByUrl(toUrl)
    const windowId = openedWindows.value.find(item => item.isOnFront)?.windowId
    
    openedWindows.value = openedWindows.value.map(item =>
      item.windowId === windowId
        ? { ...item, ...pageTo, routeParams: params, fullUrl: toUrl }
        : item
    )
  }
  
  function setWindowToFront(windowId: string) {
    const checkArray = openedWindows.value.some(i => i.windowId === windowId && !i.isHidden)
    if (!checkArray) {
      return false
    }
    
    if (!openedWindows.value.length) {
      if (import.meta.browser) {
        window.history.pushState({}, '', '/desktop')
      }
    }
    
    openedWindows.value = openedWindows.value
      .map((item) => {
        if (item.windowId === windowId) {
          useSeoMeta({
            title: item.seo.title,
            description: item.seo.description
          })
          if (import.meta.browser) {
            window.history.pushState({}, '', item.fullUrl)
          }
          return {
            ...item,
            isOnFront: true,
            isHidden: false
          }
        }
        item.isOnFront = false
        return item
      })
      .sort((a, b) => Number(a.isOnFront) - Number(b.isOnFront))
  }
  
  function updateWindowParams<T extends Partial<WindowParams>>(params: { windowId: string } & T): void {
    openedWindows.value = openedWindows.value.map((item) => {
      if (item.windowId === params.windowId) {
        return {...item, ...params}
      }
      return item
    })
  }
  
  function closeWindow(windowId: string): void {
    openedWindows.value = openedWindows.value.filter(item => item.windowId !== windowId)
    
    if (openedWindows.value.length) {
      const { windowId } = openedWindows.value[openedWindows.value.length - 1]
      setWindowToFront(windowId)
    }
  }
  
  function closeProtectedWindows() {
    openedWindows.value = openedWindows.value.filter(item => item.permission === 'public')
  }
  
  function closeAllWindows(): void {
    openedWindows.value = []
  }
  
  return { openedWindows, isLoaded, setWindow, updateWindowContent, updateWindowParams, setWindowToFront, closeWindow, closeAllWindows, closeProtectedWindows, currentScreen }
})
