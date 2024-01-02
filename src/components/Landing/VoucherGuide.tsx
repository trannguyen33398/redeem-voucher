import Image from 'next/future/image';
import {
  ArrowSmallRightIcon,
  CheckBadgeIcon,
  ShoppingBagIcon,
} from '@heroicons/react/24/outline';

import { Card, ButtonIcon } from '@/components';

import box4 from '@/images/box-4.png';
import box5 from '@/images/box-5.png';
import box6 from '@/images/box-6.png';
import box7 from '@/images/box-7.png';
import box8 from '@/images/box-8.png';
import blob1 from '@/images/blob-1.png';
import blob2 from '@/images/blob-2.png';
import checkCircle from '@/images/check-circle-1.png';

const voucherCards = [
  {
    id: 1,
    price: '100 PHP',
    type: 'USDC Voucher',
  },
  {
    id: 2,
    price: '200 PHP',
    type: 'USDC Voucher',
  },
  {
    id: 3,
    price: '500 PHP',
    type: 'USDC Voucher',
  },
  {
    id: 4,
    price: '1000 PHP',
    type: 'USDC Voucher',
  },
  {
    id: 5,
    price: '2000 PHP',
    type: 'USDC Voucher',
  },
  {
    id: 6,
    price: '5000 PHP',
    type: 'USDC Voucher',
  },
];

