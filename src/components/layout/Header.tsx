import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import HeaderLogoImage from '../../assets/images/headerLogo.png';
import ProfileImage from '../../assets/images/profileImage.png';
import CommonLinkButton from '../ui/CommonLinkButton';

const Header = () => {
  const LOGIN_STYLE = {
    width: '128px',
    height: '53px',
    href: '/',
    children: '로그인',
  };

  return (
    <header className="bg-bg">
      <div className="w-full max-w-[1560px] h-[90px] flex items-center justify-between mx-auto px-[20px]">
        <h1>
          <Link href="/">
            <Image
              width="133"
              height="24"
              src={HeaderLogoImage}
              alt="linkbrary"
            />
          </Link>
        </h1>
        <div className="flex justify-between items-center">
          <CommonLinkButton
            width={LOGIN_STYLE.width}
            height={LOGIN_STYLE.height}
            href={LOGIN_STYLE.href}
          >
            {LOGIN_STYLE.children}
          </CommonLinkButton>

          {/* 로그인 성공 했을 경우 */}
          {/* <Link
            href="/"
            className="flex items-center justify-center w-[93px] h-[37px] border border-primary rounded-[4px] text-sm mr-[24px]"
          >
            ⭐️ 즐겨찾기
          </Link>
          <button type="button" className="flex items-center justify-center">
            <Image
              className="mr-[6px]"
              width={28}
              height={28}
              src={ProfileImage}
              alt="프로필 이미지"
            />
            이용섭
          </button> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
