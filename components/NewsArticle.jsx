import Link from 'next/link';
import cn from 'classnames';
import Markdown from 'markdown-to-jsx';
import ShareWidget from './ShareWidget';
import styles from '../styles/NewsArticle.module.scss';
import { formatDate } from '../lib/utils';
import { ARTICLE_SHAPE } from '../shared/constants';

function RelatedArticle({ item }) {
  const articleRef = {
    pathname: '/news/[slug]',
    query: { slug: item.slug },
  };
  return (
    <div>
      <Link href={articleRef}>
        <a>
          <h4 className={styles['related-article']}>{item.headline}</h4>
        </a>
      </Link>
    </div>
  )
}

function RelatedArticles({ items }) {
  return (
    <aside className={styles['related-articles']}>
      <h3>Related Articles: </h3>
      <hr className={styles.separator}/>
      {items.map((item, i) => <RelatedArticle key={i} item={item} />) }
    </aside>
  )
}

function NewsArticle({ article }) {
  return (
    <section id="news-article" className={styles['news-article']}>
      <div className={cn(styles.content, styles.clearfix)}>
        <div className={styles.logo}>
          <img src="/images/logo/scp--sacramento.svg" alt="Senior Care Prism logo" />
        </div>
        <div className={styles.heading}>
          <h1>{article?.headline}</h1>
        </div>
        <div className={styles.date}>
          {formatDate(article.publishedDate)}
        </div>
        <ShareWidget route="news" slug={article.slug} />
        {article.featuredImage && article.aspectRatio && <img className={styles.landscape} src={article.featuredImage.url} />}
        {article.featuredImage && !article.aspectRatio && <img className={styles.portrait} src={article.featuredImage.url} />}
        <Markdown className={styles.markdown}>
          {article?.content}
        </Markdown>
        <div className={styles.related}>
          {article.relatedArticlesCollection.items.length > 0 && <RelatedArticles items={article.relatedArticlesCollection.items}/>}
        </div>
      </div>
    </section>
  );
}

NewsArticle.propTypes = {
  article: ARTICLE_SHAPE.isRequired,
};

export default NewsArticle;
