import { useCallback, useEffect, useState } from 'react';
import { FolderTypes, getFolderList } from '@/lib/api';
import { useModal } from '@/lib/context';
import { useAuth } from './AuthProvider';

export const useFolderHandler = () => {
  const { openModal } = useModal();

  const getInitialFolder = () => {
    return { createdAt: '', id: 0, name: '전체' };
  };

  const { isLoggedin } = useAuth();
  const [folderList, setFolderList] = useState<FolderTypes[]>([]);
  const [selectedFolder, setSelectedFolder] =
    useState<FolderTypes>(getInitialFolder);

  const fetchFolderList = useCallback(async () => {
    try {
      const data = await getFolderList();
      setFolderList(data);
    } catch {
      openModal({
        type: 'alert',
        key: 'getFolderError400',
        message: `폴더를 가져오는 중 에러가 발생했습니다. 다시 시도해주세요.`,
      });
    }
  }, []);

  useEffect(() => {
    if (isLoggedin) {
      fetchFolderList();
    }
  }, [isLoggedin, fetchFolderList]);

  const folderProviderValue = {
    folderList,
    setFolderList,
    selectedFolder,
    setSelectedFolder,
  };

  return { folderProviderValue };
};
