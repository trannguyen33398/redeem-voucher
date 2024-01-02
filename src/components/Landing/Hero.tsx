import Image from 'next/future/image';

import VoucherForm from './VoucherForm';
import box2 from '@/images/box-2.png';
import box3 from '@/images/box-3.png';

function Hero() {
  return (
    <section className="mb-56 md:grid md:items-center md:gap-x-5 md:grid-cols-2 md:mb-96">
      <div className="relative">
        <div
          className="absolute -z-10 mt-8 top-1/2 -left-1/2 blur-sm md:blur-0"
          aria-hidden="true"
        >
          <div className="w-80 md:w-[610px]">
            <Image
              src={box3}
              alt="two colored boxes"
              sizes="(max-width: 768px) 50vw, 33vw"
              placeholder="blur"
              priority
            />
          </div>
        </div>

        <div className="text-center text-smooth md:text-left">
          <h1 className="text-4xl leading-snug font-display font-bold md:text-5xl lg:text-6xl">
            Redeem your <span className="block text-brand">Vouchers</span>
          </h1>
          <p className="pt-5 text-lg md:text-[20px] md:leading-8">
            GetX makes it possible to buy digital assets like USDC with
            vouchers. You can now get digital assets such as USDC via vouchers!
            It’s fast and easy!
          </p>
        </div>
      </div>

      <div className="relative mt-12 md:mt-0">
        <div
          className="absolute -z-10 mt-24 right-0 translate-x-1/2 blur-sm md:blur-0 md:mt-0"
          aria-hidden="true"
        >
          <div className="w-96 md:w-[780px]">
            <Image
              src={box2}
              alt="purple shaped box"
              sizes="(max-width: 768px) 50vw, 33vw"
              placeholder="blur"
              priority
            />
          </div>
        </div>

        <VoucherForm />
      </div>
    </section>
  );
}

export default Hero;
