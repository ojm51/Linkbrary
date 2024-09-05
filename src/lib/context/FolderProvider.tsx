import { createContext, Dispatch, SetStateAction } from 'react';
import { useFolderHandler } from './useFolderHandler';
import { FolderTypes } from '@/lib/api';

interface FolderContextType {
  folderList: FolderTypes[];
  setFolderList: Dispatch<SetStateAction<FolderTypes[]>>;
  selectedFolder: string;
  setSelectedFolder: Dispatch<SetStateAction<string>>;
}

export const FolderContext = createContext<FolderContextType>({
  folderList: [],
  setFolderList: () => {},
  selectedFolder: '',
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
