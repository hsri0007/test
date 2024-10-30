'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLayoutEffect, useRef, useState } from 'react';

import { TechnologyContentFragment } from '~/cms';
import { Section } from '~/components/ui';
import { useIsLandscape } from '~/hooks';
import { use3dStore } from '~/stores/3d/store';
import { useGlobalStore } from '~/stores/globalStore';
import { useTechnologyStore } from '~/stores/technology/store';

import styles from './Meets.module.scss';

gsap.registerPlugin(ScrollTrigger, CustomEase);

export interface MeetsProps {
  wordLeft: TechnologyContentFragment['meetsWordLeft'];
  wordCenter: TechnologyContentFragment['meetsWordCenter'];
  wordRight: TechnologyContentFragment['meetsWordRight'];
  heading: TechnologyContentFragment['meetsHeading'];
  copy: TechnologyContentFragment['meetsCopy'];
}

const Meets = (props: MeetsProps) => {
  const { wordLeft, wordCenter, wordRight, heading, copy } = props;
  const [initialXLeft, setInitialXLeft] = useState(0);
  const [initialXRight, setInitialXRight] = useState(0);
  const refContainer = useRef<HTMLParagraphElement | null>(null);
  const refSectionContainer = useRef<HTMLElement | null>(null);
  const headingsRef = useRef<HTMLDivElement | null>(null);
  const textContainerRef = useRef<HTMLDivElement | null>(null);
  const refLeft = useRef<HTMLSpanElement | null>(null);
  const refRight = useRef<HTMLSpanElement | null>(null);
  const refBlobs = useRef<HTMLDivElement | null>(null);
  const { windowWidth } = useGlobalStore(['windowWidth']);
  const isDesktop = useIsLandscape();

  const { pmutGroupRef, pmutModelRef } = use3dStore(['pmutGroupRef', 'pmutModelRef']);

  const { scrollYProgress } = useScroll({
    target: refContainer,
    offset: ['start end', 'center center'],
  });

  const { scrollYProgress: scrollYProgressMiddleWord } = useScroll({
    target: refContainer,
    offset: ['center center', 'start start'],
  });

  const { scrollYProgress: scrollYProgressTextContainer } = useScroll({
    target: textContainerRef,
    offset: ['start end', 'center end'],
  });

  const xLeft = useTransform(scrollYProgress, [0, 1], [initialXLeft, 0]);
  const xRight = useTransform(scrollYProgress, [0, 1], [initialXRight, 0]);
  const wordScale = useTransform(scrollYProgress, [0, 1], [1.5, 1]);

  useLayoutEffect(() => {
    if (refLeft.current) {
      const bounds = refLeft.current.getBoundingClientRect();
      const initial = -(bounds.left + bounds.width);
      setInitialXLeft(initial);
    }

    if (refRight.current) {
      const bounds = refRight.current.getBoundingClientRect();
      const initial = windowWidth - bounds.left;
      setInitialXRight(initial);
    }
  }, [windowWidth]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: refSectionContainer.current,
          start: 'top bottom',
          end: 'top+=50% bottom',
          scrub: true,
          // markers: true,
          onUpdate: (self) => {},
          onEnter: (self) => {
            gsap.to(refBlobs.current, { opacity: 1 });
          },
          // onEnterBack: (self) => {
          //   gsap.to(refBlobs.current, { opacity: 1 });
          // },
          // onLeave: (self) => {
          //   gsap.to(refBlobs.current, { opacity: 0 });
          // },
          // onLeaveBack: (self) => {
          //   gsap.to(refBlobs.current, { opacity: 0 });
          // },
        },
      });
    }, refSectionContainer);

    return () => ctx.revert();
  });

  const { techCanvasContainerRef } = useTechnologyStore(['techCanvasContainerRef']);
  const spacerRef = useRef<HTMLDivElement | null>(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (!spacerRef.current) return;

      if (techCanvasContainerRef) {
        let start = `bottom bottom`;
        if (!isDesktop) {
          start = `bottom+=${spacerRef.current.offsetHeight * 0.65} bottom`;
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: isDesktop ? headingsRef.current : spacerRef.current,
            start,
            end: 'bottom top',
            scrub: true,
          },
        });
        tl.to(
          techCanvasContainerRef.current,
          {
            translateY: !isDesktop ? '-50%' : '-70%',
          },
          '>'
        );
      }
    }, spacerRef);

    return () => ctx.revert();
  }, [techCanvasContainerRef, isDesktop]);

  return (
    <Section className={styles.container} ref={refSectionContainer} isDark>
      <p className={styles.words} ref={refContainer}>
        <motion.span
          className={styles.wordLeft}
          ref={refLeft}
          style={{ x: isDesktop ? xLeft : 'none', scale: isDesktop ? wordScale : 1 }}
        >
          {wordLeft}
        </motion.span>

        <motion.span
          style={{
            opacity: isDesktop ? scrollYProgressMiddleWord : 1,
            scale: isDesktop ? wordScale : 1,
          }}
        >
          {` ${wordCenter} `}
        </motion.span>

        <motion.span
          className={styles.wordRight}
          ref={refRight}
          style={{ x: isDesktop ? xRight : 'none', scale: wordScale }}
        >
          {wordRight}
        </motion.span>
      </p>

      <div className={styles.headings} ref={headingsRef}>
        <div className={styles.staticBlurBGContainer} ref={spacerRef}>
          <div className={styles.staticBlurBG} ref={refBlobs}>
            <div className={`${styles.blurEl} ${styles.green}`}>g</div>
            <div className={`${styles.blurEl} ${styles.blue}`}>b</div>
          </div>
          <div className={styles.spacer}></div>
        </div>

        <motion.div
          className={styles.textContainer}
          ref={textContainerRef}
          style={{
            opacity: isDesktop ? scrollYProgressTextContainer : 1,
          }}
        >
          {heading && <p className={styles.heading}>{heading}</p>}
          {copy && <p className={styles.copy}>{copy}</p>}
        </motion.div>
      </div>
    </Section>
  );
};

export { Meets };
