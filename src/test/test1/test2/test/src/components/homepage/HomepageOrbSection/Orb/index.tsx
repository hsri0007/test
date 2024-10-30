'use client';

import {
  HTMLMotionProps,
  MotionValue,
  motion,
  useInView,
  useTime,
  useTransform,
} from 'framer-motion';
import { ComponentProps, useEffect, useMemo, useRef, useState } from 'react';

import { cx } from '~/utils';
import { easeOut, evilEase } from '~/utils/client';
import { ColorName, OmitChildren } from '~/utils/types';

import styles from './Orb.module.scss';
import { OrbCore } from './OrbCore';
import { OrbGlow } from './OrbGlow';
import { OrbLabel } from './OrbLabel';
import { OrbOutline } from './OrbOutline';

interface OrbProps extends OmitChildren<HTMLMotionProps<'div'>> {
  lights: ColorName[];
}

const BASE_ROTATION_TIMING = 10000 as const;
const LABEL_ROTATION_TIMING = 40000 as const;

const INTRO_LENGTH = 6000 as const;

export const Orb = (props: OrbProps) => {
  const { className, lights, ...otherProps } = props;
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true });
  const absoluteTime = useTime();
  const [isActive, setIsActive] = useState(false);
  const [startTime, setStartTime] = useState(0);

  useEffect(() => {
    if (!isActive && isInView) {
      setIsActive(true);
      setStartTime(absoluteTime.get());
    }
  }, [isInView, isActive, absoluteTime]);

  const time = useTransform(absoluteTime, (value) => {
    return value - startTime;
  });

  const isLooping = useTransform(time, (value) => {
    if (value <= INTRO_LENGTH) {
      return false;
    }
    return true;
  });

  const introRotate = useTransform(time, [0, INTRO_LENGTH], [0, 360], {
    clamp: false,
    ease: evilEase,
  });

  const rotate = useTransform(introRotate, (value) => {
    if (isLooping.get()) {
      return 360;
    }
    return value;
  });

  const cores = useMemo(
    () =>
      lights.map((light, index) => {
        return (
          <OrbCore
            key={`core-${light}-${index}`}
            color={light}
            time={time}
            count={lights.length}
            index={index}
            baseRotationTiming={BASE_ROTATION_TIMING}
            isLooping={isLooping}
            introLength={INTRO_LENGTH}
          />
        );
      }),
    [isLooping, lights, time]
  );
  const glows = useMemo(
    () =>
      lights.map((light, index) => {
        return (
          <OrbGlow
            key={`glow-${light}-${index}`}
            color={light}
            time={time}
            count={lights.length}
            index={index}
            baseRotationTiming={BASE_ROTATION_TIMING}
            isLooping={isLooping}
            introLength={INTRO_LENGTH}
          />
        );
      }),
    [isLooping, lights, time]
  );

  const outlines = useMemo(
    () =>
      lights.map((light, index) => {
        return (
          <OrbOutline
            key={`outline-${light}-${index}`}
            color={light}
            time={time}
            count={lights.length}
            index={index}
            baseRotationTiming={BASE_ROTATION_TIMING}
            isLooping={isLooping}
            introLength={INTRO_LENGTH}
          />
        );
      }),
    [isLooping, lights, time]
  );
  return (
    <motion.div ref={ref} {...otherProps} className={cx(styles.orb, className)} style={{ rotate }}>
      {isActive && (
        <>
          <div className={styles.glows}>{glows}</div>
          <div className={styles.outlines}>{outlines}</div>
          <div className={styles.labels}>
            <OrbLabel
              color="iris-blue"
              time={time}
              count={4}
              index={0}
              baseRotationTiming={LABEL_ROTATION_TIMING}
              isLooping={isLooping}
              introLength={INTRO_LENGTH}
            >
              Exo Iris
            </OrbLabel>
            <OrbLabel
              color="ai-green"
              time={time}
              count={4}
              index={1}
              baseRotationTiming={LABEL_ROTATION_TIMING}
              isLooping={isLooping}
              introLength={INTRO_LENGTH}
            >
              Exo AI
            </OrbLabel>
            <OrbLabel
              color="works-purple"
              time={time}
              count={4}
              index={2}
              baseRotationTiming={LABEL_ROTATION_TIMING}
              isLooping={isLooping}
              introLength={INTRO_LENGTH}
            >
              Exo Works
            </OrbLabel>
            <OrbLabel
              color="gold"
              time={time}
              count={4}
              index={3}
              baseRotationTiming={LABEL_ROTATION_TIMING}
              isLooping={isLooping}
              introLength={INTRO_LENGTH}
            >
              Exo Edu
            </OrbLabel>
          </div>
          <div className={styles.cores}>{cores}</div>
        </>
      )}
    </motion.div>
  );
};
