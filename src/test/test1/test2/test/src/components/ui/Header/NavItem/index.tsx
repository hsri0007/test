'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ComponentPropsWithoutRef, useCallback, useMemo } from 'react';
import FocusLock from 'react-focus-lock';

import { ExoLink } from '~/components/ui/ExoLink';
import { useIsLandscape } from '~/hooks';
import { useGlobalStore } from '~/stores/globalStore';
import { cx } from '~/utils';

import { SubMenu, SubMenuItems } from '../SubMenu';
import styles from './NavItem.module.scss';

interface NavItemProps extends ComponentPropsWithoutRef<'li'> {
  href?: string;
  triggerClassName?: string;
  subItems?: SubMenuItems[];
  id: string;
  isExternal?: boolean;
}

export const NavItem = (props: NavItemProps) => {
  const { id, className, isExternal, triggerClassName, children, href, subItems, ...otherProps } =
    props;
  const { activeNavItem, setActiveNavItem, removeActiveNavItem, mobileNavExpanded } =
    useGlobalStore([
      'activeNavItem',
      'setActiveNavItem',
      'removeActiveNavItem',
      'mobileNavExpanded',
    ]);
  const isActive = useMemo(() => activeNavItem === id, [activeNavItem, id]);
  const activateNavItem = useCallback(() => setActiveNavItem(id), [id, setActiveNavItem]);
  const isLg = useIsLandscape();
  const pathname = usePathname();
  const isVisible = isLg || mobileNavExpanded;
  const isCurrent = pathname === href;

  // Activate the nav item on mouse enter
  const handleMouseEnter = useCallback(() => {
    activateNavItem();
  }, [activateNavItem]);

  // Toggle the active state of the nav item on click
  const handleClick = useCallback(() => {
    if (isActive && subItems?.length === 0) {
      removeActiveNavItem();
    } else {
      activateNavItem();
    }
  }, [subItems, activateNavItem, isActive, removeActiveNavItem]);

  // Attributes used by both nav links and buttons
  const sharedAttributes = useMemo(() => {
    return {
      className: cx(styles.navItemTrigger, triggerClassName, isCurrent && styles.isCurrent),
      onMouseEnter: handleMouseEnter,
      onClick: handleClick,
      tabIndex: isVisible ? 0 : -1,
    };
  }, [handleClick, handleMouseEnter, isVisible, triggerClassName, isCurrent]);

  // If there are submenu items the trigger is a button otherwise use a link
  const navItemTrigger = useMemo(
    () =>
      subItems && subItems?.length ? (
        <button
          {...sharedAttributes}
          role="button"
          aria-expanded={isActive}
          aria-controls={`${id}-submenu`}
          key={`${id}-nav-item-trigger`}
          id={`${id}-nav-item-triggger`}
        >
          {children}
        </button>
      ) : (
        <ExoLink
          {...sharedAttributes}
          href={href}
          key={`${id}-nav-item-trigger`}
          isExternal={isExternal}
        >
          {children}
        </ExoLink>
      ),
    [children, href, id, isActive, isExternal, sharedAttributes, subItems]
  );

  // If are submenu items then there is a submenu
  const subMenu = useMemo(
    () =>
      subItems && subItems?.length ? (
        <SubMenu
          key={`submenu-${id}`}
          items={subItems}
          isActive={isActive}
          id={id}
          activateSubMenu={activateNavItem}
        />
      ) : (
        ''
      ),
    [activateNavItem, id, isActive, subItems]
  );

  return (
    <FocusLock
      disabled={!isActive}
      autoFocus={false}
      className={cx(styles.navItem, className)}
      {...otherProps}
    >
      <AnimatePresence key={`${id}-trigger-wrapper-animate`}>
        <div className={styles.navItemTriggerWrapper} key={`${id}-trigger-wrapper`}>
          {isActive && (
            <motion.span
              layoutId="nav-highlight"
              layout
              className={`${id !== 'cart' ? styles.navItemHighlight : ''}`}
            />
          )}
          {navItemTrigger}
        </div>
      </AnimatePresence>
      {subMenu}
    </FocusLock>
  );
};
