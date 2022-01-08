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
featuredImage {
  url
}
aspectRatio
content
relatedArticlesCollection {
  items {
    headline
    publishedDate
    slug
  }
}
`;

const RESOURCE_LISTING_GRAPHQL_FIELDS = `
sys {
  id
}
title
slug
publishedDate
shortDescription
subject
category
`;

const RESOURCE_GRAPHQL_FIELDS = `
sys {
  id
}
title
slug
shortDescription
description
screenshot {
  url
}
downloadable {
  url
}
subject
category
publishedDate
`;

const TEAM_MEMBER_GRAPHQL_FIELDS = `
id
name
pronouns
position
bio
photo {
  url
}
`;

const QUOTE_GRAPHQL_FIELDS = `
id
byline
text
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

function extractResourcesContentfulMetadata(entity) {
  const result = {};
  result.id = entity.sys?.id;
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
  return fetchResponse?.data?.newsCollection?.items.map((item) => extractContentfulMetadata(item));
}

export async function getNewsEntries({ pageNum = 1, limit = 6, search = '' } = {}) {
  const offset = (pageNum - 1) * limit;
  const searchFilter = search !== ''
    ? `where: { OR: [ 
      { headline_contains: "${search}" },
      { content_contains: "${search}" } ]}, `
    : '';
  const entry = await fetchGraphQL(
    `query {
      newsCollection(${searchFilter}skip: ${offset},limit: ${limit}, order: publishedDate_DESC) {
        items {
          ${NEWS_LISTING_GRAPHQL_FIELDS}
        }
      }
    }`,
  );
  return extractNewsEntries(entry);
}

