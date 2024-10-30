/* eslint-disable react-hooks/exhaustive-deps */
import { useFBO, useTexture } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { gsap } from 'gsap';
import { Leva, useControls } from 'leva';
import React, { useEffect, useMemo, useRef } from 'react';
import {
  BufferAttribute,
  BufferGeometry,
  LinearMipmapLinearFilter,
  MirroredRepeatWrapping,
  OrthographicCamera,
  RGBAFormat,
  RepeatWrapping,
} from 'three';

import type { BackgroundConfig } from '../index';
import Items from './Items';
import fragment from './shaders/index.frag';
import vertex from './shaders/index.vert';

interface Props {
  config: BackgroundConfig;
  grainIntensity?: number;
  targetOpacity?: number;
  targetOpacityDuration?: number;
}

export default React.memo(function Plane({
  config,
  grainIntensity = 0.3,
  targetOpacity = 1,
  targetOpacityDuration = 1,
}: Props) {
  const ref = useRef(null as any);

  const controls = useControls('final', {
    rttSize: { value: 512, min: 32, max: 2048, step: 32 },
    blur: { value: 7.0, min: 0, max: 20, step: 0.1 },
    noiseFactor: { value: 0.1, min: 0, max: 1, step: 0.05 },
    noiseScale: { value: 0.8, min: 0, max: 5, step: 0.05 },
    noiseSpeedFactor: { value: 5, min: 0, max: 10, step: 0.05 },
    grainIntensity: { value: grainIntensity, min: 0, max: 1, step: 0.05 },
    opacity: { value: targetOpacity, min: 0, max: 1, step: 0.01 },
  });

  const { gl, scene, camera, size } = useThree();
  const noiseTxt = useTexture('/assets/textures/noise2.webp', (txt) => {
    // @ts-ignore
    txt.wrapS = MirroredRepeatWrapping;
    // @ts-ignore
    txt.wrapT = MirroredRepeatWrapping;
  });

  const fbo = useFBO(controls.rttSize, controls.rttSize, {
    format: RGBAFormat,
    generateMipmaps: true,
    minFilter: LinearMipmapLinearFilter,
    wrapS: MirroredRepeatWrapping,
    wrapT: MirroredRepeatWrapping,
  });

  const orthoCam = useMemo(() => {
    const hw = size.width * 0.5;
    const hh = size.height * 0.5;
    const c = new OrthographicCamera(-hw, +hw, hh, -hh, 1, 10);
    c.position.z = 5;
    return c;
  }, []);

  const geometry = useMemo(() => {
    const g = new BufferGeometry();
    const vertices = new Float32Array([-1.0, -1.0, 0.0, 3.0, -1.0, 0.0, -1.0, 3.0, 0.0]);

    const uvs = new Float32Array([0, 0, 2, 0, 0, 2]);

    g.setAttribute('uv', new BufferAttribute(uvs, 2));
    g.setAttribute('position', new BufferAttribute(vertices, 3));

    return g;
  }, []);

  const shaderArgs = useMemo(() => {
    return {
      vertexShader: vertex,
      fragmentShader: fragment,
      uniforms: {
        uTime: { value: 0 },
        uTxt: { value: fbo.texture },
        uNoiseTxt: { value: noiseTxt },
        uNoiseFactor: { value: controls.noiseFactor },
        uNoiseScale: { value: controls.noiseScale },
        uNoiseSpeedFactor: { value: controls.noiseSpeedFactor },
        uGrainIntensity: { value: controls.grainIntensity },
        uBlur: { value: controls.blur },
        uOpacity: { value: controls.opacity },
      },
      depthTest: false,
      depthWrite: false,
    };
  }, []);

  useEffect(() => {
    // alpha in
    gsap.fromTo(
      shaderArgs.uniforms.uOpacity,
      { value: 0 },
      {
        value: targetOpacity,
        duration: targetOpacityDuration,
        ease: 'power2.out',
      }
    );
  }, []);

  useEffect(() => {
    const hw = size.width * 0.5;
    const hh = size.height * 0.5;
    orthoCam.left = -hw;
    orthoCam.right = hw;
    orthoCam.top = hh;
    orthoCam.bottom = -hh;
    orthoCam.updateProjectionMatrix();
  }, [size]);

  useFrame((state) => {
    shaderArgs.uniforms.uTime.value = state.clock.elapsedTime;
    ref.current.visible = false;
    gl.setRenderTarget(fbo);
    gl.clear();
    gl.render(scene, orthoCam);
    gl.setRenderTarget(null);

    ref.current.visible = true;
    gl.render(ref.current, camera);
  }, 1);

  return (
    <>
      <Leva hidden />
      <Items config={config as BackgroundConfig} />
      <mesh ref={ref} frustumCulled={false}>
        <primitive object={geometry} />
        <shaderMaterial
          args={[shaderArgs]}
          uniforms-uBlur-value={controls.blur}
          uniforms-uNoiseFactor-value={controls.noiseFactor}
          uniforms-uNoiseScale-value={controls.noiseScale}
          uniforms-uNoiseSpeedFactor-value={controls.noiseSpeedFactor}
          uniforms-uGrainIntensity-value={controls.grainIntensity}
          uniforms-uOpacity-value={controls.opacity}
        />
      </mesh>
    </>
  );
});
