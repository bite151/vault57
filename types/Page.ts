export interface Page {
  id: number;
  parentId: number;
  defaultParentId?: number | null;
  url: string;
  title: string;
  h1: string;
  metaDescription: string;
  content: string[];
  icon?: string;
  showInFinder?: boolean;
  contentComponent?: string;
  hideStatusBar?: boolean;
  resetWidth?: boolean;
}

export interface MenuItem {
  key: string;
  title: string;
  icon: string | null;
  action: (page: Page) => void | null;
}
