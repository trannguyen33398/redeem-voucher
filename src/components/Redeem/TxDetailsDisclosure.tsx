import { Disclosure, Transition } from '@headlessui/react';
import { IVoucher, Network } from '@/lib';
import { PriceCountDown } from './PriceCountDown';

interface DisclosureItemProps {
  label: string;
  value: string | number;
  isLoading: boolean;
}

function DisclosureItem({ isLoading, label, value }: DisclosureItemProps) {
  return (
    <li className="flex items-center justify-between space-x-2">
      <p className="text-sm font-medium text-[#5D7A9B] md:text-base">{label}</p>
      {isLoading ? (
        <div className="animate-pulse h-4 w-2/5 bg-gray-300 rounded-full" />
      ) : (
        <p className="font-semibold text-smooth">{value}</p>
      )}
    </li>
  );
}

interface Props {
  voucher: IVoucher;
  isLoading?: boolean;
  network: Network;
  refetchVoucher(): void;
}

function TxDetailsDisclosure({
  isLoading = false,
  network,
  voucher,
  refetchVoucher,
}: Props) {
  const { transactionFee, gasFee, exchangeRate, lockUntil } = voucher;

  const totalFees =
    network === 'ETHEREUM' ? transactionFee + gasFee : transactionFee;

  return (
    <Disclosure>
      {({ open }) => (
        <>
          <div className="flex items-end justify-between md:space-x-2">
            <div className="space-y-1">
              <PriceCountDown
                lockUntil={lockUntil}
                refetchVoucher={refetchVoucher}
              />
              <p className="text-sm text-brand md:text-base">
                Rate{' '}
                <span className="font-display font-semibold">
                  {exchangeRate} PHP = 1 USDC
                </span>
              </p>
            </div>

            <Disclosure.Button className="text-sm py-2 px-3 rounded-full border border-smooth focus:outline-none focus:ring-offset-2 focus:ring-2 focus:ring-peaceful">
              {!open ? 'View details' : 'Hide details'}
            </Disclosure.Button>
          </div>

          <Transition
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
            className="relatve -z-10"
          >
            <Disclosure.Panel className="space-y-3">
              <ul className="p-4 bg-[#F1F7FC] rounded-2xl space-y-4 md:p-6">
                <DisclosureItem
                  isLoading={isLoading}
                  label="Transaction fee"
                  value={`${transactionFee} PHP`}
                />
                <DisclosureItem
                  isLoading={isLoading}
                  label="Gas/Network fee"
                  value={gasFee === 0 ? 'Waived' : gasFee + ' PHP'}
                />
                <DisclosureItem
                  isLoading={isLoading}
                  label="Total Fees"
                  value={`${totalFees} PHP`}
                />
              </ul>
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
}

export default TxDetailsDisclosure;
