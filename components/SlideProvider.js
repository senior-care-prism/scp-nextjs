import { 
  CarouselProvider, 
  Slider, 
  Slide, 
  DotGroup
} from 'pure-react-carousel';
import styles from "../styles/Slider.module.scss"
// import dynamic from 'next/dynamic';

// const { default: Carousel, Dots } = dynamic(
//  () => require('@brainhubeu/react-carousel'),
//  { ssr: false },
// );

export default function SlideProvider(props) {
  
  return (
    <div className={props.styles.carouselScaler}>
      <CarouselProvider naturalSlideWidth={1}
        className={props.styles.provider}
        naturalSlideHeight={1}
        totalSlides={props.slides.length}
        interval={9000}
        isPlaying={true}
      >
        <Slider className={props.styles.slider}>
          {props.slides}
        </Slider>
        <DotGroup className={props.styles.dotgroup}/>
      </CarouselProvider>
    </div>
  );
}