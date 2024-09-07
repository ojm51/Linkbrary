import Image from 'next/image';
import kakaoIcon from '@/assets/images/kakaoTalk.png';
import facebookIcon from '@/assets/images/facebook.png';
import copyLinkIcon from '@/assets/images/copyLink.png';
import { useEffect, useCallback, useContext } from 'react';
import { FolderContext } from '@/lib/context';

export const ShareFolder = () => {
  const { Kakao, location } = window;

  const initializeKakao = useCallback(() => {
    if (Kakao && !Kakao.isInitialized()) {
      Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
    }
  }, []);

  useEffect(() => {
    initializeKakao();
  }, [initializeKakao]);

  // 각 콘텐츠에 원하는 값을 넣는 방법 모르겠음
  const kakaoTalkShare = () => {
    Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: '타이틀',
        description: '설명',
        imageUrl: '모르게따',
        link: {
          mobileWebUrl: location.href,
          webUrl: location.href,
        },
      },
    });
  };

  const facebookShare = () => {
    const url = 'www.naver.com';
    open('http://www.facebook.com/sharer/sharer.php?u=' + url);
  };

  const clipboardCopy = () => {
    if (!navigator.clipboard) {
      return alert('복사하기가 지원되지 않는 브라우저입니다.');

      /* 구형 브라우저도 지원하는 경우 - 필요 없으면 지우기 */
      // if (!document.queryCommandSupported('copy')) {
      //   return alert('복사하기가 지원되지 않는 브라우저입니다.');
      // }

      // const textarea = document.createElement('textarea');
      // textarea.value = location.href;

      // document.body.appendChild(textarea);
      // textarea.focus();
      // textarea.select();
      // document.execCommand('copy');
      // document.body.removeChild(textarea);
      // alert('클립보드에 복사되었습니다.');
    }

    navigator.clipboard
      .writeText(location.href)
      .then(() => {
        alert('클립보드에 복사되었습니다.');
      })
      .catch(() => {
        alert('복사를 다시 시도해주세요.');
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

  const { selectedFolder } = useContext(FolderContext);

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
