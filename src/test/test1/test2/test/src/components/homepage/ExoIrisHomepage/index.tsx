'use client';

import { Canvas } from '@react-three/fiber';
import { motion, useInView } from 'framer-motion';
import { Leva, useControls } from 'leva';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import { BackgroundCanvas, BackgroundConfig } from '~/components/3d';
import { ArrowLink, ButtonLink, ExoLinkProps, Section, SectionProps } from '~/components/ui';
import { useGlobalStore } from '~/stores/globalStore';
import { externalToIsExternal } from '~/utils';
import { OmitChildren } from '~/utils/types';

import ExoIrisEnvironment from '../../exo-iris/ExoIrisCanvas/ExoIrisEnvironment';
import { Model } from './Model';
import bgConfig from './bgConfig.yml';
import styles from './exo-iris-homepage.module.scss';

const TEMP_DATA = {
  logoUrl: '/assets/images/PLACEHOLDER-iris-logo.webp',
  logoAlt: 'Exo Iris Logo',
  mobileImage: '/assets/images/PLACEHOLDER-iris-mobile.webp',
  mobileImageAlt: 'Exo Iris Mobile',
  mobileImageWidth: 706,
  mobileImageHeight: 416,
};

interface HomepageExoIrisSectionProps
  extends Omit<OmitChildren<SectionProps>, 'isDark' | 'accentColor'> {
  logo?: { src: string; alt: string };
  heading: string;
  copy: string;
  primaryCta?: ExoLinkProps | null;
  secondaryCta?: ExoLinkProps | null;
}

export const ExoIrisHomepage = (props: HomepageExoIrisSectionProps) => {
  const { heading, copy, primaryCta, secondaryCta, logo } = props;
  const { mobileImage, mobileImageAlt, mobileImageWidth, mobileImageHeight } = TEMP_DATA;
  const { setShowEmailDialogSoon } = useGlobalStore(['setShowEmailDialogSoon']);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const canvasContainerInView = useInView(canvasContainerRef, { amount: 0.5 });
  const [animationPlaying, setAnimationPlaying] = useState(false);

  // triggers model animation on
  useEffect(() => {
    if (!animationPlaying && canvasContainerInView) {
      setAnimationPlaying(true);
    }
  }, [animationPlaying, canvasContainerInView]);

  useEffect(() => {
    if (canvasContainerInView) {
      setShowEmailDialogSoon(true);
    }
  }, [canvasContainerInView, setShowEmailDialogSoon]);

  function setResponsiveCanvasScale() {
    // width = window.innerWidth
    // height = window.innerHeight
    // camera.aspect = width / height
    // camera.zoom = width / 500
    // camera.updateProjectionMatrix()
  }

  const { ambient, pointX, pointY, pointZ, pointColor } = useControls('light', {
    ambient: {
      value: 0.7,
      min: 0,
      max: 1,
      step: 0.05,
    },
    pointX: {
      value: 695,
      min: -5000,
      max: 5000,
      step: 25,
    },
    pointY: {
      value: 1155,
      min: -5000,
      max: 5000,
      step: 25,
    },
    pointZ: {
      value: 2900,
      min: -5000,
      max: 5000,
      step: 25,
    },
    pointColor: '#ffffff',
  });

  return (
    <Section className={styles.container}>
      <Leva hidden />
      <div className={styles.innerContainer}>
        <div className={styles.gradientContainer} aria-hidden>
          <BackgroundCanvas
            grainIntensity={0.3}
            targetOpacityDuration={3}
            config={bgConfig as BackgroundConfig}
          />
        </div>
        <div className={styles.innerContainerTop}>
          <div className={styles.logoContainer}>
            <img {...logo} className={styles.logo} width={100} height={30} alt="Exo Iris" />
          </div>
          <h2 className={styles.title}>{heading}</h2>
        </div>
        <Image
          src={mobileImage}
          alt={mobileImageAlt}
          className={styles.mobileImage}
          width={mobileImageWidth}
          height={mobileImageHeight}
        />
        <div className={styles.innerContainerBottom}>
          <p className={styles.copy}>{copy}</p>
          {!!primaryCta && <ArrowLink {...primaryCta} className={styles.discoverLink} isBig />}
          {!!secondaryCta && (
            <ButtonLink {...externalToIsExternal(secondaryCta)} className={styles.buyNowButton} />
          )}
        </div>
        <div className={styles.canvasContainer} ref={canvasContainerRef}>
          <Canvas className={styles.canvas} camera={{ position: [0, 0, 10], fov: 20 }}>
            <ExoIrisEnvironment />
            {/* <ambientLight intensity={ambient} />
            <pointLight position={[pointX, pointY, pointZ]} color={pointColor} />
            <pointLight position={[pointX, pointY, pointZ]} color={pointColor} /> */}
            <Model animationPlaying={animationPlaying} containerRef={canvasContainerRef} />
          </Canvas>
        </div>
      </div>
    </Section>
  );
};
