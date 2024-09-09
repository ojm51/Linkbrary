import { useState } from 'react';
import type { AppProps } from 'next/app';
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

import { Layout } from '@/components';
import { AuthProvider, ModalProvider } from '@/lib/context';

import '@/styles/globals.css';
import '@/styles/landingEffect.css';

const App = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={pageProps.dehydratedState}>
        <ModalProvider>
          <AuthProvider>
            <Layout>
              <div className="custom-footer-height">
                <Component {...pageProps} />
              </div>
            </Layout>
          </AuthProvider>
        </ModalProvider>
      </HydrationBoundary>
    </QueryClientProvider>
  );
};

export default App;
