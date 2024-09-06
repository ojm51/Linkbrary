import Image from 'next/image';

import { CommonButton } from '@/components';

import Logo from '@/assets/images/logo/logo@2x.png';
import { RoutesType } from '@/lib/route';

interface AuthHeaderProps {
  children: React.ReactNode;
  href: RoutesType;
}

export const AuthHeader = ({ children, href }: AuthHeaderProps) => {
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
        이미 회원이신가요?
        <CommonButton
          className="font-[Pretendard] font-semibold text-[16px] not-italic leading-normal text-primary underline"
          mode="link"
          href={href}
        >
          {children}
        </CommonButton>
      </p>
    </header>
  );
};
