import { ReactNode } from 'react';
import { Disclosure, Transition } from '@headlessui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

import Card from './Card';

interface Props {
  title: string;
  content: ReactNode;
}

function DisclosureCard({ title, content }: Props) {
  return (
    <Disclosure as={Card}>
      {({ open }) => (
        <>
          <Disclosure.Button className="space-x-1 py-2 w-full flex items-start justify-between">
            <span className="text-left font-display font-semibold md:text-xl">
              {title}
            </span>
            {open ? (
              <ChevronUpIcon
                className="shrink-0 ml-auto w-4 h-4 text-brand sm:w-5 sm:h-5 md:w-6 md:h-6"
                aria-hidden="true"
                strokeWidth={3}
              />
            ) : (
              <ChevronDownIcon
                className="shrink-0 ml-auto w-4 h-4 text-brand sm:w-5 sm:h-5 md:w-6 md:h-6"
                aria-hidden="true"
                strokeWidth={3}
              />
            )}
          </Disclosure.Button>
          <Transition
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Disclosure.Panel className="w-11/12 text-sm font-display text-smooth md:w-3/4 md:text-base lg:w-2/3 lg:text-lg">
              {content}
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
}

export default DisclosureCard;
