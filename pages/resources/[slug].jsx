import Head from 'next/head';

import Resource from '../../components/Resource';
import { getResourceEntryBySlug, getAllResourceEntriesWithSlug } from '../../lib/api';
import { RESOURCE_SHAPE } from '../../shared/constants';

export default function Resource({ resource }) {
  return (
    <>
      <Head>
        <title>Senior Care Prism - Resources</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Resource resource={resource} />
    </>
  );
}

Resource.propTypes = {
  resource: RESOURCE_SHAPE.isRequired,
};

export async function getStaticPaths() {
  const resources = await getAllResourceEntriesWithSlug();
  return {
    paths: resources?.map(({ slug }) => ({ params: { slug } })) ?? [],
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const resource = await getResourceEntryBySlug(params.slug);
  return {
    props: {
      resource,
    },
  };
}
