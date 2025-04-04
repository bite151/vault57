import type {Page} from "~/types/Page";
import { usePagesStore } from "~/store/pagesStore";
import {useWindowsStore} from "~/store/windowsStore";
import {useGalleryStore} from "~/store/galleryStore";

export const generateUrl = (currentPage: Page): string => {
  const store = usePagesStore()
  const { pages } = store as { pages: Page[] }
  
  const generator = (page: Page, url: string[] = []): string => {
    const parentId = page.defaultParentId || page.parentId
    const child = pages.find(item => item.id === parentId)
    
    url.unshift(page.url)
    if (child) {
      return generator(child, url)
    }
    return url.filter(url => url.replace('/file/', '/') !== '/').join('')
  }
  return generator(currentPage)
}

export const getParents = (currentPage: Page): Page[] => {
  const store = usePagesStore()
  const { pages } = store as { pages: Page[] }
  
  const generator = (page: Page, array: Page[] = []): Page[] => {
    const parentId = page.defaultParentId || page.parentId
    const child = pages.find(item => item.id === parentId)
    
    array.unshift(page)
    if (child) {
      return generator(child, array)
    }
    return array
  }
  return generator(currentPage)
}

export const findPageByUrl = (url: string): Page | null => {
  const store = usePagesStore()
  const { pages } = store as { pages: Page[] }
  
  const urlParts = url.split('/')
  if (urlParts.length > 1) {
    const lastPart = urlParts[urlParts.length - 1]
    const page = pages
      .filter(page => page.url.replace('/file/', '/') === '/' + lastPart)
      .map(page => ({
        ...page,
        fullUrl: generateUrl(page),
      }))
      .find(({ fullUrl }) => fullUrl === url);
    
    return page || null
  }
  return null
}

export const getPageParams = (url: string): { folder: string, file?: string } | null => {
  let urlParts = url.split('/').filter(item => item)
  if (urlParts.includes('file')) {
    return {
      folder: urlParts[urlParts.length - 3],
      file: urlParts[urlParts.length - 1]
    }
  }
  
  urlParts = urlParts.filter(item => !['games'].includes(item))
  
  if (urlParts.length === 1) {
    return {
      folder: urlParts[0]
    }
  }
  
  if (urlParts.length === 2) {
    return {
      folder: urlParts[0],
      file: urlParts[1]
    }
  }
  return null
}

export const openWindow = async (page: Page): Promise<void> => {
  const url = generateUrl(page)
  const params = getPageParams(url)
  
  if (params?.folder === 'gallery') {
    const galleryStore = useGalleryStore()
    if (!galleryStore.images.length) {
      await galleryStore.fetchImages()
    }
  }
  
  useWindowsStore().updateWindowContent('', url, params)
  window.history.pushState({}, '', url)
}

export const sleep = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms))
