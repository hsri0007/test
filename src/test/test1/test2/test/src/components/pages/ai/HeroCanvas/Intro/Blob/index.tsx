/* eslint-disable react-hooks/exhaustive-deps */
import { useTexture } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { gsap } from 'gsap';
import { useControls } from 'leva';
import React, { useEffect, useImperativeHandle, useMemo, useRef } from 'react';
import { Color, InstancedBufferAttribute, MirroredRepeatWrapping } from 'three';

import fragment from './shaders/index.frag';
import vertex from './shaders/index.vert';

const ANIMATION_DURATION = 0.8;

export default React.forwardRef(function Letter(
  {
    direction = 0,
    spin,
    type,
  }: {
    direction: number;
    spin: number;
    type: string;
  },
  forwardedRef
) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const geo = useRef<THREE.PlaneGeometry>(null);
  const greenColor = useMemo(() => new Color(0x00ffd0), []);
  const redColor = useMemo(() => new Color(0x00ffd0), []);

  const t = useTexture('/assets/textures/ai/composed.png');
  const n = useTexture('/assets/textures/ai/n4.webp', (txt: any) => {
    txt.wrapS = MirroredRepeatWrapping;
    txt.wrapT = MirroredRepeatWrapping;
  });

  const { camera } = useThree();

  const controls = useControls('AI hero', {
    gridSize: { value: 80, min: 2, max: 400, step: 1 },
    sizeFactor: { value: 0.675, min: 0, max: 5, step: 0.1 },

    noiseRedScale1: { value: 1.2, min: 0, max: 20, step: 0.1 },
    noiseRedScale2: { value: 11.9, min: 0, max: 20, step: 0.1 },
    noiseGreenScale1: { value: 1.2, min: 0, max: 20, step: 0.1 },
    noiseGreenScale2: { value: 11.9, min: 0, max: 20, step: 0.1 },

    smoothCircle: { value: 0.0, min: 0, max: 0.5, step: 0.01 },

    greenColor: {
      value: '#' + greenColor.getHexString(),
      onChange: (v) => {
        greenColor.set(v);
      },
    },
    redColor: {
      value: '#' + redColor.getHexString(),
      onChange: (v) => {
        redColor.set(v);
      },
    },

    noiseBlackScale: { value: 1.1, min: 0, max: 20, step: 0.1 },
    noiseGreenDisplacementFactor: { value: 3.1, min: 0, max: 20, step: 0.05 },
    noiseRedDisplacementFactor: { value: 0, min: 0, max: 20, step: 0.05 },
    noiseBlackDisplacementFactor: { value: 0, min: 0, max: 20, step: 0.05 },
  });

  const rows = controls.gridSize;
  const cols = controls.gridSize;
  const amount = rows * cols;

  const createTimeline = () => {
    if (!ref.current) return;
    const tl = gsap.timeline();
    const rc = ref.current;
    const { uniforms } = shaderArgs;

    tl
      //
      .set(rc, { visible: true })
      .fromTo(rc.position, { x: direction }, { duration: 1.25, x: 0, ease: 'power3.inOut' }, 0)
      .fromTo(
        rc.rotation,
        { y: 0 },
        { duration: 1.25, y: Math.PI * spin * 1.2, ease: 'power3.inOut' },
        0
      )
      .fromTo(
        uniforms.uMorphProgress,
        { value: 0 },
        { duration: 1.25, value: 1, ease: 'power2.inOut' },
        0
      )
      .fromTo(
        uniforms.uAnalyzeProgress,
        { value: 0 },
        { duration: 1.25, value: 1, ease: 'none' },
        '-=.25'
      )
      .addLabel('exit', '-=.25')
      .fromTo(rc.position, { x: 0 }, { duration: 1.25, x: direction, ease: 'power3.inOut' }, 'exit')
      .fromTo(
        rc.rotation,
        { y: Math.PI * spin * 1.2 },
        { duration: 1.25, y: Math.PI * 2 * spin, ease: 'power3.inOut' },

        'exit'
      )
      .fromTo(
        uniforms.uMorphProgress,
        { value: 1 },
        { duration: 1.25, value: 0, ease: 'power2.inOut' },
        'exit'
      )
      .set(rc, { visible: false });

    tl.timeScale(0.8);
    return tl;
  };

  useEffect(() => {
    if (!geo.current) return;
    const maxAnimationDelay = 1 - ANIMATION_DURATION;
    const planePoints = [];
    const gridPos = [];
    const spherePos = [];
    const timeShift = [];
    const randomPoint = [];
    const animationDelay = [];
    const finalScale = [];
    const colorShift = [];

    for (let i = 0; i < cols; i++) {
      const y = (1 / cols) * i - 0.5 + (1 / cols) * 0.5;
      for (let k = 0; k < rows; k++) {
        const x = (1 / rows) * k - 0.5 + (1 / rows) * 0.5;
        planePoints.push(x, y, 0);
        gridPos.push((1 / rows) * k, (1 / cols) * i);
      }
    }

    const r = Math.random;
    for (let i = 0; i < rows * cols; i++) {
      const radius = 0.45;
      const distance = radius;
      const theta = (1 - r()) * 360;
      const phi = (1 - r()) * 360;

      let x = distance * Math.sin(theta) * Math.cos(phi);
      let y = distance * Math.sin(theta) * Math.sin(phi);
      let z = distance * Math.cos(theta);

      spherePos.push(x, y, z);
      timeShift.push(r() * 5);
      randomPoint.push(r() > 0.9 ? 1 : 0);
      animationDelay.push(maxAnimationDelay * r());
      finalScale.push(Math.pow(0.5 + r() * 0.4, 2));
      colorShift.push((2 * r() - 1) * 0.3);
    }

    const Iba = InstancedBufferAttribute;

    geo.current.setAttribute('aPlaneTranslate', new Iba(new Float32Array(planePoints), 3));
    geo.current.setAttribute('aSphereTranslate', new Iba(new Float32Array(spherePos), 3));
    geo.current.setAttribute('aGridPos', new Iba(new Float32Array(gridPos), 2));
    geo.current.setAttribute('aTimeShift', new Iba(new Float32Array(timeShift), 1));
    geo.current.setAttribute('aRandomPoint', new Iba(new Float32Array(randomPoint), 1));
    geo.current.setAttribute('aAnimationDelay', new Iba(new Float32Array(animationDelay), 1));
    geo.current.setAttribute('aFinalScale', new Iba(new Float32Array(finalScale), 1));
    geo.current.setAttribute('aColorShift', new Iba(new Float32Array(colorShift), 1));
  }, [controls.gridSize]);

  const shaderArgs = useMemo(() => {
    return {
      vertexShader: vertex,
      fragmentShader: fragment,
      uniforms: {
        uTxt: { value: t },
        uSizeFactor: { value: controls.sizeFactor },
        uCameraOrientation: { value: camera.quaternion },
        uMorphProgress: { value: 0 },
        uGridSize: { value: [rows, cols] },
        uTime: { value: 0 },
        uAnimationDuration: { value: ANIMATION_DURATION },
        uNoiseTxt: { value: n },
        uAnalyzeProgress: { value: 0 },
        uColor: { value: new Color(0x1d1d1d) },
        uColorGreen: { value: greenColor },
        uColorRed: { value: redColor },
        uIsRedChannel: { value: type === 'a' ? true : false },
        uSmoothCircle: { value: controls.smoothCircle },

        uNoiseRedScale1: { value: controls.noiseRedScale1 },
        uNoiseRedScale2: { value: controls.noiseRedScale2 },
        uNoiseGreenScale1: { value: controls.noiseGreenScale1 },
        uNoiseGreenScale2: { value: controls.noiseGreenScale2 },
        uNoiseBlackScale: { value: controls.noiseBlackScale },

        uProgressRed: { value: 0 },
        uProgressGreen: { value: 0 },

        uNoiseGreenDisplacementFactor: {
          value: controls.noiseGreenDisplacementFactor,
        },
        uNoiseRedDisplacementFactor: {
          value: controls.noiseRedDisplacementFactor,
        },
        uNoiseBlackDisplacementFactor: {
          value: controls.noiseBlackDisplacementFactor,
        },
      },

      transparent: true,
      depthTest: false,
      depthWrite: false,
    };
  }, []);

  useImperativeHandle(forwardedRef, () => {
    return {
      createTimeline,
    };
  });

  useFrame((state) => {
    shaderArgs.uniforms.uCameraOrientation.value = camera.quaternion;
    shaderArgs.uniforms.uTime.value = state.clock.getElapsedTime();
  });

  return (
    //@ts-ignore
    <instancedMesh args={[null, null, amount]} ref={ref} visible={false}>
      <planeGeometry ref={geo} args={[1 / rows, 1 / cols, 1, 1]} />
      <shaderMaterial
        args={[shaderArgs]}
        uniforms-uGridSize-value={[rows, cols]}
        uniforms-uSizeFactor-value={controls.sizeFactor}
        uniforms-uSmoothCircle-value={controls.smoothCircle}
        uniforms-uNoiseBlackScale-value={controls.noiseBlackScale}
        uniforms-uNoiseRedScale1-value={controls.noiseRedScale1}
        uniforms-uNoiseRedScale2-value={controls.noiseRedScale2}
        uniforms-uNoiseGreenScale1-value={controls.noiseGreenScale1}
        uniforms-uNoiseGreenScale2-value={controls.noiseGreenScale2}
        uniforms-uNoiseGreenDisplacementFactor-value={controls.noiseGreenDisplacementFactor}
        uniforms-uNoiseRedDisplacementFactor-value={controls.noiseRedDisplacementFactor}
        uniforms-uNoiseBlackDisplacementFactor-value={controls.noiseBlackDisplacementFactor}
      />
    </instancedMesh>
  );
});
