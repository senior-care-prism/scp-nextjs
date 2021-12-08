import Link from 'next/link';
import { formatDate } from '../lib/utils';
import { ARTICLE_SHAPE } from '../shared/constants';
import styles from '../styles/ArticleCard.module.scss';

function ArticleCard({ entry }) {
  const articleRef = {
    pathname: '/news/[slug]',
    query: { slug: entry.slug },
  };
  return (
    <div className={styles['article-card']}>
      <div className={styles['card-title']}>
        <h3>
          <Link href={articleRef}>
            {entry.headline}
          </Link>
        </h3>
      </div>
      <div className={styles.content}>
        <p className={styles.excerpt}>
          {entry.excerpt}
        </p>
      </div>
      <div className={styles['card-end']}>
        <Link href={articleRef}>
          Read&nbsp;more
        </Link>
        <div className={styles['published-date']}>
          {formatDate(entry.publishedDate)}
        </div>
      </div>
    </div>
  );
}

ArticleCard.propTypes = {
  entry: ARTICLE_SHAPE.isRequired,
};

export default ArticleCard;