export async function getNewsMaxPage({ limitPerPage = 6, search } = {}) {
  const searchFilter = search !== ''
    ? `where: { 
      AND: [
        {
          OR: [
            { headline_contains: "${search}" }, 
            { content_contains: "${search}" }
          ]
        },
        { slug_exists: true }
      ]
    }`
    : 'where: { slug_exists: true }';

  const res = await fetchGraphQL(
    `query {
      newsCollection(${searchFilter}) {
        total
      }
    }`,
  );
  const totalEntries = res?.data?.newsCollection?.total;
  return totalEntries ? { total: totalEntries, maxPage: Math.ceil(totalEntries / limitPerPage) } : 0;
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

function extractResourceEntry(fetchResponse) {
  return extractResourcesContentfulMetadata(fetchResponse?.data?.resourceCollection?.items?.[0]);
}

function extractResourceEntries(fetchResponse) {
  return fetchResponse?.data?.resourceCollection?.items.map((item) => extractResourcesContentfulMetadata(item));
}

export async function getResourceEntries({ pageNum = 1, limit = 6, category = '', subject = '', searchTerm = '' } = {}) {
  const offset = (pageNum - 1) * limit;
  const selectedSubjects = subject.split(',');
  const selectedCategories = category.split(',');
  const categoryFilter = category === '' ? '' : `{ category_contains_some: ${JSON.stringify(selectedCategories)} }`;
  const subjectFilter = subject === '' ? '' : `{subject_contains_some: ${JSON.stringify(selectedSubjects)} }`;
  const searchTermFilter = searchTerm === '' ? '' : `{ OR: [ 
                                                          { title_contains: "${searchTerm}" },
                                                          { shortDescription_contains: "${searchTerm}" },
                                                          { description_contains: "${searchTerm}" } 
                                                        ]
                                                      }`;
  const searchFilter = `where: { AND: [
      ${searchTermFilter}, 
      ${subjectFilter},
      ${categoryFilter}
    ]},`;
  const query = `query {
    resourceCollection(${searchFilter}skip: ${offset},limit: ${limit}, order: publishedDate_DESC) {
      items {
        ${RESOURCE_LISTING_GRAPHQL_FIELDS}
      }
    }
  }`;
  const resourceEntries = await fetchGraphQL(query,);
  return extractResourceEntries(resourceEntries);
}

export async function getResourceMaxPage({ limitPerPage = 6, category = '', subject = '', searchTerm = '' } = {}) {
  const selectedCategories = category.split(',');
  const selectedSubjects = subject.split(',');
  const categoryFilter = category === '' ? '' : `{ category_contains_some: ${JSON.stringify(selectedCategories)} }`;
  const subjectFilter = subject === '' ? '' : `{subject_contains_some: ${JSON.stringify(selectedSubjects)} }`;
  const searchTermFilter = searchTerm === '' ? '' : `{ OR: [ 
                                                          { title_contains: "${searchTerm}" },
                                                          { shortDescription_contains: "${searchTerm}" },
                                                          { description_contains: "${searchTerm}" } 
                                                        ]
                                                      }`;
  const searchFilter = `where: { AND: [
      ${searchTermFilter}, 
      ${subjectFilter},
      ${categoryFilter}
    ]},`;
  const res = await fetchGraphQL(
    `query {
      resourceCollection(${searchFilter}) {
        total
      }
    }`,
  );
  const totalEntries = res?.data?.resourceCollection?.total;
  return totalEntries ? { total: totalEntries, maxPage: Math.ceil(totalEntries / limitPerPage) } : 0;
}

export async function getAllResourceEntriesWithSlug() {
  const entries = await fetchGraphQL(
    `query {
      resourceCollection(where: { slug_exists: true }, order: publishedDate_DESC) {
        items {
          ${RESOURCE_LISTING_GRAPHQL_FIELDS}
          slug
        }
      }
    }`,
  );
  return extractResourceEntries(entries);
}

export async function getResourceEntryBySlug(slug) {
  const entries = await fetchGraphQL(
    `query {
      resourceCollection(where: { slug: "${slug}" }) {
        items {
          ${RESOURCE_GRAPHQL_FIELDS}
        }
      }
    }`,
  );
  return extractResourceEntry(entries);
}

export async function getAllResourceCategories(subjects = '') {
  const selectedSubjects = subjects.split(',');
  const subjectFilter = subjects === '' ? '' : `{ subject_contains_some: ${JSON.stringify(selectedSubjects)} }`;
  const entries = await fetchGraphQL(
    `query {
      resourceCollection(where: { AND: [ {category_exists: true}, ${subjectFilter} ] } ) 
      {
        items {
          category
        }
      }
    }`,
  );
  const categories = entries.data.resourceCollection.items.map((item) => item.category);
  const flattenedCategories = [].concat(...categories);
  const uniqueCategories = [...new Set(flattenedCategories)];
  return uniqueCategories;
}

export async function getAllResourceSubjects(categories = '') {
  const selectedCategories = categories.split(',');
  const categoryFilter = categories === '' ? '' : `{ category_contains_some: ${JSON.stringify(selectedCategories)} }`;
  const entries = await fetchGraphQL(
    `query {
      resourceCollection(where: { AND: [ {subject_exists: true}, ${categoryFilter} ] } ) 
      {
        items {
          subject
        }
      }
    }`,
  );
  const subjects = entries.data.resourceCollection.items.map((item) => item.subject);
  const flattenedSubjects = [].concat(...subjects);
  const uniqueSubjects = [...new Set(flattenedSubjects)];
  return uniqueSubjects;
}

export async function getQuotes({ limit = 6, search = '' } = {}) {
  const searchFilter = search !== ''
    ? `where: { OR: [ 
      { headline_contains: "${search}" },
      { content_contains: "${search}" } ]}, `
    : '';
  const entry = await fetchGraphQL(
    `query {
      quoteCollection(${searchFilter}limit: ${limit}, order: id_ASC) {
        items {
          ${QUOTE_GRAPHQL_FIELDS}
        }
      }
    }`,
  );
  return entry.data.quoteCollection.items;
}

export async function getTeamMembers({ limit = 6, search = '' } = {}) {
  const searchFilter = search !== ''
    ? `where: { OR: [ 
      { headline_contains: "${search}" },
      { content_contains: "${search}" } ]}, `
    : '';
  const entry = await fetchGraphQL(
    `query {
      teamMemberCollection(${searchFilter}limit: ${limit}, order: id_ASC) {
        items {
          ${TEAM_MEMBER_GRAPHQL_FIELDS}
        }
      }
    }`,
  );
  return entry.data.teamMemberCollection.items;
}