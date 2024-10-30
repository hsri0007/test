import { useGLTF } from '@react-three/drei';
import { easeIn, easeInOut, easeOut, useAnimationControls } from 'framer-motion';
import { motion } from 'framer-motion-3d';
import { button, useControls } from 'leva';
import { useCallback, useEffect, useRef } from 'react';
import { Vector3 } from 'three';

import { useIsLandscape } from '~/hooks';

type ModelProps = {
  animationPlaying: boolean;
  containerRef: any;
};

export const Model = ({ animationPlaying, containerRef }: ModelProps) => {
  const INITIAL_ROTATION = new Vector3(0, 0, Math.PI * -0.5);
  const INITIAL_POSITION = new Vector3(-0.45, -0.3, 5);
  const INITIAL_SCALE = 15;

  const irisModel = useGLTF('/assets/models/exo_iris9.glb');
  const modelRef = useRef<any>(null);
  const { scale } = useControls(
    'model',
    {
      scale: {
        value: INITIAL_SCALE,
        min: 1,
        max: 30,
      },
      rotateX: {
        value: INITIAL_ROTATION.x,
        min: -5,
        max: 5,
        step: 0.05,
        onChange: (value) => {
          if (modelRef?.current) {
            modelRef.current.rotation.x = value;
          }
        },
      },
      rotateY: {
        value: INITIAL_ROTATION.y,
        min: -5,
        max: 5,
        step: 0.05,
        onChange: (value) => {
          if (modelRef?.current) {
            modelRef.current.rotation.y = value;
          }
        },
      },
      rotateZ: {
        value: INITIAL_ROTATION.z,
        min: -5,
        max: 5,
        step: 0.05,
        onChange: (value) => {
          if (modelRef?.current) {
            modelRef.current.rotation.z = value;
          }
        },
      },
      posX: {
        value: INITIAL_POSITION.x,
        min: -20,
        max: 20,
        step: 0.05,
        onChange: (value) => {
          if (modelRef?.current) {
            modelRef.current.position.x = value;
          }
        },
      },
      posY: {
        value: INITIAL_POSITION.y,
        min: -20,
        max: 20,
        step: 0.05,
        onChange: (value) => {
          if (modelRef?.current) {
            modelRef.current.position.y = value;
          }
        },
      },
      posZ: {
        value: INITIAL_POSITION.z,
        min: -20,
        max: 20,
        step: 0.05,
        onChange: (value) => {
          if (modelRef?.current?.position?.z) {
            modelRef.current.position.z = value;
          }
        },
      },
      playAnimation: button(() => {
        animatePrimitive();
      }),
      resetAnimation: button(() => {
        resetPrimitive();
      }),
    },
    { collapsed: true }
  );

  const modelAnimationControls = useAnimationControls();

  const resetPrimitive = useCallback(() => {
    modelAnimationControls.set({
      rotateX: INITIAL_ROTATION.x,
      rotateY: INITIAL_ROTATION.y,
      rotateZ: INITIAL_ROTATION.z,
      x: INITIAL_POSITION.x,
      y: INITIAL_POSITION.y,
      z: INITIAL_POSITION.z,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modelAnimationControls]);

  const animatePrimitive = useCallback(async () => {
    modelAnimationControls.start({
      rotateX: 0.5,
      rotateY: 0,
      rotateZ: 0,
      transition: {
        duration: 2.2,
        ease: easeInOut,
      },
    });
    modelAnimationControls.start({
      y: -1.1,
      transition: {
        duration: 1.85,
        ease: easeInOut,
      },
    });
    await modelAnimationControls.start({
      z: INITIAL_POSITION.z,
      transition: {
        duration: 0.7,
        ease: easeInOut,
      },
    });
    await modelAnimationControls.start({
      x: 0,
      z: 6.25,
      transition: {
        duration: 1.5,
        ease: easeInOut,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modelAnimationControls]);

  useEffect(() => {
    const isLandscape = containerRef.current.offsetWidth / containerRef.current.offsetHeight > 1;
    if (animationPlaying && isLandscape) {
      animatePrimitive();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animatePrimitive, animationPlaying]);

  return (
    <motion.primitive
      ref={modelRef}
      animate={modelAnimationControls}
      object={irisModel.scene}
      position={[INITIAL_POSITION.x, INITIAL_POSITION.y, INITIAL_POSITION.z]}
      rotation={[INITIAL_ROTATION.x, INITIAL_ROTATION.y, INITIAL_ROTATION.z]}
      scale={INITIAL_SCALE}
    />
  );
};
