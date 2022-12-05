import Error from 'next/error';
import { useRouter } from 'next/router';
import { configQuery, pathPostQuery, singlePostQuery } from '../../lib/groq';
import client, { getClient, PortableText } from '../../lib/sanity';
import GetImage from '../../utils/getImage';
import defaultOG from '../../public/img/opengraph.jpg';
import Layout from '../../components/layout';
import { NextSeo } from 'next-seo';
import Container from '../../components/container';
import CategoryLabel from '../../components/blog/category';
import Image from 'next/image';
import { format, parseISO } from 'date-fns';
import Link from 'next/link';
import AuthorCard from '../../components/blog/authorCard';

export default function Post(props) {
  const { postData, siteConfig, preview } = props;
  const router = useRouter();
  const { slug } = router.query;
  // TODO: usePreviewSubscription functionality
  // const { data: post } = usePreviewSubscription(singlequery, {
  //   params: { slug: slug },
  //   initialData: postdata,
  //   enabled: preview || router.query.preview !== undefined
  // });

  // const { data: siteConfig } = usePreviewSubscription(configQuery, {
  //   initialData: siteconfig,
  //   enabled: preview || router.query.preview !== undefined
  // });

  if (!router.isFallback && !postData?.slug) {
    return <Error statusCode={404} title='sup' />;
  }

  const imageProps = postData?.mainImage ? GetImage(postData?.mainImage) : null;

  const authorImageProps = postData?.author?.image
    ? GetImage(postData.author.image)
    : null;

  const ogImage = siteConfig?.openGraphImage
    ? GetImage(siteConfig?.openGraphImage).src
    : defaultOG.src;

  return (
    <>
      {postData && siteConfig && (
        <Layout {...siteConfig}>
          <NextSeo
            title={`${postData.title} - ${siteConfig.title}`}
            description={postData.excerpt || ''}
            canonical={`${siteConfig?.url}/post/${postData.slug.current}`}
            openGraph={{
              url: `${siteConfig?.url}/post/${postData.slug.current}`,
              title: `${postData.title} - ${siteConfig.title}`,
              description: postData.excerpt || '',
              images: [
                {
                  url: GetImage(postData?.mainImage).src || ogImage,
                  width: 800,
                  height: 600,
                  alt: '',
                },
              ],
              siteName: siteConfig.title,
            }}
            twitter={{
              cardType: 'summary_large_image',
            }}
          />

          <Container className='!pt-0'>
            <div className='max-w-screen-md mx-auto'>
              <div className='text-center'>
                <CategoryLabel categories={postData.categories} />
              </div>

              <h1 className='mt-2 mb-3 text-3xl font-semibold tracking-tight text-center lg:leading-snug lg:text-4xl dark:text-white'>
                {postData.title}
              </h1>

              <div className='flex justify-center mt-3 space-x-3 text-gray-500'>
                <div className='flex items-center gap-3'>
                  <div className='relative flex-shrink-0 w-10 h-10'>
                    {authorImageProps && (
                      <Image
                        src={authorImageProps.src}
                        loader={authorImageProps.loader}
                        alt={postData?.author?.name}
                        fill={true}
                        className='object-cover rounded-full'
                      />
                    )}
                  </div>
                  <div>
                    <p className='text-gray-800 dark:text-gray-400'>
                      {postData.author.name}
                    </p>
                    <div className='flex items-center space-x-2 text-sm'>
                      <time
                        className='text-gray-500 dark:text-gray-400'
                        dateTime={postData?.publishedAt || postData._createdAt}
                      >
                        {format(
                          parseISO(
                            postData?.publishedAt || postData._createdAt
                          ),
                          'MMMM dd, yyyy'
                        )}
                      </time>
                      <span>· {postData.estReadingTime || '5'} min read</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>

          <div className='relative z-0 max-w-screen-lg mx-auto overflow-hidden lg:rounded-lg aspect-video'>
            {imageProps && (
              <Image
                src={imageProps.src}
                loader={imageProps.loader}
                alt={postData.mainImage?.alt || 'Thumbnail'}
                fill={true}
                priority={true}
                className='object-cover'
              />
            )}
          </div>

          <Container>
            <article className='max-w-screen-md mx-auto'>
              <div className='mx-auto my-3 prose prose-base dark:prose-invert prose-a:text-blue-500'>
                {postData.body && <PortableText value={postData.body} />}
              </div>
              <div className='flex justify-center mt-7 mb-7'>
                <Link
                  href='/'
                  className='px-5 py-2 text-sm text-blue-600 rounded-full dark:text-blue-500'
                >
                  ← View all posts
                </Link>
              </div>
              {postData.author && <AuthorCard author={postData.author} />}
            </article>
          </Container>
        </Layout>
      )}
    </>
  );
}

export async function getStaticProps({ params, preview = false }) {
  const post = await getClient(preview).fetch(singlePostQuery, {
    slug: params.slug,
  });
  const config = await getClient(preview).fetch(configQuery);

  return {
    props: {
      postData: { ...post },
      siteConfig: { ...config },
      preview,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const allPosts = await client.fetch(pathPostQuery);

  return {
    paths:
      allPosts?.map((page) => ({
        params: {
          slug: page.slug,
        },
      })) || [],
    fallback: true,
  };
}
