'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { ResourcesArticlesFragment } from '~/cms';

import { List } from '../List';
import { Pagination } from '../Pagination';
import styles from './Content.module.scss';
import { IS_BROWSER, PAGINATION_INCREMENT, PAGINATION_START } from './constants';

export interface ContentFeatureFilterProps {
  data: ResourcesArticlesFragment['articleCollection'];
  heading: string;
}

/*
  Legacy site used URL hashes to track the active filter.
  The hashes mapped to the Contentful categories as follows:

  #:          'Latest' (all categories)
  #blog:      'Blog' category
  #event:     'Event' category
  #exo-works: 'Exo Works' category
  #guides:    'Guides' category
  #podcast:   'Podcast' category
*/
const legacyHashToCategory = (hash: string) => {
  // catch 'Latest'
  if (hash === '#') return '';

  // remove first character (#), convert dashes to spaces
  return hash.slice(1).replaceAll('-', ' ');
};

const queryParamToCategory = (param: string) => {
  // catch 'Guide' (matching category is named 'Guides' in Contentful)
  if (param === 'guide') return 'guides';

  return param;
};

const ContentFeatureFilter = (props: ContentFeatureFilterProps) => {
  const { data, heading } = props;

  const [pagination, setPagination] = useState(PAGINATION_START);
  const searchParams = useSearchParams();

  // check for query param, but fallback to legacy URL hash
  // if no query param or hash, assume no filter
  const filter = searchParams?.has('category')
    ? queryParamToCategory(searchParams.get('category') as string)
    : IS_BROWSER && window.location.hash
    ? legacyHashToCategory(window.location.hash)
    : '';

  // reset pagination on filter change
  useEffect(() => setPagination(PAGINATION_START), [filter]);

  // check for no article data in the CMS
  if (!data || !data.items) {
    return null;
  }

  // compare filter to article categories
  const matching =
    filter === ''
      ? data.items
      : data.items.filter((item) => {
          // combine category and secondary categories
          let categories = [];

          if (item.category) categories.push(item.category);
          if (item.tags) categories = [...categories, ...item.tags];

          // convert categories to lowercase
          categories = categories.map((x) => x.toLowerCase());

          // check for filter in the categories list
          return categories.includes(filter);
        });

  // check for featured article
  const featured = matching.find((item) => item.featuredArticle);

  // pagination limit calculation
  const reachedLimit = pagination >= (featured ? matching.length - 1 : matching.length);

  // pagination increment setter
  const increaseLimit = () => setPagination((current) => current + PAGINATION_INCREMENT);

  // apply pagination to articles list
  let paginated = matching;

  if (featured) {
    // remove featured article from the list
    paginated = paginated.filter((item) => item !== featured);
  }

  paginated = paginated.slice(0, pagination);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.heading}>{heading}</h1>
      </div>

      <List data={paginated} featured={featured} filter={filter} showCategory />

      <Pagination reachedLimit={reachedLimit} increaseLimit={increaseLimit} />
    </div>
  );
};

export { ContentFeatureFilter };
