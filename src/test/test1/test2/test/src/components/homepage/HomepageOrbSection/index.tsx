'use client';

import orbImageMobile from '~/assets/images/temp/ecosystem-orb-mobile.png';
import orbImage from '~/assets/images/temp/ecosystem-orb.png';
import { LinkInCollectionFragment } from '~/cms';
import { ArrowLink, Section, SectionProps } from '~/components/ui';
import { useIsLandscape } from '~/hooks';
import { cx } from '~/utils';
import { ColorName, OmitChildren } from '~/utils/types';

import styles from './HomepageOrbSection.module.scss';

// import { Orb } from './Orb';

interface HomepageOrbSectionProps extends OmitChildren<SectionProps> {
  heading?: string | null;
  copy?: string | null;
  ctas?: { items?: LinkInCollectionFragment[] } | null;
}

const LIGHT_COLORS: ColorName[] = [
  'gold',
  'lavender',
  'pink',
  'white',
  'ai-green',
  'works-purple',
  'exo-fluro',
  'white',
  'exo-blue',
];

export const HomepageOrbSection = (props: HomepageOrbSectionProps) => {
  const { className, heading, copy, ctas, ...otherProps } = props;
  const isLandscape = useIsLandscape();
  // CTAs
  const ctaElements =
    !!ctas && ctas.items?.length
      ? ctas.items.map((cta, index) => {
          return (
            <ArrowLink href={cta.href} key={cta.sys.id} className={styles.cta}>
              {cta.label}
            </ArrowLink>
          );
        })
      : null;
  return (
    <Section {...otherProps} className={cx(className, styles.section)}>
      <div className={styles.content}>
        <h2 className={styles.heading}>{heading}</h2>
        <p className={styles.copy}>{copy}</p>
        {!!ctaElements && <div className={styles.ctas}>{ctaElements}</div>}
      </div>
      <div className={styles.orbWrapper}>
        {/* <Orb lights={LIGHT_COLORS} /> */}
        <img
          loading="lazy"
          alt=""
          width="590"
          height="390"
          className={styles.orb}
          src={isLandscape ? orbImage.src : orbImageMobile.src}
        />
      </div>
    </Section>
  );
};
