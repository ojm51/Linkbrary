import { AxiosError } from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { FolderTypes, getFolderList } from '@/lib/api';
import { useAuth } from './AuthProvider';
import { ModalType } from './useModalHandler';
import { useModal } from './ModalProvider';

export const useFolderHandler = () => {
  const { isLoggedin, logout } = useAuth();
  const { openModal } = useModal();
  const [folderList, setFolderList] = useState<FolderTypes[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<FolderTypes>({
    createdAt: '',
    id: 0,
    name: '전체',
  });

  const fetchFolderList = useCallback(async () => {
    try {
      const data = await getFolderList();
      setFolderList(data);
    } catch (error) {
      if (error instanceof AxiosError) {
        const modalOption: ModalType = {
          type: 'alert',
          key: 'linkSearchDefault',
        };
        switch (error.status) {
          case 401:
            modalOption.key = 'expireTokenError';
            modalOption.message =
              '로그인이 만료되었습니다. 다시 로그인해주세요.';
            logout();
            break;
          case 400:
            modalOption.key = 'httpRequestError';
            modalOption.message = '잘못된 요청입니다. 요청 값을 확인해주세요.';
            break;
          default:
            modalOption.key = 'linkSearchUnknownError';
            modalOption.message =
              '알 수 없는 에러입니다. 계속되는 경우 관리자에게 문의해주세요.';
            break;
        }
        openModal(modalOption);
      }
    }
  }, [setFolderList]);

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
