import Markdown from 'markdown-to-jsx';
import PropTypes from 'prop-types';

function NewsArticle({ article }) {
  // console.log('NewsArticle', article);

  return (
    <section id="news-article" className={'styles.team'}>
      <div className={'styles.content'}>
        <div className={'styles.heading'}>
          <h2>{article?.headline}</h2>
        </div>
        <Markdown>
          {article?.content}
        </Markdown>
      </div>
    </section>
  );
}

NewsArticle.propTypes = {
  article: PropTypes.shape({
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
      items: PropTypes.array,
    }).isRequired,
  }).isRequired,
};

export default NewsArticle;
