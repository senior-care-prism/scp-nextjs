import Image from 'next/image';
import Link from 'next/link';
import cn from 'classnames';
import Markdown from 'markdown-to-jsx';
import ShareWidget from './ShareWidget';
import styles from '../styles/ResourceEntry.module.scss';
import { formatDate } from '../lib/utils';
import { ARTICLE_SHAPE } from '../shared/constants';

function ResourceEntry({ resource }) {
  return (
    <section className={cn(styles['resource-entry'], styles.columns)}>
      <div className={cn(styles.column, styles["column-left"])}>
        {
        resource.screenshot && (
          <div className={styles.imagecontainer}>
            <Image src={resource.screenshot.url} layout="fill" objectFit="contain"/>
          </div>
        )
        }
				<a className={styles.link} href={resource.downloadable.url} target="_blank" rel="noreferrer" download>Download</a>
      </div>
      <div className={cn(styles.column, styles["column-right"])}>
        <div className={styles.content}>
          <div className={styles.heading}>
            <h1>{resource?.title}</h1>
          </div>
          <div className={styles.date}>
            {formatDate(resource.publishedDate)}
          </div>
          <ShareWidget route="resources" slug={resource.slug} />
          <Markdown>
            {resource?.description}
          </Markdown>
        </div>
      </div>
    </section>
  );
}

ResourceEntry.propTypes = {
  resource: ARTICLE_SHAPE.isRequired,
};

export default ResourceEntry;