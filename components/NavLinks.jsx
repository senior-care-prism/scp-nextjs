import React, { useEffect } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Tween } from 'react-gsap';

function NavLinks({ styles, path, offset }) {
	const tw = React.useRef(null);
	const navLinks = [
		// TODO: handle nav-links from non-home locations.
		{ id: 1, to: 'about-us', href: '/#about-us', scroll: true },
		{ id: 2, to: 'news', href: '/news', scroll: true },
		{ id: 2, to: 'resources', href: '/resources', scroll: true },
		{ id: 3, to: 'our-team', href: '/#our-team', scroll: true },
		{ id: 4, to: 'contact', href: '/#contact', scroll: true }
	];
	const sacramento = '#023534';

	useEffect(() => {
		tw.current.getGSAP().progress(offset / 2 / 100.0);

		console.log('Current navlink path is ', path);
		(path.includes('news') || path.includes('resources')) && tw.current.getGSAP().progress(1);
	});

	return (
		<>
			<div className={styles['toggle-background']}/>
			<input type="checkbox" className={styles.toggle} id={styles['nav-toggle']}></input>
			<label htmlFor={styles['nav-toggle']} id={styles['nav-toggle-label']}>
				<div className={styles.bar} />
				<div className={styles.bar} />
				<div className={styles.bar}/>
			</label>
			<Tween 
				ref={tw}
				to={{
					backgroundColor : sacramento,
					paused          : true
				}}
			>
			<nav className={styles.navbar} role="navigation">
				<ul>
					{navLinks.map((link) => (
						<li key={link.id} className={styles.navlink}>
							<Link href={link.href} passHref>
								<a>{link.to.replace('-', '\u00a0')}</a>
							</Link>
						</li>
					))}
				</ul>
				</nav>
			</Tween>
		</>
	);
}

NavLinks.propTypes = {
	styles : PropTypes.object.isRequired
};

export default NavLinks;
