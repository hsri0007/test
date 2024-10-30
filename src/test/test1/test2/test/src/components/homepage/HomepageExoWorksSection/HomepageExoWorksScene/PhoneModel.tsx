'use client';

import { useLoader } from '@react-three/fiber';
import { motion } from 'framer-motion-3d';
import { useCallback, useMemo } from 'react';
import { TextureLoader } from 'three';

import { Phone } from '~/components/3d';
import { useIsLandscape } from '~/hooks';
import { useGlobalStore } from '~/stores/globalStore';
import { easeOut } from '~/utils/client';

interface PhoneModelProps {
  activeIndex: number;
  index: number;
  screen: string;
}

const PHONE_HEIGHT_SCALE = 95;

export const PhoneModel = (props: PhoneModelProps) => {
  const { activeIndex, index, screen } = props;
  const indexOffset = index - activeIndex;
  const { windowHeight } = useGlobalStore(['windowHeight']);
  const isLg = useIsLandscape();
  const texture = useLoader(TextureLoader, screen);
  // Based on CSS styles
  const wrapperHeight = windowHeight * (isLg ? 0.5 : 0.7);

  const scale = useMemo(() => {
    return wrapperHeight / (wrapperHeight / PHONE_HEIGHT_SCALE);
  }, [wrapperHeight]);

  const determinePosition = useCallback(
    (currentIndex: number) => {
      const position = { rotateY: 0, x: 0, y: 0, z: -10 };
      position.rotateY = -0.28 * Math.PI * currentIndex;
      const spacingFactor =
        (currentIndex % (1 / 0.28)) * (currentIndex % (1 / 0.28)) * (currentIndex > 0 ? 1 : -1);
      position.x = currentIndex * scale * (isLg ? 0.1 : 0.1) - spacingFactor * scale * 0.01;
      return position;
    },
    [isLg, scale]
  );

  const initialPosition = determinePosition(index);
  const currentPosition = determinePosition(indexOffset);

  return (
    <motion.group
      initial={initialPosition}
      animate={currentPosition}
      transition={{ duration: 0.5, ease: easeOut, bounce: 0 }}
    >
      <Phone scale={scale} screenTexture={texture} />
    </motion.group>
  );
};
