'use client';

import { useInView } from 'framer-motion';
import gsap from 'gsap';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Group } from 'three';
import { degToRad } from 'three/src/math/MathUtils';

import { ExoIrisContentFragment } from '~/cms';
import { BackgroundCanvas, BackgroundConfig } from '~/components/3d';
import { IrisCanvas } from '~/components/3d/IrisCanvas';
import { useLenis } from '~/components/layout/LenisWrapper';
import { useIrisStore } from '~/stores/exo-iris/store';
import { useGlobalStore } from '~/stores/globalStore';
import { cx } from '~/utils';

import bgConfig from './bgConfig.yml';
import styles from './exo-iris-intro.module.scss';

interface ExoIrisIntroProps {
  subhead: ExoIrisContentFragment['introSubhead'];
  copy: ExoIrisContentFragment['introCopy'];
}

const DAY_MS = 86400000;
const TIME_DIFFERENCE = DAY_MS * 7; // 1 week
const LOCAL_STORAGE_KEY = 'exo_iris_last_seen';

export const setTimeSeen = (localStorageKey: string) => {
  const currentTime = new Date().getTime();
  localStorage.setItem(localStorageKey, `${currentTime}`);
};

export const getHasSeen = (localStorageKey: string, timeDifferenceMs: number) => {
  const currentTime = new Date().getTime();
  const storedValue = localStorage.getItem(localStorageKey) || '0';
  const storedValueAsNumber = parseInt(storedValue);

  if (!storedValueAsNumber) {
    return false;
  }
  if (currentTime - storedValueAsNumber > timeDifferenceMs) {
    return false;
  }

  return true;
};

