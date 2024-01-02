export interface IVoucher {
  code: string;
  amount: number;
  amountToRecieve: number;
  transactionFee: number;
  gasFee: number;
  currency: string;
  exchangeRate: number;
  type: string;
  network: Network;
  lockUntil: number;
}

export type Network = 'ETHEREUM' | 'BSC' | 'POLYGON';
