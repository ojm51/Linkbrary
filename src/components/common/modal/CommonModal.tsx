import { ComponentPropsWithoutRef } from 'react';
import Image from 'next/image';
import closeIcon from '@/assets/images/close.png';

interface CommonModalProps extends ComponentPropsWithoutRef<'div'> {
  clickModal: () => void;
  title: string;
}

const CommonModal = ({ clickModal, title, children }: CommonModalProps) => {
  return (
    <div
      className="fixed inset-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50"
      onClick={clickModal}
    >
      <section
        className="w-[360px] relative px-10 py-8 bg-white rounded-[15px] border solid border-[#ccd5e3]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4"
          type="button"
          onClick={clickModal}
        >
          <Image src={closeIcon} alt="닫기 아이콘" width={24} height={24} />
        </button>
        <h3 className="text-xl font-bold text-[#373740] font-[Pretendard] not-italic leading-[normal] text-center">
          {title}
        </h3>
        {children}
      </section>
    </div>
  );
};

export default CommonModal;
