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
import { ColorName, OmitChildren } from '~/utils/types';

import styles from './OrbCore.module.scss';

interface OrbCoreProps extends OmitChildren<HTMLMotionProps<'div'>> {
  color: ColorName;
  time: MotionValue<number>;
  index: number;
  count: number;
  baseRotationTiming: number;
  isLooping: MotionValue<boolean>;
  introLength: number;
}

export const OrbCore = (props: OrbCoreProps) => {
  const {
    className,
    color,
    time,
    index,
    count,
    baseRotationTiming,
    isLooping,
    introLength,
    ...otherProps
  } = props;
  const rotationOffset = useMemo(() => (360 / count) * index, [count, index]);
  const introTimingOffset = useMemo(
    () => introLength * 0.666 + introLength * 0.333 * ((count - index) / count),
    [count, index, introLength]
  );
  const timeLooped = useTransform(time, (value) => {
    return Math.sin(((value % 6000) / 6000 + index / count) * Math.PI * 2);
  });
  const rotate = useTransform(
    time,
    [0, baseRotationTiming],
    [0 + rotationOffset, 360 + rotationOffset],
    {
      clamp: false,
    }
  );

  const translateXValueIntro = useTransform(time, [0, introTimingOffset], [1000, 0], {
    clamp: true,
    ease: evilEase,
  });
  const translateXValueLoop = useTransform(timeLooped, [-1, 0, 1], [30, 50, 70], { clamp: true });
  const translateXValue = useTransform(time, (value) => {
    if (!isLooping.get()) {
      return translateXValueIntro.get() + translateXValueLoop.get();
    }
    return translateXValueLoop.get();
  });
  const translateX = useMotionTemplate`${translateXValue}%`;
  const scale = useTransform(timeLooped, [-1, 0, 1], [1, 0.75, 1], { clamp: true });

  const opacityIntro = useTransform(time, [0, introTimingOffset], [0, 1], { clamp: true });
  const opacityLoop = useTransform(timeLooped, [-1, 0, 1], [1, 0.85, 1], { clamp: true });
  const opacity = useTransform(time, (value) => {
    if (!isLooping.get()) {
      return opacityIntro.get() * opacityLoop.get();
    }
    return opacityLoop.get();
  });
  return (
    <motion.div
      {...otherProps}
      className={cx(styles.coreWrapper, className)}
      style={{ rotate, opacity }}
    >
      <motion.div
        className={styles.core}
        data-background-color={color}
        style={{ translateX, translateY: '30%', scale }}
      />
    </motion.div>
  );
};
