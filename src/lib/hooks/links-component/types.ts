import {
  useClientSize,
  useFolderAction,
  useLinksAction,
  useLinksQueryAction,
} from '@/lib/hooks/links-component';

export type FolderAction = ReturnType<typeof useFolderAction>;
export type ClientSizeAction = ReturnType<typeof useClientSize>;
export type LinksQueryAction = ReturnType<typeof useLinksQueryAction>;
export type LinksAction = ReturnType<typeof useLinksAction>;
