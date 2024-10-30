'use client';

import { usePathname } from 'next/navigation';
import { ComponentProps, useCallback, useEffect, useRef, useState } from 'react';

import { getHasSeen, setTimeSeen } from '~/components/exo-iris';
import { SCROLL_DIRECTION_MIN_SCROLL } from '~/constants';
import { useHeaderHeight } from '~/hooks';
import { useGlobalStore } from '~/stores/globalStore';
import { cx } from '~/utils';

import { ArrowLink } from '../../ArrowLink';
import styles from './HeaderWrapper.module.scss';

interface HeaderWrapperProps extends ComponentProps<'div'> {
  heroText?: string;
  isModalEnabledOnSite?: boolean;
  link?: string;
}
/**
 * This client component manages all the listeners and states for the header
 */
export const HeaderWrapper = (props: HeaderWrapperProps) => {
  const { className, children, heroText, isModalEnabledOnSite, link, ...otherProps } = props;
  const lastScrollYRef = useRef(0);
  const LOCAL_STORAGE_KEY = 'advertisement_banner_last_seen';
  const DAY_MS = 86400000;
  const TIME_DIFFERENCE = DAY_MS; // 1 day
  const [advtBanner, SetAdvtBanner] = useState(true);

  const {
    headerTheme,
    clearDarkHeaderRequests,
    activeNavItem,
    clearActiveNavItem,
    mobileNavExpanded,
    collapseMobileNav,
    setHeaderReady,
    headerReady,
    atPageTop,
    setAtPageTop,
    scrollingUp,
    setScrollingUp,
    scrollDisabled,
    clearDarkBannerRequests,
    clearDarkQuickLinksRequests,
    dropdownOpen,
  } = useGlobalStore([
    'headerTheme',
    'clearDarkHeaderRequests',
    'activeNavItem',
    'clearActiveNavItem',
    'mobileNavExpanded',
    'collapseMobileNav',
    'setHeaderReady',
    'headerReady',
    'atPageTop',
    'setAtPageTop',
    'scrollingUp',
    'setScrollingUp',
    'scrollDisabled',
    'clearDarkBannerRequests',
    'clearDarkQuickLinksRequests',
    'dropdownOpen',
  ]);

  const isNavItemActive = activeNavItem !== null;

  const headerHeight = useHeaderHeight();

  const getLocalStorageKey = () => {
    return `${LOCAL_STORAGE_KEY}`;
  };

  const handleCloseButton = () => {
    setTimeSeen(getLocalStorageKey());
    SetAdvtBanner(false);
  };

  const handleResizeAndScroll = useCallback(() => {
    const scrollY = window.scrollY;

    // Set the atPageTop state if it's changed
    if (scrollY <= headerHeight) {
      if (!atPageTop) {
        setAtPageTop(true);
      }
    } else {
      if (scrollY > headerHeight) {
        if (atPageTop) {
          setAtPageTop(false);
        }
      }
    }

    const lastScrollY = lastScrollYRef.current;
    const scrollDelta = lastScrollY - scrollY;
    const didScroll = Math.abs(scrollDelta) > SCROLL_DIRECTION_MIN_SCROLL;

    // If the user has scrolled more than the min set the scroll direction if it's changed
    if (didScroll) {
      const newIsScrollingUp = scrollDelta > 0;
      if (!scrollingUp && newIsScrollingUp) {
        setScrollingUp(newIsScrollingUp);
      }
      if (scrollingUp && !newIsScrollingUp) {
        setScrollingUp(newIsScrollingUp);
      }
      // Update the last scroll y value
      lastScrollYRef.current = scrollY;
    }
  }, [headerHeight, atPageTop, setAtPageTop, scrollingUp, setScrollingUp]);

  useEffect(() => {
    handleResizeAndScroll();
    window.addEventListener('resize', handleResizeAndScroll);
    window.addEventListener('scroll', handleResizeAndScroll);
    return () => {
      window.removeEventListener('resize', handleResizeAndScroll);
      window.removeEventListener('scroll', handleResizeAndScroll);
    };
  }, [handleResizeAndScroll]);

  const pathname = usePathname();

  useEffect(() => {
    // Reset the header theme to light on any page navigation
    if (pathname) {
      clearDarkHeaderRequests();
      clearDarkBannerRequests();
      clearDarkQuickLinksRequests();
      clearActiveNavItem();
      collapseMobileNav();
    }
  }, [
    pathname,
    clearDarkHeaderRequests,
    clearActiveNavItem,
    collapseMobileNav,
    clearDarkBannerRequests,
    clearDarkQuickLinksRequests,
  ]);

  useEffect(() => {
    setHeaderReady(true);
  }, [setHeaderReady]);

  useEffect(() => {
    if (!getHasSeen(getLocalStorageKey(), TIME_DIFFERENCE)) {
      SetAdvtBanner(true);
    } else {
      SetAdvtBanner(false);
    }
  }, [pathname, TIME_DIFFERENCE]);

  const secondaryPaths = [
    '/iris',
    '/exo-works',
    '/ai',
    '/ai/heart-and-lung',
    '/resources',
    '/ai/heart-and-lung',
    '/exo-works/specs',
    '/iris/integrations',
    '/iris/specs',
    '/iris/demo',
  ];

  return (
    <>
      <button
        onClick={clearActiveNavItem}
        onMouseEnter={clearActiveNavItem}
        aria-hidden={!isNavItemActive}
        tabIndex={isNavItemActive ? 0 : -1}
        className={cx(styles.overlay, isNavItemActive && styles.overlayVisible)}
      />
      <div
        {...otherProps}
        className={cx(
          styles.wrapper,
          scrollingUp && styles.scrollingUp,
          !atPageTop && styles.notAtPageTop,
          !headerReady && styles.headerNotReady,
          scrollDisabled && styles.scrollDisabled,
          className
        )}
        data-theme={headerTheme}
        data-mobile-nav-expanded={mobileNavExpanded}
      >
        {children}
        {!secondaryPaths.includes(pathname) && isModalEnabledOnSite && advtBanner && (
          <a href={link}>
            <div
              className={cx(
                styles.wellstar,
                headerTheme === 'dark' &&
                  (activeNavItem === 'products' || activeNavItem === 'about-us' || dropdownOpen) &&
                  styles.opacityNew
              )}
            >
              <p>{heroText}</p>
              {/* <ArrowLink href={link} className={styles.wellstarCta} isBig /> */}
              <button
                onClick={(event) => {
                  event.preventDefault();
                  handleCloseButton();
                }}
                className={styles.closeButton}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 51 50"
                  fill="none"
                  className={styles.closeIcon}
                >
                  <path
                    d="M18.4844 18.4844L32.0014 32.0014"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M18.4844 32L32.0014 18.4829"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <rect
                    x="1"
                    y="1"
                    width="48"
                    height="48"
                    rx="24"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </button>
            </div>
          </a>
        )}
      </div>
    </>
  );
};
