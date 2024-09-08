import { useContext, useState } from 'react';
import Image from 'next/image';
import linkIcon from '@/assets/icons/ic_link.svg';
import { CommonButton } from '@/components';
import { postLink } from '@/lib/api';
import { FolderContext } from '@/lib/context';

const addLinkButtonClassName =
  'shrink-0 px-4 py-[10px] rounded-lg bg-gradient-color text-[14px] font-semibold text-[#f5f5f5] font-[Pretendard] not-italic leading-[normal]';

export const AddLink = () => {
  const { selectedFolder } = useContext(FolderContext);

  const [url, setUrl] = useState('');
  const getInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const folderId = selectedFolder.id;

  return (
    <div className="m-auto max-w-[800px] h-auto px-5 py-4 flex justify-between items-center rounded-[15px] bg-white border border-solid border-primary">
      <div className="w-full flex justify-center items-center gap-3">
        <Image src={linkIcon} alt="링크 아이콘" width={20} height={20} />
        <input
          className="w-full focus:outline-none placeholder-secondary-60 font-[Pretendard] not-italic leading-[24px]"
          type="text"
          placeholder="링크를 추가해 보세요"
          value={url}
          onChange={getInputValue}
        />
      </div>
      <CommonButton
        mode="default"
        className={addLinkButtonClassName}
        onClick={() => postLink({ url, folderId })}
      >
        추가하기{' '}
      </CommonButton>
    </div>
  );
};
