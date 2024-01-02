import { ReactNode } from 'react';
import Head from 'next/head';

import { Header } from '../Header';

interface Props {
  children: ReactNode;
}

function RootLayout({ children }: Props) {
  return (
    <>
      <Head>
        <title>GetX</title>
      </Head>

      <Header />
      <div className="overflow-hidden">{children}</div>
    </>
  );
}

export default RootLayout;
