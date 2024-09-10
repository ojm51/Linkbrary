import React, { createContext, Dispatch, SetStateAction, useMemo } from 'react';
import { FavoriteLinkTypes } from '@/lib/api';
import { useLinkHandler } from './useLinkHandler';

interface LinkContextType {
  linkList: FavoriteLinkTypes[];
  setLinkList: Dispatch<SetStateAction<FavoriteLinkTypes[]>>;
  selectedLink: FavoriteLinkTypes;
  setSelectedLink: Dispatch<SetStateAction<FavoriteLinkTypes>>;
}

export const LinkContext = createContext<LinkContextType>({
  linkList: [],
  setLinkList: () => {},
  selectedLink: {
    id: 0,
    favorite: false,
    url: '',
    title: '',
    imageSource: '',
    description: '',
    createdAt: '',
  },
  setSelectedLink: () => {},
});

interface LinkProviderProps {
  children: React.ReactNode;
}

export const LinkProvider = ({ children }: LinkProviderProps) => {
  const { linkList, setLinkList, selectedLink, setSelectedLink } =
    useLinkHandler(); // useLinkHandler 훅 사용

  // useMemo를 사용하여 value 객체를 메모이제이션
  const contextValue = useMemo(
    () => ({
      linkList,
      setLinkList,
      selectedLink,
      setSelectedLink,
    }),
    [linkList, setLinkList, selectedLink, setSelectedLink],
  );

  return (
    <LinkContext.Provider value={contextValue}>{children}</LinkContext.Provider>
  );
};
