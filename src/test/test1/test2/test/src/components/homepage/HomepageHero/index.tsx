'use client';

import { motion, useAnimation, useMotionTemplate, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { Leva, useControls } from 'leva';
import { useEffect, useRef } from 'react';

import { BackgroundCanvas, BackgroundConfig } from '~/components/3d';
import { AbstractCircles } from '~/components/sections/BlobGradientHeroSection/AbstractCircle';

import { HomeHeadLine } from './HomeHeadLine';
import styles from './HomepageHero.module.scss';
import bgConfig from './bgConfig.yml';

interface HomepageHeroProps {
  headline: string;
  subhead?: string | null;
  copy?: string | null;
}

export const HomepageHero = (props: HomepageHeroProps) => {
  const { headline, copy, subhead, ...otherProps } = props;
  const subheadRef = useRef<HTMLHeadingElement | null>(null); // eslint-disable-next-line react-hooks/exhaustive-deps
  const copyRef = useRef<HTMLParagraphElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const gradientContainerRef = useRef<HTMLDivElement>(null);

  const timeline = useRef<gsap.core.Timeline>(gsap.timeline({ paused: true }));

  const { scrollYProgress } = useScroll({
    target: contentRef,
    offset: ['0.25 start', '1.25 start'],
  });
  const contentBlur = useTransform(scrollYProgress, [0, 1], [0, 20]);
  const contentOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const contentFilter = useMotionTemplate`blur(${contentBlur}rem)`;

  const subheadControls = useAnimation();
  const copyControls = useAnimation();

  function replayAnimation(value: boolean) {
    if (value) {
      timeline.current.restart();
    } else {
      subheadControls.stop();
      subheadControls.set({
        opacity: 0,
        filter: 'blur(15rem)',
        transition: { duration: 0, ease: 'linear', delay: 0 },
      });
      copyControls.stop();
      copyControls.set({
        opacity: 0,
        filter: 'blur(15rem)',
        transition: { duration: 0, ease: 'linear', delay: 0 },
      });
      timeline.current.pause(0);
    }
  }

  function mount() {
    timeline.current.add(() => {
      subheadControls.start({
        opacity: 1,
        filter: 'blur(0rem)',
        transition: { duration: 1.2, ease: 'linear', delay: 0.5 },
        // transition: { duration: 0.6, ease: 'linear', delay: 0 },
      });
      copyControls.start({
        opacity: 1,
        filter: 'blur(0rem)',
        transition: { duration: 1.2, ease: 'linear', delay: 1 },
        // transition: { duration: 0.6, ease: 'linear', delay: 0.3 },
      });
    }, 0.001);

    setTimeout(() => {
      replayAnimation(true);
    }, 1000);
    // }, 300);

    return unmount;
  }

  function unmount() {
    timeline.current = gsap.timeline({ paused: true });
    // animationIsPlaying.current = false;
  }

  function onHomeHeadLineTimeline(tl: gsap.core.Timeline) {
    timeline.current?.add(tl.play(), 0.001);
  }

  useEffect(
    mount, // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <motion.section
      ref={contentRef}
      className={styles.content}
      // data-animation-is-playing={animationIsPlaying}
      style={{ filter: contentFilter, opacity: contentOpacity }}
    >
      <div className={styles.gradientContainer} ref={gradientContainerRef} aria-hidden>
        <BackgroundCanvas
          backgroundColor={'#F7F9FC'}
          grainIntensity={0}
          targetOpacityDuration={3}
          className={styles.graidentBackgroundCanvas}
          config={bgConfig as BackgroundConfig}
        />
      </div>
      <AbstractCircles isDark={false} circleCount={3}></AbstractCircles>
      <HomeHeadLine
        headline={headline}
        onTimeline={onHomeHeadLineTimeline}
        replayAnimation={replayAnimation}
      ></HomeHeadLine>
      {!!(copy && subhead) && (
        <div className={styles.bottomCopy}>
          <div className={styles.bottomCopyContent}>
            {!!subhead && (
              <motion.h2
                className={styles.subhead}
                initial={{ opacity: 0, filter: 'blur(15rem)' }}
                animate={subheadControls}
              >
                {subhead}
              </motion.h2>
            )}
            {!!copy && (
              <motion.p
                className={styles.copy}
                initial={{ opacity: 0, filter: 'blur(15rem)' }}
                animate={copyControls}
              >
                {copy}
              </motion.p>
            )}
          </div>
        </div>
      )}
    </motion.section>
  );
};
