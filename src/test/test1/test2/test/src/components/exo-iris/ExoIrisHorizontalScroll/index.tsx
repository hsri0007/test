import gsap from 'gsap';
import SplitText from 'gsap/SplitText';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

import { ExoIrisContentFragment } from '~/cms';
import { useLenis } from '~/components/layout/LenisWrapper';
import { Section } from '~/components/ui';
import { use3dStore } from '~/stores/3d/store';
import { useIrisStore } from '~/stores/exo-iris/store';
import { cx } from '~/utils';

import styles from './ExoIrisHorizontalScroll.module.scss';

interface ExoIrisHorizontalScrollProps {
  heading: ExoIrisContentFragment['horizontalHeading'];
  id?: string;
}

export const ExoIrisHorizontalScroll = (props: ExoIrisHorizontalScrollProps) => {
  const { heading, id } = props;

  const containerRef = useRef<HTMLElement | null>(null);
  // const { setModelLoaded, setPhoneModelLoaded } = useIrisStore([
  //   'setCanvasEnabled',
  //   'setModelLoaded',
  //   'setPhoneModelLoaded',
  // ]);
  // const [headlineWidth, setHeadlineWidth] = useState(0);
  // const [headlineLeftPadding, setHeadlineLeftPadding] = useState(0);

  // pulls width of headline and its left padding so the animation can scroll horizontally the proper amount
  // const handleResize = useCallback(() => {
  //   if (!containerRef.current) return;
  //   const headlineWidth =
  //     containerRef.current.querySelector<HTMLElement>('.js__headline')?.clientWidth;
  //   const headingLeftPadding =
  //     containerRef.current.querySelector<HTMLElement>('.js__headline-container');
  //   if (headlineWidth) {
  //     setHeadlineWidth(headlineWidth);
  //   }
  //   if (headingLeftPadding) {
  //     const leftPadValue = parseFloat(
  //       window.getComputedStyle(headingLeftPadding).getPropertyValue('padding-left')
  //     );
  //     setHeadlineLeftPadding(leftPadValue);
  //   }
  // }, []);

  // useEffect(() => {
  //   handleResize();
  //   window.addEventListener('resize', handleResize);
  //   return () => window.removeEventListener('resize', handleResize);
  // }, [handleResize]);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(
      { isDesktop: '(orientation: landscape)', isMobile: '(orientation: portrait)' },
      (ctx: any) => {
        const { isDesktop } = ctx.conditions;
        const splitHeadline = new SplitText('.js__headline', {
          type: 'words',
        });

        // used for the horizontal scrolling
        const scrollTween = gsap.to('.js__headline-container', {
          x: '-100%',
          ease: 'power1.inOut',
          scrollTrigger: {
            trigger: containerRef.current,
            scrub: true,
            start: '0% 0%',
            // controls horizontal scroll speed
            end: '100% 100%',
          },
        });

        // used for individual word opacities
        splitHeadline.words.forEach((word) => {
          gsap.set(word, {
            autoAlpha: 0.2,
          });
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: word,
              containerAnimation: scrollTween,
              start: 'center 75%',
              // markers: true,
              scrub: true,
            },
          });
          tl.to(word, {
            autoAlpha: 1,
          });
        });
      },
      containerRef
    );

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <Section id={id} className={styles.container} isDark ref={containerRef}>
      <div className={cx(styles.headlineContainer, 'js__headline-container')}>
        <h2 className={cx(styles.headline, 'js__headline')}>{heading}</h2>
        {/* an empty grid for scrolling continuity on desktop */}
        <div className={styles.gridContainer} aria-hidden>
          <div className={styles.grid}>
            <div className={styles.leftColumn} />
          </div>
        </div>
      </div>
    </Section>
  );
};
