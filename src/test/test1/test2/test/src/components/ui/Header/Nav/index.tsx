'use client';

import { ReactNode } from 'react';
import FocusLock from 'react-focus-lock';

import { useIsLandscape } from '~/hooks';
import { useGlobalStore } from '~/stores/globalStore';
import { cx } from '~/utils';

import { NavToggle } from '../NavToggle';
import styles from './Nav.module.scss';

interface NavProps {
  children?: ReactNode;
}

export const Nav = (props: NavProps) => {
  const { children } = props;
  const { mobileNavExpanded } = useGlobalStore(['mobileNavExpanded']);
  const isLg = useIsLandscape();

  return (
    <FocusLock disabled={isLg || !mobileNavExpanded} className={cx(styles.navWrapper)}>
      <NavToggle />
      <nav id="primary-nav" className={styles.nav}>
        <div className={styles.navItems}>{children}</div>
      </nav>
    </FocusLock>
  );
};
