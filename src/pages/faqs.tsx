import Head from 'next/head';
import { DisclosureCard, MainLayout } from '@/components';

import Image from 'next/image';
import box2 from '@/images/box-2.png';
import box3 from '@/images/box-3.png';
import box4 from '@/images/box-4.png';
import Link from 'next/link';

const faqs = [
  {
    title: 'What is GetX?',
    content:
      'GetX is a platform where users can redeem digital assets such as USDC with vouchers. GetX makes it quick and simple to buy digital assets by eliminating the time-consuming process of central exchanges.',
  },
  {
    title: 'How long is the voucher valid?',
    content:
      'The GetX voucher is valid immediately upon receipt and has no expiration. It is non-refundable, non-convertible to cash, and only valid for a single transaction.',
  },
  {
    title: 'Can I request for a refund?',
    content: 'Once a voucher has been redeemed, it can no longer be refunded.',
  },
  {
    title: 'What digital currencies can I buy with my voucher?',
    content:
      'At the moment, vouchers can only be exchanged to USDC. We are working on adding more digital assets for you to redeem.',
  },
  {
    title: 'How do I redeem my voucher?',
    content: (
      <ol className="list-decimal" style={{ padding: 'revert' }}>
        <li>
          Visit the GetX Redemption Portal at{' '}
          <Link href="/">
            <span
              style={{
                color: '#5c80b8',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              getx.finance/redeem{' '}
            </span>
          </Link>
          to redeem the code.
        </li>
        <li>Enter your 8-digit voucher code, and click the REDEEM button.</li>
        <li>Choose which chain you want to receive the token</li>
        <li>Enter your wallet address or connect your MetaMask wallet.</li>
        <li>
          Review the redemption information, including the total amount of USDC
          to be received, before confirming the transaction.
        </li>
        <li>Your USDC should reflect in your wallet after a few minutes.</li>
      </ol>
    ),
  },
  {
    title: 'What fees can I expect while redeeming my voucher?',
    content:
      "The fee includes 2% of the voucher's value plus either the gas or network fee, depending on which network or chain you choose.",
  },
  {
    title: 'Do I need to create/verify my account to redeem the voucher? ',
    content:
      'There is no need to create an account with GetX to redeem your voucher. All you need is a valid voucher code, valid non-custodial wallet where we can transfer your USD Coin. ',
  },
  {
    title: 'What cryptocurrency wallet do you support?',
    content:
      'We currently only support MetaMask, however we are working on expanding our supported wallets.',
  },
  {
    title: 'Can I make a partial redemption?',
    content: 'No, only the full voucher amount can be redeemed.',
  },
  {
    title: 'I put in the wrong wallet address. What should I do?',
    content:
      'Unfortunately, blockchain transactions are irrevocable. This implies that once the funds are sent to the incorrect wallet, it cannot be reversed.',
  },
  {
    title:
      'How long will it take for my digital assets to appear after I redeem my voucher?',
    content:
      'Depending on the network or chain selected, you should be able to receive your USDC after a few minutes from the moment of redemption. If you provided an email address, you should also receive a message regarding the status of your redemption.',
  },
  {
    title:
      'I am experiencing problems while redeeming my voucher, what can I do? ',
    content: (
      <p>
        If you&apos;re having trouble redeeming your voucher, please try a
        different web browser. If the problem persists, please email your
        concern to{' '}
        <a
          style={{
            color: '#5c80b8',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
          href="mailto:contactus@getx.finance"
        >
          contactus@getx.finance{' '}
        </a>
        for immediate assistance.
      </p>
    ),
  },
  {
    title: 'I redeemed the voucher but I did not receive it in my wallet.',
    content: (
      <div>
        <p>
          Please email your concern at{' '}
          <a
            style={{
              color: '#5c80b8',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
            href="mailto:contactus@getx.finance"
          >
            contactus@getx.finance{' '}
          </a>{' '}
          with the following information and expect a response within 24 hours.
        </p>
        <ul style={{ padding: 'revert' }}>
          <li> - Reference Number</li>
          <li> - Transaction Hash</li>
          <li> - Wallet Address</li>
        </ul>
      </div>
    ),
  },
  {
    title: 'I did not receive my voucher code.',
    content: (
      <div>
        <p>
          Voucher codes are sent by{' '}
          <a
            style={{
              color: '#5c80b8',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
            href="https://gifted.ph"
          >
            gifted.ph
          </a>
          . You can contact{' '}
          <a
            style={{
              color: '#5c80b8',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
            href="https://gifted.ph"
          >
            gifted.ph
          </a>{' '}
          directly for all concerns prior to redemption through:
        </p>
        <ul style={{ padding: 'revert' }}>
          <li>
            - <a href="mailto:admin@gifted.ph">admin@gifted.ph</a>
          </li>
          <li>
            -{' '}
            <a href="https://facebook.com/giftedphilippines">
              facebook.com/giftedphilippines
            </a>
          </li>
          <li>
            - <a href="https://twitter.com/gifted_ph">twitter.com/gifted_ph</a>
          </li>{' '}
          <li>
            -{' '}
            <a href="https://instagram.com/gifted_ph">
              instagram.com/gifted_ph
            </a>
          </li>
        </ul>
      </div>
    ),
  },
];

function FAQsPage() {
  return (
    <>
      <Head>
        <title>GetX | FAQs</title>
      </Head>

      <main className="mx-auto max-w-8xl px-2 mt-7 mb-28 sm:px-4 md:mt-20 md:mb-36">
        <h1 className="text-3xl font-display text-center font-semibold">
          Frequently Asked Questions
        </h1>

        <div className="relative mt-14 space-y-8 max-w-6xl mx-auto md:mt-16">
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
          <div
            className="absolute -z-10 mt-8 top-1/3 -left-1/3 md:-left-1/2 blur-sm md:blur-0"
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

          <div
            className="absolute bottom-0 -z-10 blur -translate-x-20 md:blur-0 md:translate-y-20 md:-translate-x-[90%]"
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
          {faqs.map(({ title, content }, idx) => (
            <DisclosureCard key={title + idx} title={title} content={content} />
          ))}
        </div>
      </main>
    </>
  );
}

FAQsPage.Layout = MainLayout;

export default FAQsPage;
