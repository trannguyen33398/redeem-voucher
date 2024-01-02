import { FormEvent, useState } from 'react';
import Image from 'next/future/image';
import { isAddress } from '@ethersproject/address';
import {
  ArrowSmallRightIcon,
  CreditCardIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { useMetamaskConnector, useWallet } from '@xld-sdk-react/wallet';

import {
  formatWalletAddress,
  type IVoucher,
  type Network,
  splitStr,
} from '@/lib';
import { useGetVoucherCode } from '@/hooks';
import {
  ButtonIcon,
  Card,
  ButtonLink,
  ListBox,
  type ListBoxItem,
} from '../Shared';

import flagPH from '@/icons/flag-ph.svg';
import flagEU from '@/icons/flag-eu.svg';
import flagUSA from '@/icons/flag-usa.svg';
import usdcLogo from '@/images/usdc.png';
import metamaskLogo from '@/images/metamask.png';
import TxDetailsDisclosure from './TxDetailsDisclosure';

const currencies: ListBoxItem[] = [
  {
    label: 'PHP',
    value: 'php',
    icon: <Image src={flagPH} className="w-5 h-5" alt="PH flag" />,
  },
  {
    label: 'EUR',
    value: 'eur',
    icon: <Image src={flagEU} className="w-5 h-5" alt="EU flag" />,
  },
  {
    label: 'USD',
    value: 'usd',
    icon: <Image src={flagUSA} className="w-5 h-5" alt="USA flag" />,
  },
];

const currenciesWithNetworks: ListBoxItem[] = [
  {
    label: (
      <span className="font-medium">
        USDC <span className="text-[#7B7B7B] uppercase">ETH</span>
      </span>
    ),
    value: 'ETHEREUM',
    icon: <Image src={usdcLogo} className="w-5 h-5" alt="PH flag" />,
  },
  {
    label: (
      <span className="font-medium">
        USDC <span className="text-[#7B7B7B] uppercase">BSC</span>
      </span>
    ),
    value: 'BSC',
    icon: <Image src={usdcLogo} className="w-5 h-5" alt="EU flag" />,
  },
  {
    label: (
      <span className="font-medium">
        USDC <span className="text-[#7B7B7B] uppercase">Polygon</span>
      </span>
    ),
    value: 'POLYGON',
    icon: <Image src={usdcLogo} className="w-5 h-5" alt="USA flag" />,
  },
];

interface Props {
  voucher: IVoucher;
  updateVoucher(voucher: IVoucher): void;
  onSubmit(account: string): void;
}

function RedeemForm({ voucher, updateVoucher, onSubmit }: Props) {
  const [isManualConnect, setIsManualConnect] = useState(false);
  const [manualAddress, setManualAddress] = useState('');
  const [manualAddressErr, setManualAddressErr] = useState('');
  const [metamaskErr, setMetamaskErr] = useState('');
  const [network, setNetwork] = useState<Network>('BSC');
  const { account } = useWallet();
  const { connect, connecting, error: connectError } = useMetamaskConnector();
  const { error, isError, isFetching, refetch } = useGetVoucherCode(
    {
      voucherCode: voucher.code,
      network: network,
    },
    {
      cacheTime: 0,
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
            network,
          });
        }
      },
    }
  );

  const disableBtn =
    (!isManualConnect && !account) ||
    (isManualConnect && !manualAddress) ||
    isError ||
    isFetching;

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const secondInMs = 999;
    const lockDate =
      new Date(voucher.lockUntil).getTime() - new Date().getTime();

    if (lockDate <= secondInMs) return;

    if (manualAddress) {
      setManualAddressErr('');

      if (!isAddress(manualAddress)) {
        setManualAddressErr('Address is invalid');
        return;
      }

      onSubmit(manualAddress);
      return;
    }

    if (account) {
      onSubmit(account);
    }
  };

  const connectMetamask = () => {
    setMetamaskErr('');

    connect({
      onError(err) {
        // TODO(karim): fix this once we update wallet sdk
        if (err instanceof TypeError) {
          setMetamaskErr('MetaMask is not installed');
        }
      },
    });
  };

  return (
    <Card>
      <form className="space-y-8" onSubmit={onFormSubmit}>
        <div className="flex flex-col space-y-2">
          <label
            className="text-sm font-display font-semibold text-smooth md:text-base"
            htmlFor="voucher-code-redeem"
          >
            Voucher Code
          </label>
          <input
            type="text"
            id="voucher-code-redeem"
            value={splitStr(voucher.code)}
            readOnly
            placeholder="8 alphanumeric Voucher Code"
            className="border-0 bg-[#F1F7FC] border-peaceful focus:ring-peaceful w-full h-14 rounded-2xl focus:outline-none focus:ring-2 md:text-lg md:h-16 md:p-6"
          />
        </div>

        <div className="grid gap-x-4 grid-cols-6">
          <div className="col-span-4 flex flex-col space-y-2">
            <label
              className="text-sm font-display font-semibold text-smooth md:text-base"
              htmlFor="voucher-amount-redeem"
            >
              Voucher Amount
            </label>
            <input
              type="number"
              id="voucher-amount-redeem"
              value={voucher.amount}
              readOnly
              className="border-0 bg-[#F1F7FC] border-peaceful focus:ring-peaceful w-full h-14 rounded-2xl focus:outline-none focus:ring-2 md:text-lg md:h-16 md:p-6"
            />
          </div>

          <div className="col-span-2 flex flex-col space-y-2">
            <label
              className="text-sm font-display font-semibold text-smooth md:text-base"
              htmlFor="voucher-currency-redeem"
            >
              Currency
            </label>
            <ListBox
              list={currencies}
              defaultSelected={currencies[0]}
              disabled
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid gap-x-4 grid-cols-2">
            <div className="flex flex-col space-y-2">
              <label
                className="text-sm font-display font-semibold text-smooth md:text-base"
                htmlFor="voucher-amount-recieve-redeem"
              >
                You Receive (Est.)
              </label>
              <input
                type="number"
                id="voucher-amount-recieve-redeem"
                value={voucher.amountToRecieve}
                readOnly
                className="border-0 bg-[#F1F7FC] border-peaceful focus:ring-peaceful w-full h-14 rounded-2xl focus:outline-none focus:ring-2 md:text-lg md:h-16 md:p-6"
              />
            </div>

            <div className="relative z-10">
              <div className="flex flex-col space-y-2">
                <label
                  className="text-sm font-display font-semibold text-smooth md:text-base"
                  htmlFor="voucher-code-redeem"
                >
                  Currency/Network
                </label>
                <ListBox
                  list={currenciesWithNetworks}
                  defaultSelected={currenciesWithNetworks[1]}
                  disabled={isFetching}
                  onChange={item => {
                    setNetwork(item as Network);
                  }}
                />
              </div>
              {isFetching && (
                <p className="text-xs pl-1 font-display text-smooth">
                  {'Retrieving voucher information...'}
                </p>
              )}
              {isError && (
                <p className="text-sm font-display text-[#CF1124]">
                  {error instanceof Error
                    ? error.message
                    : 'Failed to switch network'}
                </p>
              )}
            </div>
          </div>

          <TxDetailsDisclosure
            isLoading={isFetching}
            network={network}
            voucher={voucher}
            refetchVoucher={refetch}
          />
        </div>

        <div className="flex flex-col">
          <div className="space-y-1">
            <p className="text-sm font-display font-semibold text-smooth md:text-base">
              <label htmlFor="redeem-wallet-address">Wallet Address</label>
              {isManualConnect && (
                <span className="flex items-center space-x-1 text-xs text-[#5D7A9B] lg:text-sm">
                  <ExclamationCircleIcon className="w-4 h-4 lg:w-5 lg:h-5" />
                  <span>We only support Metamask addresses.</span>
                </span>
              )}
            </p>

            {!isManualConnect ? (
              <>
                <ButtonIcon
                  id="redeem-wallet-address"
                  variant="alt"
                  intent="secondary"
                  size="md"
                  fullWidth
                  iconPosition="left"
                  className="font-medium truncate py-4 md:py-5 md:rounded-3xl md:text-lg"
                  onClick={connectMetamask}
                  disabled={connecting || typeof account === 'string'}
                  icon={
                    !account ? (
                      <CreditCardIcon
                        className="block w-4 h-4 md:w-6 md:h-6 text-smooth"
                        aria-hidden="true"
                      />
                    ) : (
                      <Image
                        src={metamaskLogo}
                        className="w-4 h-4 md:w-6 md:h-6"
                        alt="metamask"
                      />
                    )
                  }
                >
                  {!account
                    ? 'Connect to Metamask'
                    : formatWalletAddress(account)}
                </ButtonIcon>
                {(metamaskErr || connectError) && (
                  <span className="text-sm text-[#CF1124] pl-1">
                    {metamaskErr || connectError}
                  </span>
                )}
              </>
            ) : (
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <div className="h-14 w-16 flex items-center justify-center rounded-md bg-[#F1F7FC]">
                    <Image
                      src={metamaskLogo}
                      className="w-6 h-6"
                      alt="metamask"
                    />
                  </div>
                  <input
                    type="text"
                    id="redeem-wallet-address"
                    placeholder="Wallet Address"
                    value={manualAddress}
                    onChange={e => setManualAddress(e.target.value)}
                    className="py-4 w-full rounded-2xl text-[#878787] border-peaceful focus:ring-peaceful focus:outline-none focus:ring-2 md:text-lg md:h-16 md:py-5 md:px-6"
                  />
                </div>
                {manualAddressErr && (
                  <span className="text-sm text-[#CF1124] pl-1">
                    {manualAddressErr}
                  </span>
                )}
              </div>
            )}
          </div>

          <ButtonLink
            intent="tertiary"
            size="sm"
            className="ml-auto font-normal"
            onClick={() => setIsManualConnect(!isManualConnect)}
          >
            {isManualConnect
              ? 'Connect Wallet'
              : ' Manually input wallet address'}
          </ButtonLink>
        </div>

        <ButtonIcon
          type="submit"
          disabled={disableBtn}
          fullWidth
          icon={
            <ArrowSmallRightIcon
              className="block w-4 h-4 md:w-6 md:h-6 text-white"
              aria-hidden="true"
              strokeWidth={3}
            />
          }
        >
          Redeem
        </ButtonIcon>
      </form>
    </Card>
  );
}

export default RedeemForm;
