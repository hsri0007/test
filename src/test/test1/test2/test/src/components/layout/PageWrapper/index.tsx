'use client';

import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react';

import { LenisWrapper } from '~/components/layout/LenisWrapper';
import { FORCED_SCROLL_RESET_PATHS } from '~/constants';
import { useGlobalStore } from '~/stores/globalStore';
import { cx, setRootCSSVariable } from '~/utils';
import { ColorName, CursorName } from '~/utils/types';

import styles from './page-wrapper.module.scss';

type PageWrapperProps = {
  children: React.ReactNode;
};

export const PageWrapper = ({ children }: PageWrapperProps) => {
  const pathname = usePathname();
  const [lastMousePosition, setLastMousePosition] = useState({ x: 0, y: 0 });

  const {
    exitTransitionActive,
    setExitTransitionActive,
    lastPathname,
    setLastPathname,
    scrollDisabled,
    setScrollDisabled,
    mobileNavExpanded,
    activeNavItem,
    refreshWindowSize,
    setMousePressed,
    updateGlobalCursor,
    handleMouseActivity,
    closeDropdown,
  } = useGlobalStore([
    'exitTransitionActive',
    'setExitTransitionActive',
    'lastPathname',
    'setLastPathname',
    'scrollDisabled',
    'setScrollDisabled',
    'mobileNavExpanded',
    'activeNavItem',
    'refreshWindowSize',
    'setMousePressed',
    'updateGlobalCursor',
    'handleMouseActivity',
    'closeDropdown',
  ]);

  // Blur the page if exit transition is active or the mobile nav is expanded
  const isBlurred = useMemo(
    () => exitTransitionActive || mobileNavExpanded,
    [exitTransitionActive, mobileNavExpanded]
  );

  const isStopped = useMemo(
    () => scrollDisabled || mobileNavExpanded || activeNavItem !== null,
    [activeNavItem, mobileNavExpanded, scrollDisabled]
  );

  // will unblur page after exit transition is finished
  useEffect(() => {
    // Close the secondary nav
    closeDropdown();
    // For certain page scroll is always resest to the top of the page
    if (FORCED_SCROLL_RESET_PATHS.includes(pathname as string)) {
      requestAnimationFrame(() => {
        window.scrollTo(0, 0);
      });
    }
    if (exitTransitionActive && pathname !== lastPathname && pathname !== null) {
      // Scroll to top
      window.scrollTo(0, 0);

      setExitTransitionActive(false);
      setLastPathname(pathname);
    }
    // should always assume that scroll is enabled on initial page load
    if (scrollDisabled) {
      setScrollDisabled(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const updateCursor = useCallback(
    (e?: MouseEvent) => {
      const mousePosition = e
        ? { x: e.clientX, y: e.clientY }
        : { x: lastMousePosition.x, y: lastMousePosition.y };

      // If this is an actual mouse event then set the new last position
      if (e) {
        setLastMousePosition(mousePosition);
      }

      // Timeout prevents timing issue if there is a state change on click
      setTimeout(() => {
        const hoveredElement = document.elementFromPoint(mousePosition.x, mousePosition.y);
        if (hoveredElement) {
          const theme = getComputedStyle(hoveredElement).getPropertyValue('--theme-name') as
            | 'light'
            | 'dark'
            | undefined;
          const accentColor = getComputedStyle(hoveredElement).getPropertyValue(
            '--accent-color-name'
          ) as ColorName | undefined;
          const hidden =
            getComputedStyle(hoveredElement).getPropertyValue('--cursor-hidden') === 'true';
          const inactiveHidden =
            getComputedStyle(hoveredElement).getPropertyValue('--cursor-inactive-hidden') ===
            'true';
          const name = getComputedStyle(hoveredElement).getPropertyValue('--cursor') as CursorName;
          updateGlobalCursor({ theme, name, hidden, inactiveHidden, accentColor });
          handleMouseActivity();
        }
      }, 10);
    },
    [updateGlobalCursor, handleMouseActivity, lastMousePosition]
  );

  // Set Root CSS Variables with the current mouse X and Y coordinates in pixels
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      setRootCSSVariable('--mouse-x', `${e.clientX}px`);
      setRootCSSVariable('--mouse-y', `${e.clientY}px`);
      updateCursor(e);
    },
    [updateCursor]
  );

  const handleMouseDown = useCallback(
    (e: MouseEvent) => {
      setMousePressed(true);
      updateCursor(e);
    },
    [setMousePressed, updateCursor]
  );
  const handleMouseUp = useCallback(
    (e: MouseEvent) => {
      setMousePressed(false);
      updateCursor(e);
    },
    [setMousePressed, updateCursor]
  );

  const handleClick = useCallback(
    (e: MouseEvent) => {
      updateCursor(e);
    },
    [updateCursor]
  );

  const handleScroll = useCallback(() => {
    // setRootCSSVariable('--scroll-x', `${window.scrollX}px`);
    // setRootCSSVariable('--scroll-y', `${window.scrollY}px`);
    updateCursor();
  }, [updateCursor]);

  const handleResize = useCallback(() => {
    refreshWindowSize();
    updateCursor();
  }, [refreshWindowSize, updateCursor]);

  // Add and remove event listeners at the page level
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('click', handleClick);
    };
  }, [handleMouseMove, handleMouseUp, handleMouseDown, handleResize, handleScroll, handleClick]);

  useLayoutEffect(() => {
    handleResize();
  }, [handleResize]);

  return (
    <LenisWrapper root isStopped={isStopped} options={{ lerp: 0.099 }}>
      <main className={cx(styles.container, isBlurred && styles.blur)} data-cursor-name={undefined}>
        {children}
      </main>
    </LenisWrapper>
  );
};
