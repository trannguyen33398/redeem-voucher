import { getAPIRoute } from './env';
import { getErrorMessage } from './getErrorMessage';
import { Network } from './types';

const baseURL = getAPIRoute();

export async function getVouhcerStatus(code: string) {
  try {
    const response = await fetch(`${getAPIRoute()}/status?code=${code}`);
    const data = (await response.json()) as {
      message: string;
      success: boolean;
      data: {
        status: 'blocked' | 'new' | 'success' | 'pending' | 'invalid';
        txnHash: null | string;
      };
    };

    if (!response.ok) {
      throw new Error(
        data.message || 'Could not retrieve voucher code status.',
        {
          cause: data.data.status,
        }
      );
    }

    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error), { cause: 'fetchFailed' });
  }
}

export async function fetchVoucher(
  voucherCode: string,
  network: Network = 'BSC'
) {
  const response = await fetch(
    `${getAPIRoute()}?code=${voucherCode}&network=${network}&currency=USDC`
  );
  const data = (await response.json()) as {
    message: string;
    data: {
      network: Network;
      exchangeRate: number;
      amount: number;
      amountToReceive: number;
      gasFee: number;
      transactionFee: number;
      lockUntil: number;
    } | null;
  };

  if (!response.ok || !data.data) {
    throw new Error(data.message || 'Could not retrieve voucher code');
  }

  return data.data;
}

export async function redeemVoucher(payload: {
  account: string;
  code: string;
}) {
  const response = await fetch(`${baseURL}/redeem`, {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json',
    }),
    body: JSON.stringify(payload),
  });

  const data = (await response.json()) as {
    success: boolean;
    message: string;
    data: {
      reference_number: string;
    } | null;
  };

  if (!response.ok || !data.data) {
    throw new Error(getErrorMessage(data, 'Failed to redeem voucher code'));
  }

  return data.data;
}
