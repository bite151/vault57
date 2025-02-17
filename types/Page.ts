export interface Page {
  id: number;
  parentId: number;
  defaultParentId?: number | null;
  url: string;
  fullUrl?: string;
  title: string;
  fileName: string;
  metaDescription: string;
  content: any;
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
