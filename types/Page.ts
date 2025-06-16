export interface SEO {
  title: string;
  description: string;
}

export type PageType = 'file' | 'folder' | 'review'

export interface Page {
  id?: number;
  parentId: number;
  defaultParentId?: number | null;
  url: string;
  fullUrl?: string;
  content: PageContent | null | string;
  isPublic: number;
  range: number;
  type: PageType;
  permission: 'public' | 'user' | 'admin';
  createdBy?: string;
  createdAt?: string;
  updatedAt?: string;
  seo: SEO;
  mobile: MobileAppProps;
  desktop: DesktopAppProps;
  children?: Page[];
  blank?: boolean;
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
  background: string;
}

export interface MenuItem {
  key: string;
  title: string;
  icon: string | null;
  action: (page: Page) => void | null;
}

export interface PageContentBlock {
  id?: number;
  type: 'text' | 'image' | 'video';
  title: string;
  img?: string;
  p: string[];
  images?: string[];
}

export interface PageContent {
  id?: number;
  pageId?: number;
  h1: string;
  blocks: PageContentBlock[];
}

export interface DesktopItem {
  key: number;
  title: string;
  url: string;
  icon: string | null;
}
