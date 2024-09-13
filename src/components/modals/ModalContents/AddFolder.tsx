import { CommonInput, CommonButton } from '@/components';

interface AddFolderProps {
  getInputValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddButtonClick: () => void;
}

export const AddFolder = ({
  getInputValue,
  handleAddButtonClick,
}: AddFolderProps) => {
  return (
    <div>
      <h3 className="text-xl font-bold text-[#373740] font-[Pretendard] not-italic leading-[normal] text-center">
        폴더 추가
      </h3>
      <div className="mt-6 mb-[0.9375rem]">
        <CommonInput placeholder="내용 입력" onChange={getInputValue} />
      </div>
      <CommonButton mode="default" onClick={handleAddButtonClick}>
        추가하기{' '}
      </CommonButton>
    </div>
  );
};
