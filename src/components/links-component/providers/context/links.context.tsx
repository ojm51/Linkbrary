import { FolderContext } from '@/lib/context';
import {
  ClientSizeAction,
  LinksAction,
  LinksQueryAction,
  useClientSize,
  useCustomContext,
  useLinksAction,
  useLinksQueryAction,
} from '@/lib/hooks/links-component';
import { createContext, PropsWithChildren, useContext, useMemo } from 'react';

export type LinksContextProps =
  | undefined
  | {
      clientSizeAction: ClientSizeAction;
      linksQueryAction: LinksQueryAction;
      linksAction: LinksAction;
    };

export const LinksContext = createContext<LinksContextProps>(undefined);

export const useLinksContextSelector = () => useCustomContext(LinksContext);

export const LinksContextProvider = ({ children }: PropsWithChildren) => {
  const folderAction = useContext(FolderContext);
  const clientSizeAction = useClientSize();
  const linksQueryAction = useLinksQueryAction(
    clientSizeAction.data,
    folderAction.selectedFolder,
  );
  const linksAction = useLinksAction(linksQueryAction.data);
  const value = useMemo(
    () => ({
      clientSizeAction,
      linksQueryAction,
      linksAction,
    }),
    [clientSizeAction, linksAction, linksQueryAction],
  );
  return (
    <LinksContext.Provider value={value}>{children}</LinksContext.Provider>
  );
};
