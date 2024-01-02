import Head from 'next/head';
import { MainLayout } from '@/components';
import { PolicyContainer } from '@/components/Policy';
import PolicyContent from '@/constants/policy/privacy';
function PrivacyPolicyPage() {
  return (
    <>
      <Head>
        <title>GetX | Privacy Policy</title>
      </Head>

      <main className="mx-auto max-w-8xl px-2 mt-7 mb-28 sm:px-4 md:mt-20 md:mb-36">
        <div className="relative mt-14 space-y-8 max-w-6xl mx-auto md:mt-16">
          <PolicyContainer contents={PolicyContent} />
        </div>
      </main>
    </>
  );
}

PrivacyPolicyPage.Layout = MainLayout;

export default PrivacyPolicyPage;
