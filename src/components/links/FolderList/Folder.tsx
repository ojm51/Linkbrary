import { useContext } from 'react';
import { FolderContext } from '@/lib/context';
import { FolderTypes } from '@/lib/api';
import { CommonButton } from '@/components';

interface FolderProps {
  folder: FolderTypes;
}

export const Folder = ({ folder }: FolderProps) => {
  const { selectedFolder, setSelectedFolder } = useContext(FolderContext);

  const isActive = selectedFolder.name === folder.name;
  const folderButtonClassNames = `px-3 py-2 border border-solid border-primary rounded-[5px] font-normal text-base font-[Pretendard] not-italic leading-[normal] ${
    isActive ? 'bg-primary text-white' : 'hover:bg-[#e7effb]'
  }`;

  return (
    <CommonButton
      mode="default"
      className={folderButtonClassNames}
      onClick={() => setSelectedFolder(folder)}
    >
      {folder.name}
    </CommonButton>
  );
};
