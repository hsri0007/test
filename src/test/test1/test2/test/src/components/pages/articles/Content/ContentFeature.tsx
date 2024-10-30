'use client';

import { useState } from 'react';

import { NewsroomArticlesFragment } from '~/cms';

import { List } from '../List';
import { Pagination } from '../Pagination';
import styles from './Content.module.scss';
import { PAGINATION_INCREMENT, PAGINATION_START } from './constants';

interface ContentFeatureProps {
  data: NewsroomArticlesFragment['articleCollection'];
  heading: string;
}

const ContentFeature = (props: ContentFeatureProps) => {
  const { data, heading } = props;

  const [pagination, setPagination] = useState(PAGINATION_START);

  // check for no article data in the CMS
  if (!data || !data.items) {
    return null;
  }

  // check for featured article
  const featured = data.items.find((item) => item.featuredArticle);

  // pagination limit calculation
  const reachedLimit = pagination >= (featured ? data.items.length - 1 : data.items.length);

  // pagination increment setter
  const increaseLimit = () => setPagination((current) => current + PAGINATION_INCREMENT);

  // apply pagination to articles list
  let paginated = data.items;

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

      <List data={paginated} featured={featured} showDate />

      <Pagination reachedLimit={reachedLimit} increaseLimit={increaseLimit} />
    </div>
  );
};

export { ContentFeature };
