import { useState, useEffect } from 'react';
import cn from 'classnames';
import Image from 'next/image';
import { Popover } from 'react-tiny-popover'
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import styles from '../styles/Team.module.scss';
import { faCaretSquareLeft, faCaretSquareRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Collapsible = ({ num, name, bio, isMobile }) => {
  const [expanded, setExpanded] = useState(isMobile);

  const toggleBio = (e) => {
    e.preventDefault();
    setExpanded(!expanded);
  };

  const bioId = `bio-${num + 1}`;
  const btnId = `btn-${num + 1}`;
  return (
    <>
      <button
        id={btnId}
        className={styles['read-more']}
        onClick={toggleBio}
        type="button"
        aria-expanded={expanded ? 'true' : 'false'}
        aria-controls={bioId}
      >
        <span className={styles.text}> read bio </span>
        <span className={styles.icon}>
          <i className="ri-add-line" />
        </span>
      </button>
      <p
        id={bioId}
        role="region"
        aria-labelledby={btnId}
        aria-label={`${name}'s bio`}
        className={cn({ [styles.expanded]: expanded }, styles['team-bio'])}
      >
        {bio}
      </p>
    </>
  );
};

const BioPopOver = ({ member }) => {

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  return (
  <Popover
    isOpen={isPopoverOpen}
    onClickOutside={() => setIsPopoverOpen(false)}
    positions={['top']} // preferred positions by priority
      content={
      <div className='popover-bio'>
        <h4 className='popover-name'>
          { member.name }{" "}
          { member.pronouns
          && <span className="popover-pronouns">{member.pronouns.join(" / ")}</span> }
        </h4>
      <div className="popover-position">{member.position}</div>
      <p>
        {member.bio}
      </p>
    </div>}
    >
      <div className={styles['read-more'] } onClick={() => setIsPopoverOpen(!isPopoverOpen)}>
      <span className={styles.text}> read bio </span>
      <span className={styles.icon}>
        <i className="ri-arrow-up-s-line" />
      </span>
    </div>
  </Popover>
  )}

const BioCard = ({ i, member, isMobile }) => (
  <div className={cn(styles.member, styles.card)} key={member.id}>
    <picture>
      <source srcSet={member.photo.url} type="image/jpeg" />
      <Image
        width="1000"
        height="670"
        src={member.photo.url}
        alt={member.position}
      />
    </picture>
    <div className={cn(styles.container, styles.text)}>
      <h4>
        { member.name }{" "}
        { member.pronouns
        && <span className={styles.pronouns}>{member.pronouns.join(" / ")}</span> }
      </h4>
      <div className={styles.position}>{member.position}</div>
    </div>
    {!isMobile
      ? <Collapsible bio={member.bio} num={i} name={member.name} isMobile={isMobile} />
      : <BioPopOver member={member}></BioPopOver>
    }
  </div>
);

const BioCards = ({ members }) => (
  <div className={styles.cards}>
    {members.map((member, i) => (
      <BioCard key={i} i={i} member={member} isMobile= {false}/>
    ))}
  </div>
);

export default function Team(props) {

  const [viewportWidth, setViewportWidth] = useState(0);

  useEffect(
    () => {
      const onResize = () => setViewportWidth(window.innerWidth);
      onResize();
      window.addEventListener("resize", onResize);
    }
  );

  const renderedSlides = (props.members || []).map((member, i) => (
    <Slide key={i} index={i}>
      <BioCard key={i} member={member} isMobile />
    </Slide>
  ));

  return (
    <section id="our-team" className={styles.team}>
      <div className={styles.content}>
        <div className={styles.heading}>
          <h2 >{props.heading}</h2>
        </div>
        <BioCards members={props.members} />
        <div className={styles.slides}>
          <CarouselProvider
            naturalSlideWidth={19}
            naturalSlideHeight={21}
            totalSlides={props.members.length}
            visibleSlides={viewportWidth/16/19}
          >
            <Slider>
              {renderedSlides}
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
      </div>
    </section>
  );
}
