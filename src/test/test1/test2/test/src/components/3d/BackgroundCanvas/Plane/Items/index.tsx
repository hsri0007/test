/* eslint-disable react-hooks/exhaustive-deps */
import { useTexture } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useControls } from 'leva';
import React, { useEffect, useMemo, useRef } from 'react';
import { Vector3 } from 'three';
import { Color } from 'three';

import { useResponsiveValue } from '~/hooks/';

import type { BackgroundConfig, BlobConfig } from '../../index';

const V3 = new Vector3();

interface Props {
  config: BackgroundConfig;
}

export default React.memo(function Items({ config }: Props) {
  const refCollections = useRef<(THREE.Mesh | null)[]>([]);
  const mouse = useRef({
    static: V3.clone(),
    smooth: V3.clone(),
  });
  const { gl, size } = useThree();
  const map = useTexture('/assets/textures/circleBg.png');
  const controls = useControls('Items', {
    overAllSpeed: { value: 1, min: 0, max: 20, step: 0.1 },
  });

  const currentConf = useResponsiveValue(config);

  useEffect(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const onMouseMove = (e: MouseEvent) => {
      mouse.current.static.x = -1 + (2.0 * e.clientX) / w;
      mouse.current.static.y = 1 - (2 * e.clientY) / h;
    };

    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [size]);

  const nodes = useMemo(() => {
    return currentConf.map((el: BlobConfig, i: any) => {
      const scaleX = size.width * el.size[0];
      const scaleY = size.width * el.size[1];
      const x = -size.width * 0.5 + el.position[0] * size.width;
      const y = size.height * 0.5 - el.position[1] * size.height;

      return (
        <mesh
          ref={(el) => (refCollections.current[i] = el)}
          key={i}
          position-x={x}
          position-y={y}
          frustumCulled={false}
          scale={[scaleX, scaleY, 1]}
          userData-origin={V3.clone().set(x, y, 0)}
          userData-scale={V3.clone().set(scaleX, scaleY, 1)}
        >
          <planeGeometry args={[1, 1, 1, 1]} />
          <meshBasicMaterial
            color={el.color}
            map={map}
            transparent
            depthWrite={false}
            depthTest={false}
          />
        </mesh>
      );
    });
  }, [size, currentConf]);

  useFrame((state) => {
    // LERP MOUSE
    mouse.current.smooth.lerp(mouse.current.static, 0.04);

    // ANIMATE
    refCollections.current.forEach((el: any, i: number) => {
      const conf = currentConf[i];
      const t = state.clock.elapsedTime * 0.3 * controls.overAllSpeed;

      // POSITION
      const x = Math.sin(t * conf.speed[0] + conf.timeShift * 10) * size.width * conf.movement[0];
      const mx = mouse.current.smooth.x * conf.mouseParallax[0] * 0.5 * size.width;
      el.position.x = el.userData.origin.x + x - mx;

      const y = Math.cos(t * conf.speed[1] + conf.timeShift * 10) * size.height * conf.movement[1];
      const my = -mouse.current.smooth.y * conf.mouseParallax[1] * 0.5 * size.height;
      el.position.y = el.userData.origin.y + y + my;

      //SCALE
      const ts = (Math.cos(t + conf.timeShift * 10) + 1.0) * 0.5;
      const scaleX = ts * conf.dynamicScale[0];
      const scaleY = ts * conf.dynamicScale[1];
      el.scale.x = el.userData.scale.x + scaleX * el.userData.scale.x;
      el.scale.y = el.userData.scale.y + scaleY * el.userData.scale.y;
    });
  });

  return <>{nodes}</>;
});
