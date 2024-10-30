/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo } from 'react';
import { LinearMipmapLinearFilter } from 'three';

import fragment from './shaders/index.frag';
import vertex from './shaders/index.vert';

interface Props {
  isBigLetter?: boolean;
  data: any;
  depth: number;
  scale: number;
  texture: any;
  isAnimationEnded: boolean;
}

const calcPosition = (
  data: any,
  isBigLetter: boolean,
  depth: number,
  isAnimationEnded: boolean
) => {
  let position = [];

  if (isBigLetter) {
    const d = isAnimationEnded ? data.end : data.start;

    position = [d.position[0] + d.shift[0], d.position[1] + d.shift[1], depth + d.shift[2]];
  } else {
    position = [data.position[0], data.position[1], depth];
  }

  return position;
};

export default React.forwardRef(function Plane(
  { isBigLetter = false, data, depth = 0, scale = 1, texture, isAnimationEnded }: Props,
  forwardedRef
) {
  const position = calcPosition(data, isBigLetter, depth, isAnimationEnded);

  const shaderArgs = useMemo(() => {
    return {
      vertexShader: vertex,
      fragmentShader: fragment,
      uniforms: {
        uBlur: { value: 0 },
        uAlpha: { value: 1 },
        uTxt: { value: texture },
      },
    };
  }, []);
  return (
    <mesh ref={forwardedRef as any} position={position as any} scale={scale} visible={false}>
      <planeGeometry args={[1 * data.ratio, 1, 1, 1]} />
      <shaderMaterial args={[shaderArgs]} transparent depthTest={false} depthWrite={false} />
    </mesh>
  );
});
