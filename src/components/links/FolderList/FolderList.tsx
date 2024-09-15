import { useContext, useState } from 'react';
import Image from 'next/image';
import plusIcon from '@/assets/icons/ic_plus.svg';
import { CommonModal, ModalRenderer, Folder, CommonButton } from '@/components';
import { addFolder } from '@/lib/api';
import { FolderContext, useModal } from '@/lib/context';
import { useHorizontalScroll } from '@/lib/hooks';

export const FolderList = () => {
  const { folderList, setFolderList, setSelectedFolder } =
    useContext(FolderContext);
  const { openModal } = useModal();

  const [folderName, setFolderName] = useState('');
  const getInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFolderName(e.target.value);
  };

  const [showModal, setShowModal] = useState<boolean>(false);
  const handleCloseModal = () => setShowModal((prev) => !prev);

  const handleAddButtonClick = async () => {
    try {
      const newFolder = await addFolder({ folderName });
      setFolderList((prev) => [...prev, newFolder]);
      setShowModal((prev) => !prev);
      openModal({
        type: 'alert',
        key: 'addFolderSuccess',
        title: '✅ 확인',
        message: `폴더가 추가되었습니다!`,
      });
      setSelectedFolder(newFolder);
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
