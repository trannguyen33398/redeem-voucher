import Image from 'next/future/image';
import { useQuery } from '@tanstack/react-query';
import {
  DocumentMinusIcon,
  ArrowUturnLeftIcon,
  CheckIcon,
} from '@heroicons/react/24/outline';

import checkCircle from '@/images/checkmark-full.png';
import copyIcon from '@/icons/copy.svg';
import { getVouhcerStatus, IVoucher } from '@/lib';
import { useCopyToClipboard } from '@/hooks';
import { ButtonIcon, Card } from '../Shared';
import SendByEmail from './SendByEmail';

function formatTxHash(address: string) {
  return (
    address.substring(0, 8) + '...' + address.substring(address.length - 8)
  );
}

interface Props {
  txReference: string;
  voucher: IVoucher;
  onSubmit(): void;
}

function VoucherRedeemed({ voucher, txReference, onSubmit }: Props) {
  const { copiedText: copiedRef, copy: copyRef } = useCopyToClipboard();
  const { copiedText: copiedHash, copy: copyHash } = useCopyToClipboard();

  const {
    data: codeStatus,
    isFetching,
    isError,
    error,
    refetch,
  } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ['voucher-status', voucher.code],
    refetchInterval(data) {
      if (data?.data?.status === 'success') return false; // stop refetch
      return 5000; // 5s
    },
    queryFn: () => getVouhcerStatus(voucher.code),
  });

  const isDoneCheckingStatus =
    codeStatus?.data?.status === 'success' && !isFetching && !isError;

  const handleSubmit = () => {
    if (codeStatus?.data?.status === 'success') {
      onSubmit();
    }
  };

  return (
    <div className="md:max-w-2xl md:mx-auto">
      <Card>
        <div className="space-y-8">
          <div className="space-y-4 flex flex-col items-center justify-center">
            <Image src={checkCircle} alt="check mark" className="w-14 h-14" />
            <h3 className="font-display font-semibold text-center text-xl text-smooth md:text-2xl">
              Voucher Redeemed
            </h3>
            <p className="md:hidden text-center text-smooth">
              Sit et delectus accusamus et nesciunt enim. Non consequatur veniam
              eos ullam dignissimos molestiae.
            </p>
            <p className="hidden text-center text-smooth md:block">
              Redemption Successful. You will receive your USDC within 1- 3
              minutes. If you have any concerns or questions, please{' '}
              <a
                href="/contact"
                target="_blank"
                className="text-[#7B93DB] font-bold"
              >
                Contact Us
              </a>
            </p>
          </div>

          {isError && (
            <p className="text-center font-semibold text-red-400">
              {error instanceof Error
                ? error.message
                : 'Could not retrieve voucher code status.'}
            </p>
          )}

          {!isDoneCheckingStatus && (
            <p className="text-center text-smooth font-semibold font-display animate-pulse">
              Please wait while we process transaction.
            </p>
          )}

          <div className="space-y-6">
            <div>
              <p className="font-display text-[#2D2D2D]">Reference number:</p>
              <div className="space-x-4 flex items-center justify-start">
                <p className="font-display font-semibold text-smooth">
                  {txReference}
                </p>
                <button onClick={() => copyRef(txReference)}>
                  {copiedRef ? (
                    <CheckIcon className="block w-5 h-5 text-[#7B93DB]" />
                  ) : (
                    <Image
                      className="block w-4 h-4"
                      src={copyIcon}
                      alt="copy icon"
                    />
                  )}
                </button>
              </div>
            </div>
            <div>
              <p className="font-display text-[#2D2D2D]">Transaction Hash:</p>
              {!isDoneCheckingStatus ? (
                <>
                  <div className="animate-pulse mt-1 h-4 w-2/5 bg-gray-200 rounded-full" />
                  <p className="text-smooth font-display">
                    Please wait while we generate the Transaction hash
                  </p>
                </>
              ) : (
                <div className="space-x-4 flex items-start justify-start">
                  <p className="font-display font-semibold break-all text-smooth">
                    <span
                      className="md:hidden"
                      title={codeStatus.data.txnHash ?? '-'}
                    >
                      {codeStatus?.data?.txnHash
                        ? formatTxHash(codeStatus.data.txnHash)
                        : '-'}
                    </span>
                    <span className="hidden md:inline">
                      {codeStatus?.data?.txnHash ?? '-'}
                    </span>
                  </p>

                  <button
                    onClick={() =>
                      codeStatus.data.txnHash &&
                      copyHash(codeStatus.data.txnHash)
                    }
                  >
                    {copiedHash ? (
                      <CheckIcon className="block w-5 h-5 text-[#7B93DB]" />
                    ) : (
                      <Image
                        className="block w-5 h-5"
                        src={copyIcon}
                        alt="copy icon"
                      />
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>

          <SendByEmail disabled={!isDoneCheckingStatus} code={voucher.code} />

          {isError && (
            <ButtonIcon
              onClick={() => refetch()}
              disabled={!isDoneCheckingStatus}
              fullWidth
              icon={
                <ArrowUturnLeftIcon
                  className="block w-5 h-5 text-white"
                  aria-hidden="true"
                />
              }
            >
              Retry
            </ButtonIcon>
          )}

          <ButtonIcon
            onClick={handleSubmit}
            disabled={!isDoneCheckingStatus}
            fullWidth
            icon={
              <DocumentMinusIcon
                className="block w-5 h-5 text-white"
                aria-hidden="true"
              />
            }
          >
            Redeem another voucher
          </ButtonIcon>
        </div>
      </Card>
    </div>
  );
}

export default VoucherRedeemed;
