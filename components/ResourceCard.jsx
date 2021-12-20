import Link from 'next/link';
import { formatDate } from '../lib/utils';
import { RESOURCE_SHAPE } from '../shared/constants';
import styles from '../styles/ResourceCard.module.scss';

function ResourceCard({ resource }) {
	const resourceRef = {
		pathname : '/resources/[slug]',
		query    : { slug: resource.slug }
	};
	return (
		<div className={styles['resource-card']}>
			<div className={styles['card-title']}>
				<h3>
					<Link href={resourceRef}>{resource.title}</Link>
				</h3>
			</div>
			<div className={styles.content}>
				<p className={styles.excerpt}>{resource.shortDescription}</p>
			</div>
			<div className={styles['card-end']}>
				<Link href={resourceRef}>Read&nbsp;more</Link>
				<div className={styles['published-date']}>{formatDate(resource.publishedDate)}</div>
			</div>
		</div>
	);
}

ResourceCard.propTypes = {
	resource : RESOURCE_SHAPE.isRequired
};

export default ResourceCard;
