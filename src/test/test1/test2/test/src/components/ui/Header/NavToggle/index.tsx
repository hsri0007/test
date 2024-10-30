'use client';

import { ComponentProps, useCallback } from 'react';

import { CartIcon } from '~/components/svgs/CartIcon';
import { useIsLandscape } from '~/hooks';
import { useGlobalStore } from '~/stores/globalStore';
import { cx } from '~/utils';

import styles from './NavToggle.module.scss';

interface NavToggleProps extends ComponentProps<'div'> {}

export const NavToggle = (props: NavToggleProps) => {
  const { className, children, ...otherProps } = props;
  const { mobileNavExpanded, expandMobileNav, collapseMobileNav } = useGlobalStore([
    'mobileNavExpanded',
    'expandMobileNav',
    'collapseMobileNav',
  ]);

  const isLg = useIsLandscape();
  const toggleMobileNav = useCallback(() => {
    if (mobileNavExpanded) {
      collapseMobileNav();
    } else {
      expandMobileNav();
    }
  }, [collapseMobileNav, expandMobileNav, mobileNavExpanded]);
  return (
    <div {...otherProps} className={cx(className, styles.toggleWrapper)}>
      <div className={styles.cartIcon} tabIndex={isLg ? -1 : 1}>
        <a href="https://store.exo.inc/product/FG-1001-24">
          <CartIcon />
        </a>
      </div>

      <button
        aria-hidden={isLg}
        tabIndex={isLg ? -1 : 0}
        className={styles.toggle}
        aria-label={mobileNavExpanded ? 'Close Nav' : 'Open Nav'}
        role="button"
        aria-expanded={isLg || mobileNavExpanded}
        aria-controls="primary-nav"
        onClick={toggleMobileNav}
      />
    </div>
  );
};
