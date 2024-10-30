'use client';

import { useState } from 'react';
import { useStore } from 'zustand';

import { DemoPageData } from '~/app/iris/demo/page';
import { VideoSection } from '~/components/sections';
import { CircleArrow } from '~/components/svgs';
import { ArrowLink, ButtonLink, ExoLink } from '~/components/ui';
import { cx } from '~/utils';

import styles from './VirtualDemo.module.scss';

export const VirtualDemo = ({ data }: { data: DemoPageData }) => {
  const [showVedio, setShowVedio] = useState(false);
  return (
    <div className={styles.bookDemo}>
      <section className={styles.info}>
        <h1 className={styles.heading}>{data.heading}</h1>
        {!!data.video && showVedio && data?.video?.contentType?.includes('video') && (
          <VideoSection
            __typename="ResponsiveVideo"
            darkTheme={true}
            video={data?.video}
            heading={data.subheading}
            eyebrow={null}
            sys={{ id: '' }}
            mobileVideo={null}
            previewVideo={null}
            backgroundVideo={false}
          />
        )}
        {!!data.demoCtaImage && data.demoCtaImage.contentType?.includes('image') && !showVedio && (
          <ExoLink
            onClick={() => {
              setShowVedio(true);
            }}
          >
            <div className={styles.imageContainer}>
              {!!data.subheading && (
                <div className={styles.subheadingContainer}>
                  <h2 className={styles.subheading}>{data.subheading}</h2>
                </div>
              )}
              <img
                className={styles.image}
                src={data.demoCtaImage.url}
                alt={data.demoCtaImage.description}
              />
            </div>
          </ExoLink>
        )}
      </section>

      <div className={styles.btnWrapper}>
        {/* <div className={`${styles.btnContainer} ${styles.desktopDiscoverBtn}`}>
          <a href="https://www.exo.inc/iris">
            <span className={styles.productBtn}>Discover</span>
            <CircleArrow className={styles.circle} />
          </a>
        </div> */}
        <div className={`${styles.btnContainer} ${styles.desktopDiscoverBtn}`}>
          <ArrowLink className={styles.arrowLink} href={'https://www.exo.inc/iris'} isBig>
            Discover
          </ArrowLink>
        </div>
      </div>
      <div className={styles.ctaContainer}>
        {!!data.demoCtaHeading && <h2 className={styles.ctaHeading}>{data.demoCtaHeading}</h2>}
        {!!data.demoCtaSubheading && (
          <p className={styles.ctaSubheading}>{data.demoCtaSubheading}</p>
        )}
        <div className={styles.ctaButtonContainer}>
          <ButtonLink href="https://store.exo.inc/product/FG-1001-24">
            {data.demoCtaVirtualDemoButtonCopy}
          </ButtonLink>
          <ButtonLink secondary href="/iris/demo/live-demo-form/">
            {data.demoCtaLiveDemoButtonCopy}
          </ButtonLink>
        </div>
      </div>
      <ExoLink href="/iris" className={styles.closeLink}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 50 50"
          fill="none"
          className={styles.closeIcon}
        >
          <path
            d="M18.4844 18.4844L32.0014 32.0014"
            stroke="#384049"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M18.4844 32L32.0014 18.4829"
            stroke="#384049"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <rect x="1" y="1" width="48" height="48" rx="24" stroke="#384049" strokeWidth="2" />
        </svg>
      </ExoLink>
    </div>
  );
};
