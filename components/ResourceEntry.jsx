import Markdown from 'markdown-to-jsx';
import ShareWidget from './ShareWidget';
import styles from '../styles/ResourceEntry.module.scss';
import { formatDate } from '../lib/utils';
import { RESOURCE_SHAPE } from '../shared/constants';
import download from 'downloadjs';

function ResourceEntry({ resource }) {

  const handleDownload = (e) => {
    const url = resource.downloadable.url;
    const filename = url.substring(url.lastIndexOf('/')+1);
    fetch(url).then(response => response.blob()).then(data => download(data, filename));
  }
  return (
    <section className={styles['resource-entry']}>
      <div className={styles.logo}>
        <img src="/images/logo/scp--eggplant.svg" alt="Senior Care Prism logo" />
      </div>
      <div className={styles.heading}>
          <h1>{resource?.title}</h1>
      </div>
      <div className={styles.date}>
        {formatDate(resource.publishedDate)}
      </div>
      <div className={styles['cat-sub']}>
        <p>{`Category: ${resource.category.join(', ')}`}</p>
        <p>{`Subject: ${resource.subject.join(', ')}`}</p>
      </div>
      <ShareWidget route="resources" slug={resource.slug} />
      <div className={styles.content}>
        <div className={styles['download-section']}>
          {
          resource.screenshot && (
              <img className={styles.imagecontainer} src={`${resource.screenshot.url}?fm=jpg&fl=progressive&w=600`}/>
          )
          }
          <div className={styles.files}>
            <a className={styles.link} href={resource.downloadable.url} target="_blank" rel="noreferrer">Open</a>
            <a className={styles.link} target="_blank" onClick={handleDownload} rel="noreferrer" download>Download</a>
          </div>
        </div>
        <Markdown className={styles.markdown}>
          {resource?.description}
        </Markdown>
      </div>
    </section>
  );
}

ResourceEntry.propTypes = {
  resource: RESOURCE_SHAPE.isRequired,
};

export default ResourceEntry;