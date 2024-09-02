import '@/styles/globals.css';
import '@/styles/landingEffect.css';
import Header from '@/components/layout/Header';
import type { AppProps } from 'next/app';
import Footer from '@/components/layout/Footer';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Header />
      <div className="custom-footer-height">
        <Component {...pageProps} />
      </div>
      <Footer />
    </>
  );
};

export default App;