export const ExoIrisIntro = (props: ExoIrisIntroProps) => {
  const { subhead, copy } = props;

  const groupPos: [number, number, number] = [0, 0, 10];
  const groupRot: [number, number, number] = [0, 0, 0];
  const modelPos: [number, number, number] = [0, 0, 0];
  const modelRot: [number, number, number] = [1.55, 0, 0];
  const modelScale = 2.75;
  const [visible, setVisible] = useState(false);

  const [introComplete, setIntroComplete] = useState(false);

  const domContainerRef = useRef<HTMLDivElement>(null);
  const irisContainerRef = useRef<HTMLDivElement>(null);
  const gradientContainerRef = useRef<HTMLDivElement>(null);
  const [disableScrollChecked, setDisableScrollChecked] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);
  const irisGroupRef = useRef<Group | null>();
  const irisModelRef = useRef<Group | null>();
  const canvasContainerRef = useRef<HTMLDivElement | null>();
  const [runFullAnimation, setRunFullAnimation] = useState<boolean | null>(null);

  const { setIntroCanvasContainerRef } = useIrisStore(['setIntroCanvasContainerRef']);
  const { scrollDisabled, setScrollDisabled } = useGlobalStore([
    'scrollDisabled',
    'setScrollDisabled',
  ]);

  const lenis = useLenis();

  const domContainerInView = useInView(domContainerRef);

  function onload(irisGroup: any, irisModel: any, canvasContainer: any) {
    irisGroupRef.current = irisGroup.current;
    irisModelRef.current = irisModel.current;
    canvasContainerRef.current = canvasContainer.current;
    setPageLoaded(true);
  }

  useEffect(() => {
    if (!getHasSeen(LOCAL_STORAGE_KEY, TIME_DIFFERENCE)) {
      setTimeSeen(LOCAL_STORAGE_KEY);
      setRunFullAnimation(true);
    } else {
      setRunFullAnimation(false);
    }
  }, []);

  useLayoutEffect(() => {
    if (!gradientContainerRef?.current) return;
    setIntroCanvasContainerRef(gradientContainerRef);
  }, [setIntroCanvasContainerRef]);

  // intro animation
  useLayoutEffect(() => {
    if (
      !pageLoaded ||
      !irisGroupRef?.current ||
      !irisModelRef?.current ||
      !canvasContainerRef?.current ||
      runFullAnimation === null
    )
      return;
    const mm = gsap.matchMedia();
    mm.add(
      { isDesktop: '(orientation: landscape)', isMobile: '(orientation: portrait)' },
      (ctx: any) => {
        if (!irisGroupRef?.current || !irisModelRef?.current || !canvasContainerRef?.current)
          return;
        const { isDesktop, isMobile } = ctx.conditions;
        const irisText = irisContainerRef.current?.querySelector('.js__iris');
        const tmText = irisContainerRef.current?.querySelector('.js__tm');

        setVisible(true);

        const tl = gsap.timeline({
          onComplete: () => {
            setIntroComplete(true);
          },
        });

        if (isMobile) {
          tl.set(irisModelRef.current.scale, {
            x: 1.85,
            y: 1.85,
            z: 1.85,
          });
        } else {
          tl.set(irisModelRef.current.scale, {
            x: modelScale,
            y: modelScale,
            z: modelScale,
          });
        }

        tl.set(canvasContainerRef.current, {
          filter: 'blur(10rem)',
        });

        tl.addLabel('initial');
        tl.to(
          canvasContainerRef.current,
          {
            filter: 'blur(0rem)',
            duration: 1,
            ease: 'linear',
          },
          'initial+=0.5'
        );

        const finalPositions = {
          position: {
            x: isDesktop ? 0.015 : 0,
            y: isDesktop ? -0.025 : 0,
            z: 10.15,
          },
          rotation: {
            y: degToRad(570),
            x: -0.45,
            z: 0.04,
          },
          irisRotation: {
            y: 3.25,
          },
        };

        /* 
        If viewing for second time,
        don't play full animation
        */
        if (!runFullAnimation) {
          tl.set(
            irisModelRef.current.rotation,
            {
              x: finalPositions.rotation.x,
              y: finalPositions.irisRotation.y,
              z: finalPositions.rotation.z,
            },
            '0'
          );

          tl.set(
            irisGroupRef.current.rotation,
            {
              y: finalPositions.rotation.y,
            },
            '0'
          );

          tl.set(
            irisGroupRef.current.position,
            {
              y: finalPositions.position.y,
              x: finalPositions.position.x,
              z: finalPositions.position.z,
            },
            '0'
          );
        } else {
          tl.to(
            irisGroupRef.current.position,
            {
              z: finalPositions.position.z,
              duration: 3.5,
              ease: 'back.out(6)',
            },
            'initial+=0.5'
          );

          tl.to(
            irisModelRef.current.rotation,
            {
              x: finalPositions.rotation.x,
              y: finalPositions.irisRotation.y,
              z: finalPositions.rotation.z,
              ease: 'power1.inOut',
              duration: 3,
            },
            'initial+=1.25'
          );

          tl.to(
            irisGroupRef.current.rotation,
            {
              y: finalPositions.rotation.y,
              ease: 'power1.inOut',
              duration: 3,
            },
            'initial+=1.25'
          );

          tl.to(
            irisGroupRef.current.position,
            {
              x: finalPositions.position.x,
              y: finalPositions.position.y,
              ease: 'linear',
              duration: 1.5,
            },
            '<'
          );
        }

        // DOM-related animations (iris text needed to be in its own container for z-index reasons)
        if (irisText && tmText) {
          tl.to(
            irisText,
            {
              filter: 'blur(0rem)',
              duration: 1,
              ease: 'linear',
            },
            '<'
          );
          tl.to(
            irisText,
            {
              autoAlpha: 1,
              x: isDesktop ? '120%' : '141%',
              duration: 1.5,
              ease: 'power2.out',
            },
            '<'
          );
          tl.to(
            '.js__exo',
            {
              filter: 'blur(0rem)',
              autoAlpha: 1,
              x: isDesktop ? '-68%' : '-95%',
              duration: 1,
              ease: 'power2.out',
            },
            '-=1.0'
          );
          tl.to(
            tmText,
            {
              autoAlpha: 1,
              duration: 1,
              ease: 'linear',
            },
            '<'
          );
          tl.to(
            '.js__subhead',
            {
              autoAlpha: 1,
              duration: 1,
              filter: 'blur(0rem)',
              ease: 'linear',
            },
            '<'
          );
        }
      },
      domContainerRef
    );

    return () => {
      mm.revert();
    };
  }, [
    canvasContainerRef,
    irisGroupRef,
    irisModelRef,
    pageLoaded,
    setIntroComplete,
    runFullAnimation,
  ]);

  // adds animation timeline for scrolling down page for the model
  useLayoutEffect(() => {
    if (!introComplete || !irisGroupRef?.current || !irisModelRef?.current) return;
    const mm = gsap.matchMedia();
    mm.add(
      { isDesktop: '(orientation: landscape)', isMobile: '(orientation: portrait)' },
      (ctx: any) => {
        if (!irisGroupRef?.current || !irisModelRef?.current) return;
        const { isDesktop } = ctx.conditions;
        if (isDesktop) {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: domContainerRef.current,
              start: '0% 0%',
              end: '100% 100%',
              scrub: true,
            },
          });
          tl.to(
            irisGroupRef.current.position,
            {
              x: 0,
              y: -0.21,
              z: 11.2,
              duration: 1.7,
              ease: 'power1.inOut',
            },
            0
          );
          tl.to(
            irisModelRef.current.rotation,
            {
              x: -0.3,
              y: 0.1,
              z: -0.2,
              duration: 1.7,
              ease: 'power1.inOut',
            },
            0
          );
          tl.to(
            '.js__copy',
            {
              y: '0',
              ease: 'power1.out',
              duration: 0.7,
            },
            1
          );
          tl.to(
            { pause: 0 },
            {
              pause: 1,
              ease: 'linear',
              duration: 0.3,
            },
            1.7
          );
        } else {
          // mobile trigger sends device up at the end
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: domContainerRef.current,
              start: '0% 0%',
              end: '100% 100%',
              scrub: true,
            },
          });
          tl.to(
            irisGroupRef.current.position,
            {
              x: 0,
              y: -0.17,
              z: 11.2,
              duration: 1.7,
            },
            0
          );
          tl.to(
            irisModelRef.current.rotation,
            {
              x: -0.3,
              y: 0.1,
              z: -0.2,
              duration: 1.7,
            },
            0
          );
          tl.to(
            '.js__copy',
            {
              y: '0',
              ease: 'power1.out',
              duration: 0.7,
            },
            1
          );
          tl.to(
            { pause: 0 },
            {
              pause: 1,
              ease: 'linear',
              duration: 0.3,
            },
            1.7
          );
        }
      },
      domContainerRef
    );

    return () => {
      mm.revert();
    };
  }, [introComplete, irisGroupRef, irisModelRef]);

  // check only on page load to see if the dom container is in view (to account for people navigating
  // via back or forward buttons and landing mid-page)
  useLayoutEffect(() => {
    const hash = window.location.hash;
    if (hash && hash !== '' && lenis && !disableScrollChecked) {
      lenis.scrollTo(hash, {
        immediate: true,
      });
      setDisableScrollChecked(true);
      return;
    }
    if (
      !pageLoaded ||
      disableScrollChecked ||
      runFullAnimation === null ||
      runFullAnimation === false
    )
      return;
    setDisableScrollChecked(true);
    if (domContainerInView) {
      setScrollDisabled(true);
      lenis.scrollTo('top');
    }
  }, [
    disableScrollChecked,
    domContainerInView,
    lenis,
    pageLoaded,
    setScrollDisabled,
    runFullAnimation,
  ]);

  // re-enable scroll when intro is complete
  useLayoutEffect(() => {
    if (introComplete && scrollDisabled) {
      setScrollDisabled(false);
    }
  }, [introComplete, scrollDisabled, setScrollDisabled]);

  return (
    <>
      <div className={styles.gradientContainer} ref={gradientContainerRef} aria-hidden>
        <BackgroundCanvas
          grainIntensity={0.3}
          targetOpacityDuration={3}
          config={bgConfig as BackgroundConfig}
        />
      </div>
      <section className={cx(styles.scrollyContent)} ref={domContainerRef}>
        <h1 className="sr-only">Exo Iris™</h1>
        <div className={cx(styles.exo, 'js__exo')} aria-hidden>
          Exo
        </div>
        <p className={cx(styles.subhead, 'js__subhead')}>{subhead}</p>
        <div className={styles.copyWrapper}>
          <div className={styles.copyContainer}>
            <p className={cx(styles.copy, 'js__copy')}>{copy}</p>
          </div>
        </div>
        <div className={styles.irisCanvasContainer}>
          <IrisCanvas
            groupPos={groupPos}
            groupRot={groupRot}
            modelScale={modelScale}
            modelRot={modelRot}
            modelPos={modelPos}
            visible={visible}
            isBottomFaded={true}
            onLoadFn={onload}
            className={styles.irisCanvas}
          />
        </div>
        <div className={styles.irisContainer} ref={irisContainerRef}>
          <div className={cx(styles.iris, 'js__iris')} aria-hidden>
            Iris<span className={cx(styles.tm, 'js__tm')}>™</span>
          </div>
        </div>
      </section>
    </>
  );
};
