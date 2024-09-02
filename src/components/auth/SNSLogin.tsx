import Image from 'next/image';

import googleLogin from '@/assets/icons/sns/ic_google.svg';
import kakaoLogin from '@/assets/icons/sns/ic_kakao.svg';

const SNSLogin = () => {
  const sectionWrapper =
    'flex w-[400px] py-[12px] px-[24px] justify-between items-center rounded-[8px] border-[1px] bg-secondary-10';
  const textStyle = 'font-[Pretendard] text-[14px] not-italic leading-[normal]';
  const iconContainer = 'flex items-start gap-[16px]';

  return (
    <section className={sectionWrapper}>
      <p className={textStyle}>소셜 로그인</p>
      <div className={iconContainer}>
        <Image
          className="cursor-pointer"
          src={googleLogin}
          alt="구글로그인"
          width={42}
          height={42}
        />
        <Image
          className="cursor-pointer"
          src={kakaoLogin}
          alt="카카오로그인"
          width={42}
          height={42}
        />
      </div>
    </section>
  );
};

export default SNSLogin;