function VoucherGuide() {
  return (
    <section className="mt-4 mb-36 md:mb-56">
      <div className="relative">
        <h2 className="text-2xl text-center font-display font-bold text-smooth md:text-5xl">
          Get your USDC instantly
        </h2>

        <div
          className="absolute left-0 top-0 -z-10 blur -translate-y-28 -translate-x-20 md:left-auto md:right-0 md:-translate-y-[20%] md:-translate-x-[90%]"
          aria-hidden="true"
        >
          <div className="w-52 md:w-80">
            <Image
              src={box4}
              alt="two colored boxes"
              sizes="(max-width: 768px) 50vw, 33vw"
              placeholder="blur"
              priority
            />
          </div>
        </div>
      </div>

      <div className="mt-14 space-y-14 sm:px-8 md:px-10 md:space-y-56 md:mt-56 lg:space-y-80 lg:px-36">
        <div className="md:grid md:items-center md:gap-x-6 md:grid-cols-5">
          <div className="relative md:col-span-2">
            <div className="space-y-2">
              <span className="inline-block text-sm py-1 px-3 bg-skyblue text-smooth rounded-full font-display">
                Step 1
              </span>
              <h3 className="text-4xl font-display font-bold md:text-5xl">
                Buy
              </h3>
            </div>
            <p className="py-6 text-lg text-[#28292C] sm:text-xl lg:text-2xl">
              Purchase a USDC voucher at any{' '}
              <a
                className="font-semibold text-smooth hover:underline"
                target="_blank"
                href="https://gifted.ph/"
                rel="noreferrer"
              >
                gifted.ph
              </a>{' '}
              store. Voucher codes will be sent via email within a few minutes
            </p>

            <ButtonIcon
              onClick={() => {
                window.open('https://gifted.ph/', '_blank');
              }}
              variant="alt"
              intent="primary"
              icon={
                <ShoppingBagIcon
                  className="block w-4 h-4 md:w-6 md:h-6 text-brand"
                  aria-hidden="true"
                  strokeWidth={3}
                />
              }
            >
              Buy vouchers
            </ButtonIcon>

            <div
              className="hidden md:block absolute -z-10 bottom-0 left-0 translate-y-2/3 -translate-x-36 blur-sm"
              aria-hidden="true"
            >
              <div className="relative">
                <div
                  className="hidden md:block absolute -z-10 top-0 left-0 -translate-y-1/4 -translate-x-1/2"
                  aria-hidden="true"
                >
                  <div className="w-[900px]">
                    <Image
                      src={blob1}
                      alt="blob"
                      sizes="(max-width: 768px) 50vw, 33vw"
                      placeholder="blur"
                    />
                  </div>
                </div>
              </div>

              <div className="w-80 relative">
                <Image
                  src={box5}
                  alt="two colored boxes"
                  sizes="(max-width: 768px) 50vw, 33vw"
                  placeholder="blur"
                />
              </div>
            </div>
          </div>

          <Card
            containerClass="mt-14 relative md:col-span-3"
            className="md:py-10 lg:py-12"
          >
            <div className="grid gap-4 grid-cols-2 grid-rows-2 text-center md:grid-cols-3">
              {voucherCards.map(v => (
                <div key={v.id} className="bg-[#F1F7FC] p-6 rounded-xl">
                  <h4 className="font-display font-bold text-smooth">
                    {v.price}
                  </h4>
                  <p className="font-display text-xs text-skyblue">{v.type}</p>
                </div>
              ))}
            </div>

            <div
              className="absolute -z-10 right-0 top-0 -translate-y-20 translate-x-24 blur-sm md:blur-0 md:translate-y-48 md:translate-x-56"
              aria-hidden="true"
            >
              <div className="w-64 md:w-[577px]">
                <Image
                  src={box6}
                  alt="two colored boxes"
                  sizes="(max-width: 768px) 50vw, 33vw"
                  placeholder="blur"
                />
              </div>
            </div>

            <div
              className="absolute -z-10 bottom-0 left-0 translate-y-1/2 -translate-x-1/2 blur-sm md:hidden"
              aria-hidden="true"
            >
              <div className="w-40">
                <Image
                  src={box5}
                  alt="two colored boxes"
                  sizes="(max-width: 768px) 50vw, 33vw"
                  placeholder="blur"
                />
              </div>
            </div>
          </Card>
        </div>

        <div className="md:grid md:items-center md:gap-x-6 md:grid-cols-5">
          <div className="relative md:col-span-2">
            <div className="space-y-2">
              <span className="inline-block text-sm py-1 px-3 bg-skyblue text-smooth rounded-full font-display">
                Step 2
              </span>
              <h3 className="text-4xl font-display font-bold md:text-5xl">
                Redeem
              </h3>
            </div>
            <p className="py-6 text-lg text-[#28292C] sm:text-xl lg:text-2xl">
              Once you receive your voucher code. Enter your voucher code and
              click the “Redeem” button
            </p>
          </div>

          <Card containerClass="relative md:col-span-3">
            <div className="flex flex-col space-y-2">
              <label
                className="font-semibold text-smooth"
                htmlFor="voucher-code-example"
              >
                Voucher Code
              </label>
              <input
                type="text"
                id="voucher-code-example"
                defaultValue="GETX 0001"
                disabled
                placeholder="8 alphanumeric Voucher Code"
                className="border-3 border-[#207227] focus:ring-[#207227] w-full h-14 rounded-2xl focus:outline-none focus:ring-2 md:text-lg md:h-16 md:p-6"
              />
              <p className="text-[#207227] ml-auto flex items-center justify-center space-x-1">
                <CheckBadgeIcon
                  className="w-4 h-4 text-[#207227] md:w-5 md:h-5"
                  aria-hidden="true"
                  strokeWidth={2}
                />
                <span className="text-xs md:text-sm">
                  Voucher code is available
                </span>
              </p>
            </div>

            <div className="mt-7 space-x-2">
              <input
                id="voucher-terms-example"
                type="checkbox"
                defaultChecked={true}
                disabled
                className="h-5 w-5 border-2 rounded-[4px] border-brand focus:outline-none focus:ring-2 focus:ring-peaceful"
              />
              <label
                htmlFor="voucher-terms-example"
                className="text-xs md:text-sm"
              >
                I agree to the terms and conditions.
              </label>
            </div>

            <div className="mt-7">
              <ButtonIcon
                className="cursor-auto"
                fullWidth
                icon={
                  <ArrowSmallRightIcon
                    className="block w-4 h-4 md:w-6 md:h-6 text-white"
                    aria-hidden="true"
                    strokeWidth={3}
                  />
                }
              >
                Redeem
              </ButtonIcon>
            </div>

            <div
              className="absolute -z-10 right-0 bottom-0 translate-y-48 translate-x-20 blur-sm md:right-auto md:left-0 md:-translate-x-1/2 md:translate-y-2/3"
              aria-hidden="true"
            >
              <div className="w-64 md:w-[577px]">
                <Image
                  src={box7}
                  alt="two colored boxes"
                  sizes="(max-width: 768px) 50vw, 33vw"
                  placeholder="blur"
                />
              </div>
            </div>
          </Card>
        </div>

        <div className="md:grid md:items-center md:gap-x-6 md:grid-cols-5">
          <div className="relative md:col-span-2">
            <div className="space-y-2">
              <span className="inline-block text-sm py-1 px-3 bg-skyblue text-smooth rounded-full font-display">
                Step 3
              </span>
              <h3 className="text-4xl font-display font-bold md:text-5xl">
                Receive
              </h3>
            </div>
            <p className="py-6 text-lg text-[#28292C] sm:text-xl lg:text-2xl">
              Wait for 1-3 minutes for your cryptocurrency to arrive at your
              chosen Metamask address
            </p>

            <div
              className="hidden md:block absolute -z-10 left-0 bottom-0 translate-y-96 -translate-x-2/3 "
              aria-hidden="true"
            >
              <div className="w-80 md:w-[577px]">
                <Image
                  src={box8}
                  alt="two colored boxes"
                  sizes="(max-width: 768px) 50vw, 33vw"
                  placeholder="blur"
                />
              </div>
            </div>
          </div>

          <Card
            containerClass="relative md:col-span-3"
            className="lg:px-10 lg:py-12 text-center"
          >
            <div className="flex items-center justify-center">
              <div className="w-9">
                <Image src={checkCircle} alt="check mark" />
              </div>
            </div>

            <p className="mt-5 text-xl font-display font-semibold md:text-2xl">
              Voucher Redeemed
            </p>
            <p className="mt-4 text-[#494949] text-lg ">
              The digital asset should reflect in your designated wallet after
              redeeming the voucher. If you have any concerns, please send us an
              email at contactus@getx.finance
            </p>

            <div
              className="hidden md:block absolute -z-10 bottom-0 right-0 translate-y-1/2 translate-x-1/2"
              aria-hidden="true"
            >
              <div className="w-[900px]">
                <Image
                  src={blob2}
                  alt="blob"
                  sizes="(max-width: 768px) 50vw, 33vw"
                  placeholder="blur"
                />
              </div>
            </div>

            <div
              className="md:hidden absolute -z-10 left-0 bottom-0 translate-y-48 -translate-x-24 blur-sm"
              aria-hidden="true"
            >
              <div className="w-80 md:w-[577px]">
                <Image
                  src={box8}
                  alt="two colored boxes"
                  sizes="(max-width: 768px) 50vw, 33vw"
                  placeholder="blur"
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default VoucherGuide;
