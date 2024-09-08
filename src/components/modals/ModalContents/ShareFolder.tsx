import Image from 'next/image';
import kakaoIcon from '@/assets/images/kakaoTalk.png';
import facebookIcon from '@/assets/images/facebook.png';
import copyLinkIcon from '@/assets/images/copyLink.png';
import { useEffect, useCallback, useContext } from 'react';
import { FolderContext } from '@/lib/context';

export const ShareFolder = () => {
  const { selectedFolder } = useContext(FolderContext);
  const BASE_URL = 'http://localhost:3000';
  const SHARING_URL = `${BASE_URL}/shared/${selectedFolder.id}`;

  const { Kakao, open } = window;
  const initializeKakao = useCallback(() => {
    if (Kakao && !Kakao.isInitialized()) {
      Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
    }
  }, []);
  useEffect(() => {
    initializeKakao();
  }, [initializeKakao]);

  // TODO: 각 콘텐츠에 원하는 값 넣으면 cors 오류 나는 듯
  const kakaoTalkShare = () => {
    Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: `공유된 ${selectedFolder.name} 폴더`,
        description: `공유된 ${selectedFolder.name} 폴더에 속한 링크 목록입니다`,
        imageUrl: '디폴트 이미지 넣고 싶음',
        link: {
          mobileWebUrl: SHARING_URL,
          webUrl: SHARING_URL,
        },
      },
    });
  };

  const facebookShare = () => {
    open(`http://www.facebook.com/sharer/sharer.php?u=${SHARING_URL}`);
  };

  const clipboardCopy = () => {
    let alertMessage = '';

    if (!navigator.clipboard) {
      alertMessage = '복사하기가 지원되지 않는 브라우저입니다.';
    }

    navigator.clipboard
      .writeText(SHARING_URL)
      .then(() => {
        alertMessage = '클립보드에 복사되었습니다.';
      })
      .catch(() => {
        alertMessage = '복사를 다시 시도해주세요.';
      });

    return alert(alertMessage);
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
      <h4 className="mt-2 mb-6 text-center text-[14px] font-normal text-secondary-60 font-[Pretendard] not-italic leading-[22px]">
        {selectedFolder.name}
      </h4>
      <ul className="flex justify-center items-center gap-8">
        {shareMethodList.map((shareMethod) => (
          <li
            className="flex flex-col justify-center items-center gap-[10px]"
            key={shareMethod.id}
          >
            <button type="button" onClick={shareMethod.onClick}>
              <Image
                src={shareMethod.src}
                alt={`${shareMethod.text} 아이콘`}
                width={42}
                height={42}
              />
            </button>
            <p className="text-center text-[13px] text-[#373740] font-[Pretendard] not-italic leading-[15px]">
              {shareMethod.text}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};
