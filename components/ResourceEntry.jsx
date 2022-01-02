import Markdown from 'markdown-to-jsx';
import ShareWidget from './ShareWidget';
import styles from '../styles/ResourceEntry.module.scss';
import { formatDate } from '../lib/utils';
import { ARTICLE_SHAPE } from '../shared/constants';

function ResourceEntry({ resource }) {
  return (
    <section className={styles['resource-entry']}>
      <div className={styles.logo}>
        <img src="/images/logo/scp--eggplant.svg" alt="Senior Care Prism logo" />
      </div>
      <div className={styles['download-section']}>
        {
        resource.screenshot && (
            <img className={styles.imagecontainer} src={resource.screenshot.url}/>
        )
        }
        <a className={styles.link} href={resource.downloadable.url} target="_blank" rel="noreferrer" download>Download</a>
      </div>
      <div className={styles.content}>
        <div className={styles.heading}>
          <h1>{resource?.title}</h1>
        </div>
        <hr className={styles.separator}/>
        <div className={styles.date}>
          {formatDate(resource.publishedDate)}
        </div>
        <ShareWidget route="resources" slug={resource.slug} />
        <Markdown className={styles.markdown}>
          {resource?.description}
        </Markdown>
      </div>
    </section>
  );
}

ResourceEntry.propTypes = {
  resource: ARTICLE_SHAPE.isRequired,
};

export default ResourceEntry;