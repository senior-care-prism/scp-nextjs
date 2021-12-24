import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import PropTypes, { string } from 'prop-types';
import cn from 'classnames';
import PulseLoader from 'react-spinners/PulseLoader';
import ResourceCard from './ResourceCard';
import { cleanupQuery, formatQuerystring } from '../lib/utils';
import { RESOURCE_SHAPE } from '../shared/constants';
import styles from '../styles/ResourceFeed.module.scss';

const Paginator = ({ pageNum, maxPage }) => {
  const router = useRouter();
  const { query } = router;
  const isDisabled = maxPage === 0;
  const isFirstPage = isDisabled || pageNum === 1;
  const isLastPage = isDisabled || pageNum === maxPage;

  const getPageHref = (targetPage) => router.pathname + formatQuerystring(
    cleanupQuery(query, { p: encodeURIComponent(targetPage) }),
  );

  return (
    <nav>
      <ul className={styles.pagination}>
        <li className={cn(styles['page-item'], { [styles.disabled]: isFirstPage })}>
          { isFirstPage
            ? 'Previous'
            : <Link href={getPageHref(pageNum - 1)} scroll={false}>Previous</Link>}
        </li>
        {Array(maxPage).fill().map((_, idx) => (
          /* eslint-disable react/no-array-index-key */
          <Link key={idx} href={getPageHref(idx + 1)} scroll={false} passHref>
            <a
              className={cn(styles['page-item'], { [styles.active]: idx + 1 === pageNum })}
              href="#page"
            >
              {`${idx + 1}`}
            </a>
          </Link>
        ))}
        <li className={cn(styles['page-item'], { [styles.disabled]: isLastPage })}>
          { isLastPage
            ? 'Next'
            : <Link href={getPageHref(pageNum + 1)} scroll={false}>Next</Link>}
        </li>
      </ul>
    </nav>
  );
};

Paginator.propTypes = {
  pageNum: PropTypes.number.isRequired,
  maxPage: PropTypes.number.isRequired,
};

const Search = ({ categories, subjects }) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchCategory, setSearchCategory] = useState('');
  const [searchSubject, setSearchSubject] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    e.target.name === 'searchTerm' && setSearchTerm(e.target.value);
    e.target.name === 'category' && setSearchCategory(e.target.value);
    e.target.name === 'subject' && setSearchSubject(e.target.value);
    setSearchQuery(searchTerm);
    setIsSearching(true);
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    setSearchTimeout(setTimeout(() => {
      const { query } = router;
      router.push(router.pathname + formatQuerystring(cleanupQuery(query)));
      setIsSearching(false);
    }, 700));
  };
  useEffect(() => { 
    const { query } = router;
    query.searchTerm = searchTerm;
    query.searchCategory = searchCategory;
    query.searchSubject = searchSubject;
    query.p = '1';
  });
  return (
    <>
      <form className={styles['search-form']}>
        <div className={styles.category}>
          <label htmlFor="category">Category:</label>
          <select className={styles['category-list']} name="category" onChange={handleSearch}>
            <option value=""> All</option>
            {categories.map((category) => <option key={category} value={category}>{category}</option>)}
          </select>
        </div>
        <div className={styles.subject}>
          <label htmlFor="cars">Subject:</label>
          <select className={styles['subject-list']} name="subject" onChange={handleSearch}>
            <option value=""> All</option>
            {subjects.map((subject) => <option key={subject} value={subject}>{subject}</option>)}
          </select>
        </div>
        <div className={styles.search}>
          <i className="ri-search-line" />
          <input
            type="text"
            name="searchTerm"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Keyword"
          />
          <PulseLoader loading={isSearching} size={8} color="#1d5085" />
        </div>
      </form>
    </>
  );
};

Search.propTypes = {
  categories: PropTypes.arrayOf(Object).isRequired,
  subjects: PropTypes.arrayOf(Object)
};

function ResourceFeed({ resources, categories, subjects, pageNum, maxPage }) {
  return (
    <section id="news-feed" className={styles['resource-feed']}>
      <div className={styles.content}>
        <div className={styles['section-heading']}>
          <h2>Resources</h2>
        </div>
        <div className={styles['page-controls']}>
          <Search categories={categories} subjects={subjects}/>
          <Paginator pageNum={pageNum} maxPage={maxPage} />
        </div>
        { resources.length > 0
          ? (
            <>
              <div className={styles['card-container']}>
                {resources.map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              </div>
            </>
          )
          : (
            <div className={styles['no-results']}>
              <i className="ri-alert-fill" />
              No results
              <p className={styles['help-text']}>Please try a different search.</p>
            </div>
          )}
        <div className={styles['page-controls']}>
          <Paginator pageNum={pageNum} maxPage={maxPage} />
        </div>

      </div>
    </section>
  );
}

ResourceFeed.propTypes = {
  resources: PropTypes.arrayOf(RESOURCE_SHAPE).isRequired,
  categories: PropTypes.arrayOf(string),
  subjects: PropTypes.arrayOf(string),
  pageNum: PropTypes.number.isRequired,
  maxPage: PropTypes.number.isRequired,
};

export default ResourceFeed;