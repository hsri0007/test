'use client';

import { useFrame, useThree } from '@react-three/fiber';
import { progress } from 'framer-motion';
import { useInView } from 'framer-motion';
import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MutableRefObject, useEffect, useLayoutEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { degToRad, radToDeg } from 'three/src/math/MathUtils';

import { BackgroundCanvas, BackgroundConfig } from '~/components/3d';
import { useLenis } from '~/components/layout/LenisWrapper';
import { Section } from '~/components/ui';
import { useIsLandscape } from '~/hooks';
import { use3dStore } from '~/stores/3d/store';
import { useGlobalStore } from '~/stores/globalStore';
import { useTechnologyStore } from '~/stores/technology/store';
import { cx } from '~/utils';

import { ExoTechCanvas } from './ExoTechCanvas/ExoTechCanvas';
import styles from './Hero.module.scss';
import bgConfig from './bgConfig.yml';

gsap.registerPlugin(ScrollTrigger, CustomEase);

const Hero = ({ introRef }: { introRef: MutableRefObject<HTMLDivElement | null> }) => {
  const refContainer = useRef<HTMLElement | null>(null);
  const refText = useRef<HTMLParagraphElement | null>(null);
  const exoRef = useRef<HTMLSpanElement | null>(null);
  const siliconRef = useRef<HTMLSpanElement | null>(null);
  const [animComplete, setAnimComplete] = useState(false);
  const refBackdrop = useRef<HTMLDivElement | null>(null);
  const gradientContainerRef = useRef<HTMLDivElement>(null);
  const [disableScrollChecked, setDisableScrollChecked] = useState(false);

  const isDesktop = useIsLandscape();

  const { pmutModelVisible, pmutGroupRef, pmutModelRef } = use3dStore([
    'pmutModelVisible',
    'pmutGroupRef',
    'pmutModelRef',
  ]);

  const {
    modelLoaded,
    modelVisible,
    setModelVisible,
    pageLoaded,
    techCanvasContainerRef,
    setIntroComplete,
    introComplete,
    cameraRef,
  } = useTechnologyStore([
    'modelLoaded',
    'modelVisible',
    'setModelVisible',
    'pageLoaded',
    'techCanvasContainerRef',
    'setIntroComplete',
    'introComplete',
    'cameraRef',
  ]);

  const { scrollDisabled, setScrollDisabled } = useGlobalStore([
    'scrollDisabled',
    'setScrollDisabled',
  ]);

  const lenis = useLenis();
  const domContainerInView = useInView(introRef);

  useEffect(() => {
    setModelVisible(domContainerInView);
  }, [domContainerInView, setModelVisible]);

  // check only on page load to see if the DOM container is in view (to account for people navigating
  // via back or forward buttons and landing mid-page)
  useLayoutEffect(() => {
    if (!pageLoaded || disableScrollChecked) return;
    setDisableScrollChecked(true);
    if (domContainerInView) {
      setScrollDisabled(true);
      lenis.scrollTo('top');
    }
  }, [disableScrollChecked, domContainerInView, lenis, pageLoaded, setScrollDisabled]);

  // re-enable scroll when intro is complete
  useLayoutEffect(() => {
    if (introComplete && scrollDisabled) {
      setScrollDisabled(false);
    }
  }, [introComplete, scrollDisabled, setScrollDisabled]);

  useLayoutEffect(() => {
    // INTRO ANIMATION
    if (
      !pageLoaded ||
      !modelLoaded ||
      !pmutGroupRef?.current ||
      !pmutModelRef?.current ||
      !techCanvasContainerRef ||
      !domContainerInView ||
      animComplete
    )
      return;

    const tl = gsap.timeline({
      onComplete: () => {
        setIntroComplete(true);
        setAnimComplete(true);
      },
    });

    const textOffset = window.innerWidth * 0.01;

    // tl.timeScale(15); //REMOVE WHEN FINISHED
    tl.set(techCanvasContainerRef.current, { filter: 'blur(10rem)' });
    tl.set(pmutGroupRef?.current.scale, { x: 0 });
    tl.set(refText.current, {
      filter: 'blur(10rem)',
      opacity: 0,
      // x: '-50%'
    });
    //tl.set(refText.current, { filter: 'blur(10rem)', opacity: 0, x: window.innerWidth * 0.025 });
    // tl.set(exoRef.current, { x: textOffset * -1 });
    // tl.set(siliconRef.current, { x: textOffset });

    tl.addLabel('initial');

    const SCALE_VAL = isDesktop ? 1 : 0.5;
    // tl.to(refText.current, { filter: 'blur(0rem)', opacity: 1, duration: 1.75 }, 'initial+=.1');
    tl.to(
      pmutGroupRef.current.scale,
      {
        x: SCALE_VAL,
        y: SCALE_VAL,
        z: SCALE_VAL,
        duration: 0.7,
        ease: CustomEase.create('custom', 'M0,0 C0.434,0.004 0.45,0.984 1,1'),
      },
      'initial+=0.5'
    );
    tl.to(
      techCanvasContainerRef.current,
      { filter: 'blur(0rem)', duration: 0.8, ease: 'linear' },
      'initial+=0.6'
    );

    tl.addLabel('rotate');
    tl.to(
      pmutGroupRef.current.rotation,
      {
        x: degToRad(18),
        y: degToRad(360),
        z: degToRad(0),
        duration: 1.6,
        ease: CustomEase.create('custom', 'M0,0 C0.434,0.004 0.45,0.984 1,1'),
      },
      'rotate'
    );
    tl.to(
      pmutGroupRef.current.position,
      {
        y: isDesktop ? -1 : -1.47,
        z: isDesktop ? 4 : 2.45,
        duration: 1.6,
        ease: CustomEase.create('custom', 'M0,0 C0.434,0.004 0.45,0.984 1,1'),
      },
      'rotate'
    );
    tl.to(refText.current, { filter: 'blur(0rem)', opacity: 1, duration: 1.75 }, 'rotate+=.7');
    // tl.to(
    //   [ exoRef.current, siliconRef.current],
    //   {
    //     x: 0,
    //     duration: 2,
    //     ease: 'Power3.easeInOut',
    //   },
    //   'rotate-=0.6'
    // );
  }, [
    isDesktop,
    modelLoaded,
    setIntroComplete,
    pageLoaded,
    pmutGroupRef,
    pmutModelRef,
    techCanvasContainerRef,
    cameraRef,
    domContainerInView,
    setAnimComplete,
    animComplete,
  ]);

  useLayoutEffect(() => {
    // SCROLL ANIMATION
    const ctx = gsap.context(() => {
      if (!introComplete || !pmutGroupRef?.current || !pmutModelRef?.current || !introRef.current)
        return;

      const PMUT_SCALE = 0.8;
      const pos = new THREE.Vector3();

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: introRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
          onToggle: (self) => {
            gsap.set(gradientContainerRef.current, { opacity: self.progress < 1 ? 1 : 0 });
          },
          // onUpdate: (self) => {
          //   if (!refBackdrop?.current) return;
          //   const t = gsap.utils.mapRange(0, 1.4, 20, -100, self.progress);
          //   gsap.to(refBackdrop.current, { y: `${t}%`, duration: 0, ease: 'none' });
          // },
        },
      });

      gsap.defaults({
        ease: CustomEase.create('custom', 'M0,0 C0.434,0.004 0.45,0.984 1,1'),
      });

      tl.addLabel('initial');

      tl.set(refText.current, { filter: 'blur(0rem)', opacity: 1 });

      tl.to(
        refText.current,
        {
          filter: 'blur(20rem)',
          opacity: 0,
        },
        'initial'
      );

      tl.to(
        pmutGroupRef.current.position,
        {
          x: 0,
          y: 0,
          z: 2,
        },
        'initial'
      );

      // tl.to(pmutGroupRef.current.rotation, {
      //   x: degToRad(90),
      //   y: degToRad(270),
      //   z: degToRad(0),
      // }); //
      // tl.to(pmutModelRef.current.rotation, {
      //   x: degToRad(368),
      //   y: degToRad(0),
      //   z: degToRad(10),
      // });

      // tl.to(pmutModelRef.current.rotation, {
      //   y: `-=${degToRad(115)}`,
      // });
      // tl.to(pmutGroupRef.current.rotation, {
      //   x: `-=${degToRad(55)}`,
      // });
      // tl.to(pmutGroupRef.current.position, {
      //   x: isDesktop ? 1.25 : 0.35,
      //   y: isDesktop ? -1 : -0.55,
      //   z: isDesktop ? 0 : 4,
      // });
    }, introRef);
    return () => ctx.revert();
  }, [
    isDesktop,
    introComplete,
    pmutGroupRef,
    pmutModelRef,
    introRef,
    refText,
    techCanvasContainerRef,
    refBackdrop,
    cameraRef,
  ]);

  return (
    <>
      <div className={styles.gradientContainer} ref={gradientContainerRef} aria-hidden>
        <BackgroundCanvas config={bgConfig as BackgroundConfig} />
      </div>
      <ExoTechCanvas />
      <Section className={styles.container} ref={refContainer}>
        <div className={styles.sticky}>
          <p className={cx(styles.heading, styles.fullText)} ref={refText}>
            <span ref={exoRef}>Exo</span> <span ref={siliconRef}>Silicon</span>
          </p>

          <div className={styles.backdrop} ref={refBackdrop}></div>
        </div>
        <div className={styles.filler} />
      </Section>
    </>
  );
};

export { Hero };
