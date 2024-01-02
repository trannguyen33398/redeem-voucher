import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import {
  ArrowSmallRightIcon,
  XCircleIcon,
  CheckBadgeIcon,
} from '@heroicons/react/24/outline';

import {
  classNames,
  getCodeStatusErrorMessage,
  getQueryValue,
  getVouhcerStatus,
  isValideVoucherCode,
  splitStr,
} from '@/lib';
import { useGetVoucherCode, useIsChangingRoute } from '@/hooks';
import { Card, InputHelperText, ButtonIcon, Spinner } from '../Shared';

function VoucherForm() {
  const [voucherCode, setVoucherCode] = useState('');
  const [error, setError] = useState('');
  const { isChangingRoute } = useIsChangingRoute('/redeem');
  const router = useRouter();

  const { refetch: refetchVoucherCode } = useGetVoucherCode(
    {
      network: 'BSC',
      voucherCode: voucherCode.replace(/\s/g, ''),
    },
    {
      enabled: false,
      retry: false,
      cacheTime: 0,
    }
  );

  const {
    data: codeStatus,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ['voucher-status', voucherCode],
    queryFn: () => getVouhcerStatus(voucherCode.replace(/\s/g, '')),
    enabled: false,
    retry: false,
    cacheTime: 0, // disable cache
  });

  useEffect(() => {
    // prefetch redeem page to avoid long wait after
    // code status api call
    router.prefetch('/redeem');
  }, [router]);

  useEffect(() => {
    if (router.isReady) {
      const code = getQueryValue(router.query.code);

      if (code) {
        setVoucherCode(splitStr(code));
      }
    }
  }, [router.isReady, router.query.code]);

  useEffect(() => {
    if (router.isReady) {
      const status = getQueryValue(router.query.status);

      if (status) {
        setError(getCodeStatusErrorMessage(status));
      }
    }
  }, [router.isReady, router.query.status]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    try {
      if (!isValideVoucherCode(voucherCode)) {
        throw new Error('Bad voucher code format.');
      }

      const { data } = await refetch({ throwOnError: true });

      if (data?.data.status !== 'new') {
        throw new Error(data?.message);
      }

      refetchVoucherCode();

      router.push({
        pathname: '/redeem',
        query: { code: voucherCode.replace(/\s/g, '') },
      });
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        console.log(err);
        setError('Could not retrieve voucher code status');
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newCode = e.target.value;
    setVoucherCode(newCode);

    if (!newCode || !newCode.length) return;

    // handle user deleting voucher code
    if (newCode.length <= voucherCode.length) {
      // remove whitespace automatically
      if (newCode[newCode.length - 1] === ' ') {
        setVoucherCode(newCode.slice(0, -1));
      }

      return;
    }

    setVoucherCode(splitStr(newCode));
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-2">
          <label className="font-semibold text-smooth" htmlFor="voucher-code">
            Voucher Code
          </label>
          <input
            type="text"
            id="voucher-code"
            placeholder="8 alphanumeric Voucher Code"
            onChange={handleChange}
            value={voucherCode}
            className={classNames(
              error
                ? 'border-[#CF1124] focus:ring-[#CF1124]'
                : 'border-peaceful focus:ring-peaceful',
              !error && codeStatus?.success
                ? 'border-[#207227] focus:ring-[#207227]'
                : '',
              'w-full h-14 rounded-2xl text-[#878787] focus:outline-none focus:ring-2 md:text-lg md:h-16 md:p-6'
            )}
          />
          {codeStatus?.data.status === 'new' ? (
            <InputHelperText
              show={!error && voucherCode !== ''}
              variant="success"
              text={codeStatus.message}
              icon={
                <CheckBadgeIcon
                  className="w-4 h-4 md:w-5 md:h-5"
                  aria-hidden="true"
                  strokeWidth={2}
                />
              }
            />
          ) : (
            <InputHelperText
              show={error !== ''}
              variant="error"
              text={error}
              icon={
                <XCircleIcon
                  className="w-4 h-4 md:w-5 md:h-5"
                  aria-hidden="true"
                  strokeWidth={2}
                />
              }
            />
          )}
        </div>

        <div className="mt-6">
          <ButtonIcon
            fullWidth
            type="submit"
            disabled={isFetching || isChangingRoute}
            icon={
              isFetching || isChangingRoute ? (
                <Spinner className="w-4 h-4 md:w-6 md:h-6 text-white animate-spin fill-brand" />
              ) : (
                <ArrowSmallRightIcon
                  className="block w-4 h-4 md:w-6 md:h-6 text-white"
                  aria-hidden="true"
                  strokeWidth={3}
                />
              )
            }
          >
            Redeem
          </ButtonIcon>
        </div>
      </form>
    </Card>
  );
}

export default VoucherForm;
