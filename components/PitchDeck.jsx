import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from '../styles/PitchDeck.module.scss';
import * as gtag from '../lib/gtag';

function PitchDeck({ heading }) {
	const trackDownload = (e) => {
		gtag.event({
			action   : 'download_pitch_deck',
			category : 'pdf',
			label    : e.target.attributes.href.value
		});
	};

	return (
		<section className={styles.pitch}>
			<div className={styles.container}>
				<h2>{heading}</h2>
				<a
					href="/uploads/SCP-Client.pdf"
					className={cn(styles.button, styles.inverted)}
					onClick={trackDownload}
					download
				>
					Download Our Pitch and Find Out How
				</a>
			</div>
		</section>
	);
}

PitchDeck.propTypes = {
	heading : PropTypes.string.isRequired
};

export default PitchDeck;
