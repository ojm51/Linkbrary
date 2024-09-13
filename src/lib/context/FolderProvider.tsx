import { createContext, Dispatch, SetStateAction } from 'react';
import { FolderTypes } from '@/lib/api';
import { useFolderHandler } from './useFolderHandler';

interface FolderContextType {
  folderList: FolderTypes[];
  setFolderList: Dispatch<SetStateAction<FolderTypes[]>>;
  selectedFolder: FolderTypes;
  setSelectedFolder: Dispatch<SetStateAction<FolderTypes>>;
}

export const FolderContext = createContext<FolderContextType>({
  folderList: [],
  setFolderList: () => {},
  selectedFolder: {
    createdAt: '',
    id: 0,
    name: '전체',
  },
  setSelectedFolder: () => {},
});

interface FolderProviderProps {
  children: React.ReactNode;
}

export const FolderProvider = ({ children }: FolderProviderProps) => {
  const { folderProviderValue } = useFolderHandler();
  return (
    <FolderContext.Provider value={folderProviderValue}>
      {children}
    </FolderContext.Provider>
  );
};
