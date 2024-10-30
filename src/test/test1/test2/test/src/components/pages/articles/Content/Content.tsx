'use client';

import { useState } from 'react';

import { NewsroomMediaCoverageFragment } from '~/cms';

import { List } from '../List';
import { Pagination } from '../Pagination';
import styles from './Content.module.scss';
import { PAGINATION_INCREMENT, PAGINATION_START } from './constants';

interface ContentProps {
  data: NewsroomMediaCoverageFragment['mediaCollection'];
  heading: string;
}

const Content = (props: ContentProps) => {
  const { data, heading } = props;

  const [pagination, setPagination] = useState(PAGINATION_START);

  // check for no article data in the CMS
  if (!data || !data.items) {
    return null;
  }

  // pagination limit calculation
  const reachedLimit = pagination >= data.items.length;

  // pagination increment setter
  const increaseLimit = () => setPagination((current) => current + PAGINATION_INCREMENT);

  // apply pagination to articles list
  const paginated = data.items.slice(0, pagination);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.heading}>{heading}</h1>
      </div>

      <List data={paginated} showDate />

      <Pagination reachedLimit={reachedLimit} increaseLimit={increaseLimit} />
    </div>
  );
};

export { Content };
