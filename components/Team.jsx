import { useState, useEffect, useRef } from 'react';
import cn from 'classnames';
import Image from 'next/image';
import Popover from 'react-bootstrap/Popover';
import Overlay from 'react-bootstrap/Overlay';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import styles from '../styles/Team.module.scss';
import { faLongArrowAltLeft, faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
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
  const [target, setTarget] = useState(null);
  const ref = useRef(null);

  const handleClick = (event) => {
    setIsPopoverOpen(!isPopoverOpen);
    setTarget(event.target);
  };

  return (
    <div ref={ref} className={styles['read-more'] }>
      <span className={styles.text} onClick={handleClick}> read bio </span>
        <Overlay
          show={isPopoverOpen}
          target={target}
          placement='top-start'
          container={ref}
        >
          <Popover id="popover-basic" className={cn(styles.bootstrap, "popover-bio")}>
            <Popover.Header>
              <h4 className='popover-name'>
                { member.name }{" "}
                { member.pronouns
                && <span className="popover-pronouns">{member.pronouns.join(" / ")}</span> }
              </h4>
              <div className="popover-position">{member.position}</div>
            </Popover.Header>
            <Popover.Body>
              <p>
                {member.bio}
            </p>
          </Popover.Body>
          </Popover>
        </Overlay>
    </div>
  )}

const BioCard = ({ i, member, isMobile }) => (
  <div className={cn(styles.member, styles.card)} key={member.id}>
    <picture>
      <Image
        width="1000"
        height="670"
        src={`${member.photo.url}?fm=webp&w=600`}
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
            naturalSlideWidth={(viewportWidth)/(1 + Math.trunc(viewportWidth/600))}
            naturalSlideHeight={(viewportWidth*0.669)/(1 + Math.trunc(viewportWidth/600)) + 130}
            totalSlides={props.members.length}
            visibleSlides={ Math.trunc(viewportWidth/600) + 1}
          >
            <Slider>
              {renderedSlides}
            </Slider>
            <div className={styles['buttons']} >
              <ButtonBack className={styles['button-back']}>
                <FontAwesomeIcon className={styles['back-arrow']} icon={faLongArrowAltLeft} size="2x"/>
              </ButtonBack>
              <ButtonNext className={styles['button-next']}>
                <FontAwesomeIcon className={styles['next-arrow']} icon={faLongArrowAltRight} size="2x"/>
              </ButtonNext>
            </div>
          </CarouselProvider>
        </div>
      </div>
    </section>
  );
}
