import Head from 'next/head';
import Image from 'next/image';
import { EnvelopeIcon } from '@heroicons/react/24/solid';

import box2 from '@/images/box-2.png';
import box5 from '@/images/box-5.png';
import box6 from '@/images/box-6.png';
import box8 from '@/images/box-8.png';
import blob1 from '@/images/blob-1.png';
import {
  Card,
  ContactForm,
  FacebookIcon,
  InstagramIcon,
  MainLayout,
  TwitterIcon,
} from '@/components';

function ContactPage() {
  return (
    <>
      <Head>
        <title>GetX | Contact</title>
      </Head>

      <main className="mx-auto max-w-8xl pt-10 pb-16 px-5 md:pb-48 relative">
        <h1 className="text-center font-display font-bold text-smooth text-3xl md:text-4xl">
          Contact us
        </h1>

        <div
          className="absolute -z-10 top-28 -right-1/3 blur-sm md:blur-[5px]"
          aria-hidden="true"
        >
          <div className="w-80 md:w-[550px]">
            <Image
              src={box2}
              alt="two colored boxes"
              sizes="(max-width: 550px) 50vw, 33vw"
              placeholder="blur"
              priority
            />
          </div>
        </div>

        <div
          className="absolute -z-10 top-1/4 md:top-0 -left-1/4 md:translate-y-full blur-sm"
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

        <Card containerClass="max-w-2xl mx-auto mt-9" className="px-8 py-11">
          <p className="mb-6 text-center font-display text-base text-smooth md:text-lg">
            Send us a message for inquiries related to redemption of your
            digital asset vouchers
          </p>

          <ContactForm />

          <div className="text-center mt-11 space-y-5">
            <p className="text-smooth/[0.7] font-semibold text-sm md:text-base">
              You can also message GetX.Finance at
            </p>
            <p className="text-center">
              <a
                className="text-smooth mx-auto font-display w-fit flex space-x-2 justify-center items-center text-sm md:text-base hover:underline"
                href="https://www.facebook.com/getxfinance/"
                target="_blank"
                rel="noreferrer"
              >
                <FacebookIcon className="text-white w-7 h-7" />
                <span>facebook.com/getx.finance</span>
              </a>
            </p>
            <p className="text-center">
              <a
                className="text-smooth mx-auto font-display w-fit flex space-x-2 justify-center items-center text-sm md:text-base hover:underline"
                href="https://twitter.com/GetXFinance"
                target="_blank"
                rel="noreferrer"
              >
                <TwitterIcon className="text-white w-7 h-7" />
                <span>twitter.com/GetXFinance</span>
              </a>
            </p>
          </div>
        </Card>

        <section className="mt-20 md:mt-32 max-w-4xl mx-auto relative">
          <div
            className="absolute -z-10 top-0 -right-1/2 md:translate-x-2/3 blur-sm md:blur-[5px]"
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

          <div className="space-y-11 md:space-y-0 md:grid md:gap-24 md:grid-cols-2 md:justify-between">
            <div className="space-y-8">
              <p className="text-smooth font-display text-sm sm:w-4/5 md:w-full md:text-xl">
                For inquiries related to purchasing of vouchers, orders or
                anything related to <strong>pre-redemption</strong> please
                contact <strong>Gifted.ph</strong> directly by going to{' '}
                <a
                  className="underline hover:underline-offset-2"
                  href="https://www.gifted.ph/contact-us"
                >
                  https://www.gifted.ph/contact-us
                </a>
              </p>
              <div className="space-y-4">
                <p className="text-smooth/[0.7] font-display text-sm md:text-base">
                  Or email
                </p>
                <a
                  className="text-smooth w-fit font-display flex space-x-2 items-center hover:underline text-sm md:text-base"
                  href="mailto:admin@gifted.ph"
                  target="_blank"
                  rel="noreferrer"
                >
                  <div
                    className="bg-brand rounded-full w-7 h-7 p-[6px]"
                    aria-hidden="true"
                  >
                    <EnvelopeIcon className="text-white w-full h-full" />
                  </div>
                  <span>admin@gifted.ph</span>
                </a>
              </div>
            </div>
            <div className="justify-self-end">
              <p className="text-smooth/[0.7] font-semibold text-sm md:text-lg">
                You can also reach Gifted.ph at
              </p>
              <ul className="mt-8 space-y-9">
                <li>
                  <a
                    className="text-smooth w-fit font-display flex space-x-2 items-center hover:underline text-sm md:text-base"
                    href="https://www.facebook.com/GiftedPhilippines/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FacebookIcon className="text-white w-7 h-7" />
                    <span>facebook.com/giftedphilippines</span>
                  </a>
                </li>
                <li>
                  <a
                    className="text-smooth w-fit font-display flex space-x-2 items-center hover:underline text-sm md:text-base"
                    href="https://twitter.com/gifted_ph"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <TwitterIcon className="text-white w-7 h-7" />
                    <span>twitter.com/gifted_ph</span>
                  </a>
                </li>
                <li>
                  <a
                    className="text-smooth w-fit font-display flex space-x-2 items-center hover:underline text-sm md:text-base"
                    href="https://www.instagram.com/gifted_ph/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <InstagramIcon className="text-white w-7 h-7" />
                    <span>instagram.com/gifted_ph</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div
            className="absolute -z-10 -left-1/2 bottom-0 translate-y-3/4 blur-sm md:blur-[5px]"
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
        </section>
      </main>
    </>
  );
}

ContactPage.Layout = MainLayout;

export default ContactPage;
