import type {Page} from "~/types/Page";
import { usePagesStore } from "~/store/pagesStore";

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
