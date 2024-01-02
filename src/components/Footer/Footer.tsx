import Image from 'next/future/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { classNames } from '@/lib';
import logo from '@/images/logo.svg';

const navigation = [
  { name: 'FAQs', href: '/faqs' },
  { name: 'Contact us', href: '/contact' },
];

function Footer() {
  const { pathname } = useRouter();

  const isCurrentPath = (href: string) => pathname === href;

  return (
    <footer className="bg-skyblue py-10 px-8">
      <div className="mx-auto max-w-8xl">
        <nav className="flex items-start justify-between">
          <Link href="/" passHref>
            <a className="block h-8 w-24 md:w-28">
              <Image src={logo} alt="GetX" />
            </a>
          </Link>

          <ul className="space-y-2 text-right md:flex md:space-y-0 md:space-x-20">
            {navigation.map(n => (
              <li
                className={classNames(
                  isCurrentPath(n.href) ? 'underline' : '',
                  'font-display md:text-lg'
                )}
                key={n.name}
              >
                <Link href={n.href}>{n.name}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
