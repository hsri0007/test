'use client';

import { Environment } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { PanInfo, motion, useInView } from 'framer-motion';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { LinearSRGBColorSpace } from 'three';

import { Maybe } from '~/cms';
import { ArrowLink, CarouselIndicator, ExoLinkProps, Section, SectionProps } from '~/components/ui';
import VideoAltText from '~/components/ui/VideoAltText';
import { useIsLandscape } from '~/hooks';
import { cx } from '~/utils';
import { OmitChildren } from '~/utils/types';

import { HomepageExoWorksScene } from './HomepageExoWorksScene';
import styles from './HomepageExoWorksSection.module.scss';

interface HomepageExoWorksSectionProps
  extends Omit<OmitChildren<SectionProps>, 'isDark' | 'accentColor'> {
  logo?: { src: string };
  screens: string[];
  heading: string;
  copy: string;
  primaryCta?: ExoLinkProps | null;
  secondaryCta?: ExoLinkProps | null;
  videoAltText: Maybe<string>;
}

const PAN_INCREMENT = 100;
const OVERSCROLL_PERCENTAGE = 0.25;

export const HomepageExoWorksSection = (props: HomepageExoWorksSectionProps) => {
  const {
    className,
    logo,
    heading,
    copy,
    primaryCta,
    secondaryCta,
    screens,
    videoAltText,
    ...otherProps
  } = props;
  const screenCount = screens.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const [panIndexMod, setPanIndexMod] = useState(0);
  const isLg = useIsLandscape();
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef);
  const canvasWrapperRef = useRef<HTMLDivElement | null>(null);

  const handlePan = useCallback(
    (e: PointerEvent, i: PanInfo) => {
      setPanIndexMod(panIndexMod + (i.delta.x * -1) / PAN_INCREMENT);
    },
    [panIndexMod]
  );

  const handlePanEnd = useCallback(
    (e: PointerEvent, i: PanInfo) => {
      let newActiveIndex = Math.round(activeIndex + panIndexMod);
      if (newActiveIndex > screenCount - 1) {
        newActiveIndex = screenCount - 1;
      }
      if (newActiveIndex < 0) {
        newActiveIndex = 0;
      }
      setActiveIndex(newActiveIndex);
      setPanIndexMod(0);
    },
    [activeIndex, panIndexMod, screenCount]
  );

  const modifiedActiveIndex = useMemo(() => {
    let moddedIndex = activeIndex + panIndexMod;
    if (moddedIndex > screenCount - (1 - OVERSCROLL_PERCENTAGE)) {
      moddedIndex = screenCount - (1 - OVERSCROLL_PERCENTAGE);
    }
    if (moddedIndex < -1 * OVERSCROLL_PERCENTAGE) {
      moddedIndex = -1 * OVERSCROLL_PERCENTAGE;
    }
    return moddedIndex;
  }, [activeIndex, panIndexMod, screenCount]);

  const roundedModifiedActiveIndex = useMemo(
    () => Math.round(modifiedActiveIndex),
    [modifiedActiveIndex]
  );

  return (
    <Section
      {...otherProps}
      ref={sectionRef}
      isDark
      data-accent-color="works-purple"
      className={cx(className, styles.section)}
    >
      <div className={styles.content}>
        <div className={styles.highlight} />
        {logo && (
          <img
            alt="Exo Works"
            loading="lazy"
            width="90"
            height="35"
            className={styles.logo}
            {...logo}
          />
        )}
        <h2 className={styles.heading}>{heading}</h2>
        <p className={styles.copy}>{copy}</p>
        <VideoAltText text={videoAltText} describes={canvasWrapperRef.current} />
        {isLg && screenCount > 1 && (
          <CarouselIndicator
            className={styles.indicator}
            count={screenCount}
            activeIndex={roundedModifiedActiveIndex}
            onClick={setActiveIndex}
          />
        )}
        {!!primaryCta && <ArrowLink {...primaryCta} className={styles.cta} isBig />}
        <motion.div
          className={styles.canvasWrapper}
          onPan={handlePan}
          onPanEnd={handlePanEnd}
          ref={canvasWrapperRef}
          data-cursor="drag"
        >
          <Canvas
            className={styles.canvas}
            style={{ pointerEvents: 'none' }}
            frameloop={isInView ? 'always' : 'never'}
            camera={{ position: [0, 0, 75], near: 0.1, far: 100, fov: 10 }}
            gl={{
              outputColorSpace: LinearSRGBColorSpace,
              antialias: true,
            }}
          >
            <Environment files="/assets/textures/studio.hdr" />
            <HomepageExoWorksScene activeIndex={modifiedActiveIndex} screens={screens} />
          </Canvas>
          <div className={styles.canvasMask} />
        </motion.div>
      </div>
    </Section>
  );
};
