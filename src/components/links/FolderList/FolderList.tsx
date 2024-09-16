import { AxiosError } from 'axios';
import { useCallback, useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import plusIcon from '@/assets/icons/ic_plus.svg';
import { CommonModal, ModalRenderer, Folder, CommonButton } from '@/components';
import { getFolderList, addFolder } from '@/lib/api';
import { FolderContext, ModalType, useAuth, useModal } from '@/lib/context';
import { useHorizontalScroll } from '@/lib/hooks';

export const FolderList = () => {
  const { folderList, setFolderList, setSelectedFolder } =
    useContext(FolderContext);
  const { logout } = useAuth();
  const { openModal } = useModal();

  const [folderName, setFolderName] = useState('');
  const getInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFolderName(e.target.value);
  };

  const [showModal, setShowModal] = useState<boolean>(false);
  const handleCloseModal = () => setShowModal((prev) => !prev);

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
    fetchFolderList();
  }, []);

  const handleAddButtonClick = async () => {
    try {
      if (folderName === '전체') {
        openModal({
          type: 'alert',
          key: 'addFolderNameError',
          message: '"전체" 라는 이름의 폴더는 생성할 수 없습니다.',
        });
      } else {
        const newFolder = await addFolder({ folderName });
        setFolderList((prev) => [...prev, newFolder]);
        setShowModal((prev) => !prev);
        setSelectedFolder(newFolder);
      }
    } catch {
      openModal({
        type: 'alert',
        key: 'addFolderError400',
        message: `폴더 추가 중 오류가 발생했습니다. 다시 시도해 주세요.`,
      });
    }
  };

  const listWrapperRef = useHorizontalScroll();

  const defaultAllFolder = { createdAt: '', id: 0, name: '전체' };

  return (
    <div className="flex justify-between items-center gap-4 w-full">
      <div className="flex justify-start items-center gap-4 min-w-0">
        <Folder folder={defaultAllFolder} />
        <ul
          className="flex justify-start items-center gap-2 overflow-x-auto whitespace-nowrap scrollbar-hide"
          ref={listWrapperRef}
        >
          {folderList.map((folder) => (
            <li key={folder.id}>
              <Folder folder={folder} />
            </li>
          ))}
        </ul>
      </div>

      <CommonButton
        mode="default"
        className="flex justify-center items-center gap-1 font-medium text-primary text-base whitespace-nowrap font-[Pretendard] not-italic leading-[normal]"
        onClick={handleCloseModal}
      >
        폴더 추가
        <Image src={plusIcon} alt="플러스 아이콘" width={16} height={16} />
      </CommonButton>

      {showModal && (
        <CommonModal closeModal={handleCloseModal}>
          <ModalRenderer
            mode="add"
            getInputValue={getInputValue}
            handleAddButtonClick={handleAddButtonClick}
          />
        </CommonModal>
      )}
    </div>
  );
};
