import { useState } from "react"
import { Slide } from "pure-react-carousel";
import SlideProvider from "./SlideProvider"
import styles from "../styles/Team.module.scss";
import cn from "classnames";


const Collapsible = (props) => {
  const [expanded, setExpanded] = useState(false)

  const toggleBio = (e) => {
    e.preventDefault();
    console.log()
    setExpanded(!expanded)
  }

  const bioId = `bio-${props.num + 1}`
  const btnId = `btn-${props.num + 1}`
  return (
    <>
      <button 
        id={btnId}
        onClick={toggleBio}
        type="button"
        aria-expanded={expanded ? "true" : "false"}
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
        aria-label={`${props.name}'s bio`}
        className={cn({ [styles.expanded]: expanded }, styles['team-bio'])}
      >
        {props.bio}
      </p>
    </>
  );
}

const BioCards = (props) => (
  <div className={styles.cards}>
  {props.members.map((member, i) => (
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
          { member.pronouns &&
          <span className={styles.pronouns}>{member.pronouns.join(" / ")}</span>
          }
        </h4>
        <div className={styles.position}>{member.position}</div>
      </div>
      <Collapsible bio={member.bio} num={i} name={member.name}/> 
    </div>
  ))}
</div>
)

const BioSlides = (props) => {
  const members = props.members.map((member, i) => (
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
  ))
  return <SlideProvider slides={quotes} styles={styles}/>
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
