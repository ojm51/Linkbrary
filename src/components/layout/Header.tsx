import { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AuthContext } from '@/lib/context';
import HeaderLogoImage from '@/assets/images/headerLogo.png';
import ProfileImage from '@/assets/images/profileImage.png';
import CommonLinkButton from '@/components/ui/CommonLinkButton';

const Header = () => {
  const LOGIN_STYLE: {
    width: number;
    height: number;
    href: string;
  } = {
    width: 128,
    height: 53,
    href: '/login',
  };

  const { userInfo, logout } = useContext(AuthContext);
  const [logoutView, setLogoutView] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const toggleProfileMenu = () => {
    setLogoutView(!logoutView);
  };

  const handleUserLogout = () => {
    setLogoutView(false);
    logout();
  };

  useEffect(() => {
    if (userInfo) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [userInfo]);

  return (
    <header className="bg-bg">
      <div className="w-full max-w-[1560px] h-[90px] flex items-center justify-between mx-auto px-[20px]">
        <h1>
          <Link href="/">
            <Image
              width={133}
              height={24}
              src={HeaderLogoImage}
              alt="linkbrary"
            />
          </Link>
        </h1>
        <div className="flex justify-between items-center">
          {isLoggedIn ? (
            <>
              <Link
                href="/favorite"
                className="flex items-center justify-center w-[93px] h-[37px] border border-solid border-primary rounded-[4px] text-sm mr-[24px]"
              >
                ⭐️ 즐겨찾기
              </Link>
              <div className="relative ">
                <button
                  type="button"
                  className="flex items-center justify-center"
                  onClick={() => {
                    toggleProfileMenu();
                  }}
                >
                  <Image
                    className="mr-[6px]"
                    width={28}
                    height={28}
                    src={ProfileImage}
                    alt="프로필 이미지"
                  />
                  {userInfo?.name}
                </button>
                <ul className="absolute bottom-[-45px]">
                  <li
                    className={`w-[80px] h-[35px] text-center leading-[35px] text-[14px] bg-white rounded-[4px] border border-solid border-primary transition-opacity duration-1000 ${logoutView ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        handleUserLogout();
                      }}
                    >
                      로그아웃
                    </button>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <CommonLinkButton
              width={LOGIN_STYLE.width}
              height={LOGIN_STYLE.height}
              href={LOGIN_STYLE.href}
            >
              로그인
            </CommonLinkButton>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
