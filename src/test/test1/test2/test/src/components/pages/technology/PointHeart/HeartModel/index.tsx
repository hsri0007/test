'use client';

import { PrimitiveProps, ThreeElements, useFrame, useLoader } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { Color, Group, Points, PointsMaterial } from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

import { cx } from '~/utils';

import styles from './HeartModel.module.scss';

interface HeartModelProps extends Omit<PrimitiveProps, 'object'> {}

const HEART_ROTATION_INTERVAL = 20;

export const HeartModel = (props: HeartModelProps) => {
  const { ...otherProps } = props;
  const heartRef = useRef<ThreeElements['primitive'] | null>(null);

  const obj = useLoader(OBJLoader, '/assets/models/heart-model.obj');

  useFrame(({ clock }) => {
    if (heartRef.current) {
      heartRef.current.rotation.y =
        ((clock.getElapsedTime() % HEART_ROTATION_INTERVAL) / HEART_ROTATION_INTERVAL) *
        (Math.PI * 2);
    }
  });

  useEffect(() => {
    if (obj?.children[0]) {
      const points = obj.children[0] as Points;
      points.material = new PointsMaterial({
        color: '#c074b4',
        size: 0.12,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.8,
      });
    }
  }, [obj]);
  return (
    <primitive {...otherProps} ref={heartRef} object={obj} scale={0.25} position={[0, -0.5, -3]} />
  );
};
