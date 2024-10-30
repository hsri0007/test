'use client';

import { useRef } from 'react';

import { BackgroundCanvas, BackgroundConfig } from '~/components/3d';
import bgConfig from '~/components/homepage/HomepageHero/bgConfig.yml';
import { AbstractCircles } from '~/components/sections/BlobGradientHeroSection/AbstractCircle';
import { Section } from '~/components/ui';

import styles from './Hero.module.scss';

export interface IHeroProps {
  title?: string;
  description?: string;
}

const Hero = (props: IHeroProps) => {
  const gradientContainerRef = useRef<HTMLDivElement>(null);
  const { title, description } = props;
  return (
    <div>
      <div className={styles.gradientContainer} ref={gradientContainerRef} aria-hidden>
        <BackgroundCanvas
          backgroundColor={'#F7F9FC'}
          grainIntensity={0}
          targetOpacityDuration={3}
          className={styles.graidentBackgroundCanvas}
          config={bgConfig as BackgroundConfig}
        />
      </div>
      <AbstractCircles isDark={false} circleCount={3}></AbstractCircles>
      <Section className={styles.container}>
        <div className={styles.content}>
          <h1>{title}</h1>
          <div className={styles.subTitle}>{description}</div>
        </div>
      </Section>
      {/* <div className={styles.linearGradient} /> */}
    </div>
  );
};

export { Hero };
