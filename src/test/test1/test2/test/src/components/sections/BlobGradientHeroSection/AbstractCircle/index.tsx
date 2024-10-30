'use client';

import { HTMLMotionProps, MotionValue, motion, useTime, useTransform } from 'framer-motion';
import { useId, useMemo } from 'react';

import { cx } from '~/utils';
import { OmitChildren } from '~/utils/types';

import styles from './AbstractCircle.module.scss';

interface AbstractCirclesProps extends OmitChildren<HTMLMotionProps<'div'>> {
  circleCount?: number;
  isDark?: boolean;
}

export const AbstractCircles = (props: AbstractCirclesProps) => {
  const { circleCount = 3, isDark = false } = props;

  const id = useId();

  const time = useTime();

  const circleElements = [...new Array(circleCount)].map((_, index) => (
    <AbstractCircle
      key={`${id}-circle-${index}`}
      index={index}
      count={circleCount}
      time={time}
      isDark={isDark}
    />
  ));
  return <div className={styles.circleContainer}>{circleElements}</div>;
};

interface AbstractCircleProps extends OmitChildren<HTMLMotionProps<'div'>> {
  time: MotionValue<number>;
  index: number;
  count: number;
  isDark?: boolean;
}

export const AbstractCircle = (props: AbstractCircleProps) => {
  const { className, index, count, time, isDark, ...otherProps } = props;

  const rotationOffset = useMemo(() => (360 / count) * index, [count, index]);
  const rotate = useTransform(time, [0, 300000], [0 + rotationOffset, 360 + rotationOffset], {
    clamp: false,
  });

  return (
    <motion.div
      {...otherProps}
      style={{ rotate, translateY: '20%', translateX: '-27%' }}
      className={cx(styles.circle, className)}
    >
      <motion.div
        style={{ translateX: '54%' }}
        className={cx(styles.circleContent, isDark && styles['circleContent--dark'])}
      />
    </motion.div>
  );
};
