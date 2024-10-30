'use client';

import { BackgroundCanvas, BackgroundConfig } from '~/components/3d';
import { Section, SectionProps } from '~/components/ui';
import { cx } from '~/utils';
import { ColorName } from '~/utils/types';

import { AbstractCircles } from './AbstractCircle';
import styles from './BlobGradientHeroSection.module.scss';
import bgConfig from './bgConfig.yml';

export interface BlobGradientHeroBlob {
  color: ColorName;
  opacity: number;
}

export interface BlobGradientHeroSectionProps extends SectionProps {
  isDark?: boolean;
  circleCount?: number;
}

export const BlobGradientHeroSection = (props: BlobGradientHeroSectionProps) => {
  const { className, children, circleCount = 3, isDark = false, ...otherProps } = props;

  return (
    <Section {...otherProps} className={cx(styles.section, className)} isDark={isDark}>
      {/* <div className={styles.blobContainer}>{blobElements}</div> */}
      <div className={styles.gradientContainer} aria-hidden>
        <BackgroundCanvas
          backgroundColor={'#080b1b'}
          grainIntensity={0}
          targetOpacityDuration={3}
          className={styles.graidentBackgroundCanvas}
          config={bgConfig as BackgroundConfig}
        />
      </div>
      <AbstractCircles isDark={isDark} circleCount={circleCount}></AbstractCircles>
      <div className={styles.content}>{children}</div>
    </Section>
  );
};
