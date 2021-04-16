import Markdown from 'markdown-to-jsx';
import styles from '../styles/NewsArticle.module.scss';
import { ARTICLE_SHAPE } from '../shared/constants';

function NewsArticle({ article }) {
  return (
    <section id="news-article" className={styles['news-article']}>
      <div className={styles.content}>
        <div className={styles.heading}>
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
  article: ARTICLE_SHAPE.isRequired,
};

export default NewsArticle;
