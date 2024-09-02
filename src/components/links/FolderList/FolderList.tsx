import { useState } from 'react';
import Image from 'next/image';
import plusIcon from '@/assets/icons/ic_plus.svg';
import Folder from './Folder';
import CommonModal from '@/components/common/modal/CommonModal';
import { AddFolder } from '@/components/modals/ModalContents';

const FolderList = () => {
  const folderList = [
    { id: 1, name: 'a' },
    { id: 2, name: 'bb' },
    { id: 3, name: 'ccc' },
    { id: 4, name: 'dddd' },
  ];
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleClickModal = () => setShowModal((prev) => !prev);

  return (
    <div className="flex justify-between items-center">
      <ul className="flex justify-start items-center gap-2">
        {folderList.map((folderName) => (
          <li key={folderName.id}>
            <Folder folderName={folderName.name} />
          </li>
        ))}
      </ul>

      <button
        className="flex justify-center items-center gap-1 font-medium text-primary text-base font-[Pretendard] not-italic leading-[normal]"
        onClick={handleClickModal}
      >
        폴더 추가
        <Image src={plusIcon} alt="플러스 아이콘" width={16} height={16} />
      </button>
      {showModal && (
        <CommonModal clickModal={handleClickModal} title="폴더 추가">
          <AddFolder />
        </CommonModal>
      )}
    </div>
  );
};

export default FolderList;
