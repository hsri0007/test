import { useGLTF } from '@react-three/drei';
import { useEffect, useMemo, useRef } from 'react';
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

export type PhoneModel2Props = {
  groupPos: [number, number, number];
  groupRot: [number, number, number];
  modelScale: number;
  visible: boolean;
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

let lastVideoPlayed: VideoTexture | null;

export function changePhone2Texture(
  texture: Texture,
  phoneScreenRef: React.RefObject<Mesh | null>
) {
  if (lastVideoPlayed) {
    const video = lastVideoPlayed.image;
    if (video.currentTime > 0 && !video.paused && !video.ended && video.readyState > 2) {
      lastVideoPlayed.image.pause();
    }
    lastVideoPlayed = null;
  }
  if (texture) {
    if (texture instanceof VideoTexture) {
      texture.image.currentTime = 0;
      const playPromise = texture.image.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Automatic playback started!
            // Show playing UI.
          })
          .catch(() => {
            // Auto-play was prevented
            // Show paused UI.
          });
      }
      lastVideoPlayed = texture as VideoTexture;
    }
    texture.flipY = false;
    texture.colorSpace = LinearSRGBColorSpace;
    if (!phoneScreenRef.current) return;
    const material: MeshBasicMaterial = phoneScreenRef.current.material as MeshBasicMaterial;
    material.toneMapped = false;
    material.map = texture;
  }
}

export function PhoneModel2({
  groupPos,
  groupRot,
  modelScale,
  visible,
  onLoadFn,
}: PhoneModel2Props) {
  const { nodes, materials } = useGLTF('/assets/models/Iphone15.glb') as GLTFResult;

  const groupRef = useRef<Group>(null);
  const modelRef = useRef<Group>(null);
  const phoneScreenRef = useRef<Mesh>(null);

  // Duplicate the screen material so we can modify it without impacting other instances
  const screenMaterial = useMemo(() => {
    const mat: MeshBasicMaterial = new MeshBasicMaterial().copy(materials.Screen);
    mat.toneMapped = false;
    return mat;
  }, [materials.Screen]);

  useEffect(() => {
    onLoadFn(groupRef, modelRef, phoneScreenRef);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
