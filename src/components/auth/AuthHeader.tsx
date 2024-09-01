import Image from 'next/image';

import { CommonButton } from '../common';

import Logo from '@/assets/images/logo/logo@2x.png';

export const AuthHeader = () => {
  return (
    <header className="flex flex-col justify-center items-center gap-4">
      <CommonButton mode="link" href="/" className="">
        <Image
          src={Logo}
          alt="로고"
          width={210}
          height={38}
          placeholder="blur"
        />
      </CommonButton>
      <p>
        이미 회원이신가요?{' '}
        <CommonButton
          className="font-[Pretendard] font-semibold text-[16px] not-italic leading-normal text-primary underline"
          mode="link"
          href="/login"
        >
          로그인 하기
        </CommonButton>
      </p>
    </header>
  );
};
