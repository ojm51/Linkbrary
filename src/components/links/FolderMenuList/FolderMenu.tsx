import { useState } from 'react';
import Image from 'next/image';
import CommonModal from '@/components/common/modal/CommonModal';
import {
  ShareFolder,
  ChangeFolderName,
  DeleteFolder,
} from '@/components/modals/ModalContents';

interface FolderMenuProps {
  src: string;
  text: string;
  modalType: string;
}

const FolderMenu = ({ src, text, modalType }: FolderMenuProps) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleClickModal = () => setShowModal((prev) => !prev);

  return (
    <>
      <button
        className="flex justify-center items-center gap-1 text-[14px] font-semibold text-secondary-60 font-[Pretendard] not-italic leading-[normal]"
        onClick={handleClickModal}
      >
        <Image src={src} alt={`${text} 아이콘`} width={18} height={18} />
        {text}
      </button>
      {showModal && (
        <div>
          {modalType === 'share' && (
            <CommonModal clickModal={handleClickModal} title="폴더 공유">
              <ShareFolder />
            </CommonModal>
          )}
          {modalType === 'changeName' && (
            <CommonModal clickModal={handleClickModal} title="폴더 이름 변경">
              <ChangeFolderName />
            </CommonModal>
          )}
          {modalType === 'delete' && (
            <CommonModal clickModal={handleClickModal} title="폴더 삭제">
              <DeleteFolder />
            </CommonModal>
          )}
        </div>
      )}
    </>
  );
};

export default FolderMenu;
