import Image from 'next/future/image';

import { formatCurrency, splitStr } from '@/lib';
import logo from '@/images/logo-alt.svg';
import dollarSymbole from '@/images/dollar-symbole.svg';

interface Props {
  code: string;
  amount: number;
  type: string;
  locale?: string;
  currency?: string;
}

function VoucherCard({
  code,
  amount,
  type,
  locale = 'en-PH',
  currency = 'php',
}: Props) {
  return (
    <article className="relative overflow-hidden rounded-xl bg-[#050F33] text-peaceful">
      <div
        className="absolute left-0 top-0 opacity-10 md:scale-150 lg:top-14 lg:left-14 lg:scale-[2]"
        aria-hidden="true"
      >
        <Image src={dollarSymbole} alt="dollar symbole" />
      </div>

      <div className="p-6 md:p-8 lg:p-10">
        <p className="text-right text-2xl font-display font-bold uppercase text-playful sm:text-3xl md:text-4xl lg:text-5xl">
          {formatCurrency({ amount, locale, currency })}
        </p>
        <p className="text-right text-xl font-display font-semibold text-skyblue sm:text-2xl md:mt-1 md:text-3xl lg:text-4xl">
          {type}
        </p>

        <div className="mt-16 flex items-center justify-between md:mt-24 lg:mt-32">
          <div>
            <p className="text-xs text-skyblue md:text-sm lg:text-base">
              Voucher Code
            </p>
            <p className="text-sm font-display font-semibold text-peaceful sm:text-base md:text-lg lg:text-2xl">
              {splitStr(code)}
            </p>
          </div>

          <div className="h-5 sm:h-6 md:h-7 lg:h-8">
            <Image src={logo} alt="GetX logo" className="md:w-full h-full" />
          </div>
        </div>
      </div>
    </article>
  );
}

export default VoucherCard;
