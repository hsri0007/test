import { motion } from 'framer-motion';

import { ExoWorksContentFragment, Maybe } from '~/cms';
import { BlobGradientHeroSection } from '~/components/sections/';

import styles from './ExoWorksHero.module.scss';

interface ExoWorksHeroProps {
  subhead: ExoWorksContentFragment['introSubhead'];
}

export const ExoWorksHero = (props: ExoWorksHeroProps) => {
  return (
    <BlobGradientHeroSection className={styles.container} isDark={true}>
      <div className={styles.copyContainer}>
        <motion.h1
          className={styles.header}
          initial={{ opacity: 0, filter: 'blur(15rem)' }}
          whileInView={{
            opacity: 1,
            filter: 'blur(0rem)',
            transition: { duration: 1, ease: 'linear', delay: 0.5 },
          }}
          viewport={{ once: true }}
        >
          Exo{' '}
          <span className={styles.works}>
            Works
            <span className={styles?.tm}>&#174;</span>
          </span>
        </motion.h1>
        <motion.p
          className={styles.subhead}
          initial={{ opacity: 0, filter: 'blur(15rem)' }}
          whileInView={{
            opacity: 1,
            filter: 'blur(0rem)',
            transition: { duration: 0.5, ease: 'linear', delay: 2 },
          }}
          viewport={{ once: true }}
        >
          {props.subhead}
        </motion.p>
      </div>
    </BlobGradientHeroSection>
  );
};
