import Head from 'next/head';

import { AuthHeader, LoginForm, SNSAuth } from '@/components';

const Login = () => {
  return (
    <>
      <Head>
        <title>로그인 - Linkbrary</title>
      </Head>
      <main className="w-full h-full bg-bg py-[120px]">
        <div className="flex flex-col max-w-[400px] justify-center items-center gap-[32px] m-auto">
          <article className="flex w-full flex-col gap-[30px] ">
            <AuthHeader href="/signup">회원 가입하기</AuthHeader>
            <LoginForm />
          </article>
          <SNSAuth type="login" />
        </div>
      </main>
    </>
  );
};

export default Login;
