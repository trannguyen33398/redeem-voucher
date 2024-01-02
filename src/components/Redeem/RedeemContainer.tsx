import { Suspense, useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Link from 'next/link';

import { classNames, type IVoucher } from '@/lib';
import VoucherDetails from './VoucherDetails';
import { VoucherDetailsSkeleton, VoucherRedeemSkeleton } from '../Skeleton';
import { Button, Card } from '../Shared';
import { useGetVoucherCode } from '@/hooks';

const VoucherConfirm = dynamic(() => import('./VoucherConfirm'), {
  suspense: true,
});

const VoucherRedeemed = dynamic(() => import('./VoucherRedeemed'), {
  suspense: true,
});

type Section = 'details' | 'confirm' | 'redeemed';

interface Props {
  code: string;
}

function RedeemContainer({ code }: Props) {
  const [section, setSection] = useState<Section>('details');
  const [account, setAccount] = useState('');
  const [txReference, setTxReference] = useState('');
  const [voucher, setVoucher] = useState<IVoucher>({
    type: 'USDC Voucher',
    code,
    amount: -1,
    transactionFee: -1,
    gasFee: -1,
    amountToRecieve: -1,
    exchangeRate: -1,
    lockUntil: -1,
    currency: 'PHP',
    network: 'BSC',
  });
  const router = useRouter();

  const { error, isError, isSuccess, isLoading } = useGetVoucherCode(
    {
      network: 'BSC',
      voucherCode: code,
    },
    {
      enabled: router.isReady,
      retry: false,
      cacheTime: 0,
      onSuccess(data) {
        setVoucher({
          type: 'USDC Voucher',
          code,
          amount: data.amount,
          transactionFee: data.transactionFee,
          gasFee: data.gasFee,
          amountToRecieve: data.amountToReceive,
          exchangeRate: data.exchangeRate,
          lockUntil: data.lockUntil,
          currency: 'PHP',
          network: data.network,
        });
      },
    }
  );

  return (
    <main className="mx-auto max-w-8xl space-y-6 px-2 mt-7 mb-4 sm:px-4 md:text-left md:mt-20 md:mb-10">
      {isLoading && (
        <div className="mt-8 flex items-center justify-center md:mt-24">
          <VoucherDetailsSkeleton />
        </div>
      )}

      {isError && (
        <div className="h-[600px] flex items-center justify-center">
          <Card>
            <p className="mb-4 text-sm font-display text-[#CF1124] md:text-base lg:text-lg">
              {error instanceof Error ? error.message : 'Unexpected errror'}
            </p>
            <Link href="/">
              <Button fullWidth>Redeem different voucher</Button>
            </Link>
          </Card>
        </div>
      )}

      <div className={classNames(!isSuccess ? 'hidden' : 'block')}>
        <div
          className={classNames(
            router.isReady ? 'visible' : 'invisible',
            section === 'details' ? 'block' : 'hidden'
          )}
        >
          {section === 'details' && (
            <VoucherDetails
              voucher={voucher}
              updateVoucher={setVoucher}
              onSubmit={connectedAccount => {
                setAccount(connectedAccount);
                setSection('confirm');
              }}
            />
          )}
        </div>

        {section === 'confirm' && (
          <Suspense fallback={<VoucherRedeemSkeleton hasTitle />}>
            <VoucherConfirm
              voucher={voucher}
              account={account}
              updateVoucher={setVoucher}
              onSubmit={reference => {
                setTxReference(reference);
                setSection('redeemed');
              }}
              onCancel={() => setSection('details')}
            />
          </Suspense>
        )}
        {section === 'redeemed' && (
          <Suspense fallback={<VoucherRedeemSkeleton />}>
            <VoucherRedeemed
              voucher={voucher}
              txReference={txReference}
              onSubmit={() => router.push('/')}
            />
          </Suspense>
        )}
      </div>
    </main>
  );
}

export default RedeemContainer;
