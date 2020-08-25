import styles from "../styles/ThreeSection.module.scss";
import cn from "classnames";


export default function ThreeColumn(props) {
  return (
    <section className={cn(styles.banner, styles.columns)}>
      {props.columns.map(item => (
        <div key={item.id} className={styles.column}>
          <h2>{item.heading}</h2>
          <p>{item.subtitle}</p>
        </div>
      ))}
    </section>
  )
}