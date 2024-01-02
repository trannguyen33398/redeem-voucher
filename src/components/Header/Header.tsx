import Link from 'next/link';
import Image from 'next/future/image';
import { useRouter } from 'next/router';
import { XMarkIcon } from '@heroicons/react/24/outline';

import { Disclosure, Transition } from '@headlessui/react';
import { classNames } from '@/lib';

import frame from '@/images/frame.svg';
import logo from '@/images/logo.svg';
import box1 from '@/images/box-1.png';

const navigation = [
  { name: 'FAQs', href: '/faqs' },
  { name: 'Contact us', href: '/contact' },
];

function Header() {
  const { pathname } = useRouter();

  const isCurrentPath = (href: string) => pathname === href;

  return (
    <Disclosure as="nav">
      {({ open }) => (
        <>
          <div className="relative mx-auto max-w-8xl pt-4 px-4 sm:px-6 lg:px-8">
            {/* Pink shape */}
            <div
              className="absolute -z-10 -top-28 left-1/2 -translate-x-1/2 blur sm:-top-40 md:-top-44"
              aria-hidden="true"
            >
              <div className="w-52 md:w-96">
                <Image
                  src={box1}
                  alt="pink shaped box"
                  placeholder="blur"
                  priority
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </div>
            </div>

            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {/* TODO(karim): update with icons */}
                  {open ? (
                    <XMarkIcon
                      className="block w-6 h-6 text-smooth"
                      aria-hidden="true"
                    />
                  ) : (
                    <Image
                      src="/icons/menu.svg"
                      width={24}
                      height={24}
                      className="block w-6 h-6 text-smooth"
                      aria-hidden="true"
                      alt="menu"
                    />
                  )}
                </Disclosure.Button>
              </div>

              <div className="flex flex-1 items-center justify-between sm:items-stretch">
                <div className="flex flex-shrink-0 items-center">
                  <Link href="/" passHref>
                    <a>
                      <div className="block h-8 w-auto sm:hidden">
                        <Image src={frame} alt="GetX" priority />
                      </div>
                      <div className="hidden h-8 w-auto sm:block">
                        <Image src={logo} alt="GetX" priority />
                      </div>
                    </a>
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map(item => (
                      <Link key={item.name} href={item.href} passHref>
                        <a
                          className={classNames(
                            isCurrentPath(item.href)
                              ? 'text-smooth'
                              : 'text-gray-600',
                            'px-3 py-2 rounded-md text-lg font-medium font-display'
                          )}
                          aria-current={
                            isCurrentPath(item.href) ? 'page' : undefined
                          }
                        >
                          {item.name}
                        </a>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Transition
            show={open}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Disclosure.Panel static className="bg-white sm:hidden">
              <div className="space-y-1 px-2 pt-2 pb-3">
                <Link
                  href="/"
                  passHref
                  aria-current={isCurrentPath('/') ? 'page' : undefined}
                >
                  <Disclosure.Button
                    className={classNames(
                      isCurrentPath('/')
                        ? 'bg-gray-900 text-white'
                        : 'text-smooth',
                      'block px-3 py-2 rounded-md text-base font-medium'
                    )}
                    as="a"
                  >
                    Home
                  </Disclosure.Button>
                </Link>

                {navigation.map(item => (
                  <Link
                    key={item.name}
                    href={item.href}
                    passHref
                    aria-current={isCurrentPath(item.href) ? 'page' : undefined}
                  >
                    <Disclosure.Button
                      as="a"
                      className={classNames(
                        isCurrentPath(item.href)
                          ? 'bg-gray-900 text-white'
                          : 'text-smooth',
                        'block px-3 py-2 rounded-md text-base font-display font-medium'
                      )}
                    >
                      {item.name}
                    </Disclosure.Button>
                  </Link>
                ))}
              </div>
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
}

export default Header;
