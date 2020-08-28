import { useState } from "react"
import styles from "../styles/Team.module.scss";
import cn from "classnames";

const Collapsible = (props) => {
  const [expanded, setExpanded] = useState(false)

  const toggleBio = (e) => {
    e.preventDefault();
    console.log()
    setExpanded(!expanded)
  }
  console.log("key", props.num)

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
        aria-labeledby={btnId}
        aria-label={`${props.name}'s bio`}
        className={cn({ [styles.expanded]: expanded }, styles['team-bio'])}
      >
        {props.bio}
      </p>
    </>
  );
}

export default function Team(props) {
  const [bw, setBw] = useState(false)

  const toggleBw = (e) => {
    // e.preventDefault()
    setBw(!bw)
  } 
  return (
    <section className={styles.team}>
      <div className={styles.content}>
        <div className={styles.heading}>
          <h2 >{props.heading}</h2>
          <div>
            Toggle B/W 
            <label>
              <input type="checkbox" onClick={toggleBw} checked={bw}/>
            </label>
          </div>
        </div>
        <div className={styles.cards}>
          {props.members.map((member, i) => (
            <div className={cn(styles.member, styles.card)} key={member.id}>
                <img className={cn({blackandwhite: bw})} src={`images/${member.avatar}`} alt={member.position} />
              <div className={cn(styles.container, styles.text)}>
                <h4>
                  {member.name}{" "}
                  {member.titles && ", " + member.titles.join(", ")}
                </h4>
                <div className={styles.position}>{member.position}</div>
              </div>
              <Collapsible bio={member.bio} num={i} name={member.name}/>
              
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
