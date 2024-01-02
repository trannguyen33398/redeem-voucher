import { Suspense } from 'react';
import dynamic from 'next/dynamic';

import { IVoucher } from '@/lib';
import { RedeemFormSkeleton } from '../Skeleton';
import VoucherCard from './VoucherCard';

const EtheruemProvider = dynamic(
  () => import('../Providers/EtheruemProvider'),
  {
    suspense: true,
  }
);
const RedeemForm = dynamic(() => import('./RedeemForm'), {
  suspense: true,
});

interface Props {
  updateVoucher(voucher: IVoucher): void;
  voucher: IVoucher;
  onSubmit(connectedAccount: string): void;
}

function VoucherDetails({ voucher, updateVoucher, onSubmit }: Props) {
  return (
    <>
      <h3 className="font-display font-semibold text-center text-2xl text-smooth md:text-left mb-12 md:mb-0">
        Voucher Details
      </h3>

      <div className="md:grid md:gap-x-4 md:grid-cols-2 lg:gap-x-10">
        <div className="md:order-2">
          <VoucherCard
            type={voucher.type}
            code={voucher.code}
            amount={voucher.amount}
            currency={voucher.currency}
          />
        </div>
        <div className="mt-6 md:mt-0">
          <Suspense fallback={<RedeemFormSkeleton />}>
            <EtheruemProvider>
              <RedeemForm
                voucher={voucher}
                updateVoucher={updateVoucher}
                onSubmit={onSubmit}
              />
            </EtheruemProvider>
          </Suspense>
        </div>
      </div>
    </>
  );
}

export default VoucherDetails;
