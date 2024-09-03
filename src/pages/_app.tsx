import '@/styles/globals.css';
import '@/styles/landingEffect.css';
import type { AppProps } from 'next/app';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Routes } from '@/lib/route/index';
import { useRouter } from 'next/router';

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const pathname = router.pathname as Routes;
  const isAuthPage = [Routes.LOGIN, Routes.SIGNUP].includes(pathname);

  return (
    <>
      {!isAuthPage && <Header />}
      <div className="custom-footer-height">
        <Component {...pageProps} />
      </div>
      {!isAuthPage && <Footer />}
    </>
  );
};

export default App;
