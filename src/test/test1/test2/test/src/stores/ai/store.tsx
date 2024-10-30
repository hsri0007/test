import React from 'react';
import { create } from 'zustand';
import { withZustandards } from 'zustand-ards';

type StoreState = {
  modelLoaded: boolean;
  modelVisible: boolean;
  setModelLoaded: (modelLoaded: boolean) => void;
  setModelVisible: (modelVisible: boolean) => void;
};

const useAIStore = withZustandards(
  create<StoreState>()((set) => ({
    modelLoaded: false,
    modelVisible: false,
    setModelLoaded: (modelLoaded: boolean) => set({ modelLoaded }),
    setModelVisible: (modelVisible: boolean) => set({ modelVisible }),
  }))
);

export { useAIStore };
