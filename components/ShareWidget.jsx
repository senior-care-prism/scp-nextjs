import cn from 'classnames';
import styles from '../styles/ShareWidget.module.scss';
import { faFacebookSquare, faLinkedin, faTwitterSquare } from '@fortawesome/free-brands-svg-icons';
import { faEnvelopeSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function ShareWidget({ route, slug }) {
  
  const baseDomain = process.env.APP_ENV === 'staging' 
    ? process.env.APP_ENV + ".seniorcareprism.com"
    : "seniorcareprism.com";

  const url = `https://${baseDomain}/${route}/${slug}`;
  const facebookURL = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
  const twitterURL = `https://twitter.com/share?url=${url}`;
  const linkedinURL = `https://www.linkedin.com/shareArticle?url=${url}`;
  const mailURL = "mailto:?subject=I wanted you to see this site&body=Check out this site http://www.website.com.";

  return (
    <>
      <div className={styles['share-widget']}>
        <div className={styles.sharelink}>
          <a href={facebookURL} target="_blank" rel="noreferrer">
            <FontAwesomeIcon className={styles.facebook} icon={faFacebookSquare} size="2x"/>
          </a>
        </div>
        <div className={styles.sharelink}>
          <a href={twitterURL} target="_blank" rel="noreferrer">
            <FontAwesomeIcon className={styles.twitter} icon={faTwitterSquare} size="2x" />
          </a>
        </div>
        <div className={styles.sharelink}>
          <a href={linkedinURL} target="_blank" rel="noreferrer">
            <FontAwesomeIcon className={styles.linkedin} icon={faLinkedin} size="2x"/>
          </a>
        </div>
        <div className={styles.sharelink}>
        <a href={mailURL} rel="noreferrer">
            <FontAwesomeIcon className={cn(styles.mail, styles.icon)} icon={faEnvelopeSquare} size="2x" />
          </a>  
        </div>
      </div>
    </>
  );
}

export default ShareWidget;