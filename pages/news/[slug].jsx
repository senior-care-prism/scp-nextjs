import Head from 'next/head';

import Layout from '../../components/Layout';
import NewsArticle from '../../components/NewsArticle';
import { getNewsEntryBySlug, getAllNewsEntriesWithSlug } from '../../lib/api';

export default function News({ article }) {
  // console.log('slug.js', article);
  return (
    <Layout>
      <Head>
        <title>Senior Care Prism - News</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <NewsArticle article={article} /> */}
    </Layout>
  );
}

// export async function getStaticProps({ params }) {
//   const article = await getNewsEntryBySlug(params.slug);
//   return {
//     props: {
//       article,
//     },
//   };
// }

// export async function getStaticPaths() {
//   const articles = await getAllNewsEntriesWithSlug();
//   return {
//     paths: [], //articles?.map(({ slug }) => `/news/${slug}`) ?? [],
//     fallback: true // or false // See the "fallback" section below
//   };
// }
