import { useThree } from '@react-three/fiber';
import React, { useLayoutEffect } from 'react';

import { useResponsiveValue } from '~/hooks';

const CONFIG = {
  xxs: 9,
  md: 7,
  lg: 5,
};

export default function Camera() {
  const { camera } = useThree();

  const z = useResponsiveValue(CONFIG);
  camera.position.z = z;

  return null;
}
