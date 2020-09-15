import { useState } from "react"
import { useScrollPosition } from '@n8tb1t/use-scroll-position'
import styles from "../styles/Header.module.scss"
import cn from "classnames"
import NavLinks from "./NavLinks"

// import bgImg from "../public/images/scp"

export default function Header({home, theme}) {
  const [isVisible, setIsVisible] = useState(!home)

  useScrollPosition(({ prevPos, currPos }) => {
    if (home) {
      // console.log(currPos.x)
      // console.log(currPos.y)
      if (currPos.y < -100 ) {
        if (!isVisible) {
          console.log("SHOW STICKY!")
          setIsVisible(true)
        }
      } else {
        if (isVisible) {
          console.log("HIDE!")
          setIsVisible(false)
        }
      }
    }
  }, [isVisible])
  console.log(home, !home)
  return (
    <header className={cn(styles.header, {[styles.sticky]: isVisible})}>
      <div className={styles.container}>
      <div className={styles.logo}>
          <img src={`/images/logo/scp--${theme.foreground}.svg`} alt="Senior Care Prism logo" />
      </div>
      <NavLinks styles={styles} />
      </div>
      
    </header>
  )
}