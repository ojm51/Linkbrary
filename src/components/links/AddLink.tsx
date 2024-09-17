import { useContext, useState } from 'react';
import Image from 'next/image';
import linkIcon from '@/assets/icons/ic_link.svg';
import { CommonButton } from '@/components';
import { addLink } from '@/lib/api';
import { FolderContext, useModal } from '@/lib/context';
import { useQueryClient } from '@tanstack/react-query';
import {
  linkOptions,
  TLinkDto,
  TLinksResponse,
  TQueryResponse,
} from '@/lib/react-query';
import { useLinksContextSelector } from '../links-component';

const addLinkButtonClassName =
  'shrink-0 px-4 py-[0.625rem] rounded-lg bg-gradient-color text-[0.875rem] font-semibold text-[#f5f5f5] font-[Pretendard] not-italic leading-[normal]';

export const AddLink = () => {
  const { openModal } = useModal();
  const { selectedFolder } = useContext(FolderContext);
  const queryClient = useQueryClient();
  const { linksQueryAction } = useLinksContextSelector();
  const currentQuerykey = linkOptions.find(linksQueryAction.data).queryKey;
  const currentQueryData = queryClient.getQueryData(currentQuerykey);
  const [url, setUrl] = useState('');
  const getInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const folderId = selectedFolder.id;

  /** @TODO 링크가 추가되는 동안 추가하기 버튼에 로딩 스피너 보이기 */
  const handleAddLinkButtonClick = async () => {
    if (!url.trim()) {
      openModal({
        type: 'alert',
        key: 'addLinkError_invalidLink',
        message: `유효한 링크를 입력해주세요.`,
      });
      return;
    }
    if (!folderId) {
      openModal({
        type: 'alert',
        key: 'addLinkError_noFolder',
        message: `아래에서 저장할 폴더를 선택해 주세요.`,
      });
      return;
    }

    try {
      const data = await addLink({ url, folderId });
      const oldList = currentQueryData?.data.list as TLinkDto[];
      const newQueryData = {
        data: {
          totalCount: currentQueryData?.data.totalCount,
          list: [...oldList, data?.data],
        },
      } as TQueryResponse<TLinksResponse<TLinkDto[]>>;
      queryClient.setQueryData(currentQuerykey, newQueryData);

      openModal({
        type: 'alert',
        key: 'linkAdded',
        title: '링크 추가됨 📝',
        message: '링크가 추가되었습니다.',
      });
      setUrl('');
    } catch {
      openModal({
        type: 'alert',
        key: 'addLinkError400',
        message: `이미 존재하는 링크 또는 올바르지 않은 링크입니다.`,
      });
    }
  };

  return (
    <div className="m-auto max-w-[50rem] h-auto px-[0.625rem] py-2 flex justify-between items-center rounded-[15px] bg-white border border-solid border-primary md:px-5 md:py-4 ">
      <div className="w-full flex justify-center items-center gap-3">
        <Image src={linkIcon} alt="링크 아이콘" width={20} height={20} />
        <input
          className="w-full focus:outline-none placeholder-secondary-60 font-[Pretendard] not-italic leading-[1.5rem]"
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
