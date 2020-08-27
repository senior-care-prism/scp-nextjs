import styles from "../styles/Footer.module.scss";
import cn from "classnames";


export default function Team(props) {
  return (
    <footer className={styles.footer}>
<h2>Stay Up to Date</h2> 

<p>Sign up to our newsletter for updates on our network with inclusivity tips from our experts 
</p>
<form>
<label for="email">Email</label>
  <input name="email"/>
  <button>Sign Up</button>
</form> 

Contact Us  				Follow US 
t. 613 407 8858			Insta
e. info@seniorcareprism.com	linkedin 
Address 

      
    </footer>
  )
}