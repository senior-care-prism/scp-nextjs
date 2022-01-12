import styles from '../styles/ThankYou.module.scss';
import Link from 'next/link';

function ThankYou() {
  return (
    <section className={styles['thank-you']}>
      <div className={styles.logo}>
        <Link href="/" passHref>
          <img src="/images/logo/scp--sacramento.svg" alt="Senior Care Prism logo" />
        </Link>
      </div>
      <div className={styles['message-container']}>
        <h1 className={styles.message}> You&apos;re subscribed to our newsletter</h1>
      </div>
    </section>
  );
}

export default ThankYou;
