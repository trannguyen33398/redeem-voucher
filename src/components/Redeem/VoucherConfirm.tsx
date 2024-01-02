import { useState } from 'react';
import Image from 'next/future/image';
import {
  ArrowSmallLeftIcon,
  ArrowSmallRightIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';
import { useMutation } from '@tanstack/react-query';

import usdcLogo from '@/images/usdc.png';
import metamaskLogo from '@/images/metamask.png';
import {
  formatWalletAddress,
  getErrorMessage,
  redeemVoucher,
  type IVoucher,
} from '@/lib';
import { useGetVoucherCode } from '@/hooks/useGetVoucherCode';
import { ButtonIcon, Card } from '../Shared';
import { PriceCountDown } from './PriceCountDown';

interface Props {
  voucher: IVoucher;
  account: string;
  updateVoucher(voucher: IVoucher): void;
  onSubmit(txReference: string): void;
  onCancel(): void;
}

function VoucherConfirm({
  account,
  voucher,
  updateVoucher,
  onCancel,
  onSubmit,
}: Props) {
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState('');
  const redeem = useMutation({
    mutationFn: async (payload: { code: string; account: string }) =>
      redeemVoucher(payload),
  });
  const { isFetching, refetch } = useGetVoucherCode(
    {
      voucherCode: voucher.code,
      network: voucher.network,
    },
    {
      cacheTime: 0,
      enabled: false,
      onSuccess(data) {
        if (data) {
          updateVoucher({
            type: 'USDC Voucher',
            amountToRecieve: data.amountToReceive,
            currency: 'PHP',
            code: voucher.code,
            amount: data.amount,
            gasFee: data.gasFee,
            exchangeRate: data.exchangeRate,
            transactionFee: data.transactionFee,
            lockUntil: data.lockUntil,
            network: voucher.network,
          });
        }
      },
    }
  );
  const onFormSubmit = () => {
    setError('');

    if (!checked) {
      setError('Please agree to the terms and conditions');
      return;
    }

    redeem.mutate(
      { account, code: voucher.code },
      {
        async onSuccess({ reference_number }) {
          onSubmit(reference_number);
        },
        onError(err) {
          setError(getErrorMessage(err));
        },
      }
    );
  };

  return (
    <>
      <h1 className="font-display font-semibold text-center text-2xl text-smooth md:mb-6">
        Confirm Details
      </h1>

      <div className="md:max-w-2xl md:mx-auto">
        <Card>
          {error && (
            <p className="text-sm text-center mb-2 text-[#CF1124] md:mb-4">
              {error}
            </p>
          )}

          <div className="space-y-9">
            <div className="space-y-3">
              <div className="p-4 bg-[#F1F7FC] rounded-2xl md:p-6">
                <div className="flex items-start justify-between space-x-2 md:items-center">
                  <p className="text-sm font-display font-semibold text-smooth md:text-lg lg:text-xl">
                    You Receive
                  </p>
                  <div className="space-y-1 text-right md:flex md:space-x-5">
                    {isFetching ? (
                      <div className="animate-pulse h-5 md:h-6 w-40 bg-gray-300 rounded-full" />
                    ) : (
                      <>
                        <p className="text-xl font-bold text-smooth">
                          {voucher.amountToRecieve}
                        </p>
                        <div className="flex items-center space-x-2">
                          <Image
                            src={usdcLogo}
                            alt="usdc logo"
                            className="h-6 w-6"
                          />
                          <p className="font-medium">
                            USDC{' '}
                            <span className="text-[#5D7A9B]">
                              {voucher.network}
                            </span>
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <ul className="p-4 bg-[#F1F7FC] rounded-2xl space-y-4 md:p-6">
                <li className="flex items-center justify-between space-x-2">
                  <p className="text-sm font-medium text-[#5D7A9B] md:text-base">
                    1 USDC @ {voucher.exchangeRate} PHP
                  </p>
                  {isFetching ? (
                    <div className="animate-pulse h-4 w-2/5 bg-gray-300 rounded-full" />
                  ) : (
                    <p className="font-semibold text-smooth">
                      {voucher.amount} PHP
                    </p>
                  )}
                </li>
                <li className="flex items-center justify-between space-x-2">
                  <p className="text-sm font-medium text-[#5D7A9B] md:text-base">
                    Transaction fee
                  </p>
                  {isFetching ? (
                    <div className="animate-pulse h-4 w-2/5 bg-gray-300 rounded-full" />
                  ) : (
                    <p className="font-semibold text-smooth">
                      {voucher.transactionFee} PHP
                    </p>
                  )}
                </li>
                <li className="flex items-center justify-between space-x-2">
                  <p className="text-sm font-medium text-[#5D7A9B] md:text-base">
                    Gas/Network fee
                  </p>
                  {isFetching ? (
                    <div className="animate-pulse h-4 w-2/5 bg-gray-300 rounded-full" />
                  ) : (
                    <p className="font-semibold text-smooth">
                      {voucher.gasFee === 0
                        ? 'Waived'
                        : voucher.gasFee + ' PHP'}
                    </p>
                  )}
                </li>
                <li className="flex items-center justify-between space-x-2">
                  <p className="text-sm font-medium text-[#5D7A9B] md:text-base">
                    Total Fees
                  </p>
                  {isFetching ? (
                    <div className="animate-pulse h-4 w-2/5 bg-gray-300 rounded-full" />
                  ) : (
                    <p className="font-semibold text-smooth">
                      {voucher.gasFee === 0
                        ? voucher.transactionFee
                        : voucher.transactionFee + voucher.gasFee}{' '}
                      PHP
                    </p>
                  )}
                </li>
              </ul>

              <div className="p-4 bg-[#F1F7FC] rounded-2xl space-y-3 md:space-y-0 md:flex md:items-center md:justify-between md:p-6">
                <p className="font-display font-semibold text-smooth">
                  Wallet Address
                </p>
                <div className="flex items-center space-x-4">
                  <Image
                    src={metamaskLogo}
                    alt="usdc logo"
                    className="h-8 w-8"
                  />
                  <p className="font-semibold text-smooth">
                    {formatWalletAddress(account)}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="justify-center text-[#5D7A9B] flex">
                <PriceCountDown
                  lockUntil={voucher.lockUntil}
                  refetchVoucher={refetch}
                />
              </div>
              <p className="text-sm text-center md:text-base">
                After redemption, the card value of{' '}
                <span className="font-semibold">
                  {voucher.amountToRecieve} USDC
                </span>{' '}
                will be fully credited to the specified wallet.{' '}
                <br className="md:hidden" />
                <span className="text-[#5D7A9B]">
                  Average processing time is{' '}
                  <span className="font-semibold">5 minutes</span>
                </span>
              </p>
            </div>

            <div className="text-center space-x-2">
              <input
                id="voucher-terms"
                type="checkbox"
                checked={checked}
                onChange={e => {
                  setChecked(e.target.checked);
                  if (error) {
                    setError('');
                  }
                }}
                required
                className="h-5 w-5 border-2 rounded-[4px] border-brand focus:outline-none focus:ring-2 focus:ring-peaceful"
              />
              <label htmlFor="voucher-terms">
                I agree to the{' '}
                <a
                  href="/tnc"
                  target="_blank"
                  style={{ color: '#5c80b8', fontWeight: 'bold' }}
                >
                  Terms and Conditions{' '}
                </a>
                and{' '}
                <a
                  href="/privacy"
                  target="_blank"
                  style={{ color: '#5c80b8', fontWeight: 'bold' }}
                >
                  Privacy Policy
                </a>
                .
              </label>
            </div>

            <div className="flex space-x-4">
              <ButtonIcon
                variant="alt"
                onClick={onCancel}
                icon={
                  <ArrowSmallLeftIcon
                    className="block w-4 h-4 md:w-6 md:h-6 text-brand"
                    aria-hidden="true"
                    strokeWidth={3}
                  />
                }
              />
              <ButtonIcon
                fullWidth
                disabled={!checked || redeem.isLoading || isFetching}
                onClick={onFormSubmit}
                icon={
                  redeem.isLoading ? (
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : (
                    <ArrowSmallRightIcon
                      className="block w-4 h-4 md:w-6 md:h-6 text-white"
                      aria-hidden="true"
                      strokeWidth={3}
                    />
                  )
                }
              >
                Confirm
              </ButtonIcon>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}

export default VoucherConfirm;
