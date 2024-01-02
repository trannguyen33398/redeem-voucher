import { ReactNode } from 'react';
import Head from 'next/head';

import { Header } from '../Header';
import { Footer } from '../Footer';

interface Props {
  children: ReactNode;
}

function MainLayout({ children }: Props) {
  return (
    <>
      <Head>
        <title>GetX</title>
      </Head>

      <Header />
      <div className="overflow-hidden">{children}</div>
      <Footer />
    </>
  );
}

export default MainLayout;
