import { PerspectiveCamera } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { LinearSRGBColorSpace, NoToneMapping } from 'three';

import { Preloader } from '~/components/ui';
import { cx } from '~/utils';

import styles from './IrisCanvas.module.scss';
import IrisCanvasEnvironment from './IrisCanvasEnvironment';
import { IrisModel } from './IrisModel';

export type IrisCanvasProps = {
  groupPos: [number, number, number];
  groupRot: [number, number, number];
  modelScale: number;
  modelRot: [number, number, number];
  modelPos: [number, number, number];
  visible: boolean;
  isBottomFaded?: boolean;
  onLoadFn: (
    groupRef: React.MutableRefObject<THREE.Group | null> | null,
    modelRef: React.MutableRefObject<THREE.Group | null> | null,
    canvasContainerRef: React.MutableRefObject<HTMLDivElement | null> | null
  ) => void;
  className?: string;
} & JSX.IntrinsicElements['group'];

export function IrisCanvas({
  groupPos,
  groupRot,
  modelScale,
  modelRot,
  modelPos,
  visible,
  isBottomFaded,
  onLoadFn,
  className,
}: IrisCanvasProps) {
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  const [frameloop, setFrameloop] = useState<'never' | 'always'>('always');
  const canvasRef = useRef(null as any);
  const observer = useRef<IntersectionObserver | null>();

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
      setZoom(zoom);
    }
  }, []);

  useEffect(() => {
    if (!observer.current) {
      observer.current = new IntersectionObserver(([{ isIntersecting }]) => {
        setFrameloop(isIntersecting ? 'always' : 'never');
        if (!!observer.current) {
          observer.current.observe(canvasRef.current);
        }
      }, {});
      window.addEventListener('resize', resizeHandler);
      resizeHandler();
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
      window.removeEventListener('resize', resizeHandler);
    };
  }, [resizeHandler]);

  const onCanvasLoad = (irisGroupRef: any, irisModelRef: any) => {
    onLoadFn(irisGroupRef, irisModelRef, canvasContainerRef);
  };

  return (
    <div className={cx(styles.canvasContainer, className)} ref={canvasContainerRef}>
      <Canvas
        ref={canvasRef}
        gl={{
          antialias: true,
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
          <IrisCanvasEnvironment />
          <IrisModel
            groupPos={groupPos}
            groupRot={groupRot}
            modelScale={modelScale}
            modelRot={modelRot}
            modelPos={modelPos}
            visible={visible}
            isBottomFaded={isBottomFaded}
            onLoadFn={onCanvasLoad}
          />
        </Suspense>
        {/* need something on the screen at all times to update canvas */}
        <mesh>
          <boxGeometry args={[100, 100, 100]} />
        </mesh>
      </Canvas>
    </div>
  );
}
