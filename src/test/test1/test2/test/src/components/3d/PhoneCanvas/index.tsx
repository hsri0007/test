import { PerspectiveCamera } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { ReactNode, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { Group, LinearSRGBColorSpace, Mesh, NoToneMapping } from 'three';

import { Preloader } from '~/components/ui';
import { cx } from '~/utils';

import styles from './PhoneCanvas.module.scss';
import PhoneCanvasEnvironment from './PhoneCanvasEnvironment';
import { PhoneModel2 } from './PhoneModel2';

export type PhoneCanvasProps = {
  className?: string;
  children: ReactNode;
} & JSX.IntrinsicElements['group'];

export function PhoneCanvas({ className, children }: PhoneCanvasProps) {
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  const [frameloop, setFrameloop] = useState<'never' | 'always'>('always');
  const canvasRef = useRef(null as any);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const resizeHandler = useCallback(() => {
    if (canvasContainerRef.current) {
      let zoom = 1;
      let uiRatio = 1;
      const ratio =
        canvasContainerRef.current.offsetWidth / canvasContainerRef.current.offsetHeight;
      if (ratio > 1) {
        uiRatio = 1920 / 1080;
      } else {
        uiRatio = 393 / 852;
      }
      zoom = Math.min(ratio / uiRatio, 1);
      // setZoom(zoom);
    }
  }, []);

  useEffect(() => {
    // Set the observer it hasn't been yet
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(([{ isIntersecting }]) => {
        setFrameloop(isIntersecting ? 'always' : 'never');
      }, {});
    }
    // Start observing
    const observer = observerRef.current;
    observerRef.current.observe(canvasRef.current);

    // Add the resize handler
    window.addEventListener('resize', resizeHandler);
    resizeHandler();
    // Cleanup observer and resize handler
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', resizeHandler);
    };
  }, [resizeHandler]);

  return (
    <div className={cx(styles.canvasContainer, className)} ref={canvasContainerRef}>
      <Canvas
        ref={canvasRef}
        gl={{
          antialias: true,
          outputColorSpace: LinearSRGBColorSpace,
          toneMapping: NoToneMapping,
        }}
        frameloop={frameloop}
      >
        <PerspectiveCamera
          position={[0, 0, 12]}
          zoom={zoom}
          far={50}
          near={0.1}
          fov={20}
          makeDefault
        />
        <Suspense fallback={<Preloader />}>
          <PhoneCanvasEnvironment />
          {children}
        </Suspense>
        {/* need something on the screen at all times to update canvas */}
        <mesh>
          <boxGeometry args={[100, 100, 100]} />
        </mesh>
      </Canvas>
    </div>
  );
}
