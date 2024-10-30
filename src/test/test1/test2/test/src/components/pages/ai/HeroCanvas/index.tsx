'use client';

import { Html, useProgress } from '@react-three/drei';
import { Canvas as R3FCanvas } from '@react-three/fiber';
import { Suspense, useEffect, useRef, useState } from 'react';

import { Preloader } from '~/components/ui';

import Camera from './Camera';
import styles from './HeroCanvas.module.scss';
import Intro from './Intro';

const HeroCanvas = () => {
  const canvasRef = useRef(null as any);
  const taglineRef = useRef(null as any);
  const [frameloop, setFrameloop] = useState<'never' | 'always'>('never');
  const [heroLoaded, setHeroLoaded] = useState(false);

  const Loader = () => {
    const { progress } = useProgress();
    return <Html center>{progress} % loaded</Html>;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(([{ isIntersecting }]) => {
      setFrameloop(isIntersecting ? 'always' : 'never');
    }, {});

    observer.observe(canvasRef.current);
    return () => observer.disconnect();
  }, []);

  {
    /* AI TAGLINE */
  }
  return (
    <div className={styles.container}>
      <R3FCanvas
        ref={canvasRef}
        camera={{
          far: 200,
          fov: 20,
          near: 1,
          position: [0, 0, 5],
        }}
        gl={{
          stencil: false,
          depth: false,
        }}
        flat={true}
        dpr={[1.4, 1.6]}
        frameloop={frameloop}
        style={{ pointerEvents: 'none' }}
      >
        <Camera />
        <Suspense fallback={<Preloader />}>
          <Intro />
        </Suspense>
      </R3FCanvas>
    </div>
  );
};

export { HeroCanvas };
