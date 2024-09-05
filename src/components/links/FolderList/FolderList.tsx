import { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import plusIcon from '@/assets/icons/ic_plus.svg';
import { CommonModal, ModalRenderer, Folder } from '@/components';
import { AddFolderProps, getFolderList, postFolder } from '@/lib/api';
import { FolderContext } from '@/lib/context';

export const FolderList = () => {
  const { folderList, setFolderList, setSelectedFolder } =
    useContext(FolderContext);

  const [folderName, setFolderName] = useState('');
  const getInputValue: AddFolderProps['getInputValue'] = (e) => {
    setFolderName(e.target.value);
  };

  const [showModal, setShowModal] = useState<boolean>(false);
  const handleCloseModal = () => setShowModal((prev) => !prev);

  const fetchFolderList = async () => {
    const data = await getFolderList();
    setFolderList(data);
  };
  useEffect(() => {
    fetchFolderList();
  }, []);

  const handleAddFolderButtonClick = async () => {
    await postFolder({ folderName });
    fetchFolderList();
    setShowModal((prev) => !prev);
  };

  return (
    <div className="flex justify-between items-center">
      <ul className="flex justify-start items-center gap-2">
        {folderList.map((folder) => (
          <li key={folder.id}>
            <Folder
              folderName={folder.name}
              handleFolderButtonClick={setSelectedFolder}
            />
          </li>
        ))}
      </ul>

      <button
        className="flex justify-center items-center gap-1 font-medium text-primary text-base font-[Pretendard] not-italic leading-[normal]"
        onClick={handleCloseModal}
      >
        폴더 추가
        <Image src={plusIcon} alt="플러스 아이콘" width={16} height={16} />
      </button>

      {showModal && (
        <CommonModal closeModal={handleCloseModal}>
          <ModalRenderer
            mode="add"
            getInputValue={getInputValue}
            handleAddFolder={handleAddFolderButtonClick}
          />
        </CommonModal>
      )}
    </div>
  );
};
