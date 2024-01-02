import { GetServerSideProps } from 'next';
import Head from 'next/head';

import { RedeemContainer, RootLayout } from '@/components';
import { getCodeStatusType, getQueryValue, getVouhcerStatus } from '@/lib';

interface Props {
  code: string;
}

function RedeemPage({ code }: Props) {
  return (
    <>
      <Head>
        <title>GetX | Redeem</title>
        <link
          rel="preload"
          href="/fonts/sora/Sora-SemiBold.ttf"
          as="font"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/manrope/Manrope-Regular.ttf"
          as="font"
          crossOrigin="anonymous"
        />
      </Head>

      <RedeemContainer code={code} />
    </>
  );
}

RedeemPage.Layout = RootLayout;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const code = getQueryValue(query.code);

  try {
    const codeStatus = await getVouhcerStatus(code);

    if (codeStatus.data?.status !== 'new') {
      return {
        redirect: {
          destination: `/?code=${code}&status=${codeStatus.data.status}`,
        },
        props: {},
      };
    }

    return { props: { code } };
  } catch (error) {
    return {
      redirect: {
        destination: `/?code=${code}&status=${getCodeStatusType(error)}`,
      },
      props: {},
    };
  }
};

export default RedeemPage;
