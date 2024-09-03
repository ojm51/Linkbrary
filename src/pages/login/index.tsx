import Head from 'next/head';

import { AuthHeader, LoginForm, SNSLogin } from '@/components';

const Login = () => {
  return (
    <>
      <Head>
        <title>Linkbrary - 로그인</title>
      </Head>
      <main className="w-screen h-screen bg-bg py-[120px]">
        <div className="flex flex-col max-w-[400px] justify-center items-center gap-[32px] m-auto">
          <article className="flex w-full flex-col gap-[30px] ">
            <AuthHeader href="/signup">회원 가입하기</AuthHeader>
            <LoginForm />
          </article>
          <SNSLogin />
        </div>
      </main>
    </>
  );
};

export default Login;
