import { useState } from 'react';
import { NextSeo } from 'next-seo';
import Container from '../components/container';
import Layout from '../components/layout';
import PostList from '../components/postList';
import { configQuery, postsQuery } from '../lib/groq';
import { getClient } from '../lib/sanity';
import defaultOG from '../public/img/opengraph.jpg';
import GetImage from '../utils/getImage';
import { loadData } from './api/posts';

const LOAD_MORE_STEP = 8;

export default function Home({ siteConfig, initialPosts, total }) {
  const ogImage = siteConfig?.openGraphImage
    ? GetImage(siteConfig?.openGraphImage).src
    : defaultOG.src;

  const [posts, setPosts] = useState(initialPosts);
  const [loadedAmount, setLoadedAmount] = useState(LOAD_MORE_STEP);
  const [loading, setLoading] = useState(false);

  const showLoadBtn = total > loadedAmount;
  const getMorePosts = async () => {
    setLoading(true);

    try {
      const data = await fetch(
        `/api/posts?start=${loadedAmount}&end=${loadedAmount + LOAD_MORE_STEP}`
      ).then((response) => response.json());
      setLoadedAmount(loadedAmount + LOAD_MORE_STEP);
      setPosts([...posts, ...data.posts]);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
      {posts && siteConfig && (
        <Layout {...siteConfig}>
          <NextSeo
            title={`Acasă | ${siteConfig?.title}`}
            description={siteConfig?.description || ''}
            canonical={siteConfig?.url}
            openGraph={{
              url: siteConfig?.url,
              title: `Acasă | ${siteConfig?.title}`,
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
            {showLoadBtn && (
              <div className='mt-10 flex justify-center'>
                <button
                  className='py-2 px-4 bg-green-700 dark:bg-purple-700 text-white rounded-sm hover:bg-green-800 dark:hover:bg-purple-800 transition-color duration-300 ease-in-out active:bg-green-800 dark:active:bg-purple-800  shadow-sm  shadow-green-700/50 
                  dark:shadow-purple-700/50'
                  onClick={getMorePosts}
                  disabled={loading}
                >
                  {loading ? 'Încărcare...' : 'Încarcă'}
                </button>
              </div>
            )}
          </Container>
        </Layout>
      )}
    </>
  );
}

export async function getStaticProps() {
  const config = await getClient(false).fetch(configQuery);
  const { posts: initialPosts, total } = await loadData(0, LOAD_MORE_STEP);

  return {
    props: {
      siteConfig: { ...config },
      initialPosts,
      total,
    },
  };
}
