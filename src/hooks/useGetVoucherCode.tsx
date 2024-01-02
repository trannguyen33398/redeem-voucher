import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

import { fetchVoucher, type Network } from '@/lib';

interface Payload {
  voucherCode: string;
  network?: Network;
}

type Options = UseQueryOptions<
  Awaited<ReturnType<typeof fetchVoucher>>,
  Error | null
>;

const defaultOptions: Options = {
  retry: false,
  refetchOnWindowFocus: false,
};

function useGetVoucherCode(payload: Payload, options: Options = {}) {
  const { voucherCode, network = 'BSC' } = payload;

  return useQuery(
    ['/api/redeem', voucherCode, network],
    () => fetchVoucher(voucherCode, network),
    // @ts-ignore
    {
      ...defaultOptions,
      ...options,
    }
  );
}

export { useGetVoucherCode };
