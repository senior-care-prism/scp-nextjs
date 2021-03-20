import { useState } from 'react';
import { Slide } from 'pure-react-carousel';
import cn from 'classnames';

import styles from '../styles/Team.module.scss';
import SlideProvider from './SlideProvider';

const Collapsible = ({ num, name, bio }) => {
  const [expanded, setExpanded] = useState(false);

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
        onClick={toggleBio}
        type="button"
        aria-expanded={expanded ? 'true' : 'false'}
        aria-controls={bioId}
      >
        <span className={styles.text}>read bio </span>
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

const BioCards = ({ members }) => (
  <div className={styles.cards}>
    {members.map((member, i) => (
      <div className={cn(styles.member, styles.card)} key={member.id}>
        <picture>
          <source srcSet={`images/${member.avatar}.webp`} type="image/webp" />
          <source srcSet={`images/${member.avatar}.jpg`} type="image/jpeg" />
          <img
            width="1000"
            height="670"
            src={`images/${member.avatar}.jpg`}
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
        <Collapsible bio={member.bio} num={i} name={member.name}/> 
      </div>
    ))}
  </div>
);

const BioSlides = (props) => {
  const members = props.members.map((member, i) => (
    <Slide index={quote.id} key={quote.id} className={styles.slide}>
      <div className={cn(styles.member, styles.card)} key={member.id}>
        <picture>
          <source srcset={`images/${member.avatar}.webp`} type="image/webp" />
          <source srcset={`images/${member.avatar}.jpg`} type="image/jpeg" /> 
          <img
            width="1000"
            height="670"
            src={`images/${member.avatar}.jpg`} 
            alt={member.position} />
        </picture>
      <div className={cn(styles.container, styles.text)}>
        <h4>
          {member.name}{" "}
          {member.titles && ", " + member.titles.join("/")}
        </h4>
        <div className={styles.position}>{member.position}</div>
      </div>
      <Collapsible bio={member.bio} num={i} name={member.name}/> 
    </div>
    </Slide>
  ))
  return <SlideProvider slides={quotes} styles={styles}/>
}

function Quotes(props) {
  const quotes = props.quotes.map((quote) => (
    <Slide index={quote.id} key={quote.id} className={styles.slide}>
      <div className={styles.container}>
        <div className={styles.quote}>{quote.text}</div>
        <div className={styles.byline}>- {quote.byline}</div>
      </div>
    </Slide>
    
  ));

  return (
    <section className={styles.quotes}>
      <SlideProvider slides={quotes} styles={styles}/>
    </section>
  );
}


export default function Team(props) {
  return (
    <section id="our-team" className={styles.team}>
      <div className={styles.content}>
        <div className={styles.heading}>
          <h2 >{props.heading}</h2>
        </div>
        <BioCards members={props.members} />
        {/* <BioSlides members={props.members} styles={styles}/> */}
      </div>
    </section>
  );
}
