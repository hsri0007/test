'use client';

import gsap from 'gsap';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { getHasSeen, setTimeSeen } from '~/components/exo-iris/ExoIrisIntro';
import { useGlobalStore } from '~/stores/globalStore';
import { cx } from '~/utils';

import { ExoLink } from '../ExoLink';
import styles from './Banner.module.scss';

const DEFAULT_KEY = 'DEFAULT';

const COMPONENTS = {
  [DEFAULT_KEY]: {
    link: 'https://www.exo.inc/article/revolution-in-real-time-exo-introduces-sweepai-ultrasound-just-got-smarter',
    component: () => {
      return <p>Exo introduces SweepAI™ — read the latest press release</p>;
    },
  },
  IRIS: {
    link: 'https://www.exo.inc/article/revolution-in-real-time-exo-introduces-sweepai-ultrasound-just-got-smarter',
    component: () => {
      return <p>Exo introduces SweepAI™ — read the latest press release</p>;
    },
  },
  IRIS_INTEGRATIONS: {
    link: 'https://www.exo.inc/article/revolution-in-real-time-exo-introduces-sweepai-ultrasound-just-got-smarter',
    component: () => {
      return <p>Exo introduces SweepAI™ — read the latest press release</p>;
    },
  },
};

const DATA = {
  [DEFAULT_KEY]: COMPONENTS[DEFAULT_KEY],
  '/iris': COMPONENTS.IRIS,
  '/iris/integrations': COMPONENTS.IRIS_INTEGRATIONS,
};

const DAY_MS = 86400000;
const TIME_DIFFERENCE = DAY_MS; // 1 day
const LOCAL_STORAGE_KEY = 'exo_banner_last_seen';

const Banner = () => {
  const [bannerKeyToShow, setBannerKeyToShow] = useState<null | string>(null);
  const containerRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const pathname = usePathname();

  const { bannerTheme, mobileNavExpanded, headerReady, scrollDisabled } = useGlobalStore([
    'bannerTheme',
    'mobileNavExpanded',
    'headerReady',
    'scrollDisabled',
  ]);

  const getLocalStorageKey = (key: string) => {
    return `${LOCAL_STORAGE_KEY}__${key}`;
  };

  const handleCloseButton = (key: string) => {
    setTimeSeen(getLocalStorageKey(key));
    setBannerKeyToShow(null);
  };

  useEffect(() => {
    let keyToShow = null;

    if (
      !getHasSeen(getLocalStorageKey(DEFAULT_KEY), TIME_DIFFERENCE) &&
      pathname !== DATA[DEFAULT_KEY].link
    ) {
      keyToShow = DEFAULT_KEY;
    }

    Object.keys(DATA).forEach((key) => {
      if (key === pathname && !getHasSeen(getLocalStorageKey(key), TIME_DIFFERENCE)) {
        keyToShow = key;
      }
    });

    setBannerKeyToShow(keyToShow);
  }, [pathname]);

  useEffect(() => {
    Object.keys(DATA).forEach((key, i) => {
      const element = containerRefs.current[key];
      if (!element) return;
      const isActive = key === bannerKeyToShow;
      gsap.killTweensOf(element);

      let show = isActive;
      if (mobileNavExpanded || !headerReady || scrollDisabled) {
        show = false;
      }

      gsap.to(element, {
        autoAlpha: show ? 1 : 0,
        pointerEvents: show ? 'all' : 'none',
      });
    });
  }, [bannerKeyToShow, mobileNavExpanded, headerReady, scrollDisabled]);

  return (
    <>
      {Object.keys(DATA).map((key, i) => {
        const TextComponent = DATA[key as keyof typeof DATA].component;
        const link = DATA[key as keyof typeof DATA].link;

        const text = (
          <div className={styles.text}>
            <TextComponent />
          </div>
        );

        return (
          <div
            key={i}
            className={cx(styles.Banner, { [styles.hasLink]: link })}
            ref={(ref) => {
              containerRefs.current[key] = ref;
            }}
            data-theme={bannerTheme}
            {...(bannerKeyToShow === key ? {} : { 'aria-hidden': 'true' })}
          >
            <div
              className={styles.inner}
              onClick={() => {
                if (link) {
                  handleCloseButton(key);
                }
              }}
            >
              {link ? (
                <ExoLink className={styles.textContainer} href={link}>
                  {text}
                </ExoLink>
              ) : (
                <div className={styles.textContainer}>{text}</div>
              )}
              <button
                onClick={() => {
                  handleCloseButton(key);
                }}
                className={styles.closeButton}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 50 50"
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
          </div>
        );
      })}
    </>
  );
};

Banner.displayName = 'Banner';

export default Banner;
