'use client';

import { useLoader } from '@react-three/fiber';
import { EffectComposer, LUT, SMAA } from '@react-three/postprocessing';
import { LUTCubeLoader } from 'postprocessing';

const Grading = () => {
  // @ts-ignore
  const texture3D = useLoader(LUTCubeLoader, '/assets/textures/Exo2.CUBE');

  return (
    <EffectComposer>
      {/* <SMAA /> */}
      <LUT lut={texture3D} />
    </EffectComposer>
  );
};

export default Grading;
