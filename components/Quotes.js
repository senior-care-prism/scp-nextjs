// import dynamic from 'next/dynamic';
import styles from "../styles/Quotes.module.scss";

// const { default: Carousel, Dots } = dynamic(
//  () => require('@brainhubeu/react-carousel'),
//  { ssr: false },
// );

import { CarouselProvider, Slider, Slide, DotGroup, ButtonBack, ButtonNext } from 'pure-react-carousel';
import { useState } from "react"

export default function Quotes(props) {

  const quotes = props.quotes.map((quote) => (
    <Slide index={quote.id} key={quote.id}>
      <div className={styles.container}>
        <div className={styles.quote}>{quote.text}</div>
        <div className={styles.byline}>- {quote.byline}</div>
      </div>
    </Slide>
    
  ));


  return (
    <section className={styles.quotes}>
      
      <CarouselProvider naturalSlideWidth={100}
        className={styles.provider}
        naturalSlideHeight={70}
        totalSlides={3}
        interval={3000}
        isPlaying={true}
      >
        <Slider>
          {quotes}
        </Slider>
        <DotGroup />
      </CarouselProvider>
    </section>
  );
}
