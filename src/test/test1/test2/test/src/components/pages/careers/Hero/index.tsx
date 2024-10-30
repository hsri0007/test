'use client';

import { BackgroundCanvas, BackgroundConfig } from '~/components/3d';
import { Section } from '~/components/ui';

import styles from './Hero.module.scss';
import bgConfig from './bgConfig.yml';

interface HeroProps {
  eyebrow: string | null;
  heading: string | null;
}

const Hero = (props: HeroProps) => {
  const { eyebrow, heading } = props;

  return (
    <Section className={styles.container}>
      <div className={styles.background}>
        <BackgroundCanvas config={bgConfig as BackgroundConfig} backgroundColor={0xf7f9fc} />
      </div>
      {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
      {heading && <p className={styles.heading}>{heading}</p>}
    </Section>
  );
};

export { Hero };
