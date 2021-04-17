import Head from 'next/head';

import Layout from '../../components/Layout';
import NewsArticle from '../../components/NewsArticle';
import { getNewsEntryBySlug, getAllNewsEntriesWithSlug } from '../../lib/api';
import { ARTICLE_SHAPE } from '../../shared/constants';

export default function News({ article }) {
  return (
    <Layout>
      <Head>
        <title>Senior Care Prism - News</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NewsArticle article={article} />
    </Layout>
  );
}

News.propTypes = {
  article: ARTICLE_SHAPE.isRequired,
};

export async function getStaticPaths() {
  const articles = await getAllNewsEntriesWithSlug();
  return {
    paths: articles?.map(({ slug }) => ({ params: { slug } })) ?? [],
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const article = await getNewsEntryBySlug(params.slug);
  return {
    props: {
      article,
    },
  };
}
