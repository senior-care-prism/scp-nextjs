import PropTypes from 'prop-types';

export const ARTICLE_SHAPE = PropTypes.shape({
  id: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  headline: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  publishedDate: PropTypes.string.isRequired,
  author: PropTypes.shape({
    name: PropTypes.string,
    photo: PropTypes.shape({
      url: PropTypes.string,
    }),
  }).isRequired,
  attributeOriginalAuthor: PropTypes.bool.isRequired,
  originalAuthor: PropTypes.string,
  content: PropTypes.string.isRequired,
  relatedArticlesCollection: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
});

export const ARTICLE_FEED_SHAPE = PropTypes.arrayOf(ARTICLE_SHAPE);
