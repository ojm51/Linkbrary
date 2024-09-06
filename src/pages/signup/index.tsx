import Head from 'next/head';
import { AuthHeader, SNSAuth, SignUpForm } from '@/components';

const SignUp = () => {
  return (
    <>
      <Head>
        <title>회원가입 - Linkbrary</title>
      </Head>
      <main className="w-full h-full bg-bg py-[120px]">
        <div className="flex flex-col max-w-[400px] justify-center items-center gap-[32px] m-auto">
          <article className="flex w-full flex-col gap-[30px] ">
            <AuthHeader href="/login">로그인 하기</AuthHeader>
            <SignUpForm />
          </article>
          <SNSAuth type="signup" />
        </div>
      </main>
    </>
  );
};

export default SignUp;
