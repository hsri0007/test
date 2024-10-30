'use client';

import {
  HTMLMotionProps,
  MotionValue,
  motion,
  useMotionTemplate,
  useTransform,
} from 'framer-motion';
import { ComponentProps, useMemo } from 'react';

import { cx } from '~/utils';
import { evilEase } from '~/utils/client';
import { ColorName } from '~/utils/types';

import styles from './OrbLabel.module.scss';

interface OrbLabelProps extends HTMLMotionProps<'div'> {
  color: ColorName;
  time: MotionValue<number>;
  index: number;
  count: number;
  baseRotationTiming: number;
  isLooping: MotionValue<boolean>;
  introLength: number;
}

export const OrbLabel = (props: OrbLabelProps) => {
  const {
    className,
    color,
    time,
    index,
    count,
    baseRotationTiming,
    isLooping,
    introLength,
    children,
    ...otherProps
  } = props;

  const rotationOffset = useMemo(() => (360 / count) * index, [count, index]);

  const rotate = useTransform(
    time,
    [0, baseRotationTiming],
    [0 + rotationOffset, 360 + rotationOffset],
    {
      clamp: false,
    }
  );

  const rotateReverse = useTransform(rotate, [0, 360], [360, 0], {
    clamp: false,
  });

  const opacity = useTransform(time, [0, introLength * 0.8, introLength * 0.9], [0, 0, 1], {
    clamp: true,
    ease: evilEase,
  });

  const scale = useTransform(time, [0, introLength * 0.8, introLength * 0.9], [0, 0, 1], {
    clamp: true,
    ease: evilEase,
  });

  return (
    <motion.div
      {...otherProps}
      className={cx(styles.labelWrapper, className)}
      style={{ rotate, opacity, scale }}
    >
      <motion.div
        className={styles.label}
        data-color={color}
        style={{ translateX: '0', translateY: '-50%', rotate: rotateReverse }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};
