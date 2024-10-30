import { useGLTF } from '@react-three/drei';
import { useLayoutEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { MeshBasicMaterial } from 'three';
import { GLTF } from 'three-stdlib';

import { use3dStore } from '~/stores/3d/store';

type PhoneModelProps = {
  groupPos: [number, number, number];
  groupRot: [number, number, number];
  modelScale: number;
  visible: boolean;
  onLoadFn?: () => void;
} & JSX.IntrinsicElements['group'];

type GLTFResult = GLTF & {
  nodes: {
    M_Cameras: THREE.Mesh;
    M_Glass: THREE.Mesh;
    M_Metal_Rough: THREE.Mesh;
    M_Metal_Shiny: THREE.Mesh;
    M_Plastic: THREE.Mesh;
    M_Portal: THREE.Mesh;
    M_Screen: THREE.Mesh;
    M_Speakers: THREE.Mesh;
    M_USB: THREE.Mesh;
  };
  materials: {
    cam: THREE.MeshStandardMaterial;
    ['glass.001']: THREE.MeshStandardMaterial;
    metal_rough: THREE.MeshStandardMaterial;
    metal_Shiny: THREE.MeshStandardMaterial;
    ['M_Base.001']: THREE.MeshStandardMaterial;
    Screen: THREE.MeshStandardMaterial;
  };
};

export function PhoneModel({ groupPos, groupRot, modelScale, visible, onLoadFn }: PhoneModelProps) {
  const { nodes, materials } = useGLTF('/assets/models/Iphone15.glb') as GLTFResult;
  const groupRef = useRef<THREE.Group>(null);
  const modelRef = useRef<THREE.Group>(null);
  const screenRef = useRef<THREE.Mesh>(null);
  const { setPhoneGroupRef, setPhoneModelRef, setPhoneScreenRef } = use3dStore([
    'setPhoneGroupRef',
    'setPhoneModelRef',
    'setPhoneScreenRef',
  ]);

  // Duplicate the screen material so we can modify it without impacting other instances
  const screenMaterial = useMemo(() => {
    const mat: MeshBasicMaterial = new MeshBasicMaterial().copy(materials.Screen);
    mat.toneMapped = false;
    return mat;
  }, [materials.Screen]);

  useLayoutEffect(() => {
    if (onLoadFn) {
      onLoadFn();
    }
  }, [onLoadFn]);

  useLayoutEffect(() => {
    setPhoneGroupRef(groupRef);
    setPhoneModelRef(modelRef);
    setPhoneScreenRef(screenRef);
  }, [setPhoneGroupRef, setPhoneModelRef, setPhoneScreenRef]);

  return (
    <group ref={groupRef} position={groupPos} rotation={groupRot} visible={visible}>
      <group ref={modelRef} dispose={null} scale={modelScale}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <mesh geometry={nodes.M_Cameras.geometry} material={materials.cam} />
          <mesh geometry={nodes.M_Glass.geometry} material={materials['glass.001']} />
          <mesh geometry={nodes.M_Metal_Rough.geometry} material={materials.metal_rough} />
          <mesh geometry={nodes.M_Metal_Shiny.geometry} material={materials.metal_Shiny} />
          <mesh geometry={nodes.M_Plastic.geometry} material={materials.metal_rough} />
          <mesh geometry={nodes.M_Portal.geometry} material={materials['M_Base.001']} />
          <mesh ref={screenRef} geometry={nodes.M_Screen.geometry} material={screenMaterial} />
          <mesh geometry={nodes.M_Speakers.geometry} material={materials.metal_rough} />
          <mesh geometry={nodes.M_USB.geometry} material={materials.metal_rough} />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('/assets/models/Iphone15.glb');
