import { ExoIrisContentFragment } from '~/cms';
import { ArrowLink, CMSImage, Section, SectionProps } from '~/components/ui';
import { cx } from '~/utils';

import styles from './ExploreHighlightSection.module.scss';

interface ExploreHighlightSectionProps extends SectionProps {
  className?: string | undefined;
  exploreHighlightCollection: ExoIrisContentFragment['exploreHighlightSectionCollection'];
}

export const ExploreHighlightSection = ({
  className,
  exploreHighlightCollection,
}: ExploreHighlightSectionProps) => {
  return (
    <Section className={cx(styles.explore, className)}>
      <div className={styles.contentWrapper}>
        {exploreHighlightCollection?.items.map((item, index) => {
          const { icon, heading, description, cta } = item;

          return (
            <div key={index} className={styles.item}>
              <CMSImage loading="lazy" className={styles.icon} asset={icon} />
              <h3 className={styles.heading}>{heading}</h3>
              <span className={styles.desc}>{description}</span>
              <ArrowLink className={styles.cta} href={cta?.href}>
                {cta?.label}
              </ArrowLink>
            </div>
          );
        })}
      </div>
    </Section>
  );
};
