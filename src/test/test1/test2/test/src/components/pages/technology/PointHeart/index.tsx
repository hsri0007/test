'use client';

import { Environment, PerspectiveCamera } from '@react-three/drei';
import { Canvas, CanvasProps } from '@react-three/fiber';
import { ComponentProps, Suspense } from 'react';

import { cx } from '~/utils';
import { OmitChildren } from '~/utils/types';

import { HeartModel } from './HeartModel';
import styles from './PointHeart.module.scss';

interface PointHeartProps extends OmitChildren<CanvasProps> {}

export const PointHeart = (props: PointHeartProps) => {
  const { className, ...otherProps } = props;
  return (
    <Canvas
      frameloop="always"
      className={cx(className, styles.canvas)}
      style={{ pointerEvents: 'none' }}
      gl={{
        antialias: true,
      }}
      {...otherProps}
    >
      <PerspectiveCamera position={[0, 0, 12]} zoom={1} far={50} near={0.1} fov={20} makeDefault />
      <ambientLight intensity={0.45} />
      <Suspense>
        <HeartModel />
      </Suspense>
    </Canvas>
  );
};
