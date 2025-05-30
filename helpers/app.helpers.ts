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
  
  urlParts = urlParts.filter(item => !['games', 'js'].includes(item))
  
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

export const getNestedValue =(obj: any, path: string) => {
  if (!path.includes('.')) return obj[path]
  return path.split('.').reduce((acc, part) => acc?.[part], obj)
}

export const cloneObj = (obj: any) => {
  return JSON.parse(JSON.stringify(obj))
}


export const deepEqual = (obj1: any, obj2: any) => {
  if (obj1 === obj2) return true;
  
  if (typeof obj1 !== 'object' || obj1 === null ||
    typeof obj2 !== 'object' || obj2 === null) {
    return false;
  }
  
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  
  if (keys1.length !== keys2.length) return false;
  
  for (const key of keys1) {
    if (!keys2.includes(key)) return false;
    if (!deepEqual(obj1[key], obj2[key])) return false;
  }
  
  return true;
}

export const translitUrl = (str: string) => {
  const translitMap: Record<string, string> = {
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo', 'ж': 'zh',
    'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o',
    'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'ts',
    'ч': 'ch', 'ш': 'sh', 'щ': 'sch', 'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu',
    'я': 'ya',
    'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D', 'Е': 'E', 'Ё': 'YO', 'Ж': 'ZH',
    'З': 'Z', 'И': 'I', 'Й': 'Y', 'К': 'K', 'Л': 'L', 'М': 'M', 'Н': 'N', 'О': 'O',
    'П': 'P', 'Р': 'R', 'С': 'S', 'Т': 'T', 'У': 'U', 'Ф': 'F', 'Х': 'H', 'Ц': 'TS',
    'Ч': 'CH', 'Ш': 'SH', 'Щ': 'SCH', 'Ъ': '', 'Ы': 'Y', 'Ь': '', 'Э': 'E', 'Ю': 'YU',
    'Я': 'YA'
  };
  
  return str
    .split('')
    .map(char => translitMap[char] || char)
    .join('')
    .replace(/[^a-zA-Z0-9\-_]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .replace(/[^\w\-]/g, '')
    .toLowerCase()
    .substring(0, 60)
}


export const parseQueryString = (query: string): Record<string, string> => {
  const params: Record<string, string> = {};
  const pairs = query.split('&');
  
  for (const pair of pairs) {
    const [key, value] = pair.split('=');
    params[key] = decodeURIComponent(value || '');
  }
  
  return params;
};
