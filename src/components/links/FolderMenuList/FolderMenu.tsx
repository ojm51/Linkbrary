// import { useState } from 'react';
// import Image from 'next/image';
// import { CommonModal, ModalRenderer } from '@/components';

// type ModalType = 'add' | 'share' | 'changeName' | 'delete';

// interface FolderMenuProps {
//   src: string;
//   text: string;
//   modalType: ModalType;
// }

// export const FolderMenu = ({ src, text, modalType }: FolderMenuProps) => {
//   const [showModal, setShowModal] = useState<boolean>(false);

//   const handleCloseModal = () => setShowModal((prev) => !prev);

//   return (
//     <>
//       <button
//         className="flex justify-center items-center gap-1 text-[14px] font-semibold text-secondary-60 font-[Pretendard] not-italic leading-[normal]"
//         onClick={handleCloseModal}
//       >
//         <Image src={src} alt={`${text} 아이콘`} width={18} height={18} />
//         {text}
//       </button>
//       {showModal && (
//         <CommonModal closeModal={handleCloseModal}>
//           <ModalRenderer mode={modalType} />
//         </CommonModal>
//       )}
//     </>
//   );
// };

import { useState } from 'react';
import Image from 'next/image';
import { CommonModal, ModalRenderer } from '@/components';
import { AddFolderProps } from '@/lib/api';

type ModalType = 'add' | 'share' | 'changeName' | 'delete';

interface FolderMenuProps {
  src: string;
  text: string;
  modalType: ModalType;
}

export const FolderMenu = ({ src, text, modalType }: FolderMenuProps) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleCloseModal = () => setShowModal((prev) => !prev);
  // 모드별로 추가 props를 정의
  const renderModal = () => {
    switch (modalType) {
      case 'share':
        return <ModalRenderer mode="share" />; // Share 모드는 추가 props 필요 없음
      case 'changeName':
        return <ModalRenderer mode="changeName" />; // ChangeName 모드도 추가 props 없음
      case 'delete':
        return <ModalRenderer mode="delete" />; // Delete 모드도 추가 props 없음
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
