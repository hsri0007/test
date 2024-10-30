'use client';

import { Center, GradientTexture, Html, Sphere, useProgress } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Leva, useControls } from 'leva';
import { Perf } from 'r3f-perf';
import { Suspense, useLayoutEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { degToRad } from 'three/src/math/MathUtils';

import { PmutModel } from '~/components/3d';
import { Preloader } from '~/components/ui';
import { useIsLandscape } from '~/hooks';
import { use3dStore } from '~/stores/3d/store';
import { useTechnologyStore } from '~/stores/technology/store';

import ExoPmutEnvironment from '../ExoPmutEnvironment';
import styles from './ExoTechCanvas.module.scss';

export const ExoTechCanvas = () => {
  const isDesktop = useIsLandscape();
  const canvasContainerRef = useRef(null);
  const refMesh = useRef<THREE.Mesh>(null!);
  const refPmutGradient = useRef<THREE.Group>(null!);
  const pointRef = useRef(null);
  const { pmutModelVisible, pmutGroupRef, pmutModelRef } = use3dStore([
    'pmutModelVisible',
    'pmutGroupRef',
    'pmutModelRef',
  ]);

  const {
    modelLoaded,
    modelVisible,
    setModelLoaded,
    setPageLoaded,
    setTechCanvasContainerRef,
    techCanvasContainerRef,
  } = useTechnologyStore([
    'modelLoaded',
    'modelVisible',
    'setModelLoaded',
    'setPageLoaded',
    'setTechCanvasContainerRef',
    'techCanvasContainerRef',
    'setCameraRef',
  ]);

  const Loader = () => {
    const { progress } = useProgress();
    return <Html center>{progress} % loaded</Html>;
  };

  const INITIAL_PHONE_SCALE = useMemo(() => (isDesktop ? 6.15 : 4.25), [isDesktop]);

  useLayoutEffect(() => {
    setTechCanvasContainerRef(canvasContainerRef);
  }, [setTechCanvasContainerRef]);

  useLayoutEffect(() => {
    if (!modelLoaded) return;
    setPageLoaded(true);
  }, [modelLoaded, setPageLoaded]);

  // const DEFAULT_COMPOSITION = {
  //   groupRot: [degToRad(0), degToRad(0), degToRad(90)],
  //   modelRot: [0, 0, 0],
  // };
  const DEFAULT_COMPOSITION = useMemo(() => {
    return {
      gRotX: {
        value: degToRad(0),
        min: -Math.PI * 2,
        max: Math.PI * 2,
        step: 0.01,
      },
      gRotY: {
        value: degToRad(0),
        min: -Math.PI * 2,
        max: Math.PI * 2,
        step: 0.01,
      },
      gRotZ: {
        value: degToRad(90),
        min: -Math.PI * 2,
        max: Math.PI * 2,
        step: 0.01,
      },
      mRotX: {
        value: degToRad(0),
        min: -Math.PI * 2,
        max: Math.PI * 2,
        step: 0.01,
      },
      mRotY: {
        value: degToRad(0),
        min: -Math.PI * 2,
        max: Math.PI * 2,
        step: 0.01,
      },
      mRotZ: {
        value: degToRad(0),
        min: -Math.PI * 2,
        max: Math.PI * 2,
        step: 0.01,
      },
      visible: true,
      color: { value: '#080B1B' },
    };
  }, []);

  // const { gRotX, gRotY, gRotZ, mRotX, mRotY, mRotZ, color } = useControls('model', DEFAULT_COMPOSITION);

  return (
    <>
      <div className={styles.canvasContainer} ref={techCanvasContainerRef}>
        <Canvas
          gl={{ antialias: true, toneMapping: THREE.NoToneMapping }}
          linear
          className={styles.canvas}
          style={{ pointerEvents: 'none', opacity: modelVisible ? 1 : 0 }}
          camera={{
            position: [0, 0, 12], // 12
            fov: 20,
            near: 0.1,
            far: 100,
          }}
          dpr={1.5}
          frameloop="always"
        >
          {/* <Perf position="bottom-left" /> */}
          <Suspense fallback={<Preloader />}>
            <ExoPmutEnvironment />

            <PmutModel
              groupPos={[0, 0, 0]}
              groupRot={[
                DEFAULT_COMPOSITION.gRotX.value,
                DEFAULT_COMPOSITION.gRotY.value,
                DEFAULT_COMPOSITION.gRotZ.value,
              ]}
              modelPos={[0, -0.02, 0]}
              modelRot={[
                DEFAULT_COMPOSITION.mRotX.value,
                DEFAULT_COMPOSITION.mRotY.value,
                DEFAULT_COMPOSITION.mRotZ.value,
              ]}
              modelScale={0.0275}
              visible={true}
              onLoadFn={() => setModelLoaded(true)}
            />

            {/* need something on the screen at all times to update canvas */}
            <mesh>
              <boxGeometry args={[100, 100, 100]} />
            </mesh>
          </Suspense>
        </Canvas>
      </div>
    </>
  );
};
