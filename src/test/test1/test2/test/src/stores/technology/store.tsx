import { create } from 'zustand';
import { withZustandards } from 'zustand-ards';

type StoreState = {
  introComplete: boolean;
  setIntroComplete: (introComplete: boolean) => void;
  pageLoaded: boolean;
  setPageLoaded: (pageLoaded: boolean) => void;
  modelLoaded: boolean;
  setModelLoaded: (modelLoaded: boolean) => void;
  modelVisible: boolean;
  setModelVisible: (modelVisible: boolean) => void;
  techCanvasContainerRef: React.MutableRefObject<HTMLDivElement | null> | null;
  setTechCanvasContainerRef: (ref: React.MutableRefObject<HTMLDivElement | null>) => void;
  cameraRef: any;
  setCameraRef: (ref: any) => void;
};

const useTechnologyStore = withZustandards(
  create<StoreState>()((set) => ({
    introComplete: false,
    setIntroComplete: (introComplete: boolean) => set({ introComplete }),
    pageLoaded: false,
    setPageLoaded: (pageLoaded: boolean) => set({ pageLoaded }),
    modelLoaded: false,
    setModelLoaded: (modelLoaded: boolean) => set({ modelLoaded }),
    modelVisible: false,
    setModelVisible: (modelVisible: boolean) => set({ modelVisible }),
    techCanvasContainerRef: null,
    setTechCanvasContainerRef: (ref: React.MutableRefObject<HTMLDivElement | null>) =>
      set({ techCanvasContainerRef: ref }),
    cameraRef: null,
    setCameraRef: (ref: any) => set({ cameraRef: ref }),
  }))
);

export { useTechnologyStore };
