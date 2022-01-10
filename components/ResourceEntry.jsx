import { useRouter } from 'next/router';
import Markdown from 'markdown-to-jsx';
import ShareWidget from './ShareWidget';
import styles from '../styles/ResourceEntry.module.scss';
import { formatDate } from '../lib/utils';
import { RESOURCE_SHAPE } from '../shared/constants';
import download from 'downloadjs';

function ResourceEntry({ resource }) {

  const router = useRouter();

  const handleCatClick = (e) => {
    e.preventDefault();
    const { query } = router;
    query.searchCategory = encodeURIComponent(e.target.value);
    router.push(`/resources?searchCategory=${query.searchCategory}`);
  };

  const handleSubClick = (e) => {
    e.preventDefault();
    const { query } = router;
    query.searchSubject = encodeURIComponent(e.target.value);
    router.push(`/resources?searchSubject=${query.searchSubject}`);
  };

  const handleDownload = (e) => {
    const url = resource.downloadable.url;
    const filename = url.substring(url.lastIndexOf('/') + 1);
    fetch(url).then(response => response.blob()).then(data => download(data, filename));
  }

  const youtubeID = resource.video ? resource.video.match(/youtu(?:.*\/v\/|.*v\=|\.be\/)([A-Za-z0-9_\-]{11})/)[1] : '';

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
        <div className={styles['cat-section']}>
          <span>Categories: </span>
          <div className={styles.cat}>
            {resource.category.map((cat) => <button className={styles['cat-item']} key={cat} value={cat} onClick={handleCatClick}>{cat}</button>)}
          </div>
        </div>
        <div className={styles['sub-section']}>
          <span>Subjects: </span>
          <div className={styles.sub}>
            {resource.subject.map((sub) => <button className={styles['sub-item']} key={sub} value={sub} onClick={handleSubClick}>{sub}</button>)}
          </div>
        </div>
        
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
            {resource.downloadable && (
              <>
                <a className={styles.link} href={resource.downloadable.url} target="_blank" rel="noreferrer">Open</a>
                <a className={styles.link} target="_blank" onClick={handleDownload} rel="noreferrer" download>Download</a>
              </>)}
          </div>
        </div>
        <div>
          <Markdown className={styles.markdown}>
            {resource?.description}
          </Markdown>
          {resource.video && (
            <iframe
              className={styles['video-embed']}
              src={`https://www.youtube.com/embed/${youtubeID}`}
              title="YouTube video player" frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />)}
        </div>
      </div>
    </section>
  );
}

ResourceEntry.propTypes = {
  resource: RESOURCE_SHAPE.isRequired,
};

export default ResourceEntry;