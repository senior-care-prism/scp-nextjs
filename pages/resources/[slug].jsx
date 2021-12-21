import Head from 'next/head';

import ResourceEntry from '../../components/ResourceEntry';
import { getResourceEntryBySlug, getAllResourceEntriesWithSlug } from '../../lib/api';
import { RESOURCE_SHAPE } from '../../shared/constants';

export default function Resource({ resource }) {
  const baseDomain = process.env.APP_ENV === 'staging' 
    ? process.env.APP_ENV + ".seniorcareprism.com"
    : "seniorcareprism.com";
  const defaultShareImage = `https://${baseDomain}/images/seniors-in-the-park.jpg`;
  return (
    <>
      <Head>
        <title>Senior Care Prism - Resources</title>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content={resource.title}/>
				<meta property="og:image" content={resource.screenshot ? resource.screenshot.url : defaultShareImage} />
        <meta name="twitter:site" content="@SeniorCarePrism"/>
        <meta name="twitter:creator" content="@SeniorCarePrism"/>
        <meta name="twitter:title" content={resource.title}/>
        <meta name="twitter:description" content={resource.shortDescription}/>
        <meta name="twitter:image" content={resource.screenshot ? resource.screenshot.url : defaultShareImage}/>
      </Head>
      <ResourceEntry resource={resource} />
    </>
  );
}

Resource.propTypes = {
  resource: RESOURCE_SHAPE.isRequired,
};

export async function getServerSidePaths() {
  const resources = await getAllResourceEntriesWithSlug();
  return {
    paths: resources?.map(({ slug }) => ({ params: { slug } })) ?? [],
    fallback: true,
  };
}

export async function getServerSideProps({ params }) {
  const resource = await getResourceEntryBySlug(params.slug);
  return {
    props: {
      resource,
    },
  };
}
