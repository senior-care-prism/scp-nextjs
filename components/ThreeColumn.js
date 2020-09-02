import styles from "../styles/ThreeSection.module.scss";
import cn from "classnames";


export default function ThreeColumn(props) {
  return (
    <section id="about-us" className={styles['about-us']}>
      <div className={styles.columns}>
      {props.columns.map(item => (
        <div key={item.id} className={styles.column}>
          <i className={cn(item.icon, styles.desktop)}></i>
          <h2><i className={cn(item.icon, styles.mobile)}></i> {item.heading}</h2>
          <p>{item.subtitle}</p>
        </div>
      ))}
      </div>
      
    </section>
  )
}