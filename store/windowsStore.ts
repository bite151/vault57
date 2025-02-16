import {findPageByUrl} from "~/helpers/app.helpers";
import type {PageWindow, WindowParams} from "~/types/Window";
import type {Page} from "~/types/Page";
import type {RouteParams} from "vue-router";

export const useWindowsStore = defineStore('windowsStore', () => {
  const openedWindows = ref<PageWindow[]>([])
  const isLoaded = ref<boolean>(false)
  
  function setWindow(toUrl: string, params : RouteParams | null = null): void {
    const page: Page | null = findPageByUrl(toUrl)
    
    if (
      page && page.parentId > 0 && !['/desktop'].includes(page.url)
      && !openedWindows.value.some(item => item.id === page.id)
    ) {
      const windowId = Math.round(new Date().getTime() / 1000)
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
  
  function setWindowToFront(windowId: number) {
    if (!openedWindows.value.length) {
      if (import.meta.browser) {
        window.history.pushState({}, '', '/desktop')
      }
    }
    
    openedWindows.value = openedWindows.value.map((item) => {
      if (item.windowId === windowId) {
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
  }
  
  function updateWindowParams<T extends Partial<WindowParams>>(params: { windowId: number } & T): void {
    openedWindows.value = openedWindows.value.map((item) => {
      if (item.windowId === params.windowId) {
        return {...item, ...params}
      }
      return item
    })
  }
  
  function closeWindow(windowId: number): void {
    openedWindows.value = openedWindows.value.filter(item => item.windowId !== windowId)
  }
  
  return { openedWindows, isLoaded, setWindow, updateWindowContent, updateWindowParams, setWindowToFront, closeWindow}
})
