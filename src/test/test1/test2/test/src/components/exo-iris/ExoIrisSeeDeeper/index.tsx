'use client';

import dynamic from 'next/dynamic';

import { ExoIrisContentFragment } from '~/cms';
import { Section } from '~/components/ui';
import VideoAltText from '~/components/ui/VideoAltText';
import { cx } from '~/utils';

import styles from './ExoIrisSeeDeeper.module.scss';
import SeeDeeperContent from './SeeDeeperContent';

interface ExoIrisSeeDeeperProps {
  madeSimpleImage: ExoIrisContentFragment['madeSimpleImage'];
  madeSimpleHeading: ExoIrisContentFragment['madeSimpleHeading'];
  madeSimpleCopy: ExoIrisContentFragment['madeSimpleCopy'];
  madeSimpleCta: ExoIrisContentFragment['madeSimpleCta'];
  seeDeeperPhoneCarouselCollection: ExoIrisContentFragment['seeDeeperPhoneCarouselCollection'];
  seeImages: ExoIrisContentFragment['seeImagesCollection'];
  seeHeadings: [
    ExoIrisContentFragment['seeHeading1'],
    ExoIrisContentFragment['seeHeading2'],
    ExoIrisContentFragment['seeHeading3']
  ];
  seeStats: ExoIrisContentFragment['seeStatsCollection'];
}

export const ExoIrisSeeDeeper = (props: ExoIrisSeeDeeperProps) => {
  const {
    madeSimpleImage,
    madeSimpleHeading,
    madeSimpleCopy,
    madeSimpleCta,
    seeImages,
    seeHeadings,
    seeStats,
    seeDeeperPhoneCarouselCollection,
  } = props;

  // const SeeDeeperContent = dynamic(() => import('./SeeDeeperContent'), {
  //   ssr: false,
  // });

  return (
    <Section className={cx(styles.container, 'js__see-deeper-container')} id="see-deeper-section">
      <SeeDeeperContent
        madeSimpleImage={madeSimpleImage}
        madeSimpleHeading={madeSimpleHeading}
        madeSimpleCopy={madeSimpleCopy}
        madeSimpleCta={madeSimpleCta}
        seeImages={seeImages}
        seeHeadings={seeHeadings}
        seeStats={seeStats}
        seeDeeperPhoneCarouselCollection={seeDeeperPhoneCarouselCollection}
      />
    </Section>
  );
};
