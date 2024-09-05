import { useContext } from 'react';
import { FolderContext } from '@/lib/context';

interface FolderProps {
  folderName: string;
  handleFolderButtonClick: (folderName: string) => void;
}

export const Folder = ({
  folderName,
  handleFolderButtonClick,
}: FolderProps) => {
  const { selectedFolder } = useContext(FolderContext);

  const isActive = selectedFolder === folderName;
  const folderButtonClassNames = `px-3 py-2 border border-solid border-primary rounded-[5px] font-normal text-base font-[Pretendard] not-italic leading-[normal] ${
    isActive ? 'bg-primary text-white' : 'hover:bg-[#e7effb]'
  }`;

  return (
    <button
      className={folderButtonClassNames}
      onClick={() => handleFolderButtonClick(folderName)}
    >
      {folderName}
    </button>
  );
};
