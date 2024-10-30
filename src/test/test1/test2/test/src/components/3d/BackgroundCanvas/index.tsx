import { Canvas } from '@react-three/fiber';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

import { useIrisStore } from '~/stores/exo-iris/store';

import Plane from './Plane';

export interface BlobConfig {
  size: [number, number];
  position: [number, number];
  color: string;
  timeShift: number;
  speed: [number, number];
  movement: [number, number];
  mouseParallax: [number, number];
  dynamicScale: [number, number];
}

export interface SingleBackgroundConfig {
  xxs: BlobConfig[];
  xs?: BlobConfig[];
  sm?: BlobConfig[];
  md?: BlobConfig[];
  lg?: BlobConfig[];
  xl?: BlobConfig[];
  xxl?: BlobConfig[];
}

export type BackgroundConfig = SingleBackgroundConfig;

export default function BackgroundCanvas({
  config,
  backgroundColor = 0xeaedf1,
  className,
  grainIntensity = 0.4,
  targetOpacity = 1,
  targetOpacityDuration = 1,
}: {
  config: BackgroundConfig;
  backgroundColor?: string | number;
  className?: string;
  grainIntensity?: number;
  targetOpacity?: number;
  targetOpacityDuration?: number;
}) {
  const { setBgCanvasContainerRef } = useIrisStore(['setBgCanvasContainerRef']);
  const canvasRef = useRef(null as any);

  useLayoutEffect(() => {
    setBgCanvasContainerRef(canvasRef);
  }, [setBgCanvasContainerRef]);

  const [frameloop, setFrameloop] = useState<'never' | 'always'>('never');

  useEffect(() => {
    const observer = new IntersectionObserver(([{ isIntersecting }]) => {
      setFrameloop(isIntersecting ? 'always' : 'never');
    }, {});

    observer.observe(canvasRef.current);
    return () => observer.disconnect();
  }, []);
  return (
    <>
      <Canvas
        ref={canvasRef}
        className={className}
        dpr={[1, 1.8]}
        gl={{
          antialias: false,
          stencil: false,
          depth: false,
          logarithmicDepthBuffer: false,
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(backgroundColor);
          gl.setClearAlpha(1);
        }}
        frameloop={frameloop}
        flat={true}
      >
        <Plane
          grainIntensity={grainIntensity}
          config={config as BackgroundConfig}
          targetOpacity={targetOpacity}
          targetOpacityDuration={targetOpacityDuration}
        />
      </Canvas>
    </>
  );
}
