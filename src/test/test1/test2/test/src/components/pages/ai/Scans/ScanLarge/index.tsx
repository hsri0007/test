import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLayoutEffect, useRef } from 'react';

import { AssetFragment, Maybe } from '~/cms';
import { ArrowLink, CMSImage, ExoLink } from '~/components/ui';
import VideoAltText from '~/components/ui/VideoAltText';
import { cx } from '~/utils';

import styles from './ScanLarge.module.scss';

gsap.registerPlugin(ScrollTrigger);

interface ScanLargeProps {
  image: AssetFragment | null;
  heading: string | null;
  clearance: string | null;
  copy: string | null;
  phoneImage?: AssetFragment | null;
  videoAltText?: Maybe<string>;
}

const ScanLarge = (props: ScanLargeProps) => {
  const { phoneImage, image, heading, clearance, copy, videoAltText } = props;
  const containerRef = useRef(null);

  // for the images as they scroll up
  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(
      { isDesktop: '(orientation: landscape)', isMobile: '(orientation: portrait)' },
      (ctx: any) => {
        const { isDesktop } = ctx.conditions;
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: '.js__imageContainer',
            // markers: true,
            scrub: true,
            start: 'top 75%',
            end: '50% 75%',
          },
        });
        tl.fromTo(
          '.js__imageContainer',
          { autoAlpha: 0 },
          {
            autoAlpha: 1,
          }
        );
        tl.fromTo(
          '.js__imageContainer picture',
          { scale: 1.3, filter: 'blur(20px)' },
          { scale: 1, filter: 'blur(0px)' },
          '<'
        );
      },
      containerRef
    );

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={cx(styles.contentWrap, 'js__imageContainer')}>
        {image && (
          <div className={styles.imageWrap}>
            <CMSImage loading="lazy" asset={image} className={styles.image} lg={{ asset: image }} />
          </div>
        )}
        <div className={styles.bar}>
          <div className={styles.headings}>
            {heading && <p className={styles.heading}>{heading}</p>}
            {clearance && <p className={styles.clearance}>{clearance}</p>}
            {(heading === 'Cardiac' || heading === 'Lung') && (
              <div className={styles.ctaContainer} data-theme="dark">
                <ArrowLink className={styles.arrowLink} href={'/ai/heart-and-lung'}>
                  Discover
                </ArrowLink>
              </div>
            )}
            <VideoAltText text={videoAltText || ''} />
          </div>
          {copy && <div className={styles.copy} dangerouslySetInnerHTML={{ __html: copy }} />}
        </div>
      </div>
    </div>
  );
};

export { ScanLarge };
