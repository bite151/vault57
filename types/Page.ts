export interface Page {
  id: number;
  parentId: number;
  defaultParentId?: number | null;
  url: string;
  fullUrl?: string;
  title: string;
  fileName: string;
  metaDescription: string;
  mobile: MobileAppProps;
  content: PageContent | null;
  icon: string | null;
  showInFinder?: boolean;
  showInLauncher?: boolean;
  contentComponent?: {
    directory: string;
    component: string;
  } | null;
  hideStatusBar?: boolean;
  resetWidth?: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
}

interface MobileAppProps {
  icon: string;
  title: string;
  description: string;
  shortTitle: string;
  contentComponent: string;
  loadParentsScreens?: boolean;
  background?: string;
}

export interface MenuItem {
  key: string;
  title: string;
  icon: string | null;
  action: (page: Page) => void | null;
}

export interface Block {
  id: number;
  type: 'text' | 'image' | 'video' | string; // можно расширить под другие типы блоков
  title: string;
  img?: string;
  p: string[];
  images?: string[];
}

export interface PageContent {
  id: number;
  pageId: number;
  h1: string;
  blocks: Block[];
}

export interface DesktopItem {
  key: number;
  title: string;
  url: string;
  icon: string | null;
}
