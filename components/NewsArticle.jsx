import Image from 'next/image';
import Markdown from 'markdown-to-jsx';
import ShareWidget from './ShareWidget';
import styles from '../styles/NewsArticle.module.scss';
import { formatDate } from '../lib/utils';
import { ARTICLE_SHAPE } from '../shared/constants';

function NewsArticle({ article }) {
  return (
    <section id="news-article" className={styles['news-article']}>
      <div className={styles.content}>
        {/*
          article.featuredImage && (
            <div className={styles.scpmotif}>
              <div className={styles.imagecontainer}>
                <Image src={article.featuredImage.url} layout="fill" objectFit="contain"/>
              </div>
            </div>
          )
          */}
        <div className={styles.heading}>
          <h1>{article?.headline}</h1>
        </div>
        <div className={styles.date}>
          {formatDate(article.publishedDate)}
        </div>
        <ShareWidget route="news" slug={article.slug} />
        {article.featuredImage && <img className={styles.featuredimage} src={article.featuredImage.url} />}
        <Markdown className={styles.markdown}>
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
