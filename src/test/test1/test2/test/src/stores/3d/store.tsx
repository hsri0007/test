import { ThreeElements } from '@react-three/fiber';
import { LinearSRGBColorSpace, MeshBasicMaterial, Texture, VideoTexture } from 'three';
import { create } from 'zustand';
import { withZustandards } from 'zustand-ards';

let lastVideoPlayed: VideoTexture | null;

type StoreState = {
  // group refers to the parent group of the model
  // GENERAL RULE: change position on group, change rotation and scale on model
  irisGroupRef: React.MutableRefObject<THREE.Group | null> | null;
  setIrisGroupRef: (ref: React.MutableRefObject<THREE.Group | null>) => void;
  irisModelRef: React.MutableRefObject<THREE.Group | null> | null;
  setIrisModelRef: (ref: React.MutableRefObject<THREE.Group | null>) => void;
  irisModelVisible: boolean;
  setIrisModelVisible: (modelVisible: boolean) => void;
  // phone model
  phoneGroupRef: React.MutableRefObject<THREE.Group | null> | null;
  setPhoneGroupRef: (ref: React.MutableRefObject<THREE.Group | null>) => void;
  phoneModelRef: React.MutableRefObject<THREE.Group | null> | null;
  setPhoneModelRef: (ref: React.MutableRefObject<THREE.Group | null>) => void;
  phoneScreenRef: React.MutableRefObject<THREE.Mesh | null> | null;
  setPhoneScreenRef: (ref: React.MutableRefObject<THREE.Mesh | null>) => void;
  phoneModelVisible: boolean;
  setPhoneModelVisible: (phoneModelVisible: boolean) => void;
  changePhoneTexture: (texture: Texture) => void;
  //PMUT Model
  pmutGroupRef: React.MutableRefObject<THREE.Group | null> | null;
  setPmutGroupRef: (ref: React.MutableRefObject<THREE.Group | null>) => void;
  pmutModelRef: React.MutableRefObject<THREE.Group | null> | null;
  setPmutModelRef: (ref: React.MutableRefObject<THREE.Group | null>) => void;
  pmutModelVisible: boolean;
  setPmutModelVisible: (pmutModelVisible: boolean) => void;
  pmutGradientRef: React.MutableRefObject<THREE.Group | null> | null;
  setPmutGradientRef: (ref: React.MutableRefObject<THREE.Group | null>) => void;

  // ENVIRONMENT
  exoIrisEnvironmentPreset: string;
  setExoIrisEnvironmentPreset: (phoneModelVisible: string) => void;
  isExoIrisModelFaded: boolean;
  setIsExoIrisModelFaded: (isExoIrisModelFaded: boolean) => void;
  exoPmutEnvironmentPreset: string;
  setExoPmutEnvironmentPreset: (exoPmutEnvironmentPreset: string) => void;
};

export const use3dStore = withZustandards(
  create<StoreState>()((set) => ({
    irisGroupRef: null,
    setIrisGroupRef: (ref: React.MutableRefObject<THREE.Group | null>) =>
      set({ irisGroupRef: ref }),
    irisModelRef: null,
    setIrisModelRef: (ref: React.MutableRefObject<THREE.Group | null>) =>
      set({ irisModelRef: ref }),
    irisModelVisible: false,
    setIrisModelVisible: (irisModelVisible: boolean) => set({ irisModelVisible }),
    phoneModelRef: null,
    setPhoneModelRef: (ref: React.MutableRefObject<THREE.Group | null>) =>
      set({ phoneModelRef: ref }),
    phoneGroupRef: null,
    setPhoneGroupRef: (ref: React.MutableRefObject<THREE.Group | null>) =>
      set({ phoneGroupRef: ref }),
    phoneModelVisible: false,
    setPhoneModelVisible: (phoneModelVisible: boolean) => set({ phoneModelVisible }),
    phoneScreenRef: null,
    setPhoneScreenRef: (ref: React.MutableRefObject<THREE.Mesh | null>) =>
      set({ phoneScreenRef: ref }),
    changePhoneTexture: (texture: Texture) => {
      if (set) {
        set((state) => {
          if (state.phoneScreenRef?.current && texture) {
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
            // texture.repeat.set(1.109, 1.06);
            // texture.offset.set(-0.048, -0.03);

            texture.repeat.set(1.11, 1.035);
            texture.offset.set(-0.05, -0.035);

            texture.flipY = false;
            texture.colorSpace = LinearSRGBColorSpace;
            const material: MeshBasicMaterial = state.phoneScreenRef.current
              .material as MeshBasicMaterial;
            material.toneMapped = false;
            material.map = texture;
          }
          return state;
        });
      }
    },

    pmutGroupRef: null,
    setPmutGroupRef: (ref: React.MutableRefObject<THREE.Group | null>) =>
      set({ pmutGroupRef: ref }),
    pmutModelRef: null,
    setPmutModelRef: (ref: React.MutableRefObject<THREE.Group | null>) =>
      set({ pmutModelRef: ref }),
    pmutModelVisible: false,
    setPmutModelVisible: (pmutModelVisible: boolean) => set({ pmutModelVisible }),
    pmutGradientRef: null,
    setPmutGradientRef: (ref: React.MutableRefObject<THREE.Group | null>) =>
      set({ pmutGradientRef: ref }),

    // ENVIRONMENT
    exoIrisEnvironmentPreset: 'irisModel',
    setExoIrisEnvironmentPreset: (v: string) => set({ exoIrisEnvironmentPreset: v }),

    exoPmutEnvironmentPreset: 'pmutModel',
    setExoPmutEnvironmentPreset: (v: string) => set({ exoPmutEnvironmentPreset: v }),

    // MODEL FADED (mostly due Exo Iris hero)
    isExoIrisModelFaded: false,
    setIsExoIrisModelFaded: (v: boolean) => set({ isExoIrisModelFaded: v }),
  }))
);
