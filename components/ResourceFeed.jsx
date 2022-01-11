import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes, { string } from 'prop-types';
import PulseLoader from 'react-spinners/PulseLoader';
import ResourceCard from './ResourceCard';
import Pagination from './Pagination';
import { cleanupQuery, formatQuerystring } from '../lib/utils';
import { RESOURCE_SHAPE } from '../shared/constants';
import styles from '../styles/ResourceFeed.module.scss';
import { MultiSelect } from "react-multi-select-component";

const Search = ({ categories, subjects, allCategories, allSubjects, resourcesTotal }) => {
 
  // if available get initial values from router
  const router = useRouter();
  const { query } = router;
  const searchSubject = query.searchSubject ? [decodeURIComponent(query.searchSubject)] : [];
  const searchSubjectArray = query.searchSubject ? [{ label: decodeURIComponent(query.searchSubject), value: decodeURIComponent(query.searchSubject) }] : [];
  const searchCategory = query.searchCategory ? [decodeURIComponent(query.searchCategory)] : [];
  const searchCategoryArray = query.searchCategory ? [{ label: decodeURIComponent(query.searchCategory), value: decodeURIComponent(query.searchCategory) }] : [];

  // set initial values
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState(searchCategory);
  const [selectedCategoriesArray, setSelectedCategoriesArray] = useState(searchCategoryArray);
  const [selectedSubjects, setSelectedSubjects] = useState(searchSubject);
  const [selectedSubjectsArray, setSelectedSubjectsArray] = useState(searchSubjectArray);
  const [searchTimeout, setSearchTimeout] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  
  const filteredCategories = allCategories.map((cat) => categories.includes(cat) ? { label: cat, value: cat } : { label: cat, value: cat, disabled: true });
  const filteredSubjects = allSubjects.map((sub) => subjects.includes(sub) ? { label: sub, value: sub } : { label: sub, value: sub, disabled: true });

  //Multiselect overrides for default renderers
  const multiselectItemRenderer = ({
    checked,
    option,
    onClick,
    disabled,
  }) => (
    <div className={`multiselect-item ${disabled && "disabled"}`}>
      <input
        className={`multiselect-checkbox ${disabled && "disabled"}`}
        type="checkbox"
        onChange={onClick}
        checked={checked}
        tabIndex={-1}
        disabled={disabled}
      />
      <span className={`multiselect-label ${disabled && "disabled"}`} >{option.label}</span>
    </div>
  );
  const multiselectArrow = () => (<></>);
  const overrideStrings = {
    "allItemsAreSelected": "All items are selected.",
    "clearSearch": "Clear Search",
    "clearSelected": "Clear Selected",
    "noOptions": "No options",
    "search": "Search",
    "selectAll": "Any",
    "selectAllFiltered": "Select All (Filtered)",
    "selectSomeItems": "Select...",
    "create": "Create",
  };
  
  const handleReset = (e) => {
    e.preventDefault();
    if (searchTerm !== '' || selectedCategories.length !== 0 || selectedSubjects.length !== 0) {
      setSearchTerm('');
      setSelectedCategories([]);
      setSelectedCategoriesArray([]);
      setSelectedSubjects([]);
      setSelectedSubjectsArray([]);
      handleSearch(e);
    }
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
    query.searchTerm = encodeURIComponent(searchTerm);
    query.searchCategory = encodeURIComponent(selectedCategories);
    query.searchSubject = encodeURIComponent(selectedSubjects);
    query.p = '1';
  });
  return (
    <>
      <form className={styles['search-form']}>
        <div className={styles.category}>
          <label htmlFor="category">Categories:</label>
          <MultiSelect
              debounceDuration = {700}
              ArrowRenderer={multiselectArrow}
              ItemRenderer={multiselectItemRenderer}
              overrideStrings={overrideStrings}
              options={filteredCategories}
              value={selectedCategoriesArray}
              onChange={handleCategories}
              labelledBy="categories"
              disableSearch
            />
        </div>
        <div className={styles.subject}>
        <label htmlFor="subject">Subject(s):</label>
          <MultiSelect
            debounceDuration = {700}
            ArrowRenderer={multiselectArrow}
            ItemRenderer={multiselectItemRenderer}
            overrideStrings={overrideStrings}
            options={filteredSubjects}
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
        </div>
        <div className={styles['total-reset']}>
          <span className={styles.total}>Total: {resourcesTotal || 0}</span>
          <button className={styles.reset} onClick={handleReset}>reset search</button>
          <div className={styles.pulseloader}>
            <PulseLoader loading={isSearching} size={4} color="#30173a" />
          </div>
        </div>
        <div className={styles['pulseloader-mob']}>
          <PulseLoader loading={isSearching} size={4} color="#30173a" />
        </div>
      </form>
    </>
  );
};

Search.propTypes = {
  categories: PropTypes.arrayOf(Object).isRequired,
  subjects: PropTypes.arrayOf(Object).isRequired
};

function ResourceFeed({ resources, categories, subjects, allCategories, allSubjects, maxPage }) {

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
          <Search categories={categories} subjects={subjects} allCategories={allCategories} allSubjects={allSubjects} resourcesTotal={maxPage.total}/>
          <div className={styles['top-paginator']}>
            <Pagination maxPage={maxPage.maxPage || 0} siblingCount={1}/>
          </div>
        </div>
        <span className={styles.total}>Total: {maxPage.total || 0}</span>
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
        <div className={styles['bottom-paginator']}>
          <Pagination maxPage={maxPage.maxPage || 0} siblingCount={1}/>
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
  maxPage: PropTypes.object.isRequired,
};

export default ResourceFeed;