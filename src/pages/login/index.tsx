import AuthHeader from '@/components/auth/AuthHeader';
import LoginForm from '@/components/auth/LoginForm';
import SNSLogin from '@/components/auth/SNSLogin';

const Login = () => {
  return (
    <main className="w-screen h-screen bg-bg py-[120px]">
      <div className="flex flex-col max-w-[400px] justify-center items-center gap-[32px] m-auto">
        <article className="flex w-full flex-col gap-[30px] ">
          <AuthHeader href="/signup">회원 가입하기</AuthHeader>
          <LoginForm />
        </article>
        <SNSLogin />
      </div>
    </main>
  );
};

export default Login;
