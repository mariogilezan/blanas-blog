import React from 'react';
import Head from 'next/head';
import { NextSeo } from 'next-seo';
import GetImage from '../utils/getImage';
import Navbar from './navbar';
import Footer from './footer';

export default function Layout(props) {
  const ogImage = GetImage(props?.openGraphImage)?.src ?? '';
  return (
    <>
      <Head>
        <link rel='preconnect' href='https://cdn.sanity.io/' />
        <link rel='dns-prefetch' href='https://cdn.sanity.io/' />
      </Head>
      <NextSeo
        title={props.title}
        description={props.description}
        canonical={props.url}
        openGraph={{
          url: props.url,
          title: props.title,
          description: props.description,
          images: [
            {
              url: ogImage,
              width: 800,
              height: 800,
              alt: props.title,
            },
          ],
          site_name: props.title,
        }}
        twitter={{
          handle: '@mario_zan93',
          site: '@mario_zan93',
          cardType: 'summary_large_image',
        }}
      />

      <div className='antialiased text-gray-800 dark:bg-black dark:text-gray-400'>
        <Navbar {...props} />
        <div>{props.children}</div>
        <Footer {...props} />
      </div>
    </>
  );
}
