import { Environment, Lightformer } from '@react-three/drei';
import React, { useRef } from 'react';

import presets from '../../../exo-iris/ExoIrisCanvas/ExoIrisEnvironment/presets';

export default React.memo(function PhoneCanvasEnvironment() {
  const light1 = useRef(null);
  const light2 = useRef(null);

  const envProps = presets['default'];

  return (
    <>
      <Environment files="/assets/textures/studio2.hdr" background={false} frames={1}>
        <Lightformer
          ref={light1}
          form="rect"
          intensity={envProps.lightOne.intensity}
          color={envProps.lightOne.color}
          scale={[1, 1, 1]}
          target={envProps.lightOne.target}
          position={envProps.lightOne.position}
          visible={envProps.lightOne.visible}
        />
        <Lightformer
          ref={light2}
          form="rect"
          intensity={envProps.lightTwo.intensity}
          color={envProps.lightTwo.color}
          scale={[1, 1, 1]}
          target={envProps.lightTwo.target}
          position={envProps.lightTwo.position}
          visible={envProps.lightTwo.visible}
        />
        <Lightformer
          //   ref={light2}
          form="rect"
          intensity={envProps.lightThree.intensity}
          color={envProps.lightThree.color}
          scale={[1, 1, 1]}
          target={envProps.lightThree.target}
          position={envProps.lightThree.position}
          visible={envProps.lightThree.visible}
        />
      </Environment>
    </>
  );
});
