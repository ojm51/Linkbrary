import { CommonInput, CommonButton } from '@/components';

export const ChangeFolderName = () => {
  return (
    <div>
      <h3 className="text-xl font-bold text-[#373740] font-[Pretendard] not-italic leading-[normal] text-center">
        폴더 이름 변경
      </h3>
      <div className="mt-6 mb-[15px]">
        <CommonInput placeholder="내용 입력" />
      </div>
      <CommonButton mode="default">변경하기 </CommonButton>
    </div>
  );
};
