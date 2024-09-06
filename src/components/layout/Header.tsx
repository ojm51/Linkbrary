import { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AuthContext } from '@/lib/context';
import HeaderLogoImage from '@/assets/images/headerLogo.png';
import ProfileImage from '@/assets/images/profileImage.png';

const Header = () => {
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
      <div className="w-full flex justify-between items-center mx-auto max-w-[365px] h-[60px] px-[30px] md:px-[20px] md:max-w-[840px] md:h-[90px] lg:max-w-[1560px] ">
        <h1>
          <Link href="/">
            <Image
              className="w-[89px] h-[16px] md:w-[133px] md:h-[24px]"
              src={HeaderLogoImage}
              alt="linkbrary"
            />
          </Link>
        </h1>

        <div className="flex justify-between items-center">
          {isLoggedIn ? (
            <>
              {/** @Todo 해당 영역 보여지기전에 텀 수정 */}
              <Link
                href="/favorite"
                className="flex items-center justify-center w-[70px] h-[30px] border border-solid border-primary rounded-[4px] text-[12px] md:w-[93px] mr-[16px] md:h-[37px] md:text-sm md:mr-[24px]"
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
                  <span className="hidden md:block">{userInfo?.name}</span>
                </button>
                <ul className="absolute left-[50%] translate-x-[-50%] bottom-[-45px]">
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
            <Link
              href="/login"
              className="bg-gradient-color flex items-center justify-center w-[80px] h-[37px] rounded-[8px] text-sm text-white md:w-[128px] md:h-[53px] md:text-lg"
            >
              로그인
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
