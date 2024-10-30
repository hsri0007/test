'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ComponentProps, useId, useMemo } from 'react';

import { cx } from '~/utils';

import styles from './CarouselIndicator.module.scss';

interface CarouselIndicatorProps extends Omit<ComponentProps<'div'>, 'onClick'> {
  count: number;
  activeIndex: number;
  onClick?: (index: number) => void;
  indicatorClassName?: string;
}

export const CarouselIndicator = (props: CarouselIndicatorProps) => {
  const { className, count, activeIndex, onClick, indicatorClassName, ...otherProps } = props;
  const id = useId();
  const indicators = useMemo(
    () =>
      [...new Array(count)].map((_, index) => {
        const isActive = index === activeIndex;
        return (
          <button
            key={`${id}-${index}`}
            className={cx(indicatorClassName, styles.indicator)}
            aria-label={`Slide ${index + 1}${isActive ? ' - Active' : ''}`}
            onClick={() => {
              if (onClick) {
                onClick(index);
              }
            }}
          >
            <div className={cx(styles.indicatorBar)}>
              <AnimatePresence>
                {isActive && (
                  <motion.div className={styles.activeIndicator} layout layoutId={`${id}-active`} />
                )}
              </AnimatePresence>
            </div>
          </button>
        );
      }),
    [activeIndex, count, id, indicatorClassName, onClick]
  );

  const singleSlide = useMemo(() => indicators.length <= 1, [indicators.length]);

  return (
    <div className={cx(className, styles.indicatorContainer)} {...otherProps}>
      {singleSlide ? '' : indicators}
    </div>
  );
};
