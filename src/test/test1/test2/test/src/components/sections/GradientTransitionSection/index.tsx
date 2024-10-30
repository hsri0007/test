'use client';

import {
  easeInOut,
  motion,
  useMotionTemplate,
  useScroll,
  useTime,
  useTransform,
} from 'framer-motion';
import { useLayoutEffect, useRef } from 'react';

import { Section, SectionProps } from '~/components/ui';
import { useIsLandscape } from '~/hooks';
import { cx } from '~/utils';
import { ColorName, Gradient } from '~/utils/types';

import styles from './GradientTransitionSection.module.scss';

interface GradientTransitionSectionProps extends SectionProps {
  mobileGradient: Gradient;
  gradient: Gradient;
  mobileSectionScale?: number;
  sectionScale?: number; // Sets the height of the section relative to the window
  gradientScale?: number; // Sets theight of the gradient relative to the section
}

export const GradientTransitionSection = ({
  mobileGradient,
  gradient,
  className,
  sectionScale = 1.5,
  gradientScale = 2,
  mobileSectionScale,
  ...otherProps
}: GradientTransitionSectionProps) => {
  const sectionRef = useRef(null);
  const isDesktop = useIsLandscape();
  const scale = !isDesktop && mobileSectionScale ? mobileSectionScale : sectionScale;
  const gradientObject = !isDesktop && !!mobileGradient ? mobileGradient : gradient;

  // Create gradient string out of the provided object
  const angle = gradientObject.angle ?? '180deg';
  let gradientString = `linear-gradient(${angle}`;
  gradientObject.stops.forEach((stop) => {
    gradientString += `, ${stop.color}${stop.position ? ` ${stop.position}` : ''}`;
  });
  gradientString += ')';

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const translateYValue = useTransform(scrollYProgress, [0, 1], [0, 100 - 100 / gradientScale], {
    clamp: true,
  });
  const translateY = useMotionTemplate`-${translateYValue}%`;

  // The animation isn't needed if the height is less than or equal to the window
  const isTooShort = scale <= 1;

  return (
    <Section
      className={cx(styles.gradientContainer, className)}
      style={{ height: `${scale * 100}dvh` }}
      ref={sectionRef}
      {...otherProps}
    >
      <motion.div
        className={styles.gradient}
        style={{
          background: gradientString,
          translateY: isTooShort ? undefined : translateY,
          height: isTooShort ? '100%' : `${100 * gradientScale}%`,
        }}
      />
    </Section>
  );
};
