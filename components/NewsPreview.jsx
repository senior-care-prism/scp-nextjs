import Link from 'next/link';
import PropTypes from 'prop-types';
import ArticleCard from './ArticleCard';
import styles from '../styles/NewsPreview.module.scss';

function NewsPreview({ newsEntries }) {
  const renderedEntries = (newsEntries || []).map((newsEntry) => (
    <ArticleCard key={newsEntry.id} entry={newsEntry} />
  ));

  return (
    <section id="news" className={styles['news-preview']}>
      <h2>Latest News</h2>
      <div className={styles['card-container']}>
        { renderedEntries }
      </div>
      <Link href="/news" passHref>
        <a href="#ref" className={styles.button}>
          See all news posts
        </a>
      </Link>
    </section>
  );
}

NewsPreview.propTypes = {
  newsEntries: PropTypes.any,
};

export default NewsPreview;
