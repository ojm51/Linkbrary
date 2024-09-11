import Image from 'next/image';

import { CommonButton } from '@/components';

import Logo from '@/assets/images/logo/logo@2x.png';
import { RoutesType } from '@/lib/route';

import { match } from 'ts-pattern';

interface AuthHeaderProps {
  type: 'login' | 'signup';
  href: RoutesType;
}

export const AuthHeader = ({ type, href }: AuthHeaderProps) => {
  const phrase = match({ type })
    .with({ type: 'login' }, () => ({
      direct: '로그인 하기',
      confirm: '이미 회원이신가요?',
    }))
    .with({ type: 'signup' }, () => ({
      direct: '회원가입 하기',
      confirm: '회원이 아니신가요?',
    }))
    .exhaustive();
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
      <p className="flex gap-1 justify-center items-center">
        {phrase.confirm}
        <CommonButton
          className="font-[Pretendard] font-semibold text-[16px] not-italic leading-normal text-primary underline"
          mode="link"
          href={href}
        >
          {phrase.direct}
        </CommonButton>
      </p>
    </header>
  );
};
