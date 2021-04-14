const CONTENTFUL_GRAPHQL_FIELDS = `
contentfulMetadata {
  tags {
    name
  }
}
sys {
  id
}
`;

const NEWS_LISTING_GRAPHQL_FIELDS = `
${CONTENTFUL_GRAPHQL_FIELDS}
headline
slug
publishedDate
excerpt
`;

const NEWS_ENTRY_GRAPHQL_FIELDS = `
${CONTENTFUL_GRAPHQL_FIELDS}
headline
slug
publishedDate
author {
  name
  photo {
    url
  }
}
attributeOriginalAuthor
originalAuthor
tags
content
relatedArticlesCollection {
  items {
    headline
    publishedDate
    slug
  }
}
`;

async function fetchGraphQL(query) {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({ query }),
    },
  ).then((response) => response.json());
}

function extractContentfulMetadata(entity) {
  const result = {};
  result.id = entity.sys?.id;
  result.tags = entity.contentfulMetadata?.tags;
  const allowedKeys = Object.keys(entity).filter((key) => !['sys', 'contentfulMetadata'].includes(key));
  allowedKeys.forEach((key) => {
    result[key] = entity[key];
  });
  return result;
}

function extractNewsEntry(fetchResponse) {
  return extractContentfulMetadata(fetchResponse?.data?.newsCollection?.items?.[0]);
}

function extractNewsEntries(fetchResponse) {
  return fetchResponse?.data?.newsCollection?.items.map(item => extractContentfulMetadata(item));
}

export async function getNewsEntries({ pageNum = 1, limit = 8 } = {}) {
  const offset = (pageNum - 1) * limit;
  const entry = await fetchGraphQL(
    `query {
      newsCollection(skip: ${offset},limit: ${limit}, order: publishedDate_DESC) {
        items {
          ${NEWS_LISTING_GRAPHQL_FIELDS}
        }
      }
    }`,
  );
  return extractNewsEntries(entry);
}

export async function getNewsMaxPage({ limitPerPage = 8 } = {}) {
  const res = await fetchGraphQL(
    `query {
      newsCollection(where: { slug_exists: true }) {
        total
      }
    }`,
  );
  return Math.ceil(res?.data?.newsCollection?.total / limitPerPage);
}

export async function getAllNewsEntriesWithSlug() {
  const entries = await fetchGraphQL(
    `query {
      newsCollection(where: { slug_exists: true }, order: publishedDate_DESC) {
        items {
          ${CONTENTFUL_GRAPHQL_FIELDS}
          slug
        }
      }
    }`,
  );
  return extractNewsEntries(entries);
}

export async function getNewsEntryBySlug(slug) {
  const entries = await fetchGraphQL(
    `query {
      newsCollection(where: { slug: "${slug}" }) {
        items {
          ${NEWS_ENTRY_GRAPHQL_FIELDS}
        }
      }
    }`,
  );
  return extractNewsEntry(entries);
}
