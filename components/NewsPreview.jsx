import Link from 'next/link';
import PropTypes from 'prop-types';
import ArticleCard from './ArticleCard';
import { useState, useEffect } from 'react';
import styles from '../styles/NewsPreview.module.scss';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, DotGroup } from 'pure-react-carousel';
import { faCaretSquareLeft, faCaretSquareRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function NewsPreview({ newsEntries }) {

  const [viewportWidth, setViewportWidth] = useState(0);

  useEffect(
    () => {
      const onResize = () => setViewportWidth(window.innerWidth);
      onResize();
      window.addEventListener("resize", onResize);
    }
  );

  const renderedEntries = (newsEntries || []).map((newsEntry) => (
    <ArticleCard key={newsEntry.id} entry={newsEntry} />
  ));

  const renderedSlides = (newsEntries || []).map((newsEntry, idx) => (
    <Slide key={newsEntry.id} index={idx}>
      <ArticleCard key={newsEntry.id} entry={newsEntry} />
    </Slide>
  ));

  const lastSlide =
    < Slide >
      Last Slide
    </Slide>;

  return (
    <section id="news" className={styles['news-preview']}>
      <h2>Latest News</h2>
      <div className={styles['card-container']}>
        { renderedEntries }
      </div>
      <div className={styles['card-slider']}>
        <CarouselProvider
          naturalSlideWidth={1}
          naturalSlideHeight={1}
          totalSlides={newsEntries.length + 1}
          visibleSlides={viewportWidth/290.0}
        >
          <Slider>
            {renderedSlides}
            <Slide>
              <Link href="/news" passHref>
                <a href="#ref" className={styles['last-slide-link']}>
                  See all news posts
                </a>
              </Link>
            </Slide>
          </Slider>
          <div className={styles['buttons']} >
            <ButtonBack className={styles['button-back']}>
              <FontAwesomeIcon className={styles['back-arrow']} icon={faCaretSquareLeft} size="2x"/>
            </ButtonBack>
            <ButtonNext className={styles['button-next']}>
              <FontAwesomeIcon className={styles['next-arrow']} icon={faCaretSquareRight} size="2x"/>
            </ButtonNext>
          </div>
        </CarouselProvider>
      </div>
      <Link href="/news" passHref>
        <a href="#ref" className={styles.button}>
          See all news posts
        </a>
      </Link>
    </section>
  );
}

NewsPreview.propTypes = {
  newsEntries: PropTypes.any,
};

export default NewsPreview;
