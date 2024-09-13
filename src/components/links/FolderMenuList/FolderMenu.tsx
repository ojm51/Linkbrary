import { useContext, useState } from 'react';
import Image from 'next/image';
import { CommonButton, CommonModal, ModalRenderer } from '@/components';
import { FolderContext, useModal } from '@/lib/context';
import { deleteFolder, getFolderList, updateFolder } from '@/lib/api';
import { useLinksContextSelector } from '@/components/links-component';

type ModalType = 'add' | 'share' | 'changeName' | 'delete';

interface FolderMenuProps {
  src: string;
  text: string;
  modalType: ModalType;
}

export const FolderMenu = ({ src, text, modalType }: FolderMenuProps) => {
  const { setFolderList, selectedFolder, setSelectedFolder } =
    useContext(FolderContext);
  const {
    linksAction: { data: linkData },
  } = useLinksContextSelector();
  const { openModal } = useModal();

  const [newFolderName, setNewFolderName] = useState('');
  const getInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      const newFolder = await updateFolder({ newFolderName, folderId });
      fetchFolderList();
      setShowModal((prev) => !prev);
      setSelectedFolder(newFolder);
    } catch {
      openModal({
        type: 'alert',
        key: 'changeFolderNameError400',
        message: `폴더 이름 변경 중 오류가 발생했습니다. 다시 시도해 주세요.`,
      });
    }
  };

  const handleDeleteButtonClick = async () => {
    const folderId = selectedFolder.id;
    if (linkData && linkData.data.totalCount > 0) {
      openModal({
        type: 'alert',
        key: 'notEmptyFolderDeleteError',
        message: '링크가 들어있는 폴더는 삭제할 수 없습니다.',
        onConfirm() {
          setShowModal(false);
        },
      });
      return;
    }
    try {
      await deleteFolder({ folderId });
      fetchFolderList();
      setShowModal((prev) => !prev);
      setSelectedFolder({ createdAt: '', id: 0, name: '전체' });
    } catch {
      openModal({
        type: 'alert',
        key: 'deleteFolderError400',
        message: `폴더 삭제 중 오류가 발생했습니다. 다시 시도해 주세요.`,
      });
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
      <CommonButton
        mode="default"
        className="flex justify-center items-center gap-1 text-[0.875rem] font-semibold text-secondary-60 font-[Pretendard] not-italic leading-[normal]"
        onClick={handleCloseModal}
      >
        <Image src={src} alt={`${text} 아이콘`} width={18} height={18} />
        {text}
      </CommonButton>
      {showModal && (
        <CommonModal closeModal={handleCloseModal}>{renderModal()}</CommonModal>
      )}
    </>
  );
};
