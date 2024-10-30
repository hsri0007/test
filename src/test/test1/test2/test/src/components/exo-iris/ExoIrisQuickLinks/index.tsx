import gsap from 'gsap';
import { useCallback, useEffect, useRef, useState } from 'react';

import { useLenis } from '~/components/layout/LenisWrapper';
import { useIsLandscape } from '~/hooks';
import { useGlobalStore } from '~/stores/globalStore';
import { cx } from '~/utils';

import styles from './ExoIrisQuickLinks.module.scss';

const LINKS = [
  {
    label: 'Home',
    id: 'iris-container',
  },
  {
    label: 'Features',
    id: 'see-deeper-quicklink-id',
  },
  {
    label: 'Clinical Images',
    id: 'iris-answers',
  },
  {
    label: 'Exo Works',
    id: 'why-exo-iris',
  },
  {
    label: 'Testimonials',
    id: 'quotes-carousel-section',
  },
  {
    label: 'Pricing',
    id: 'pricing',
  },
];

const ExoIrisQuickLinks = () => {
  const isDesktop = useIsLandscape();
  const [indexHovered, setIndexHovered] = useState(-1);
  const lenis = useLenis();
  const [resizeKey, setResizeKey] = useState(0);
  const rangesRef = useRef<{ [key: number]: number }>({});
  const [activeScrollIndex, setActiveScrollIndex] = useState<number>(0);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const barFillRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [isAnimatingBars, setIsAnimatingBars] = useState(false);

  const { quickLinksTheme, scrollingUp, atPageTop, headerTheme, headerReady, scrollDisabled } =
    useGlobalStore([
      'quickLinksTheme',
      'scrollingUp',
      'atPageTop',
      'headerTheme',
      'headerReady',
      'scrollDisabled',
    ]);

  const calculateRanges = useCallback(() => {
    LINKS.forEach((obj, i) => {
      const el = document.getElementById(obj.id);
      if (!el) return;
      const offset = window.pageYOffset + el.getBoundingClientRect().top;
      rangesRef.current[i] = offset;
    });
  }, []);

  useEffect(() => {
    if (!lenis) return;

    const onScroll = (scrolled: number) => {
      let activeIndex = 0;

      Object.values(rangesRef.current).forEach((offset, i) => {
        if (scrolled > offset) {
          activeIndex = i;
        }
      });

      setActiveScrollIndex(activeIndex);
    };

    onScroll(0);

    lenis.on('scroll', (e: any) => {
      const scroll = e.targetScroll;
      onScroll(scroll);
    });
  }, [lenis]);

  useEffect(() => {
    if (!lenis) return;
    lenis[mobileNavOpen ? 'stop' : 'start']();
  }, [lenis, mobileNavOpen]);

  useEffect(() => {
    const resizeHandler = () => {
      setResizeKey(new Date().getTime());
    };

    window.removeEventListener('resize', resizeHandler);
    window.addEventListener('resize', resizeHandler);

    resizeHandler();

    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  useEffect(() => {
    calculateRanges();
  }, [resizeKey, calculateRanges]);

  const handleClick = useCallback(
    (i: number) => {
      if (i === undefined) return;
      if (lenis) {
        const id = LINKS[i].id;
        const mainContainer = document.getElementById('iris-container');
        const idElement = document.getElementById(id);

        if (!idElement) return;

        const offset = window.pageYOffset + idElement.getBoundingClientRect().top;
        const inGeneralRange = Math.abs(lenis.targetScroll - offset) < 400;

        if (inGeneralRange) {
          return;
        }

        if (!mainContainer) return;
        gsap.killTweensOf(mainContainer);

        const isGoingForward = i > activeScrollIndex;
        const currentBar = barFillRefs.current[activeScrollIndex];
        const futureBar = barFillRefs.current[i];
        const duration = 0.3;

        setIsAnimatingBars(true);

        if (currentBar && futureBar) {
          gsap.killTweensOf([currentBar, futureBar]);

          gsap.fromTo(
            currentBar,
            {
              y: 0,
              autoAlpha: 1,
            },
            {
              y: isGoingForward ? '105%' : '-105%',
              autoAlpha: 1,
              duration,
              onComplete: () => {
                setTimeout(() => {
                  setIsAnimatingBars(false);
                  gsap.set(currentBar, { clearProps: 'all' });
                }, duration * 1000);
              },
            }
          );

          gsap.fromTo(
            futureBar,
            {
              y: isGoingForward ? '-105%' : '105%',
              autoAlpha: 1,
            },
            {
              y: 0,
              autoAlpha: 1,
              delay: duration,
              duration: duration,
              onComplete: () => {
                setTimeout(() => {
                  gsap.set(futureBar, { clearProps: 'all' });
                }, duration * 1000);
              },
            }
          );
        }

        // activeScrollIndex
        // gsap.
        // barFillRefs

        gsap.to(mainContainer, {
          autoAlpha: 0,
          duration: duration,
          onComplete: () => {
            lenis.scrollTo(idElement, {
              immediate: true,
              offset: 5,
            });
            setTimeout(() => {
              gsap.fromTo(
                mainContainer,
                {
                  autoAlpha: 0,
                },
                {
                  autoAlpha: 1,
                  duration: duration,
                }
              );
            }, 10);
          },
        });
      }
    },
    [lenis, activeScrollIndex]
  );

  return (
    <>
      {!isDesktop && (
        <button
          className={cx(
            styles.mobileNav__toggle,
            scrollingUp && styles.scrollingUp,
            !atPageTop && styles.notAtPageTop,
            !headerReady && styles.headerNotReady,
            scrollDisabled && styles.scrollDisabled,
            { [styles.mobileNavOpen]: mobileNavOpen }
          )}
          data-theme={isDesktop ? quickLinksTheme : headerTheme}
          onClick={() => {
            setMobileNavOpen((prev) => !prev);
          }}
        >
          <span className={styles.mobileNav__onIcon}>
            <svg viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="5.12887" y1="14.5136" x2="14.3213" y2="5.32125" stroke="currentColor" />
              <line x1="14.3203" y1="14.6797" x2="5.12789" y2="5.48734" stroke="currentColor" />
            </svg>
          </span>
          <span className={styles.mobileNav__offIcon}>
            <svg viewBox="0 0 19 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M4.77051 12.9805L4.77051 13.4805L5.77051 13.4805L5.77051 12.9805L4.77051 12.9805ZM5.77051 12.9805L5.77051 1.01963L4.77051 1.01963L4.77051 12.9805L5.77051 12.9805Z"
                fill="currentColor"
              />
              <path
                d="M5.58137 1.37281L5.93492 1.01925L5.22782 0.312146L4.87426 0.6657L5.58137 1.37281ZM1.35258 5.6016L5.58137 1.37281L4.87426 0.6657L0.64547 4.89449L1.35258 5.6016Z"
                fill="currentColor"
              />
              <path
                d="M9.10348 5.6016L9.45703 5.95515L10.1641 5.24805L9.81058 4.89449L9.10348 5.6016ZM9.81058 4.89449L5.58179 0.665699L4.87468 1.37281L9.10348 5.6016L9.81058 4.89449Z"
                fill="currentColor"
              />
              <path
                d="M14.2285 1.01953L14.2285 0.519531L13.2285 0.519531L13.2285 1.01953L14.2285 1.01953ZM13.2285 1.01953L13.2285 12.9804L14.2285 12.9804L14.2285 1.01953L13.2285 1.01953Z"
                fill="currentColor"
              />
              <path
                d="M13.4177 12.6272L13.0641 12.9807L13.7712 13.6879L14.1248 13.3343L13.4177 12.6272ZM17.6464 8.3984L13.4177 12.6272L14.1248 13.3343L18.3536 9.10551L17.6464 8.3984Z"
                fill="currentColor"
              />
              <path
                d="M9.89555 8.3984L9.54199 8.04485L8.83489 8.75195L9.18844 9.10551L9.89555 8.3984ZM9.18844 9.10551L13.4172 13.3343L14.1243 12.6272L9.89555 8.3984L9.18844 9.10551Z"
                fill="currentColor"
              />
            </svg>
          </span>
        </button>
      )}

      <div
        className={cx(
          styles.ExoIrisQuickLinks,
          scrollingUp && styles.scrollingUp,
          !atPageTop && styles.notAtPageTop,
          !headerReady && styles.headerNotReady,
          scrollDisabled && styles.scrollDisabled,
          { [styles.mobileNavOpen]: mobileNavOpen },
          isAnimatingBars && styles.isAnimatingBars
        )}
        data-theme={isDesktop ? quickLinksTheme : headerTheme}
      >
        {isDesktop && (
          <ul className={styles.desktopNav}>
            {LINKS.map((linkObject, i) => {
              return (
                <li
                  key={i}
                  className={cx(
                    styles.desktopNav__item,
                    { [styles.hovered]: indexHovered === i },
                    { [styles.active]: activeScrollIndex === i }
                  )}
                  onMouseEnter={() => {
                    setIndexHovered(i);
                  }}
                  onMouseLeave={() => {
                    setIndexHovered(-1);
                  }}
                  onClick={() => {
                    handleClick(i);
                  }}
                >
                  <button className={styles.desktopNav__button}>{linkObject.label}</button>
                  <span className={styles.desktopNav__barContainer}>
                    <span className={styles.desktopNav__barOutline} />
                    <span
                      className={styles.desktopNav__barFill}
                      ref={(ref) => {
                        barFillRefs.current[i] = ref;
                      }}
                    />
                  </span>
                </li>
              );
            })}
          </ul>
        )}

        {!isDesktop && (
          <div className={styles.mobileNav}>
            <div className={styles.mobileNavBg} />

            <ul className={styles.mobileNavList}>
              {LINKS.map((linkObject, i) => {
                return (
                  <li
                    key={i}
                    className={cx(
                      styles.mobileNavList__item,
                      { [styles.hovered]: indexHovered === i },
                      { [styles.active]: activeScrollIndex === i }
                    )}
                    onClick={() => {
                      handleClick(i);
                      setMobileNavOpen(false);
                    }}
                  >
                    <button className={styles.mobileNavList__button}>{linkObject.label}</button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

ExoIrisQuickLinks.displayName = 'ExoIrisQuickLinks';

export default ExoIrisQuickLinks;
