interface Options {
  amount: number | string;
  reverseSymbol?: boolean;
  locale?: string;
  currency?: string;
}

export function formatCurrency({
  amount,
  locale = 'en-PH',
  currency = 'php',
  reverseSymbol = true,
}: Options) {
  const fn = new Intl.NumberFormat(locale, {
    style: 'currency',
    currencyDisplay: 'code',
    currency,
    minimumFractionDigits: 0,
  });

  const result = fn.format(Number(amount));

  if (reverseSymbol) {
    return result.split(/\s/).reverse().join(' ');
  }

  return result;
}
