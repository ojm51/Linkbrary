import Head from 'next/head';
import { AuthHeader, SNSAuth, SignUpForm, AuthStyle as S } from '@/components';
import { Routes } from '@/lib/route';

const SignUp = () => {
  return (
    <>
      <Head>
        <title>회원가입 - Linkbrary</title>
      </Head>
      <main className={S.BackGroundStyle}>
        <div className={S.WrapperStyle}>
          <section className={S.AuthorizeSectionStyle}>
            <AuthHeader type="signup" href={Routes.LOGIN} />
            <SignUpForm />
          </section>
          <SNSAuth type="signup" />
        </div>
      </main>
    </>
  );
};

export default SignUp;
