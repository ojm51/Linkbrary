import { ChangeEvent, useCallback, useContext, useState } from 'react';
import Image from 'next/image';
import { CommonModal, ModalRenderer } from '@/components';
import { FolderContext } from '@/lib/context';
import { deleteFolder, getFolderList, putFolder } from '@/lib/api';

type ModalType = 'add' | 'share' | 'changeName' | 'delete';

interface FolderMenuProps {
  src: string;
  text: string;
  modalType: ModalType;
}

export const FolderMenu = ({ src, text, modalType }: FolderMenuProps) => {
  const { setFolderList, selectedFolder, setSelectedFolder } =
    useContext(FolderContext);

  const [newFolderName, setNewFolderName] = useState('');
  const getInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setNewFolderName(e.target.value);
  };

  const [showModal, setShowModal] = useState<boolean>(false);
  const handleCloseModal = () => setShowModal((prev) => !prev);

  const fetchFolderList = async () => {
    const data = await getFolderList();
    setFolderList(data);
  };

  const handleChangeButtonClick = async () => {
    const folderId = selectedFolder.id;
    try {
      const newFolder = await putFolder({ newFolderName, folderId });
      fetchFolderList();
      setShowModal((prev) => !prev);
      setSelectedFolder(newFolder);
    } catch (error) {
      console.log('폴더 이름 변경 중 오류가 발생했습니다:', error);
    }
  };

  const handleDeleteButtonClick = async () => {
    const folderId = selectedFolder.id;
    try {
      await deleteFolder({ folderId });
      fetchFolderList();
      setShowModal((prev) => !prev);
      // TODO: 폴더 삭제 후 선택된 폴더를 전체 폴더로 초기화
      //  setSelectedFolder();
    } catch (error) {
      console.log('폴더 삭제 중 오류가 발생했습니다:', error);
    }
  };

  const renderModal = () => {
    switch (modalType) {
      case 'share':
        return <ModalRenderer mode="share" />;
      case 'changeName':
        return (
          <ModalRenderer
            mode="changeName"
            getInputValue={getInputValue}
            handleChangeButtonClick={handleChangeButtonClick}
          />
        );
      case 'delete':
        return (
          <ModalRenderer
            mode="delete"
            handleDeleteButtonClick={handleDeleteButtonClick}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <button
        className="flex justify-center items-center gap-1 text-[14px] font-semibold text-secondary-60 font-[Pretendard] not-italic leading-[normal]"
        onClick={handleCloseModal}
      >
        <Image src={src} alt={`${text} 아이콘`} width={18} height={18} />
        {text}
      </button>
      {showModal && (
        <CommonModal closeModal={handleCloseModal}>{renderModal()}</CommonModal>
      )}
    </>
  );
};
