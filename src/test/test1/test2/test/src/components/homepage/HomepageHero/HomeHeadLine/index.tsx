import { OrthographicCamera } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { motion, useAnimation, useMotionTemplate, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import React, { useEffect, useRef, useState } from 'react';

import { ButtonLink } from '~/components/ui';

import styles from './HomeHeadLine.module.scss';
import { TitleMesh } from './TitleMesh';

interface HomeHeadLineProps {
  headline: string;
  onTimeline: Function;
  replayAnimation: Function;
}

function jsxJoin(array: any, str: any) {
  return array.length > 0
    ? array.reduce((result: any, item: any) => (
        <>
          {result}
          {str}
          {item}
        </>
      ))
    : null;
}

function parseLineBreaks(text: string) {
  const lines = text.split('\n');
  return <>{jsxJoin(lines, <br />)}</>;
}

export const HomeHeadLine = (props: HomeHeadLineProps) => {
  const canvasProps = useRef({ camera: null });

  const headlineControls = useAnimation();

  const headlineRef = useRef<HTMLHeadingElement | null>(null);

  const [frameloop, setFrameloop] = useState<'never' | 'always'>('always');
  const canvasRef = useRef(null as any);
  const timeline = useRef<gsap.core.Timeline>(gsap.timeline({ paused: true }));
  const observer = useRef<IntersectionObserver | null>(null);
  const [renderCanvas, setRenderCanvas] = useState(true);

  function mount() {
    observer.current = new IntersectionObserver(([{ isIntersecting }]) => {
      setFrameloop(isIntersecting ? 'always' : 'never');
    }, {});

    if (!canvasRef.current) return;

    observer.current.observe(canvasRef.current);

    timeline.current.add(() => {
      headlineControls.start({
        filter: 'blur(0rem)',
        transition: { duration: 3, ease: 'linear', delay: 0 },
      });
    }, 0.001);

    props.onTimeline(timeline.current);

    return unmount;
  }

  function resetAnimation(value: boolean) {
    if (value) {
    } else {
      headlineControls.stop();
      headlineControls.set({
        filter: 'blur(15rem)',
        transition: { duration: 0, ease: 'linear', delay: 0 },
      });
    }
    props.replayAnimation(value);
  }

  function unmount() {
    timeline.current = gsap.timeline({ paused: true });
    if (observer.current !== null) {
      observer.current.disconnect();
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setRenderCanvas(true);
    }, 1000);
  }, []);

  useEffect(
    mount, // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  function onCanvasCreated(args: any) {
    canvasProps.current = args;
  }

  function onTitleMeshTimeline(tl: gsap.core.Timeline) {
    timeline.current?.add(tl.play(), 0.001);
  }

  return (
    <div className={styles.headlineWrapper}>
      {renderCanvas && (
        <motion.div
          className={styles.headlineCanvasWrapper}
          initial={{ filter: 'blur(15rem)' }}
          animate={headlineControls}
        >
          <Canvas
            ref={canvasRef}
            dpr={[1, 2]}
            gl={{
              antialias: true,
            }}
            onCreated={onCanvasCreated}
            frameloop={frameloop}
            flat={true}
          >
            <TitleMesh
              headlineRef={headlineRef}
              onTimeline={onTitleMeshTimeline}
              replayAnimation={resetAnimation}
            />
            <OrthographicCamera
              makeDefault
              top={1}
              bottom={-1}
              left={-1}
              right={1}
              near={0}
              far={1}
            />
          </Canvas>
        </motion.div>
      )}

      <div className={styles.headlineTextWrapper} ref={headlineRef}>
        <h1 className={styles.headline}>
          <span className={styles.headlinePart}>{parseLineBreaks(props.headline)}</span>
        </h1>
      </div>
      <motion.div
        initial={{ filter: 'blur(15rem)' }}
        animate={headlineControls}
        className={styles.ctaButtons}
      >
        <ButtonLink className={styles.discoverBtn} secondary href="/iris/demo">
          Watch Demo
        </ButtonLink>
        <ButtonLink className={styles.buyNowBtn} href="https://store.exo.inc/">
          Buy Now
        </ButtonLink>
      </motion.div>
    </div>
  );
};
