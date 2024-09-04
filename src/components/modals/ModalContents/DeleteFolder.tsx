import { CommonButton } from '@/components';

export const DeleteFolder = () => {
  return (
    <div>
      <h3 className="text-xl font-bold text-[#373740] font-[Pretendard] not-italic leading-[normal] text-center">
        폴더 삭제
      </h3>
      <h4 className="mt-2 mb-6 text-center text-[14px] text-secondary-60 font-[Pretendard] not-italic leading-[22px]">
        폴더명
      </h4>
      <CommonButton
        className="flex w-full py-4 px-5 justify-center items-center gap-2.5 bg-red rounded-lg text-white disabled:bg-none disabled:bg-gray-500"
        mode="default"
      >
        삭제하기{' '}
      </CommonButton>
    </div>
  );
};
