import { useContext, useState } from 'react';
import Image from 'next/image';
import linkIcon from '@/assets/icons/ic_link.svg';
import { CommonButton } from '@/components';
import { addLink } from '@/lib/api';
import { FolderContext } from '@/lib/context';

const addLinkButtonClassName =
  'shrink-0 px-4 py-[10px] rounded-lg bg-gradient-color text-[14px] font-semibold text-[#f5f5f5] font-[Pretendard] not-italic leading-[normal]';

export const AddLink = () => {
  const { selectedFolder } = useContext(FolderContext);

  const [url, setUrl] = useState('');
  const getInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  /** @TODO 링크 추가 시 목록에 바로 반영되게 하기 */
  /** @TODO 내용이 있는 경우에만 추가하기 버튼 활성화하기 */
  /** @TODO 링크가 추가되는 동안 추가하기 버튼에 로딩바 보이기 */
  const handleAddLinkButtonClick = async () => {
    await addLink({ url, folderId });
    // TODO: 400 에러(이미 존재하는 링크, 올바르지 않은 링크)/성공 처리, 내용이 있을 때만 버튼 활성화, 요청이 성공하면 인풋 초기화
    alert('링크가 추가되었습니다!');
  };

  /** @TODO 전체 폴더 및 현재 선택된 폴더에 링크 추가하기 */
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
        onClick={handleAddLinkButtonClick}
      >
        추가하기{' '}
      </CommonButton>
    </div>
  );
};
