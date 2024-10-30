'use client';

import { Html, useProgress } from '@react-three/drei';
import { ComponentProps } from 'react';

import { PreloaderLogo } from '~/components/svgs';
import { cx } from '~/utils';

import styles from './Preloader.module.scss';

interface PreloaderProps extends ComponentProps<'div'> {
  isVisible?: boolean;
  displayValue?: boolean;
}

export const Preloader = (props: PreloaderProps) => {
  const { isVisible = false, displayValue = true, className } = props;

  const { progress } = useProgress();

  return (
    <Html center>
      <div className={cx(className, styles.preloader)}>
        <PreloaderLogo />
        {displayValue && <div className={styles.loadProgress}>{Math.trunc(progress)}%</div>}
      </div>
    </Html>
  );
};
