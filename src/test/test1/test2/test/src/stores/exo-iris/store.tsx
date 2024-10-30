import { ThreeElements } from '@react-three/fiber';
import { LinearSRGBColorSpace, Texture, VideoTexture } from 'three';
import { create } from 'zustand';
import { withZustandards } from 'zustand-ards';
import { devtools } from 'zustand/middleware';

let lastVideoPlayed: VideoTexture | null;

type StoreState = {
  backgroundCanvasVisible: boolean;
  setBackgroundCanvasVisible: (pageLoaded: boolean) => void;
  pageLoaded: boolean;
  setPageLoaded: (pageLoaded: boolean) => void;
  modelLoaded: boolean;
  setModelLoaded: (modelLoaded: boolean) => void;
  phoneModelLoaded: boolean;
  setPhoneModelLoaded: (phoneModelLoaded: boolean) => void;
  introComplete: boolean;
  setIntroComplete: (introComplete: boolean) => void;
  // toggles whether or not renderer is active on three.js canvas
  canvasEnabled: boolean;
  setCanvasEnabled: (canvasEnabled: boolean) => void;
  // refs from Three.js scene
  canvasContainerRef: React.MutableRefObject<HTMLDivElement | null> | null;
  setCanvasContainerRef: (ref: React.MutableRefObject<HTMLDivElement | null>) => void;
  //backgroundGradient canvas
  bgCanvasContainerRef: React.MutableRefObject<HTMLDivElement | null> | null;
  setBgCanvasContainerRef: (ref: React.MutableRefObject<HTMLDivElement | null>) => void;
  //backgroundGradient canvas
  introCanvasContainerRef: React.MutableRefObject<HTMLDivElement | null> | null;
  setIntroCanvasContainerRef: (ref: React.MutableRefObject<HTMLDivElement | null>) => void;
  // group refers to the parent group of the model
  groupRef: React.MutableRefObject<THREE.Group | null> | null;
  setGroupRef: (ref: React.MutableRefObject<THREE.Group | null>) => void;
  modelRef: React.MutableRefObject<THREE.Group | null> | null;
  setModelRef: (ref: React.MutableRefObject<THREE.Group | null>) => void;
  modelVisible: boolean;
  setModelVisible: (modelVisible: boolean) => void;
  // lights on the intro section
  pinkLightRef: React.MutableRefObject<THREE.SpotLight | null> | null;
  setPinkLightRef: (ref: React.MutableRefObject<THREE.SpotLight | null>) => void;
  goldLightRef: React.MutableRefObject<THREE.SpotLight | null> | null;
  setGoldLightRef: (ref: React.MutableRefObject<THREE.SpotLight | null>) => void;
  // phone model
  phoneModelRef: React.MutableRefObject<ThreeElements['primitive'] | null> | null;
  setPhoneModelRef: (ref: React.MutableRefObject<ThreeElements['primitive'] | null>) => void;
  phoneGroupRef: React.MutableRefObject<THREE.Group | null> | null;
  setPhoneGroupRef: (ref: React.MutableRefObject<THREE.Group | null>) => void;
  phoneModelVisible: boolean;
  setPhoneModelVisible: (phoneModelVisible: boolean) => void;
  changePhoneTexture: (texture: Texture) => void;
};

export const useIrisStore = withZustandards(
  create<StoreState>()(
    // devtools(
    (set) => ({
      backgroundCanvasVisible: true,
      setBackgroundCanvasVisible: (backgroundCanvasVisible: boolean) =>
        set({ backgroundCanvasVisible }),
      pageLoaded: false,
      setPageLoaded: (pageLoaded: boolean) => set({ pageLoaded }),
      modelLoaded: false,
      setModelLoaded: (modelLoaded: boolean) => set({ modelLoaded }),
      phoneModelLoaded: false,
      setPhoneModelLoaded: (phoneModelLoaded: boolean) => set({ phoneModelLoaded }),
      introComplete: false,
      setIntroComplete: (introComplete: boolean) => set({ introComplete }),
      canvasEnabled: true,
      setCanvasEnabled: (canvasEnabled: boolean) => set({ canvasEnabled }),
      canvasContainerRef: null,
      setCanvasContainerRef: (ref: React.MutableRefObject<HTMLDivElement | null>) =>
        set({ canvasContainerRef: ref }),
      bgCanvasContainerRef: null,
      setBgCanvasContainerRef: (ref: React.MutableRefObject<HTMLDivElement | null>) =>
        set({ bgCanvasContainerRef: ref }),
      introCanvasContainerRef: null,
      setIntroCanvasContainerRef: (ref: React.MutableRefObject<HTMLDivElement | null>) =>
        set({ introCanvasContainerRef: ref }),
      groupRef: null,
      setGroupRef: (ref: React.MutableRefObject<THREE.Group | null>) => set({ groupRef: ref }),
      modelRef: null,
      setModelRef: (ref: React.MutableRefObject<THREE.Group | null>) => set({ modelRef: ref }),
      modelVisible: true,
      setModelVisible: (modelVisible: boolean) => set({ modelVisible }),
      pinkLightRef: null,
      setPinkLightRef: (ref: React.MutableRefObject<THREE.SpotLight | null>) =>
        set({ pinkLightRef: ref }),
      goldLightRef: null,
      setGoldLightRef: (ref: React.MutableRefObject<THREE.SpotLight | null>) =>
        set({ goldLightRef: ref }),
      phoneModelRef: null,
      setPhoneModelRef: (ref: React.MutableRefObject<ThreeElements['primitive'] | null>) =>
        set({ phoneModelRef: ref }),
      phoneGroupRef: null,
      setPhoneGroupRef: (ref: React.MutableRefObject<THREE.Group | null>) =>
        set({ phoneGroupRef: ref }),
      phoneModelVisible: false,
      setPhoneModelVisible: (phoneModelVisible: boolean) => set({ phoneModelVisible }),
      changePhoneTexture: (texture: Texture) => {
        if (set) {
          set((state) => {
            if (state.phoneModelRef?.current) {
              if (lastVideoPlayed) {
                if (lastVideoPlayed.isVideoTexture) {
                  const video = lastVideoPlayed.image;
                  if (
                    video.currentTime > 0 &&
                    !video.paused &&
                    !video.ended &&
                    video.readyState > 2
                  ) {
                    lastVideoPlayed.image.pause();
                  }
                  lastVideoPlayed = null;
                }
              }
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
              const screen = state.phoneModelRef.current.getObjectByName('screen');
              screen.toneMapped = false;
              screen.material.map = texture;
            }
            return state;
          });
        }
      },
    })
    // {
    //   name: 'iris-store',
    // }
    // )
  )
);
