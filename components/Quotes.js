// import dynamic from 'next/dynamic';
import styles from "../styles/Quotes.module.scss";

// const { default: Carousel, Dots } = dynamic(
//  () => require('@brainhubeu/react-carousel'),
//  { ssr: false },
// );

import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import { useState } from "react"

export default function Quotes(props) {

  const quotes = props.quotes.map((quote) => (
    <Slide index={quote.id} key={quote.id}>
      <span className={styles.quote}>{quote.text}</span>
    </Slide>
    
  ));


  return (
    <section className={styles.quotes}>
      <CarouselProvider naturalSlideWidth={100}
        naturalSlideHeight={125}
        totalSlides={3}>
      <Slider>
      {quotes}
      </Slider>
        
      </CarouselProvider>

    </section>
  );
}
