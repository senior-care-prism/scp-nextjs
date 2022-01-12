import styles from '../styles/ThankYou.module.scss';

function ThankYou() {
  return (
    <section className={styles['thank-you']}>
      <div className={styles.logo}>
        <img src="/images/logo/scp--sacramento.svg" alt="Senior Care Prism logo" />
      </div>
      <div className={styles['message-container']}>
        <h1 className={styles.message}> You're subscribed to our newsletter</h1>
      </div>
    </section>
  );
}

export default ThankYou;
