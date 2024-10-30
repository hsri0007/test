import { PeopleContentFragment } from '~/cms';
import { Section, SectionProps } from '~/components/ui';
import { cx } from '~/utils';
import { OmitChildren } from '~/utils/types';

import styles from './PeopleHero.module.scss';

interface PeopleHeroProps
  extends OmitChildren<SectionProps>,
    Pick<PeopleContentFragment, 'heading' | 'heroQuote'> {}

export const PeopleHero = (props: PeopleHeroProps) => {
  const { className, heading, heroQuote, ...otherProps } = props;
  return (
    <Section {...otherProps} className={cx(styles.section, className)}>
      <div className={styles.content}>
        {!!heading && <h1 className={styles.heading}>{heading}</h1>}
        {!!heroQuote && (
          <blockquote className={styles.quote}>
            <p
              className={styles.quoteContent}
              dangerouslySetInnerHTML={{ __html: heroQuote.content ?? '' }}
            />
            {!!heroQuote.attribution && (
              <cite className={styles.attribution}>{`${heroQuote.attribution}${
                !!heroQuote.attributionDetail ? `, ${heroQuote.attributionDetail}` : ''
              }`}</cite>
            )}
          </blockquote>
        )}
      </div>
    </Section>
  );
};
