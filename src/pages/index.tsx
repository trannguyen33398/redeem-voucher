import { Hero, MainLayout, VoucherGuide } from '@/components';

function HomePage() {
  return (
    <main className="mx-auto max-w-8xl py-10 px-5  md:pt-48">
      <Hero />
      <VoucherGuide />
    </main>
  );
}

HomePage.Layout = MainLayout;

export default HomePage;
