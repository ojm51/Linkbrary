import { useState } from 'react';
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import type { AppProps } from 'next/app';

import { Layout } from '@/components';
import { AuthProvider } from '@/lib/context';

import '@/styles/globals.css';
import '@/styles/landingEffect.css';

const App = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={pageProps.dehydratedState}>
        <AuthProvider>
          <Layout>
            <div className="custom-footer-height">
              <Component {...pageProps} />
            </div>
          </Layout>
        </AuthProvider>
      </HydrationBoundary>
    </QueryClientProvider>
  );
};

export default App;
