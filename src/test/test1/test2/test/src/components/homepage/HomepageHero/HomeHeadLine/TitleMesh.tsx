import { useFrame } from '@react-three/fiber';
import { gsap } from 'gsap';
import { button, useControls } from 'leva';
import noise2d from 'raw-loader!glslify-loader!webgl-noise/src/noise2D.glsl';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ShaderChunk, Texture, Vector2 } from 'three';

import { html2canvas } from './HTMLTexture';
import fragment from './shaders/headline.frag';
import vertex from './shaders/headline.vert';

const lib: any = ShaderChunk;
lib.noise2d = noise2d;

interface TitleMeshProps {
  headlineRef: any;
  onTimeline: Function;
  replayAnimation: Function;
}

export function TitleMesh({ headlineRef, onTimeline, replayAnimation }: TitleMeshProps) {
  const ref = useRef<any | null>(null);
  const texture = useRef(new Texture());
  const timeline = useRef<gsap.core.Timeline>(gsap.timeline({ paused: true }));
  // const controls = useControls('headline', {
  //   frequency: {
  //     value: 5.0,
  //     min: 0,
  //     max: 100,
  //     step: 0.001,
  //     onChange: (val) => {
  //       shader.uniforms.uFrequency.value = val;
  //     },
  //   },
  //   speed: {
  //     value: 0.7,
  //     min: 0,
  //     max: 10,
  //     step: 0.001,
  //     onChange: (val) => {
  //       shader.uniforms.uSpeed.value = val;
  //     },
  //   },
  //   amplitude: {
  //     value: 0.02,
  //     min: 0,
  //     max: 1,
  //     step: 0.001,
  //     onChange: (val) => {
  //       shader.uniforms.uAmplitude.value = val;
  //     },
  //   },
  //   scale: {
  //     value: { x: 1, y: 1 },
  //     min: 0,
  //     max: 1,
  //     step: 0.01,
  //     onChange: (val) => {
  //       shader.uniforms.uScale.value.x = val.x;
  //       shader.uniforms.uScale.value.y = val.y;
  //     },
  //   },

  //   replay: button(() => {
  //     replayAnimation(false);
  //     replayAnimation(true);
  //   }),
  // });

  const shader = useMemo(() => {
    return {
      vertexShader: vertex,
      fragmentShader: fragment,
      uniforms: {
        uFade: { value: 0.0 },
        uFrequency: { value: 5.0 },
        uSpeed: { value: 0.7 },
        uAmplitude: { value: 0.02 },
        uScale: { value: new Vector2(1, 1) },
        uTime: { value: 0.0 },
        map: { value: texture.current },
        uTransitionInTime: { value: 0 },
      },
    };
  }, []);

  function resizeHandler() {
    texture.current.dispose();
    const image: HTMLCanvasElement = html2canvas(headlineRef.current);
    const tex = new Texture(image);
    tex.needsUpdate = true;
    shader.uniforms.map.value = tex;
    ref.current.material.needsUpdate = true;
  }

  function mount() {
    window.addEventListener('resize', resizeHandler);
    resizeHandler();

    timeline.current.fromTo(
      shader.uniforms.uTransitionInTime,
      { value: 0 },
      {
        value: 1,
        ease: 'power2.inOut',
        duration: 3,
      },
      0
    );
    onTimeline(timeline.current);

    return unmount;
  }

  function unmount() {
    timeline.current = gsap.timeline({ paused: true });
    window.removeEventListener('resize', resizeHandler);
  }

  useEffect(
    mount, // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useFrame((state) => {
    shader.uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <>
      <mesh ref={ref}>
        <planeGeometry args={[2, 2]} />
        <shaderMaterial args={[shader]} />
      </mesh>
    </>
  );
}
