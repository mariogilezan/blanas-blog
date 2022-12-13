import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import Container from '../components/container';
import Layout from '../components/layout';
import PostList from '../components/postList';
import { configQuery, postQuery } from '../lib/groq';
import { getClient } from '../lib/sanity';
import defaultOG from '../public/img/opengraph.jpg';
import GetImage from '../utils/getImage';

export default function Home(props) {
  const { postData: posts, siteConfig, preview } = props;

  const router = useRouter();

  const ogImage = siteConfig?.openGraphImage
    ? GetImage(siteConfig?.openGraphImage).src
    : defaultOG.src;

  return (
    <>
      {posts && siteConfig && (
        <Layout {...siteConfig}>
          <NextSeo
            title={`Home | ${siteConfig?.title}`}
            description={siteConfig?.description || ''}
            canonical={siteConfig?.url}
            openGraph={{
              url: siteConfig?.url,
              title: siteConfig?.title,
              description: siteConfig?.description || '',
              images: [
                {
                  url: ogImage,
                  width: 800,
                  height: 800,
                  alt: '',
                },
              ],
              siteName: "Blana's Blog",
            }}
            twitter={{
              cardType: 'summary_large_image',
            }}
          />
          <Container>
            <div className='grid gap-10 lg:gap-10 md:grid-cols-2'>
              {posts.slice(0, 2).map((post) => (
                <PostList
                  key={post._id}
                  post={post}
                  aspect='landscape'
                  preloadImage={true}
                />
              ))}
            </div>
            <div className='grid gap-10 mt-10 lg:gap-10 md:grid-cols-2 xl:grid-cols-3'>
              {posts.slice(2).map((post) => (
                <PostList key={post._id} post={post} aspect='square' />
              ))}
            </div>
          </Container>
        </Layout>
      )}
    </>
  );
}

export async function getStaticProps({ params, preview = false }) {
  const post = await getClient(preview).fetch(postQuery);
  const config = await getClient(preview).fetch(configQuery);

  return {
    props: {
      postData: post,
      siteConfig: { ...config },
      preview,
    },
    revalidate: 10,
  };
}
