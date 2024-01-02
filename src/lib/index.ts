import { z } from 'zod';

export * from './getErrorMessage';
export * from './types';
export * from './fetch';
export * from './env';
export { formatCurrency } from './formatCurrency';

export function isValideVoucherCode(code: string) {
  return z
    .string()
    .trim()
    .regex(/^[A-Za-z0-9]*$/)
    .min(8)
    .max(8)
    .safeParse(code.replaceAll(' ', '')).success;
}

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export function splitStr(str: string, step = 4) {
  let result = '';
  const strippedStr = str.replaceAll(' ', '');

  for (let i = 0; i < strippedStr.length; i++) {
    if (i !== 0 && i % step === 0) {
      result += ' ';
    }

    result += strippedStr[i];
  }

  return result;
}

export function formatWalletAddress(address: string) {
  return (
    address.substring(0, 6) + '...' + address.substring(address.length - 6)
  );
}

export function getQueryValue(query: string | string[] | undefined) {
  if (!query) return '';

  if (Array.isArray(query)) {
    return query[query.length - 1] ?? '';
  }

  return query;
}

export function getCodeStatusType(error: unknown) {
  if (!(error instanceof Error)) return 'blocked';

  if (typeof error.cause !== 'string') return 'blocked';

  const errorStatus = [
    'blocked',
    'pending',
    'success',
    'invalid',
    'fetchFailed',
  ];

  if (errorStatus.includes(error.cause)) {
    return error.cause;
  }

  return 'blocked';
}

export function getCodeStatusErrorMessage(statusCode: string) {
  if (!statusCode) return '';

  if (statusCode === 'fetchFailed')
    return 'Could not retrieve voucher code status';
  if (statusCode === 'blocked') return 'This voucher code is blocked';
  if (statusCode === 'pending') return 'This voucher code is being used';
  if (statusCode === 'success')
    return 'This voucher code has already been redeemed';
  if (statusCode === 'invalid') return 'This voucher code does not exist';

  return '';
}
