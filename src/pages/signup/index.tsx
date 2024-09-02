import AuthHeader from '@/components/auth/AuthHeader';
import SignUpForm from '@/components/auth/SignUpForm';

const SignUp = () => {
  return (
    <main className="w-screen h-screen bg-bg pt-[120px]">
      <article className="flex max-w-[400px] flex-col justify-center items-center gap-[30px] m-auto">
        <AuthHeader href="/login">로그인 하기</AuthHeader>
        <SignUpForm />
      </article>
    </main>
  );
};

export default SignUp;
