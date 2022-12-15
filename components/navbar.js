import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import GetImage from '../utils/getImage';
import Container from './container';
import { Bars2Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { navLinks } from './ui/navLinks';

export default function Navbar(props) {
  const [open, setOpen] = useState(false);
  const toggleMenu = () => setOpen(!open);

  return (
    <Container>
      <nav>
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
                  <span className='font-bold text-2xl'>Blana&apos;s Blog</span>
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
                  <span className='font-bold text-2xl'>Blana&apos;s Blog</span>
                )}
              </Link>

              <button
                type='button'
                aria-label='Toggle Menu'
                onClick={toggleMenu}
                className='ml-auto rounded-md md:hidden focus:outline-none dark:text-gray-100 hover:text-green-500 dark:hover:text-purple-600 transition-colors duration-300 ease-in-out active:text-green-700 dark:active:text-purple-800'
              >
                {open ? (
                  <XMarkIcon className='w-7 h-7' />
                ) : (
                  <Bars2Icon className='w-7 h-7' />
                )}
              </button>
            </div>
            {/* Logo & Mobile Button End */}
            {/* Navigation Links */}
            <div className='flex-col items-center justify-start order-1 hidden w-full md:flex md:flex-row md:justify-end md:w-auto md:order-none md:flex-1'>
              {navLinks.map((item) => (
                <Link
                  href={item.href}
                  key={item.label}
                  className='nav-link px-5 py-2 last:pr-0 text-sm font-medium'
                >
                  {item.label}
                </Link>
              ))}
            </div>
            {/* Navigation Links End */}
          </div>
          {/* Mobile Navigation Links */}
          <div
            className={`${
              open ? 'flex' : 'hidden'
            } mt-2 flex flex-col items-end sm:items-center justify-start order-2 w-full md:hidden p-10 bg-gray-50 dark:bg-gray-900 rounded`}
            onClick={() => setOpen(false)}
          >
            {navLinks.map((item) => (
              <Link
                href={item.href}
                key={`Mobile Menu ${item.label}`}
                className='nav-link py-2 my-2 text-sm font-medium'
              >
                {item.label}
              </Link>
            ))}
          </div>
          {/* Mobile Navigation Links End */}
        </>
      </nav>
    </Container>
  );
}
