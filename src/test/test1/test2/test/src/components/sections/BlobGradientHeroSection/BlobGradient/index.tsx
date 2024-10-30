'use client';

import {
  HTMLMotionProps,
  MotionValue,
  motion,
  useMotionTemplate,
  useTime,
  useTransform,
} from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';

import { cx } from '~/utils';
import { ColorName } from '~/utils/types';

import styles from './BlobGradient.module.scss';

interface BlobGradientProps extends HTMLMotionProps<'div'> {
  color: ColorName;
  time: MotionValue<number>;
  index: number;
  count: number;
  opacity: number;
}

const SCALE_FACTOR = 9000 as const;
const SKEW_FACTOR = 8000 as const;
const TRANSLATE_X_FACTOR = 7000 as const;
const OFFSET_FACTOR = -0.5 as const;
const INTENSITY_FACTOR = 8500 as const;

export const BlobGradient = (props: BlobGradientProps) => {
  const { className, children, color, count, time, opacity, index, ...otherProps } = props;
  const [isReady, setIsReady] = useState(false);

  const rotationOffset = useMemo(() => (360 / count) * index, [count, index]);
  const rotate = useTransform(time, [0, 10000], [0 + rotationOffset, 360 + rotationOffset], {
    clamp: false,
  });

  const scale = useTransform(
    time,
    (value) =>
      Math.sin(
        (((value + SCALE_FACTOR * (index / count)) % SCALE_FACTOR) / SCALE_FACTOR) * Math.PI
      ) *
        0.8 +
      0.6
  );

  const skew = useTransform(
    time,
    (value) =>
      Math.sin((((value + SKEW_FACTOR * (index / count)) % SKEW_FACTOR) / SKEW_FACTOR) * Math.PI) *
      15
  );

  const translateXValue = useTransform(
    time,
    (value) =>
      Math.sin(
        (((value + TRANSLATE_X_FACTOR * (index / count)) % TRANSLATE_X_FACTOR) /
          TRANSLATE_X_FACTOR) *
          Math.PI
      ) *
      30 *
      2.5
  );
  const offset = OFFSET_FACTOR * ((index + 1) / count);

  const translateX = useMotionTemplate`${translateXValue}%`;

  const intensity = useTransform(
    time,
    (value) =>
      Math.sin(
        (((value + INTENSITY_FACTOR * (index / count)) % SKEW_FACTOR) / SKEW_FACTOR) * Math.PI
      ) *
        opacity +
      opacity
  );

  useEffect(() => {
    setIsReady(true);
  }, []);

  return (
    <>
      {isReady && (
        <motion.div
          className={styles.blobOffset}
          style={{
            x: `calc(calc(${(1 + offset) * -50 + 50}vw + var(--mouse-x)) * ${offset})`,
            y: `calc(calc(${(1 + offset) * -50 + 50}vh + var(--mouse-y)) * ${offset})`,
          }}
        >
          <motion.div
            {...otherProps}
            style={{
              rotate,
              scale,
              opacity: intensity,
            }}
            className={cx(styles.blob, className)}
          >
            <motion.div
              style={{ translateX, skewX: skew }}
              data-background-color={color}
              className={cx(styles.blobColor)}
            />
          </motion.div>
        </motion.div>
      )}
    </>
  );
};
