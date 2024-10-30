import { useGLTF } from '@react-three/drei';
import React, { forwardRef, useEffect, useMemo } from 'react';
import type * as THREE from 'three';
import { MeshBasicMaterial, MeshPhysicalMaterial } from 'three';
import { GLTF } from 'three-stdlib';

////
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
    cam: THREE.MeshPhysicalMaterial;
    ['glass.001']: THREE.MeshPhysicalMaterial;
    metal_rough: THREE.MeshPhysicalMaterial;
    metal_Shiny: THREE.MeshPhysicalMaterial;
    ['M_Base.001']: THREE.MeshStandardMaterial;
    Screen: THREE.MeshPhysicalMaterial;
  };
};

type GroupProps = JSX.IntrinsicElements['group'];
export interface PhoneProps extends GroupProps {
  screenTexture?: THREE.Texture;
}

export const Phone = forwardRef<THREE.Group | null, PhoneProps>((props, ref) => {
  const { screenTexture, ...otherProps } = props;
  const { nodes, materials } = useGLTF('/assets/models/Iphone15.glb') as GLTFResult;

  // Duplicate the screen material so we can modify it without impacting other instances
  const screenMaterial = useMemo(() => {
    const mat: MeshBasicMaterial = new MeshBasicMaterial().copy(materials.Screen);
    mat.toneMapped = false;
    return mat;
  }, [materials.Screen]);

  // When the texture changes update the screen material
  useEffect(() => {
    if (screenTexture && screenMaterial) {
      screenTexture.repeat.set(1.109, 1.06);
      screenTexture.offset.set(-0.048, -0.03);
      screenTexture.flipY = false;
      screenMaterial.map = screenTexture;
    }
  }, [screenMaterial, screenTexture]);

  return (
    <group {...otherProps} ref={ref} dispose={null}>
      <group name="Iphone_14_Pro" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
        <mesh
          name="M_Cameras"
          castShadow
          receiveShadow
          geometry={nodes.M_Cameras.geometry}
          material={materials.cam}
        />
        <mesh
          name="M_Glass"
          castShadow
          receiveShadow
          geometry={nodes.M_Glass.geometry}
          material={materials['glass.001']}
        />
        <mesh
          name="M_Metal_Rough"
          castShadow
          receiveShadow
          geometry={nodes.M_Metal_Rough.geometry}
          material={materials.metal_rough}
        />
        <mesh
          name="M_Metal_Shiny"
          castShadow
          receiveShadow
          geometry={nodes.M_Metal_Shiny.geometry}
          material={materials.metal_Shiny}
        />
        <mesh
          name="M_Plastic"
          castShadow
          receiveShadow
          geometry={nodes.M_Plastic.geometry}
          material={materials.metal_rough}
        />
        <mesh
          name="M_Portal"
          castShadow
          receiveShadow
          geometry={nodes.M_Portal.geometry}
          material={materials['M_Base.001']}
        />
        <mesh
          name="M_Screen"
          castShadow
          receiveShadow
          geometry={nodes.M_Screen.geometry}
          material={screenMaterial}
        />
        <mesh
          name="M_Speakers"
          castShadow
          receiveShadow
          geometry={nodes.M_Speakers.geometry}
          material={materials.metal_rough}
        />
        <mesh
          name="M_USB"
          castShadow
          receiveShadow
          geometry={nodes.M_USB.geometry}
          material={materials.metal_rough}
        />
      </group>
    </group>
  );
});

Phone.displayName = 'Phone';

useGLTF.preload('/assets/models/Iphone15.glb');
