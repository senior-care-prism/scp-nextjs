import Markdown from 'markdown-to-jsx';
import PropTypes from 'prop-types';

function NewsArticle({ article }) {
  return (
    <section id="news-article" className={'styles.team'}>
      <div className={'styles.content'}>
        <div className={'styles.heading'}>
          <h2>{article.headline}</h2>
        </div>
        <Markdown>
          {article.content}
        </Markdown>
      </div>
    </section>
  );
}

NewsArticle.propTypes = {
  // article: PropTypes.arrayOf(Card.propTypes.entry).isRequired,
};

export default NewsArticle;
