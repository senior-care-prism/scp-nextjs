import styles from "../styles/Footer.module.scss";
import cn from "classnames";


const SocialLinks = () => {
  const iconSize = "ri-lg"
  const socialLinks = [
    { "icon" : "ri-instagram-fill" },
    { "icon" : "ri-linkedin-box-fill" },
    { "icon" : "ri-facebook-fill" },
  ]
  return (
    <>
      {socialLinks.map(link => (
        <span key={link.icon} className={styles.icon}>
          <i className={cn(link.icon, iconSize)} />
        </span>
      ))}
    </>
  )
}

export default function Team(props) {
  
  return (
    <footer id="contact" className={styles.footer}>
      <div className={cn(styles.container, styles.columns)}>
        <div className={styles.column}>
          <h2>Stay Up to Date</h2>
          <p>
            Sign up to our newsletter for updates on our network with inclusivity
            tips from our experts
          </p>
          <form>
            <label>
              Email
              <input name="email" />
            </label>

            <button>Sign Up</button>
          </form>
          <div className={cn(styles.columns, styles.contact)}>
            <div className={styles.col}>
              <h4>Contact Us</h4>
              <div>t. 613 407 8858</div>
              <div>e. info@seniorcareprism.com</div>
              <div>Address TBD</div>
            </div>
            <div>
            <h4>Follow Us</h4>
            <div className={styles.col}>
              <SocialLinks/>
            </div>
            </div>
            
          </div>
        </div>

        <div className={styles.column}>
          <div className={styles.map}>
            <img src="images/map-vancouver.jpg" alt="Map of Vancouver"/>
          </div>
        </div>
        
        
      </div>
    </footer>
  );
}
