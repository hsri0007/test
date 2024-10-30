import { useEffect, useState } from 'react';

import { PeopleContentFragment } from '~/cms';
import { QuotationOpen } from '~/components/svgs/QuotationOpen';
import { Section, SectionProps } from '~/components/ui';
import { cx } from '~/utils';
import { OmitChildren } from '~/utils/types';

import styles from './TeamGrid.module.scss';
import { TeamGridPerson } from './TeamGridPerson';

interface TeamGridProps
  extends OmitChildren<SectionProps>,
    Pick<PeopleContentFragment, 'teamAndQuotesCollection'> {}

export const TeamGrid = (props: TeamGridProps) => {
  const { className, teamAndQuotesCollection, ...otherProps } = props;

  // convoltued function to add a spacer in appropriate places; i.e., if there
  // are only three portraits in the final row before a quote (so portraits will
  // be aligned to the right)
  const generateItemsWithSpacers = (arr: null | any[]) => {
    if (arr === null) return;
    let newArr = [...arr];
    // find indexes of quotes
    const quoteIndexes: number[] = [];
    newArr.forEach((item, index) => {
      if (item.__typename === 'Quote') {
        quoteIndexes.push(index);
      }
    });

    // track offset in newArr for when we're pushing in spacers
    let arrOffset = 0;
    quoteIndexes.forEach((quoteIndex, i) => {
      if (i === 0) {
        if (quoteIndex % 4 === 3) {
          newArr.splice(quoteIndex + arrOffset - 3, 0, { __typename: 'Spacer' });
          arrOffset++;
        }
      } else {
        if ((quoteIndex - quoteIndexes[i - 1] + arrOffset) % 4 === 3) {
          newArr.splice(quoteIndex + arrOffset - 3, 0, { __typename: 'Spacer' });
          arrOffset++;
        }
      }
    });
    return newArr;
  };

  const teamItems =
    teamAndQuotesCollection && generateItemsWithSpacers(teamAndQuotesCollection.items);

  return (
    <Section {...otherProps} className={cx(styles.section, className)}>
      <ul className={styles.grid}>
        {teamItems?.length &&
          teamItems.map((item, idx) => {
            switch (item.__typename) {
              case 'Spacer':
                return <li key={idx} className={styles.spacer} />;
              case 'Person':
                return <TeamGridPerson key={item.sys.id} {...item} title={item.title ?? ''} />;
              case 'Quote':
                return (
                  <li key={item.sys.id} className={styles.quoteWrapper}>
                    <blockquote className={styles.quote}>
                      <QuotationOpen className={styles.quoteIcon} />
                      <p className={styles.quoteContent}>{item.content}</p>
                      {!!item.attribution && (
                        <cite className={styles.attribution}>{`${item.attribution}${
                          !!item.attributionDetail ? `, ${item.attributionDetail}` : ''
                        }`}</cite>
                      )}
                    </blockquote>
                  </li>
                );
            }
          })}
      </ul>
    </Section>
  );
};

export default TeamGrid;
