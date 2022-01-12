import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Tween } from 'react-gsap';
import styles from '../styles/Header.module.scss';
import NavLinks from './NavLinks';

function Header({ path }) {
	const [
		offset,
		setOffset
	] = useState(0);

	const logo = (
		<path
			d="M1576,1429h-49c-0.6-22.47-13.41-33.54-32-38-24.86-5.96-62.91,8.69-55,37,5.85,20.94,34.39,26.21,55,33,37.76,12.44,94.39,38.78,80,95-2.02,7.88-2.29,14-6,20-17.76,28.76-72.83,48.63-121,33-35.64-11.56-64.44-32.38-66-78h50c0.03,28.09,16.95,37.73,40,43,27.16,6.22,61.11-9.74,55-36-5.7-24.48-28.89-27.86-51-36-32.93-12.13-68.75-24.37-82-56-2.44-5.82-1.42-10.89-3-18-2.02-9.08-.25-22.3,3-30,14.46-34.3,72.35-59.8,124-43C1549.26,1365.17,1576.33,1387.26,1576,1429Zm1026,19c0.04-24.21-8.87-45.87-26-53-6.48-2.7-11.99-1.3-20-3-4.87-1.03-12.23-1.52-18,0q-7.995,3-16,6c-18.16,11.33-21.67,32.41-27,57v31c0,36.57,4.53,67.15,27,81,5.76,3.55,11.06,3.18,19,5,40.23,9.24,60.96-19.44,61-55h49c0.56,52.96-28.12,79.79-69,92-20.25,6.05-54.54,5.72-73-2-39.71-16.6-53.83-48.19-64-95-2.08-9.56-1.88-35.29,0-44v-15c1.61-7.29,1.75-15.5,4-23,9.78-32.58,29.2-59.51,59-72,22.64-9.49,64.26-9.58,87,0,24.2,10.2,41.8,29.78,51,55,3.87,10.61,2.26,23.47,6,35h-50Zm-1328-94c-1.8,10.35-19.24,30.9-25,40-11.23,17.74-20.82,35.27-32,53-6.43,10.2-14.47,19.82-20,31-19.44.76-39.86,7.62-56,13-43.05,14.35-79.51,28.49-114,50-123.988,77.32-234.485,213.07-235,413H675c-2.256-103.24,28.871-199.69,64-267C834.081,1504.8,1004.83,1362.03,1274,1354Zm730,1h48v46h-48v-46Zm-229,175H1653c0.85,24.68,27.76,55.02,57,43,6.91-2.84,13.23-8.95,17-15,0.91-1.47-.44-3.17,1-4h47v1c-5.11,6.54-7.28,15.29-12,22-12,17.05-32,30.01-55,36-19.11,4.98-40.24-1.92-52-8-29.87-15.43-50.99-38.86-51-84v-21c1.98-8.95,2.68-18.88,6-27,13.34-32.64,31.19-46.27,69-55,10.25-2.37,27.48-1.83,37,1,7.69,2.29,16.67,5.78,23,10C1768.3,1447.85,1775.36,1481.82,1775,1530Zm193,80h-48V1510c0-16.29,1.67-35.2-5-45-4.89-7.18-15.63-8.23-26-10-14.33-2.45-31.36,10.96-35,20v135h-47V1420h44q1.005,10.995,2,22h1c17.5-27.81,79.12-36.17,101-6,5.98,8.25,9.3,19.62,12,31,3.28,13.84,1,32.5,1,48v95Zm192-193c50.19-.62,79.33,14.93,94,49,3.9,9.06,5.73,19.76,8,30a75.077,75.077,0,0,1,0,28c-2.15,9.86-.25,17.51-3,26-11.4,35.24-32.63,54.43-71,63-15.85,3.54-35.93-1.31-46-5-29.56-10.84-46.33-30.56-55-62-1.96-7.12-.3-13.06-2-21-2.89-13.47-.78-33.29,3-45,8.24-25.56,24.24-47.04,48-57C2143.01,1420.06,2153.46,1421.07,2160,1417Zm179,193h-47V1420h45c-0.13,9.87.25,20.33,2,29,0.8-1.02.35-.27,1-2,3.45-3.69,4.95-8.88,8-13,10.16-13.69,30.13-19.84,53-15v4c-3.22,5.07-1.11,33.51-1,42h-1c-9.73-6.18-32-.6-39,3-7.45,3.83-13.72,8.25-17,16-5.04,11.9-4,29.39-4,46v80Zm440-116c0.59-18.65-1.22-33.01-13-39-19.64-9.98-45.56.98-46,21h-48c3.33-31.68,23.66-47.58,50-56,40.75-13.03,83.43,5.12,98,29,8.42,13.8,7,36.8,7,59,0,37.44-1.8,76.98,10,102h-51c-0.71-3.91-2.89-15.11-6-17-9.27,14.28-38.58,26.08-65,19-22.62-6.06-54.99-29.09-47-64C2678.99,1499.98,2719.54,1493.42,2779,1494Zm189-30c-21.67-.24-42.06-1.69-52,12-8.38,11.53-8,28.58-8,49v85h-48V1420h45q1.005,14.505,2,29h1v-1c3.85-4.2,5.58-10.41,9-15,9.76-13.11,30.24-18.79,52-14v21C2966.18,1444.36,2967.87,1457.59,2968,1464Zm182,66H3028c-0.18,27.21,29.74,55.14,59,42,6.75-3.03,10.1-10.05,15-15v-3h47c-1.78,12.15-10.95,19.96-17,28-15.44,20.52-51.02,41.4-89,29-30.21-9.87-51.8-32.08-61-63-2.03-6.82-.36-12.29-2-20-1.82-8.53-2.14-22.72,0-32,1.79-7.79,3.02-16.74,6-24,9.97-24.32,28.09-43.66,54-52,5.31-1.71,8.99-.65,15-2,8.24-1.84,23.45-2.21,32,0,8.84,2.28,18.77,5.5,26,10C3142.36,1446.28,3150.35,1481.52,3150,1530ZM2004,1420h48v190h-48V1420Zm-350,77h74c0.57-27.44-19.64-52.86-50-40C1664.97,1462.52,1654.44,1479.08,1654,1497Zm512-42q-6,1.995-12,4c-7.8,4.66-14.73,14.9-18,24-12.96,36.03-.33,102.91,45,92,25.29-6.08,40.77-37.46,33-72q-0.495-6.495-1-13C2206.29,1467.69,2196.11,1454.46,2166,1455Zm937,42c0.14-24.26-9.12-36.14-29-41-9.36-2.29-20.75-.1-27,4-10.82,7.1-16.2,21.87-19,37h75Zm-1828-25v102c-38.41.8-75.36,4.93-106,15-18.57,6.1-36.76,15.98-55,21v-1c11.84-11.98,22.5-35.95,32-51,16.53-26.19,37.16-51.85,51-80,9.88-.17,20.12-2.05,29-4Q1250.495,1473,1275,1472Zm1504,50c-21.79-.67-47.98-0.33-57,12-8.31,11.35-8.4,34.13,6,39,13.55,11.13,44.12-1.19,48-13C2781.37,1553.11,2779.14,1533.69,2779,1522Zm-1670,91h2c-3.93,8.39-10.24,15.5-15,23q-19.2,30.3-38,60c-35.94,56.69-70.215,113.23-106,170-11.867,18.83-23.87,37.77-36,57-5.809,9.21-15.8,18.84-19,30h-1v-18c3.463-5.97.267-16.54,2-24q3-18.495,6-37c10.142-35.65,19.5-71.21,37-100,27.765-45.69,59.73-88.93,102-120,12.21-8.98,25.19-18.04,38-26C1089.69,1622.6,1101.71,1619.92,1109,1613Zm166,80v102c-77.57-.42-132.7,52.81-152,111-4.67,14.09-7.05,30.28-7,48H1014c-1.04-47.28,10.99-84.34,27-115C1082.01,1760.45,1156.39,1693.26,1275,1693Zm119,6c81.48-.76,152.7-9.5,184,42,4.28,7.05,6.97,17.3,9,26,3.98,17.05-1.12,36.49-6,48-19.93,47.02-70.35,48.38-138,48v91h-49V1699Zm357,0h48v46h-48v-46Zm-308,40v84c43.88,0.66,85.38,5.23,94-30,2.63-10.76-1.04-24.15-4-30C1517.89,1733.16,1486.63,1738.36,1443,1739Zm279,24q-0.495,22.995-1,46c-23.15-.79-42.65-1.39-53,13-7.63,10.61-7,27.46-7,46v86h-48V1765h45q1.005,14.505,2,29h1v-2c3.13-3.38,4.23-8.19,7-12,6.01-8.27,25.66-22.81,43-19A83.378,83.378,0,0,0,1722,1763Zm266,59h-47c-0.44-12.57-7.6-21.49-17-25-15.38-5.74-38.82.31-41,14-2.22,2.98-2.21,9.02,0,12,4.64,15.11,25.32,14.6,41,19,31.01,8.7,56.05,15.73,64,48,1.01,4.08,2.41,14.38,1,20-9.39,37.41-62.49,60.11-111,44-24.85-8.25-47.15-27.73-49-59h46c0.54,23.42,31.1,36.75,55,26,5.53-2.49,8.12-7.84,12-12,0.5-5.2,1.86-10.15-1-14-5.09-13.43-23.25-13.85-38-18-30.29-8.52-66.92-17.5-67-56-0.02-7.15-.19-13.67,2-19C1861.63,1744.64,1988.88,1744.96,1988,1822Zm303,132h-47v-99c0-15.86,1.56-35.23-5-45-3.75-5.58-11.34-8.28-19-10-13.03-2.92-28.22,3.86-33,10-8.16,10.47-7,27.88-7,47v97h-48v-99c0-16.24,1.65-35.19-5-45-3.5-5.17-10.98-8.37-18-10-14.55-3.38-30.91,4.07-36,11-6.79,9.25-5,27.98-5,44v99h-48V1765h45c0.43,5.25.33,16.37,3,20,21.82-33.87,87.52-30.65,105,5,8.34-7.98,14.62-18.03,26-23,7.35-3.21,16.5-4.16,25-6,13.29-2.88,29.21,3.05,37,7,11.66,5.9,19.91,13.83,25,26,6.29,15.02,5,36.99,5,58v102Zm-540-189h48v189h-48V1765Z"
			transform="translate(-674.906 -1349.69)"
		/>
	);

	const tw = React.useRef(null);
	const tweenFrom = { fill: '#f9cf74' };
	const tweenTo = {
		y      : -15,
		scale  : 0.65,
		fill   : '#fff',
		paused : true
	};
	const tween = (
		<Tween ref={tw} from={tweenFrom} to={tweenTo}>
			<div className={cn(styles.svg)}>
				<svg xmlns="http://www.w3.org/2000/svg" width="357" height="88" viewBox="0 0 2475.094 609.56">
					{logo}
				</svg>
			</div>
		</Tween>
	);

	useEffect(() => {
		window.onscroll = () => {
			setOffset(window.pageYOffset);
		};
		tw.current.getGSAP().progress(offset / 200.0);
		(path.includes('news') || path.includes('resources')) || path.includes('mail') && tw.current.getGSAP().progress(1);
	});

	return (
		<header className={styles.header}>
			<Link href="/" passHref>
				<a className={styles.logolink} ><div className={styles.logocontainer}>{tween}</div></a>
			</Link>
			<NavLinks styles={styles} path={path} offset={offset} />
		</header>
	);
}

Header.propTypes = {
	path : PropTypes.string.isRequired
};

export default Header;
