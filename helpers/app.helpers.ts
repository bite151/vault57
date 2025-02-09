import type {Page} from "~/types/Page";
import { usePagesStore } from "~/store/pagesStore";

export const generateUrl = (currentPage: Page): string => {
  const store = usePagesStore()
  const pages: Page[] = store.pages
  
  const generator = (page: Page, url: string[] = []): string => {
    const parentId = page.defaultParentId || page.parentId
    const child = pages.find(item => item.id === parentId)
    url.unshift(page.url)
    if (child) {
      return generator(child, url)
    }
    return url.filter(url => url !== '/').join('')
  }
  return generator(currentPage)
}
