import styles from "../styles/Team.module.scss";
import cn from "classnames";

export default function Team(props) {
  return (
    <section className={styles.team}>
      <div className={styles.content}>
        <div>
          <h2>{props.heading}</h2>
        </div>
        <div className={styles.cards}>
          {props.members.map((member) => (
            <div className={cn(styles.member, styles.card)}>
                <img src={`images/${member.avatar}`} alt={member.position} />
              <div className={cn(styles.container, styles.text)}>
                <h4>
                  {member.name}{" "}
                  {member.titles && ", " + member.titles.join(", ")}
                </h4>
                <div className={styles.position}>{member.position}</div>
              </div>

              <button>
                <span>read bio </span>
                <span>
                  <i className="ri-add-line" />
                </span>
              </button>
              <p className="team-bio">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
