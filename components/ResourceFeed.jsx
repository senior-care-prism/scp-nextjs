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
import { MultiSelect } from "react-multi-select-component";

const Paginator = ({ pageNum, maxPage }) => {
  const router = useRouter();
  const { query } = router;
  const isDisabled = maxPage.maxPage === 0;
  const isFirstPage = isDisabled || pageNum === 1;
  const isLastPage = isDisabled || pageNum === maxPage.maxPage;

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
        {Array(maxPage.maxPage).fill().map((_, idx) => (
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

const Search = ({ categories, subjects, resourcesTotal }) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedCategoriesArray, setSelectedCategoriesArray] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [selectedSubjectsArray, setSelectedSubjectsArray] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const subjectOptions = subjects.map((s) => { return ({ label: s, value: s }) });
  const categoryOptions = categories.map((s) => { return ({ label: s, value: s }) });
  
  //Multiselect overrides for default renderers
  const multiselectItemRenderer = ({
    checked,
    option,
    onClick,
    disabled,
  }) => (
    <div className={`subject-item ${disabled && "disabled"}`}>
      <input
        className="subject-checkbox"
        type="checkbox"
        onChange={onClick}
        checked={checked}
        tabIndex={-1}
        disabled={disabled}
      />
      <span className="subject-label">{option.label}</span>
    </div>
  );
  const multiselectArrow = () => ( <></> );
  
  const handleReset = async (e) => {
    e.preventDefault();
    setSearchTerm('');
    setSelectedCategories([]);
    setSelectedCategoriesArray([]);
    setSelectedSubjects([]);
    setSelectedSubjectsArray([]);
    handleSearch(e);
  }

  const handleSearch = (e) => {
    e.preventDefault && e.preventDefault();
    e.target?.name === 'searchTerm' && setSearchTerm(e.target.value);
    e.target?.name === 'categories' && setSelectedCategories(e.target.value.map(s => s.value));
    e.target?.name === 'subjects' && setSelectedSubjects(e.target.value.map(s => s.value));
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

  const handleSubjects = (selectedItems) => {
    const payload = { target: { name: 'subjects', value: selectedItems } };
    setSelectedSubjectsArray(selectedItems);
    handleSearch(payload);
  }

  const handleCategories = (selectedItems) => {
    const payload = { target: { name: 'categories', value: selectedItems } };
    setSelectedCategoriesArray(selectedItems);
    handleSearch(payload);
  }

  useEffect(() => { 
    const { query } = router;
    query.searchTerm = searchTerm;
    query.searchCategory = selectedCategories;
    query.searchSubject = selectedSubjects;
    query.p = '1';
  });
  return (
    <>
      <form className={styles['search-form']}>
        <div className={styles.category}>
          <label htmlFor="category">Categories:</label>
            <MultiSelect
              ArrowRenderer={multiselectArrow}
              ItemRenderer={multiselectItemRenderer}
              options={categoryOptions}
              value={selectedCategoriesArray}
              onChange={handleCategories}
              labelledBy="categories"
              disableSearch
            />
        </div>
        <div className={styles.subject}>
        <label htmlFor="subject">Subject(s):</label>
          <MultiSelect
            ArrowRenderer={multiselectArrow}
            ItemRenderer={multiselectItemRenderer}
            options={subjectOptions}
            value={selectedSubjectsArray}
            onChange={handleSubjects}
            labelledBy="subjects"
            disableSearch
          />
        </div>
        <div className={styles.search}> 
          <i className="ri-search-line" name="search" />
          <input
            type="text"
            name="searchTerm"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Keyword"
          />
          <PulseLoader loading={isSearching} size={8} color="#1d5085" />
        </div>
        <div className={styles['total-reset']}>
          <span className={styles.total}>Total: {resourcesTotal}</span>
          <button className={styles.reset} onClick={handleReset}>reset search</button>
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
    <section id="resource-feed" className={styles['resource-feed']}>
      <div className={styles.logo}>
        <img src="/images/logo/scp--eggplant.svg" alt="Senior Care Prism logo" />
      </div>
      <div className={styles.content}>
        <div className={styles['section-heading']}>
          <h2>Resources</h2>
        </div>
        <div className={styles['page-controls']}>
          <Search categories={categories} subjects={subjects} resourcesTotal={maxPage.total}/>
          <div className={styles['top-paginator']}>
            <Paginator pageNum={pageNum} maxPage={maxPage} />
          </div>
        </div>
        <span className={styles.total}>Total: {maxPage.total}</span>
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