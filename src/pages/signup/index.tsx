import Head from 'next/head';
import { AuthHeader, SignUpForm } from '@/components';

const SignUp = () => {
  return (
    <>
      <Head>
        <title>Linkbrary - 회원가입</title>
      </Head>
      <main className="w-screen h-screen bg-bg pt-[120px]">
        <article className="flex max-w-[400px] flex-col justify-center items-center gap-[30px] m-auto">
          <AuthHeader href="/login">로그인 하기</AuthHeader>
          <SignUpForm />
        </article>
      </main>
    </>
  );
};

export default SignUp;
