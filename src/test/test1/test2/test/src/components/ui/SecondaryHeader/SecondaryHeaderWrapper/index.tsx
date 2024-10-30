'use client';

import { usePathname } from 'next/navigation';
import { ComponentProps, useEffect, useState } from 'react';

import { getHasSeen, setTimeSeen } from '~/components/exo-iris';
import { useGlobalStore } from '~/stores/globalStore';
import { cx } from '~/utils';

import { ArrowLink } from '../../ArrowLink';
import styles from './SecondaryHeaderWrapper.module.scss';

interface SecondaryHeaderWrapperProps extends ComponentProps<'div'> {
  heroText?: string;
  isModalEnabledOnSite?: boolean;
  link?: string;
}
/**
 * This client component manages all the listeners and states for the header
 */
export const SecondaryHeaderWrapper = (props: SecondaryHeaderWrapperProps) => {
  const { className, children, heroText, isModalEnabledOnSite, link, ...otherProps } = props;

  const {
    headerTheme,
    headerReady,
    scrollingUp,
    atPageTop,
    scrollDisabled,
    activeNavItem,
    dropdownOpen,
  } = useGlobalStore([
    'headerTheme',
    'headerReady',
    'scrollingUp',
    'atPageTop',
    'scrollDisabled',
    'activeNavItem',
    'dropdownOpen',
  ]);
  const pathname = usePathname();
  const isIris = pathname === '/iris';
  const [advtBanner, SetAdvtBanner] = useState(true);
  const DAY_MS = 86400000;
  const TIME_DIFFERENCE = DAY_MS; // 1 day
  const LOCAL_STORAGE_KEY = 'advertisement_banner_last_seen';

  const getLocalStorageKey = () => {
    return `${LOCAL_STORAGE_KEY}`;
  };

  const handleCloseButton = () => {
    setTimeSeen(getLocalStorageKey());
    SetAdvtBanner(false);
  };

  useEffect(() => {
    if (!getHasSeen(getLocalStorageKey(), TIME_DIFFERENCE)) {
      SetAdvtBanner(true);
    } else {
      SetAdvtBanner(false);
    }
  }, [pathname, TIME_DIFFERENCE]);

  return (
    <>
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
        id="secondary-header"
        data-theme={headerTheme}
      >
        {children}
        <>
          {headerReady && isModalEnabledOnSite && advtBanner && (
            <a href={link}>
              <div
                style={{ position: 'absolute', width: '100%', zIndex: '-1' }}
                className={cx(
                  styles.wellstar,
                  headerTheme === 'dark' &&
                    (activeNavItem === 'products' ||
                      activeNavItem === 'about-us' ||
                      dropdownOpen) &&
                    styles.opacity
                )}
              >
                <p>{heroText}</p>
                {/* <ArrowLink href={link} className={styles.wellstarCta} isBig /> */}
                <button
                  onClick={(event) => {
                    event.preventDefault();
                    handleCloseButton();
                  }}
                  className={`${styles.closeButton} ${isIris && styles.irisButton}`}
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
        </>
      </div>
    </>
  );
};
