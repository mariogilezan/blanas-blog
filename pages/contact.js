import { useState } from 'react';
import { useForm } from 'react-hook-form';
import useWeb3forms from 'use-web3forms';
import Container from '../components/container';
import Layout from '../components/layout';
import { configQuery } from '../lib/groq';
import { getClient } from '../lib/sanity';
import { EnvelopeIcon } from '@heroicons/react/24/solid';
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
  const fbData =
    siteConfig.social.find((link) => link.media === 'facebook') ||
    'https://www.facebook.com/';
  const igData =
    siteConfig.social.find((link) => link.media === 'instagram') ||
    'https://www.instagram.com/';

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

        <div className='grid my-10 md:grid-cols-2'>
          <div className='my-10'>
            <h2 className='text-2xl font-semibold dark:text-white'>
              Contactează-mă
            </h2>
            <p className='max-w-sm mt-5'>
              Pentru colaborări s-au dacă aveți propuneri, scrieți pe adresa de
              e-mail ori mă puteți găsi pe rețelele de socializare de mai jos.
              Alternativ, puteți completa formularul.
            </p>

            {/* Email and Socials */}
            <div className='flex flex-col gap-5 mt-5'>
              {siteConfig?.email && (
                <div className='flex items-center space-x-2 dark:text-gray-400'>
                  <EnvelopeIcon className='w-4 h-4' />
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className='hover:text-green-500 dark:hover:text-purple-600
                    transition-colors duration-300 ease-in-out font-semibold'
                  >
                    {siteConfig.email}
                  </a>
                </div>
              )}

              {/* Social Links */}
              <div className='flex items-center gap-3'>
                <a
                  href={fbData.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='social-link'
                  style={{ backgroundColor: '#1877f2' }}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 320 512'
                    className='w-4 h-4'
                  >
                    <path
                      fill='currentColor'
                      d='M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z'
                    />
                  </svg>
                </a>
                <a
                  href={igData.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='social-link'
                  style={{ backgroundColor: '#c13584' }}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 448 512'
                    className='w-4 h-4'
                  >
                    <path
                      fill='currentColor'
                      d='M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z'
                    />
                  </svg>
                </a>
              </div>
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
                  placeholder='Nume'
                  autoComplete='false'
                  className={`w-full px-4 py-3 border-2 placeholder:text-gray-800 dark:text-white rounded-md outline-none dark:placeholder:text-gray-200 dark:bg-gray-900 focus:ring-4 ${
                    errors.name
                      ? 'border-red-600 focus:border-red-600 ring-red-100 dark:ring-0'
                      : 'border-gray-300 focus:border-gray-600 ring-gray-100 dark:border-gray-600 dark:focus:border-white dark:ring-0'
                  }`}
                  {...register('name', {
                    required: 'Numele este obligatoriu',
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
                  Email
                </label>
                <input
                  id='email_address'
                  type='email'
                  placeholder='Email'
                  name='email'
                  autoComplete='false'
                  className={`w-full px-4 py-3 border-2 placeholder:text-gray-800 dark:text-white rounded-md outline-none dark:placeholder:text-gray-200 dark:bg-gray-900 focus:ring-4 ${
                    errors.email
                      ? 'border-red-600 focus:border-red-600 ring-red-100 dark:ring-0'
                      : 'border-gray-300 focus:border-gray-600 ring-gray-100 dark:border-gray-600 dark:focus:border-white dark:ring-0'
                  }`}
                  {...register('email', {
                    required: 'Introduceți adresa de email',
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message:
                        'Vă rugăm să introduceți o adresă de email validă',
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
                  placeholder='Mesajul'
                  className={`w-full px-4 py-3 border-2 placeholder:text-gray-800 dark:text-white dark:placeholder:text-gray-200 dark:bg-gray-900 rounded-md outline-none h-36 focus:ring-4 ${
                    errors.message
                      ? 'border-red-600 focus:border-red-600 ring-red-100 dark:ring-0'
                      : 'border-gray-300 focus:border-gray-600 ring-gray-100 dark:border-gray-600 dark:focus:border-white dark:ring-0'
                  }`}
                  {...register('message', {
                    required: 'Introduceți mesajul',
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
                  'Trimite'
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
