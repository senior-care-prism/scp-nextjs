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
          <h2>Stay Up To Date</h2>
          <p>
            Sign up to our newsletter for updates on our network with inclusivity
            tips from our experts
          </p>
          <iframe class="mj-w-res-iframe" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://app.mailjet.com/widget/iframe/5SaI/F4d" width="100%"></iframe>

<script type="text/javascript" src="https://app.mailjet.com/statics/js/iframeResizer.min.js"></script>
          <div className={cn(styles.columns, styles.contact)}>
            <div className={styles.col}>
              <h4>Contact Us</h4>
              <div>t. 613 407 8858</div>
              <div>e. info@seniorcareprism.com</div>
              <div>101-1111 Seymour Street<br/>Vancouver BC V6B 0R2</div>
            </div>
            <div>
            <h4>Follow Us</h4>
            <div className={styles.col}>
              <SocialLinks/>
            </div>
            </div>
            
          </div>
        </div>
        <div className={cn(styles.column, styles.desktop)}>
          <div className={styles.map}>
            <img src="images/map-canada.png" alt="Map of Canada"/>
          </div>
        </div>
        
        
      </div>
    </footer>
  );
}
