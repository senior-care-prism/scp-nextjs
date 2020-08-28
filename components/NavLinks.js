export default function  NavLinks(props)  {
  const navLinks = ["About Us", "Services", "Resources", "Contact"]
  return (
    <div className={props.styles.navbar}>
      <nav role="navigation">
        <ul>
          {navLinks.map((navLink, i) => (
            <li key={i}>{navLink}</li>
          ))}
        </ul>
      </nav>
    </div>
  )
}