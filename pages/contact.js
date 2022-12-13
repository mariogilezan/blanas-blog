// import Link from 'next/link';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import useWeb3forms from 'use-web3forms';
import Container from '../components/container';
import Layout from '../components/layout';
import { configQuery } from '../lib/groq';
import { getClient } from '../lib/sanity';
import {
  MapPinIcon,
  EnvelopeIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline';
import { NextSeo } from 'next-seo';
import defaultOG from '../public/img/opengraph.jpg';
import GetImage from '../utils/getImage';

export default function Contact({ siteConfig }) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    setValue,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm({
    mode: 'onTouched',
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState(false);
  const apiKey = siteConfig?.w3ckey || 'your_access_key_here';

  const { submit: onSubmit } = useWeb3forms({
    apikey: apiKey,
    from_name: 'Next Blog Template',
    subject: 'New Contact Message from Next Blog Website',
    onSuccess: (msg, data) => {
      setIsSuccess(true);
      setMessage(msg);
      reset();
    },
    onError: (msg, data) => {
      setIsSuccess(false);
      setMessage(msg);
    },
  });

  const ogImage = siteConfig?.openGraphImage
    ? GetImage(siteConfig?.openGraphImage).src
    : defaultOG.src;

  return (
    <Layout {...siteConfig}>
      <NextSeo
        title={`Contact | ${siteConfig?.title}`}
        description={siteConfig?.description || ''}
        canonical={`${siteConfig?.url}/contact/`}
        openGraph={{
          url: `${siteConfig?.url}/contact/`,
          title: `Contact | ${siteConfig?.title}`,
          description: siteConfig?.description || '',
          images: [
            {
              url: ogImage,
              width: 800,
              height: 800,
              alt: '',
            },
          ],
          siteName: siteConfig.title || "Blana's Blog",
        }}
        twitter={{
          cardType: 'summary_large_image',
        }}
      />
      <Container>
        <h1 className='mt-2 mb-3 text-3xl font-semibold tracking-tight text-center lg:leading-snug lg:text-4xl dark:text-white'>
          Contact
        </h1>
        <div className='text-center'>
          <p className='text-lg'>I am here to help.</p>
        </div>

        <div className='grid my-10 md:grid-cols-2'>
          <div className='my-10'>
            <h2 className='text-2xl font-semibold dark:text-white'>
              Contact Me
            </h2>
            <p className='max-w-sm mt-5'>
              Have something to say? I am here to help. Fill up the form or send
              email or call phone.
            </p>

            <div className='mt-5'>
              <div className='flex items-center mt-2 space-x-2 dark:text-gray-400'>
                <MapPinIcon className='w-4 h-4' />
                <span>1054 New York, NY 93301</span>
              </div>
              {siteConfig?.email && (
                <div className='flex items-center mt-2 space-x-2 dark:text-gray-400'>
                  <EnvelopeIcon className='w-4 h-4' />
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className='hover:text-green-500 dark:hover:text-purple-800 transition-colors duration-300 ease-in-out'
                  >
                    {siteConfig.email}
                  </a>
                </div>
              )}
              {siteConfig?.phone && (
                <div className='flex items-center mt-2 space-x-2 dark:text-gray-400'>
                  <PhoneIcon className='w-4 h-4' />
                  <a
                    href={`tel:${siteConfig.phone}`}
                    className='hover:text-green-500 dark:hover:text-purple-800 transition-colors duration-300 ease-in-out'
                  >
                    {siteConfig.phone}
                  </a>
                </div>
              )}
            </div>
          </div>
          <div>
            <form onSubmit={handleSubmit(onSubmit)} className='my-10'>
              <input
                type='checkbox'
                id=''
                className='hidden'
                style={{ display: 'none' }}
                {...register('botcheck')}
              />

              <div className='mb-5'>
                <input
                  type='text'
                  placeholder='Full Name'
                  autoComplete='false'
                  className={`w-full px-4 py-3 border-2 placeholder:text-gray-800 dark:text-white rounded-md outline-none dark:placeholder:text-gray-200 dark:bg-gray-900 focus:ring-4 ${
                    errors.name
                      ? 'border-red-600 focus:border-red-600 ring-red-100 dark:ring-0'
                      : 'border-gray-300 focus:border-gray-600 ring-gray-100 dark:border-gray-600 dark:focus:border-white dark:ring-0'
                  }`}
                  {...register('name', {
                    required: 'Full name is required',
                    maxLength: 80,
                  })}
                />
                {errors.name && (
                  <div className='mt-1 text-red-600'>
                    <small>{errors.name.message}</small>
                  </div>
                )}
              </div>

              <div className='mb-5'>
                <label htmlFor='email_address' className='sr-only'>
                  Email Address
                </label>
                <input
                  id='email_address'
                  type='email'
                  placeholder='Email Address'
                  name='email'
                  autoComplete='false'
                  className={`w-full px-4 py-3 border-2 placeholder:text-gray-800 dark:text-white rounded-md outline-none dark:placeholder:text-gray-200 dark:bg-gray-900 focus:ring-4 ${
                    errors.email
                      ? 'border-red-600 focus:border-red-600 ring-red-100 dark:ring-0'
                      : 'border-gray-300 focus:border-gray-600 ring-gray-100 dark:border-gray-600 dark:focus:border-white dark:ring-0'
                  }`}
                  {...register('email', {
                    required: 'Enter your email',
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: 'Please enter a valid email',
                    },
                  })}
                />
                {errors.email && (
                  <div className='mt-1 text-red-600'>
                    <small>{errors.email.message}</small>
                  </div>
                )}
              </div>

              <div className='mb-3'>
                <textarea
                  name='message'
                  placeholder='Your Message'
                  className={`w-full px-4 py-3 border-2 placeholder:text-gray-800 dark:text-white dark:placeholder:text-gray-200 dark:bg-gray-900 rounded-md outline-none h-36 focus:ring-4 ${
                    errors.message
                      ? 'border-red-600 focus:border-red-600 ring-red-100 dark:ring-0'
                      : 'border-gray-300 focus:border-gray-600 ring-gray-100 dark:border-gray-600 dark:focus:border-white dark:ring-0'
                  }`}
                  {...register('message', {
                    required: 'Enter your Message',
                  })}
                />
                {errors.message && (
                  <div className='mt-1 text-red-600'>
                    <small>{errors.message.message}</small>
                  </div>
                )}
              </div>

              <button
                type='submit'
                className='w-full py-4 font-semibold text-white transition-colors bg-gray-900 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-offset-2 focus:ring focus:ring-gray-200 px-7 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100'
              >
                {isSubmitting ? (
                  <svg
                    className='w-5 h-5 mx-auto text-white dark:text-black animate-spin'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                  >
                    <circle
                      className='opacity-25'
                      cx='12'
                      cy='12'
                      r='10'
                      stroke='currentColor'
                      strokeWidth='4'
                    ></circle>
                    <path
                      className='opacity-75'
                      fill='currentColor'
                      d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                    />
                  </svg>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>

            {isSubmitSuccessful && isSuccess && (
              <div className='mt-3 text-sm text-center text-green-500'>
                {message || 'Success. Message sent successfully'}
              </div>
            )}
            {isSubmitSuccessful && !isSuccess && (
              <div className='mt-3 text-sm text-center text-red-500'>
                {message || 'Something went wrong. Please try later.'}
              </div>
            )}
          </div>
        </div>
      </Container>
    </Layout>
  );
}

export async function getStaticProps({ params, preview = false }) {
  const config = await getClient(preview).fetch(configQuery);

  return {
    props: {
      siteConfig: { ...config },
      preview,
    },
    revalidate: 100,
  };
}
