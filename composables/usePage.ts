import type {PageContentBlock, Page, PageType} from "~/types/Page";
import {usePagesStore} from "~/store/pagesStore";
import {cloneObj} from "~/helpers/app.helpers";

export function usePage() {
  const pagesStore = usePagesStore();
  const emptyContentBlock: PageContentBlock = {
    type: 'text',
    title: '',
    img: '',
    p: [''],
    images: []
  }
  
  const emptyPage: Page = {
    parentId: 1,
    url: '/',
    content: {
      h1: '',
      blocks: [
        emptyContentBlock
      ]
    },
    range: 0,
    isPublic: 0,
    type: 'file',
    permission: 'public',
    seo: {
      title: '',
      description: '',
      ogTitle: '',
      ogDescription: '',
      ogImageUrl: '',
    },
    mobile: {
      icon: '',
      title: '',
      shortTitle: '',
      description: '',
      contentComponent: null,
      showInLauncher: 0,
      loadParentScreens: 1,
      background: ''
    },
    desktop: {
      icon: '',
      title: '',
      contentComponent: null,
      showInFinder: 1,
      resetWidth: 0,
      hideStatusBar: 0,
      background: '/images/backgrounds/fabric.png'
    }
  }

  function createPage(type: PageType, parentId: number): void {
    if (!parentId) return
    
    const page = pagesStore.pages.find(page => page.id === parentId)
    if (page?.url === '/my-computer') {
      parentId = page.parentId
    }
    
    const allFolderItems = pagesStore.pages.filter(page => page.parentId === parentId)
    
    emptyPage.id = Math.floor(Math.random() * 9_000_000) + 1_000_000
    emptyPage.parentId = parentId
    emptyPage.range = ++allFolderItems.length
    emptyPage.blank = true
    
    const setN = (str: string, separator: string = ' '): string => {
      const newItems = allFolderItems.filter(
        page => page.blank && page.type === type
      )

      const n = ++newItems.length
      return n > 1
        ? str + separator + n
        : str
    }

    if (type === 'folder') {
      emptyPage.url = setN('/new-folder', '-')
      emptyPage.type = 'folder'
      emptyPage.mobile.icon = 'Folder'
      emptyPage.mobile.title = setN('New folder')
      emptyPage.desktop.icon = 'Folder'
      emptyPage.desktop.title = setN('New folder')
    } else if (type === 'file') {
      emptyPage.url = setN('/new-file', '-')
      emptyPage.type = 'file'
      emptyPage.mobile.icon = 'File'
      emptyPage.mobile.title = setN('New file')
      emptyPage.desktop.icon = 'File'
      emptyPage.desktop.title = setN('New file')
    } else {
      return
    }
    
    pagesStore.pages.push(cloneObj(emptyPage))
  }
  
  function createReview() {
  
  }
  
  
  return { emptyPage, emptyContentBlock, createPage, createReview };
}
