import { match } from 'ts-pattern';
import { useRouter } from 'next/router';
import { ROUTE_CONTROL, Routes } from '@/lib/route';
import Header from './Header';
import Footer from './Footer';

type LayoutType = 'all' | 'header' | 'footer' | 'none';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();
  const getLayoutType = (): LayoutType => {
    const pathName = router.pathname as Routes;
    if (ROUTE_CONTROL.hasHeaderNFooter.includes(pathName)) {
      return 'all';
    }
    if (ROUTE_CONTROL.hasOnlyHeader.includes(pathName)) {
      return 'header';
    }
    if (ROUTE_CONTROL.hasOnlyFooter.includes(pathName)) {
      return 'header';
    }
    return 'none';
  };
  const TLayout = { type: getLayoutType() };
  const withLayoutComponent = match(TLayout)
    .with({ type: 'all' }, () => (
      <>
        <Header />
        {children}
        <Footer />
      </>
    ))
    .with({ type: 'header' }, () => (
      <>
        <Header />
        {children}
      </>
    ))
    .with({ type: 'footer' }, () => (
      <>
        {children}
        <Footer />
      </>
    ))
    .with({ type: 'none' }, () => children)
    .exhaustive();
  return withLayoutComponent;
};
