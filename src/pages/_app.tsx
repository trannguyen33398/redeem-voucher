import { FC, PropsWithChildren, ReactNode } from 'react';
import { AppProps } from 'next/app';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import '@/styles/globals.css';

const Noop = ({ children }: { children: ReactNode }) => children;

const queryClient = new QueryClient();

interface AppWithLayoutProps extends AppProps {
  Component: AppProps['Component'] & {
    Layout: FC<PropsWithChildren>;
  };
}

export default function MyApp({ Component, pageProps }: AppWithLayoutProps) {
  const Layout = Component.Layout || Noop;

  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </QueryClientProvider>
  );
}
