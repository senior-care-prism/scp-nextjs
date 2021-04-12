import Link from 'next/link';
import PropTypes from 'prop-types';
import moment from 'moment';
// import { useState } from 'react';
// import cn from 'classnames';

import styles from '../styles/NewsFeed.module.scss';

const Card = ({ entry }) => {
  const articleRef = {
    pathname: '/news/[slug]',
    query: { slug: entry.slug },
  };
  return (
    <div className={styles['news-card']}>
      <div className={styles.content}>
        <h3>
          <Link href={articleRef}>
            {entry.headline}
          </Link>
        </h3>
        <p>{entry.excerpt}</p>
        <Link href={articleRef} className={styles.btn}>
          Read more...
        </Link>
        <div>{moment(entry.publishedDate).format('LL')}</div>
      </div>
    </div>
  );
};

Card.propTypes = {
  entry: PropTypes.shape({
    id: PropTypes.string.isRequired,
    tags: PropTypes.array.isRequired,
    headline: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    publishedDate: PropTypes.string.isRequired,
    excerpt: PropTypes.string.isRequired,
  }).isRequired,
};

function NewsFeed({ entries }) {
  return (
    <section id="news-feed" className={styles['news-feed']}>
      <div className={styles.content}>
        <div className={styles.heading}>
          <h2>News Feed</h2>
        </div>
        <div className={styles['card-container']}>
          {entries.map((entry) => (
            <Card entry={entry} key={entry.id} />
          ))}
        </div>
      </div>
    </section>
  );
}

NewsFeed.propTypes = {
  entries: PropTypes.arrayOf(Card.propTypes.entry).isRequired,
};

export default NewsFeed;
