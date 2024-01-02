import { Fragment, ReactNode, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { classNames } from '@/lib';

export interface ListBoxItem {
  label: ReactNode;
  value: string;
  icon?: ReactNode;
}

interface Props {
  list: ListBoxItem[];
  defaultSelected?: ListBoxItem;
  noneSelectedLabel?: string;
  disabled?: boolean;
  onChange?(item: ListBoxItem['value']): void;
}

function ListBox({
  list,
  defaultSelected,
  noneSelectedLabel = 'None',
  disabled,
  onChange,
}: Props) {
  const [selected, setSelected] = useState(defaultSelected);

  return (
    <Listbox
      value={selected}
      onChange={item => {
        setSelected(item);
        onChange && onChange(item.value);
      }}
      disabled={disabled}
    >
      <div className="relative mt-1">
        <Listbox.Button className="relative w-full py-3 pl-3 pr-10 rounded-2xl text-left text-lg bg-white cursor-default disabled:bg-[#F1F7FC] disabled:border-0 focus:outline-none focus:ring-2 focus:ring-peaceful focus:ring-offset-2 md:py-4 border-peaceful border">
          <span className="flex items-center space-x-2 truncate">
            {selected && selected.icon}
            <span>{selected ? selected.label : noneSelectedLabel}</span>
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>

        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute mt-1 max-h-60 space-y-1 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-playful ring-opacity-5 focus:outline-none sm:text-sm">
            {list.map((item, itemIdx) => (
              <Listbox.Option
                key={itemIdx}
                value={item}
                className={({ active }) =>
                  classNames(
                    'relative cursor-default select-none py-2 px-4',
                    active ? 'bg-amber-100 text-smooth' : 'text-gray-900'
                  )
                }
              >
                {({ selected }) => (
                  <span className="flex items-center space-x-2">
                    {item.icon && <span>{item.icon}</span>}
                    <span
                      className={classNames(
                        'truncate',
                        selected ? 'font-medium' : 'font-normal'
                      )}
                    >
                      {item.label}
                    </span>
                  </span>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}

export default ListBox;
