'use client';

import { ComponentProps } from 'react';

import { useGlobalStore } from '~/stores/globalStore';
import { cx } from '~/utils';

import styles from './SecondaryHeaderNav.module.scss';

interface SecondaryHeaderNavProps extends ComponentProps<'nav'> {}

export const SecondaryHeaderNav = (props: SecondaryHeaderNavProps) => {
  const { className, children, ...otherProps } = props;

  const { dropdownOpen } = useGlobalStore(['dropdownOpen']);

  return (
    <nav
      {...otherProps}
      id="dropdown-nav"
      className={cx(styles.nav, dropdownOpen && styles.open, className)}
    >
      <div className={styles.content}>{children}</div>
    </nav>
  );
};
