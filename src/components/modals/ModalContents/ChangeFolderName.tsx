import { useContext } from 'react';
import { FolderContext } from '@/lib/context';
import { CommonInput, CommonButton } from '@/components';

export const ChangeFolderName = () => {
  const { selectedFolder } = useContext(FolderContext);

  return (
    <div>
      <h3 className="text-xl font-bold text-[#373740] font-[Pretendard] not-italic leading-[normal] text-center">
        폴더 이름 변경
      </h3>
      <h4 className="mt-2 mb-6 text-center text-[14px] font-normal text-secondary-60 font-[Pretendard] not-italic leading-[22px]">
        {selectedFolder}
      </h4>
      <div className="mt-6 mb-[15px]">
        <CommonInput placeholder="내용 입력" />
      </div>
      <CommonButton mode="default">변경하기 </CommonButton>
    </div>
  );
};
