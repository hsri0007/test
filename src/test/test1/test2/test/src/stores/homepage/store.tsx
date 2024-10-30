import { create } from 'zustand';
import { withZustandards } from 'zustand-ards';
import { devtools } from 'zustand/middleware';

type StoreState = {
  loaded: boolean;
  setLoaded: (loaded: boolean) => void;
  orbLoaded: boolean;
  setOrbLoaded: (loaded: boolean) => void;
  orbCanvasContainerRef: React.MutableRefObject<HTMLDivElement | null> | null;
  setOrbCanvasContainerRef: (ref: React.MutableRefObject<HTMLDivElement | null>) => void;
  orbMeshRef: React.MutableRefObject<THREE.Mesh | null> | null;
  setOrbMeshRef: (ref: React.MutableRefObject<THREE.Mesh | null>) => void;
  orbGroupRef: React.MutableRefObject<THREE.Group | null> | null;
  setOrbGroupRef: (ref: React.MutableRefObject<THREE.Group | null>) => void;
};

export const useHomepageStore = withZustandards(
  create<StoreState>()(
    devtools(
      (set) => ({
        loaded: false,
        setLoaded: (loaded: boolean) => set({ loaded }),
        orbLoaded: false,
        setOrbLoaded: (orbLoaded: boolean) => set({ orbLoaded }),
        orbCanvasContainerRef: null,
        setOrbCanvasContainerRef: (ref: React.MutableRefObject<HTMLDivElement | null>) =>
          set({ orbCanvasContainerRef: ref }),
        orbMeshRef: null,
        setOrbMeshRef: (ref: React.MutableRefObject<THREE.Mesh | null>) => set({ orbMeshRef: ref }),
        orbGroupRef: null,
        setOrbGroupRef: (ref: React.MutableRefObject<THREE.Group | null>) =>
          set({ orbGroupRef: ref }),
      }),
      {
        name: 'homepage',
      }
    )
  )
);
