interface SEO {
  title: string;
  description: string;
}

export interface Page {
  id?: number;
  parentId: number;
  defaultParentId?: number | null;
  url: string;
  fullUrl?: string;
  content: PageContent | null | string;
  isPublic: number;
  range: number;
  type: 'file' | 'folder' ;
  permission: 'public' | 'user' | 'admin';
  createdBy?: string;
  createdAt?: string;
  updatedAt?: string;
  seo: SEO;
  mobile: MobileAppProps;
  desktop: DesktopAppProps;
  children?: Page[];
}

interface MobileAppProps {
  icon: string;
  title: string;
  shortTitle: string;
  description: string;
  contentComponent: string | null;
  showInLauncher: number;
  loadParentScreens: number;
  background: string;
}

interface DesktopAppProps {
  icon: string;
  title: string;
  contentComponent: string | null;
  showInFinder: number;
  resetWidth: number;
  hideStatusBar: number;
}

export interface MenuItem {
  key: string;
  title: string;
  icon: string | null;
  action: (page: Page) => void | null;
}

export interface Block {
  id?: number;
  type: 'text' | 'image' | 'video' | string; // можно расширить под другие типы блоков
  title: string;
  img?: string;
  p: string[];
  images?: string[];
}

export interface PageContent {
  id?: number;
  pageId?: number;
  h1: string;
  blocks: Block[];
}

export interface DesktopItem {
  key: number;
  title: string;
  url: string;
  icon: string | null;
}
