import PropTypes from 'prop-types';
import {
  CarouselProvider,
  Slider,
  DotGroup,
} from 'pure-react-carousel';
// import styles from "../styles/Slider.module.scss"
// import dynamic from 'next/dynamic';

// const { default: Carousel, Dots } = dynamic(
//  () => require('@brainhubeu/react-carousel'),
//  { ssr: false },
// );

function SlideProvider({ slides, styles }) {
  return (
    <div className={styles.carouselScaler}>
      <CarouselProvider
        className={styles.provider}
        naturalSlideWidth={1}
        naturalSlideHeight={1}
        totalSlides={slides.length}
        interval={9000}
        isPlaying
      >
        <Slider className={styles.slider}>
          {slides}
        </Slider>
        <DotGroup className={styles.dotgroup} />
      </CarouselProvider>
    </div>
  );
}
SlideProvider.propTypes = {
  slides: PropTypes.arrayOf(PropTypes.element).isRequired,
  styles: PropTypes.object.isRequired,
};

export default SlideProvider;
