export interface Page {
  id: number;
  parentId: number;
  defaultParentId?: number | null;
  url: string;
  fullUrl?: string;
  title: string;
  h1: string;
  metaDescription: string;
  content: string[];
  icon: string | null;
  showInFinder?: boolean;
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

export interface MenuItem {
  key: string;
  title: string;
  icon: string | null;
  action: (page: Page) => void | null;
}
