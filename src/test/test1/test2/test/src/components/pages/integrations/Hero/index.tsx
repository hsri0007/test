'use client';

import { motion, useScroll } from 'framer-motion';
import { useRef } from 'react';

import { IntegrationsContentFragment, Maybe } from '~/cms';
import { CMSImage } from '~/components/ui';
import { Section } from '~/components/ui';

import styles from './Hero.module.scss';

interface HeroProps {
  image: IntegrationsContentFragment['heroImage'];
  hiddenHeroText: Maybe<string>;
}

const Hero = (props: HeroProps) => {
  const { image, hiddenHeroText } = props;

  const ref = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();

  return (
    <Section className={styles.container} isDark>
      <motion.div className={styles.imageWrap} style={{ translateY: scrollY }} ref={ref}>
        <h1 className={styles.hiddenHeroText}>{hiddenHeroText}</h1>
        <CMSImage asset={image} className={styles.image} />
      </motion.div>

      <div className={styles.gradient} />
    </Section>
  );
};

export { Hero };
