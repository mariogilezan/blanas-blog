import { getClient } from '../lib/sanity';
import { authorsQuery, configQuery } from '../lib/groq';
import Layout from '../components/layout';
import Container from '../components/container';
import GetImage from '../utils/getImage';
import Image from 'next/image';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import defaultOG from '../public/img/opengraph.jpg';

export default function About({ authors, siteConfig }) {
  const ogImage = siteConfig?.openGraphImage
    ? GetImage(siteConfig?.openGraphImage).src
    : defaultOG.src;

  return (
    <Layout {...siteConfig}>
      <NextSeo
        title={`About | ${siteConfig?.title}`}
        description={siteConfig?.description || ''}
        canonical={`${siteConfig?.url}/about/`}
        openGraph={{
          url: `${siteConfig?.url}/about/`,
          title: `About | ${siteConfig?.title}`,
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
          About
        </h1>
        <div className='text-center'>
          <p className='text-lg'>More about what I do.</p>
        </div>

        <div className='grid grid-cols-3 gap-5 mt-6 mb-16 md:mt-16 md:gap-16'>
          {authors.slice(0, 3).map((author) => {
            const { width, height, ...imgProps } = GetImage(author?.image);
            return (
              <div
                key={author._id}
                className='relative overflow-hidden rounded-md aspect-square col-start-2'
              >
                <Image
                  {...imgProps}
                  width={width}
                  height={height}
                  alt={author.name || ' '}
                  priority={true}
                  sizes='(max-width: 320px) 100vw, 320px'
                  className='object-cover'
                />
              </div>
            );
          })}
        </div>

        <div className='mx-auto prose text-center dark:prose-invert mt-14'>
          <p>
            We provide real-time connectivity to enable software providers and
            financial institutions to build integrated products for their small
            business customers.
          </p>
          <p>
            Our API infrastructure is leveraged by clients ranging from lenders
            to corporate card providers and business forecasting tools, with use
            cases including automatic reconciliation, business dashboarding, and
            loan decisioning.
          </p>
          <p>
            <Link
              href='/contact'
              className='hover:text-green-500 dark:hover:text-purple-800 transition-colors duration-300 ease-in-out'
            >
              Get in touch
            </Link>
          </p>
        </div>
      </Container>
    </Layout>
  );
}

export async function getStaticProps({ params, preview = false }) {
  const authors = await getClient(preview).fetch(authorsQuery);
  const config = await getClient(preview).fetch(configQuery);

  return {
    props: {
      authors,
      siteConfig: { ...config },
      preview,
    },
    revalidate: 100,
  };
}
