'use client';

/* eslint-disable react-hooks/exhaustive-deps */
import { useGLTF } from '@react-three/drei';
import { Leva, useControls } from 'leva';
import { useEffect, useLayoutEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTF } from 'three-stdlib';

import useMaterialFade from './useMaterialFade';

type IrisModelProps = {
  groupPos: [number, number, number];
  groupRot: [number, number, number];
  modelScale: number;
  modelRot: [number, number, number];
  modelPos: [number, number, number];
  visible: boolean;
  isBottomFaded?: boolean;
  onLoadFn: (
    groupRef: React.MutableRefObject<THREE.Group | null> | null,
    modelRef: React.MutableRefObject<THREE.Group | null> | null
  ) => void;
} & JSX.IntrinsicElements['group'];

type GLTFResult = GLTF & {
  nodes: {
    Exo_Iris_1: THREE.Mesh;
    Exo_Iris_2: THREE.Mesh;
    Exo_Iris_3: THREE.Mesh;
    Exo_Iris_4: THREE.Mesh;
  };
  materials: {
    _Shadow: THREE.MeshStandardMaterial;
    M_Lights: THREE.MeshStandardMaterial;
    M_WhitePlastsic: THREE.MeshStandardMaterial;
    M_Blue: THREE.MeshStandardMaterial;
  };
};

export function IrisModel({
  groupPos,
  groupRot,
  modelScale,
  modelRot,
  modelPos,
  visible,
  onLoadFn,
  isBottomFaded = false,
}: IrisModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const modelRef = useRef<THREE.Group>(null);
  const { nodes, materials } = useGLTF('/assets/models/exo_iris9.glb') as GLTFResult;

  // CONTROLS
  const { envMapIntensity, plasticRoughness, plasticMetalness } = useControls('model', {
    envMapIntensity: {
      value: 2,
      min: 0,
      max: 5,
      step: 0.05,
    },
    plasticRoughness: {
      value: 1,
      min: 0,
      max: 1,
      step: 0.05,
    },
    plasticMetalness: {
      value: 0.25,
      min: 0,
      max: 1,
      step: 0.05,
    },
  });

  // FADE OUT THE MATERIALS
  useMaterialFade(materials.M_WhitePlastsic as any, isBottomFaded);
  useMaterialFade(materials._Shadow as any, isBottomFaded);

  useEffect(() => {
    // @ts-ignore
    materials.M_WhitePlastsic.isBottomFaded.value = isBottomFaded;

    // @ts-ignore
    materials._Shadow.isBottomFaded.value = isBottomFaded;
  }, [isBottomFaded]);

  useEffect(() => {
    onLoadFn(groupRef, modelRef);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Leva hidden />
      <group ref={groupRef} position={groupPos} rotation={groupRot} visible={visible}>
        <group
          ref={modelRef}
          dispose={null}
          scale={modelScale}
          rotation={modelRot}
          position={modelPos}
        >
          <mesh
            geometry={nodes.Exo_Iris_1.geometry}
            material={materials._Shadow}
            material-envMapIntensity={envMapIntensity}
            material-side={0}
          />
          <mesh
            geometry={nodes.Exo_Iris_2.geometry}
            material={materials.M_Lights}
            material-envMapIntensity={envMapIntensity}
            material-side={0}
          />
          <mesh
            geometry={nodes.Exo_Iris_3.geometry}
            material={materials.M_WhitePlastsic}
            material-envMapIntensity={envMapIntensity}
            material-roughness={plasticRoughness}
            material-metalness={plasticMetalness}
            material-side={0}
          />
          <mesh
            geometry={nodes.Exo_Iris_4.geometry}
            material={materials.M_Blue}
            material-envMapIntensity={envMapIntensity}
            material-side={0}
          />
        </group>
      </group>
    </>
  );
}

useGLTF.preload('/assets/models/exo_iris9.glb');
