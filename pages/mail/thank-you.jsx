

import Head from "next/head";
import ThankYou from '../../components/ThankYou';

export default function Resources() {
  return (
    <>
      <Head>
        <title>Subscription Successful | Senior Care Prism</title>
        <meta name="robots" content="noindex"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThankYou/>
    </>
  );
};