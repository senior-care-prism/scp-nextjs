import Head from 'next/head';

import NewsArticle from '../../components/NewsArticle';
import { getNewsEntryBySlug, getAllNewsEntriesWithSlug } from '../../lib/api';
import { ARTICLE_SHAPE } from '../../shared/constants';

export default function News({ article }) {
  const baseDomain = process.env.APP_ENV === 'staging' 
    ? process.env.APP_ENV + ".seniorcareprism.com"
    : "seniorcareprism.com";
  const defaultShareImage = `https://${baseDomain}/images/seniors-in-the-park.jpg`;
  return (
    <>
      <Head>
        <title>Senior Care Prism - News</title>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content={article.headline}/>
				<meta property="og:image" content={article.featuredImage ? article.featuredImage.url : defaultShareImage} />
        <meta name="twitter:site" content="@SeniorCarePrism"/>
        <meta name="twitter:creator" content="@SeniorCarePrism"/>
        <meta name="twitter:title" content={article.headline}/>
        <meta name="twitter:description" content={article.excerpt}/>
        <meta name="twitter:image" content={article.featuredImage ? article.featuredImage.url : defaultShareImage}/>
      </Head>
      <NewsArticle article={article} />
    </>
  );
}

News.propTypes = {
  article: ARTICLE_SHAPE.isRequired,
};

export async function getStaticPaths() {
  const articles = await getAllNewsEntriesWithSlug();
  return {
    paths: articles?.map(({ slug }) => ({ params: { slug } })) ?? [],
    fallback: true
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
