import { Fragment } from 'react';

import { PersonFragment } from '~/cms';
import { QuotationOpen } from '~/components/svgs/QuotationOpen';

import styles from './PersonBio.module.scss';

interface PersonBioProps extends Pick<PersonFragment, 'bioCollection'> {}

export const PersonBio = (props: PersonBioProps) => {
  const { bioCollection } = props;

  return (
    <div className={styles.bio}>
      <Fragment>
        {bioCollection?.items.map((value) => {
          switch (value.__typename) {
            case 'Quote':
              return (
                <blockquote className={styles.quote}>
                  <QuotationOpen className={styles.quoteIcon} />
                  <p className={styles.quoteContent}>{value.content}</p>
                </blockquote>
              );
            case 'Copy':
              return <p className={styles.copy}>{value.content}</p>;
          }
        })}
      </Fragment>
    </div>
  );
};
