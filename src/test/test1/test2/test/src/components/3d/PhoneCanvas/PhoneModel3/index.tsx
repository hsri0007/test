import { useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import {
  Group,
  LinearSRGBColorSpace,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  Texture,
  VideoTexture,
} from 'three';
import { GLTF } from 'three-stdlib';

export type PhoneModel3Props = {
  groupPos: [number, number, number];
  groupRot: [number, number, number];
  modelScale: number;
  visible: boolean;
  onScreenMaterial: (screenMaterial: MeshBasicMaterial) => void;
  onLoadFn: (
    groupRef: React.RefObject<Group>,
    modelRef: React.RefObject<Group>,
    phoneScreenRef: React.RefObject<Mesh>
  ) => void;
} & JSX.IntrinsicElements['group'];

type GLTFResult = GLTF & {
  nodes: {
    M_Cameras: Mesh;
    M_Glass: Mesh;
    M_Metal_Rough: Mesh;
    M_Metal_Shiny: Mesh;
    M_Plastic: Mesh;
    M_Portal: Mesh;
    M_Screen: Mesh;
    M_Speakers: Mesh;
    M_USB: Mesh;
  };
  materials: {
    cam: MeshStandardMaterial;
    ['glass.001']: MeshStandardMaterial;
    metal_rough: MeshStandardMaterial;
    metal_Shiny: MeshStandardMaterial;
    ['M_Base.001']: MeshStandardMaterial;
    Screen: MeshStandardMaterial;
  };
};

export const playPhone2Texture = (screenMaterial: MeshBasicMaterial, phoneId?: number | string) => {
  if (
    screenMaterial.map &&
    screenMaterial.map instanceof VideoTexture &&
    // Only play if it isn't playing already
    (screenMaterial.map.image?.paused ||
      screenMaterial.map.image?.currentTime === 0 ||
      screenMaterial.map.image?.ended)
  ) {
    if (!screenMaterial.map.image.getAttribute('src')) {
      screenMaterial.map.image.setAttribute(
        'src',
        screenMaterial.map.image.getAttribute('data-src')
      );
      screenMaterial.map.image.load();
    }
    const playPromise = screenMaterial.map.image.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          // Automatic playback started!
          // Show playing UI.
        })
        .catch((error: unknown) => {
          // Auto-play was prevented.
          // Show paused UI.

          // Ignore the interrupted error to prevent console spam
          if (
            !`${error}`.startsWith(
              'DOMException: The play() request was interrupted by a call to pause().'
            )
          ) {
            console.error('Playing phone texture failed', error);
          }
        });
    }
  }
};

export const pausePhone2Texture = (
  screenMaterial: MeshBasicMaterial,
  phoneId?: number | string
) => {
  if (
    screenMaterial.map &&
    screenMaterial.map instanceof VideoTexture &&
    screenMaterial.map.image.getAttribute('src') &&
    screenMaterial.map.image.getAttribute('src') !== 'null'
  ) {
    screenMaterial.map.image.pause();
    screenMaterial.map.dispose();
    screenMaterial.map.image.setAttribute('data-src', screenMaterial.map.image.getAttribute('src'));
    screenMaterial.map.image.removeAttribute('src');
    screenMaterial.map.image.load();
    screenMaterial.map.dispose();
    screenMaterial.dispose();
  }
};

export const changePhone2Texture = (
  texture: Texture,
  phoneScreenRef: React.RefObject<Mesh | null>,
  phoneId?: string | number
) => {
  if (texture) {
    texture.flipY = false;
    texture.colorSpace = LinearSRGBColorSpace;
    if (!phoneScreenRef.current) return;
    const material: MeshBasicMaterial = phoneScreenRef.current.material as MeshBasicMaterial;
    material.toneMapped = false;
    material.map = texture;
  }
};

export function PhoneModel3({
  groupPos,
  groupRot,
  modelScale,
  visible,
  onLoadFn,
  onScreenMaterial,
}: PhoneModel3Props) {
  const { nodes, materials } = useGLTF('/assets/models/Iphone15.glb') as GLTFResult;

  const groupRef = useRef<Group>(null);
  const modelRef = useRef<Group>(null);
  const phoneScreenRef = useRef<Mesh>(null);

  const { gl } = useThree();
  // Duplicate the screen material so we can modify it without impacting other instances
  const screenMaterial = useMemo(() => {
    const mat: MeshBasicMaterial = new MeshBasicMaterial().copy(materials.Screen);
    mat.toneMapped = false;
    return mat;
  }, [materials.Screen]);

  useEffect(() => {
    onLoadFn(groupRef, modelRef, phoneScreenRef);
  }, [onLoadFn]);

  useEffect(() => {
    onScreenMaterial?.(screenMaterial);
  }, [onScreenMaterial, screenMaterial]);

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
          <mesh ref={phoneScreenRef} geometry={nodes.M_Screen.geometry} material={screenMaterial} />
          <mesh geometry={nodes.M_Speakers.geometry} material={materials.metal_rough} />
          <mesh geometry={nodes.M_USB.geometry} material={materials.metal_rough} />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('/assets/models/Iphone15.glb');
