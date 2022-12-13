import React from 'react';
import { Disclosure } from '@headlessui/react';
import Image from 'next/image';
import Link from 'next/link';
import GetImage from '../utils/getImage';
import Container from './container';

export default function Navbar(props) {
  const menu = [
    {
      label: 'Home',
      href: '/',
    },
    {
      label: 'About',
      href: '/about',
    },
    {
      label: 'Contact',
      href: '/contact',
    },
  ];

  return (
    <Container>
      <nav>
        <Disclosure>
          {({ open }) => (
            <>
              <div className='flex flex-wrap justify-between md:gap-10 md:flex-nowrap'>
                {/* Logo & Mobile Menu Button */}
                <div className='flex items-center justify-between w-full md:w-auto'>
                  <Link href='/' className='hidden dark:block'>
                    {props.logo ? (
                      <Image
                        {...GetImage(props.logo)}
                        alt={props.logo.alt}
                        sizes='(max-width: 640px) 100vw, 200px'
                        priority={true}
                      />
                    ) : (
                      <span className='font-bold text-2xl'>
                        Blana&apos;s Blog
                      </span>
                    )}
                  </Link>
                  <Link href='/' className='dark:hidden'>
                    {props.logoalt ? (
                      <Image
                        {...GetImage(props.logoalt)}
                        alt={props.logoalt.alt}
                        sizes='(max-width: 640px) 100vw, 200px'
                        priority={true}
                      />
                    ) : (
                      <span className='font-bold text-2xl'>
                        Blana&apos;s Blog
                      </span>
                    )}
                  </Link>

                  <Disclosure.Button
                    aria-label='Toggle Menu'
                    className='py-1 ml-auto text-gray-500 rounded-md md:hidden focus:outline-none dark:text-gray-300'
                  >
                    <svg
                      className='w-6 h-6 fill-current'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                    >
                      {open && (
                        <path
                          fillRule='evenodd'
                          clipRule='evenodd'
                          d='M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z'
                        />
                      )}
                      {!open && (
                        <path
                          fillRule='evenodd'
                          d='M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z'
                        />
                      )}
                    </svg>
                  </Disclosure.Button>
                </div>
                {/* Logo & Mobile Button End */}
                {/* Navigation Links */}
                <div className='flex-col items-center justify-start order-1 hidden w-full md:flex md:flex-row md:justify-end md:w-auto md:order-none md:flex-1'>
                  {menu.map((item) => (
                    <Link
                      href={item.href}
                      key={item.label}
                      className='px-5 py-2 last:pr-0 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-green-500 dark:hover:text-purple-800 transition-colors duration-300 ease-in-out'
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
                {/* Navigation Links End */}
              </div>
              {/* Mobile Navigation Links */}
              <Disclosure.Panel>
                <div className='flex flex-col items-end sm:items-center justify-start order-2 w-full md:hidden pt-10'>
                  {menu.map((item) => (
                    <Link
                      href={item.href}
                      key={`Mobile Menu ${item.label}`}
                      className='py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-green-500 dark:hover:text-purple-800 transition-colors duration-300 ease-in-out'
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </Disclosure.Panel>
              {/* Mobile Navigation Links End */}
            </>
          )}
        </Disclosure>
      </nav>
    </Container>
  );
}
