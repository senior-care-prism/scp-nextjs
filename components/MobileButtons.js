export default function  MobileButtons(props)  {
  const navLinks = [
    {"id": 1, "to": "email", "icon" : "ri-mail-fill", "scroll": true},
    {"id": 2, "to": "phone", "icon" : "ri-phone-fill", "scroll": true}, 

  ]
  return (
    <div className={props.styles.mobile}>
      <nav role="navigation">
        <ul>
          {navLinks.map((link) => (
            <li key={link.id} className={props.styles.navlink}>
              <Link 
                activeClass="active"
                spy={true} smooth={true} offset={-100} duration={500}
                to={link.to}
              >
                <span key={link.icon} className={styles.icon}>
                  <i className={cn(link.icon, iconSize)} />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}