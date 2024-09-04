import { AddFolderProps } from '@/lib/api/folder';
import { CommonInput, CommonButton } from '@/components';

export const AddFolder = ({
  getInputValue,
  handleAddFolder,
}: AddFolderProps) => {
  return (
    <div>
      <h3 className="text-xl font-bold text-[#373740] font-[Pretendard] not-italic leading-[normal] text-center">
        폴더 추가
      </h3>
      <div className="mt-6 mb-[15px]">
        <CommonInput placeholder="내용 입력" onChange={getInputValue} />
      </div>
      <CommonButton mode="default" onClick={handleAddFolder}>
        추가하기{' '}
      </CommonButton>
    </div>
  );
};
