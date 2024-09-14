import { useEffect, useCallback, useContext } from 'react';
import Image from 'next/image';
import kakaoIcon from '@/assets/images/kakaoTalk.png';
import facebookIcon from '@/assets/images/facebook.png';
import copyLinkIcon from '@/assets/images/copyLink.png';
import { FolderContext, useModal } from '@/lib/context';
import { CommonButton } from '@/components';

export const ShareFolder = () => {
  const { openModal } = useModal();
  const { selectedFolder } = useContext(FolderContext);
  /** @TODO 적당한 base url 설정하기 - 배포용 주소로 */
  const BASE_URL = `배포용 주소로`;
  const SHARING_URL = `${BASE_URL}/shared/${selectedFolder.id}`;

  const { Kakao, open } = window;
  const initializeKakao = useCallback(() => {
    if (Kakao && !Kakao.isInitialized()) {
      Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_API_KEY);
    }
  }, []);
  useEffect(() => {
    initializeKakao();
  }, [initializeKakao]);

  /** @TODO 폴더 공유 시 보일 디폴트 이미지 추가하기 */
  const kakaoTalkShare = () => {
    if (!window.Kakao || !window.Kakao.isInitialized()) {
      openModal({
        type: 'alert',
        key: 'kakaoInitError',
        message: `카카오톡 공유하기에 실패하였습니다. 공유를 다시 시도해주세요.`,
      });
      return;
    }

    Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: `공유된 "${selectedFolder.name}" 폴더`,
        description: `"${selectedFolder.name}" 폴더에 저장된 링크 목록입니다`,
        imageUrl: '/src/assets/images/sharingDefaultImage.png',
        link: {
          mobileWebUrl: SHARING_URL,
          webUrl: SHARING_URL,
        },
      },
    });
  };

  const facebookShare = () => {
    return open(`http://www.facebook.com/sharer/sharer.php?u=${SHARING_URL}`);
  };

  const clipboardCopy = (): void => {
    if (!navigator.clipboard) {
      openModal({
        type: 'alert',
        key: 'invalidBrowserError',
        message: `복사하기가 지원되지 않는 브라우저입니다.`,
      });
      return;
    }

    navigator.clipboard
      .writeText(SHARING_URL)
      .then(() => {
        openModal({
          type: 'alert',
          key: 'addLinkSuccess',
          title: '✅ 확인',
          message: `클립보드에 복사되었습니다!`,
        });
      })
      .catch(() => {
        openModal({
          type: 'alert',
          key: 'copyError',
          message: `복사를 다시 시도해주세요.`,
        });
      });
  };

  const shareMethodList = [
    {
      id: 1,
      src: kakaoIcon,
      text: '카카오톡',
      onClick: kakaoTalkShare,
    },
    {
      id: 2,
      src: facebookIcon,
      text: '페이스북',
      onClick: facebookShare,
    },
    {
      id: 3,
      src: copyLinkIcon,
      text: '링크 복사',
      onClick: clipboardCopy,
    },
  ];

  return (
    <div>
      <h3 className="text-xl font-bold text-[#373740] font-[Pretendard] not-italic leading-[normal] text-center">
        폴더 공유
      </h3>
      <h4 className="mt-2 mb-6 text-center text-[0.875rem] font-normal text-secondary-60 font-[Pretendard] not-italic leading-[1.375rem]">
        {selectedFolder.name}
      </h4>
      <ul className="flex justify-center items-center gap-8">
        {shareMethodList.map((shareMethod) => (
          <li
            className="flex flex-col justify-center items-center gap-[0.625rem]"
            key={shareMethod.id}
          >
            <CommonButton
              mode="default"
              className=""
              onClick={shareMethod.onClick}
            >
              <Image
                src={shareMethod.src}
                alt={`${shareMethod.text} 아이콘`}
                width={42}
                height={42}
              />
            </CommonButton>
            <p className="text-center text-[0.8125rem] text-[#373740] font-[Pretendard] not-italic leading-[0.9375rem]">
              {shareMethod.text}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};
