import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { ComponentProps } from 'react';

import { useIsLandscape } from '~/hooks';
import { cx } from '~/utils';

import styles from './AnswersImage.module.scss';

interface AnswersImageProps extends ComponentProps<'div'> {
  src: string;
  alt: string;
  titleCopy: string;
  setImageFn: () => void;
}

export const AnswersImage = ({ src, alt, titleCopy, setImageFn }: AnswersImageProps) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { amount: 0.55 });
  const isDesktop = useIsLandscape();

  // switches desktop image in desktop image container (in parent)
  useEffect(() => {
    if (!isDesktop) return;
    if (isInView) {
      setImageFn();
    }
  }, [isDesktop, isInView, setImageFn, src]);

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0, filter: 'blur(20rem)' }}
      whileInView={{ opacity: 1, filter: 'blur(0rem)' }}
      viewport={{ margin: '-30%' }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.imageContainer} ref={containerRef}>
        <motion.div
          className={styles.border}
          aria-hidden
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1.01 }}
          viewport={{ margin: '-30%' }}
          transition={{ duration: 0.8 }}
        />
        <img className={styles.image} src={src} alt={alt} />
      </div>
      <motion.h3 className={styles.title}>{titleCopy}</motion.h3>
    </motion.div>
  );
};
