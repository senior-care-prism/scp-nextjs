import { useState } from 'react';
import cn from 'classnames';
import Image from 'next/image';

import styles from '../styles/Team.module.scss';

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
        <Collapsible bio={member.bio} num={i} name={member.name}/> 
      </div>
    ))}
  </div>
);

export default function Team(props) {
  return (
    <section id="our-team" className={styles.team}>
      <div className={styles.content}>
        <div className={styles.heading}>
          <h2 >{props.heading}</h2>
        </div>
        <BioCards members={props.members} />
      </div>
    </section>
  );
}
