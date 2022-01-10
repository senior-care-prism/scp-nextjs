import Head from 'next/head';
import PropTypes, { string } from 'prop-types';
import ResourceFeed from '../../components/ResourceFeed';
import { getResourceEntries, getResourceMaxPage, getAllResourceCategories, getAllResourceSubjects } from '../../lib/api';
import { RESOURCES_SHAPE } from '../../shared/constants';

export default function Resources({ resourceEntries, categories, subjects, allCategories, allSubjects, pageNum, maxPage }) {
	return (
		<>
			<Head>
				<title>Senior Care Prism - Resources</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<ResourceFeed className="no-scroll" resources={resourceEntries} categories={categories} allCategories={allCategories} allSubjects={allSubjects} subjects={subjects} pageNum={pageNum} maxPage={maxPage} />
		</>
	);
}

Resources.propTypes = {
	resourceEntries: RESOURCES_SHAPE.isRequired,
	categories: PropTypes.arrayOf(string),
  subjects: PropTypes.arrayOf(string),
	pageNum     : PropTypes.number.isRequired,
	maxPage     : PropTypes.object.isRequired
};

export async function getServerSideProps({ query }) {
	const pageNum = query.p !== undefined ? parseInt(query.p, 10) : 1;
	const searchTerm = query.searchTerm !== undefined ? query.searchTerm : '';
	const category = query.searchCategory !== undefined ? query.searchCategory : '';
	const subject = query.searchSubject !== undefined ? query.searchSubject : '';
	const allCategories = await getAllResourceCategories();
	const categories = await getAllResourceCategories(subject);
	const subjects = await getAllResourceSubjects(category);
	const allSubjects = await getAllResourceSubjects();
	const resourceEntries = await getResourceEntries({ pageNum, category, subject, searchTerm });
	const maxPage = await getResourceMaxPage({ limitPerPage: 6, category, subject, searchTerm });
	return {
		props : {
			resourceEntries,
			categories,
			subjects,
			allCategories,
			allSubjects,
			pageNum,
			maxPage
		}
	};
}
