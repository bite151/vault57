import type { Page } from "~/types/Page";
import type {RouteParams} from "vue-router";

export interface WindowPosition { x: number; y: number; margin?: string }
export interface WindowSize { width: number; height: number }

export interface WindowParams<Position = WindowPosition>{
  windowId: string;
  pageId: number;
  fullUrl: string;
  routeParams: RouteParams | null;
  isFullScreen?: boolean;
  isHidden?: boolean;
  hiddenAt?: number;
  isOnFront?: boolean;
  position?: Position;
  size?: WindowSize;
}

export type PageWindow = Page & WindowParams<Partial<WindowPosition>>
