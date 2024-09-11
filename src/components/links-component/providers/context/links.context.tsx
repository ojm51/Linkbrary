import {
  ClientSizeAction,
  FolderAction,
  LinksAction,
  LinksQueryAction,
  useClientSize,
  useCustomContext,
  useFolderAction,
  useLinksAction,
  useLinksQueryAction,
} from '@/lib/hooks/links-component';
import { createContext, PropsWithChildren, useMemo } from 'react';

export type LinksContextProps =
  | undefined
  | {
      folderAction: FolderAction;
      clientSizeAction: ClientSizeAction;
      linksQueryAction: LinksQueryAction;
      linksAction: LinksAction;
    };

export const LinksContext = createContext<LinksContextProps>(undefined);

export const useLinksContextSelector = () => useCustomContext(LinksContext);

export const LinksContextProvider = ({ children }: PropsWithChildren) => {
  const folderAction = useFolderAction();
  const clientSizeAction = useClientSize();
  const linksQueryAction = useLinksQueryAction(
    clientSizeAction.data,
    folderAction.data,
  );
  const linksAction = useLinksAction(linksQueryAction.data);
  const value = useMemo(
    () => ({
      folderAction,
      clientSizeAction,
      linksQueryAction,
      linksAction,
    }),
    [clientSizeAction, folderAction, linksAction, linksQueryAction],
  );
  return (
    <LinksContext.Provider value={value}>{children}</LinksContext.Provider>
  );
};
