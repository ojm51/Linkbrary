import { useContext } from 'react';
import { FolderContext } from '@/lib/context';
import { CommonInput, CommonButton } from '@/components';
import { putFolder } from '@/lib/api';

export const ChangeFolderName = () => {
  const { selectedFolder } = useContext(FolderContext);

  const handleChangeButtonClick = () => {
    const folderName = selectedFolder.name;
    const folderId = selectedFolder.id;
    putFolder({ folderName, folderId });
  };

  return (
    <div>
      <h3 className="text-xl font-bold text-[#373740] font-[Pretendard] not-italic leading-[normal] text-center">
        폴더 이름 변경
      </h3>
      <h4 className="mt-2 mb-6 text-center text-[14px] font-normal text-secondary-60 font-[Pretendard] not-italic leading-[22px]">
        {selectedFolder.name}
      </h4>
      <div className="mt-6 mb-[15px]">
        <CommonInput placeholder="내용 입력" />
      </div>
      <CommonButton mode="default" onClick={handleChangeButtonClick}>
        변경하기{' '}
      </CommonButton>
    </div>
  );
};
