'use client';

/* eslint-disable react-hooks/exhaustive-deps */
import { useGLTF } from '@react-three/drei';
import { Leva, useControls } from 'leva';
import { useLayoutEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTF } from 'three-stdlib';

import { use3dStore } from '~/stores/3d/store';

type PmutModelProps = {
  groupPos: [number, number, number];
  groupRot: [number, number, number];
  modelScale: number;
  modelRot: [number, number, number];
  modelPos: [number, number, number];
  visible: boolean;
  forceFade?: boolean;
  onLoadFn?: () => void;
} & JSX.IntrinsicElements['group'];

type GLTFResult = GLTF & {
  nodes: {
    casing: THREE.Mesh;
    glass: THREE.Mesh;
    pmuts: THREE.Mesh;
    rim: THREE.Mesh;
    shell: THREE.Mesh;
  };
  materials: {
    Glass: THREE.MeshStandardMaterial;
    Plastic: THREE.MeshStandardMaterial;
    Pmut: THREE.MeshPhysicalMaterial;
  };
};

export function PmutModel({
  groupPos,
  groupRot,
  modelScale,
  modelRot,
  modelPos,
  visible,
  onLoadFn,
  forceFade = false,
}: PmutModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const modelRef = useRef<THREE.Group>(null);
  const { nodes, materials } = useGLTF('/assets/models/pmut_2.glb') as GLTFResult;
  const { setPmutGroupRef, setPmutModelRef } = use3dStore(['setPmutGroupRef', 'setPmutModelRef']);

  // CONTROLS
  const { envMapIntensity, plasticRoughness, plasticMetalness } = useControls('model', {
    envMapIntensity: { value: 3.5, min: 0, max: 5, step: 0.05 },
    plasticRoughness: { value: 0.1, min: 0, max: 1, step: 0.05 },
    plasticMetalness: { value: 0.85, min: 0, max: 1, step: 0.05 },
  });

  useLayoutEffect(() => {
    if (onLoadFn) {
      onLoadFn();
    }
  }, [onLoadFn]);

  useLayoutEffect(() => {
    setPmutGroupRef(groupRef);
    setPmutModelRef(modelRef);
  }, [setPmutGroupRef, setPmutModelRef]);

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
            geometry={nodes.casing.geometry}
            material={materials.Plastic}
            material-envMapIntensity={1.1}
            material-roughness={0.4}
            material-metalness={0.35}
            material-side={0}
          />

          <mesh
            geometry={nodes.shell.geometry}
            material-envMapIntensity={envMapIntensity}
            material-side={0}
            material-roughness={0.5}
            material-metalness={0.6}
            material={materials.Plastic}
          />

          <mesh
            geometry={nodes.rim.geometry}
            material-envMapIntensity={envMapIntensity}
            material-side={0}
            material={materials.Plastic}
          />

          <mesh
            geometry={nodes.glass.geometry}
            material={materials.Glass}
            material-envMapIntensity={envMapIntensity}
            material-roughness={0}
            material-blending={THREE.AdditiveBlending}
            material-emissive={'#000000'}
            material-side={0}
          />

          <mesh
            geometry={nodes.pmuts.geometry}
            material-envMapIntensity={envMapIntensity}
            material-roughness={0.9}
            material-metalness={0.45}
            material-side={0}
            material={materials.Pmut}
          />
        </group>
      </group>
    </>
  );
}

useGLTF.preload('/assets/models/pmut_2.glb');
