import { Link, animateScroll as scroll } from "react-scroll";

export default function  NavLinks(props)  {
  const navLinks = [
    {"id": 1, "to": "about-us", "scroll": true},
    {"id": 2, "to": "our-team", "scroll": true}, 
    {"id": 3, "to": "resources", "scroll": false }, 
    {"id": 4, "to": "contact", "scroll": true}
  ]
  return (
    <div className={props.styles.navbar}>
      <nav role="navigation">
        <ul>
          {navLinks.map((link) => (
            <Link 
            activeClass="active"
            spy={true} smooth={true} offset={-100} duration={500}
            to={link.to}
            >
            <li key={link.id}>
              {link.to.replace('-',' ')}
            </li></Link>
          ))}
        </ul>
      </nav>
    </div>
  )
}