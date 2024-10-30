'use client';

import gsap from 'gsap';
import { useLayoutEffect, useRef } from 'react';

import { Section } from '~/components/ui';
import { cx } from '~/utils';

import styles from './ExoIrisGradientTransition.module.scss';

export const ExoIrisGradientTransition = () => {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (!containerRef.current) return;
      gsap.to('.js__solid', {
        opacity: 1,
        scrollTrigger: {
          trigger: '.js__gradientContainer',
          start: '80% bottom',
          end: 'bottom bottom',
          // markers: true,
          scrub: true,
        },
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <Section className={styles.container} ref={containerRef}>
      <div className={cx(styles.gradientContainer, 'js__gradientContainer')}>
        <div className={cx(styles.gradient, 'js__gradient')} aria-hidden />
        <div className={cx(styles.solid, 'js__solid')} aria-hidden />
      </div>
    </Section>
  );
};
