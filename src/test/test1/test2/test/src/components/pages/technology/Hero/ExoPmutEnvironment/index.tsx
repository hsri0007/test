import { Environment, Lightformer, TransformControls, useHelper } from '@react-three/drei';
import { useControls } from 'leva';
import React, { useRef } from 'react';
import { degToRad } from 'three/src/math/MathUtils.js';

import { use3dStore } from '~/stores/3d/store';

import PRESETS from './presets.js';

export default React.memo(function ExoPmutEnvironment() {
  const light1 = useRef(null);
  const light2 = useRef(null);
  const { exoPmutEnvironmentPreset } = use3dStore(['exoPmutEnvironmentPreset']);

  // @ts-ignore
  const envProps = PRESETS[exoPmutEnvironmentPreset];

  /*
  // CUSTOMIZATION IF NECESSARY
  const lightOne = useControls(
    'Light one',
    {
      visible: { value: envProps.lightOne.visible },
      color: envProps.lightOne.color,
      intensity: { value: envProps.lightOne.intensity, min: 0, max: 200, step: 0.01 },
      position: {
        value: [
          envProps.lightOne.position[0],
          envProps.lightOne.position[1],
          envProps.lightOne.position[2],
        ],
      },
      target: {
        value: [
          envProps.lightOne.target[0],
          envProps.lightOne.target[1],
          envProps.lightOne.target[2],
        ],
      },
    },
    { collapsed: true }
  );

  const lightTwo = useControls(
    'Light two',
    {
      visible: { value: envProps.lightTwo.visible },
      color: envProps.lightTwo.color,
      intensity: { value: envProps.lightTwo.intensity, min: 0, max: 200, step: 0.01 },
      position: {
        value: [
          envProps.lightTwo.position[0],
          envProps.lightTwo.position[1],
          envProps.lightTwo.position[2],
        ],
      },
      target: {
        value: [
          envProps.lightTwo.target[0],
          envProps.lightTwo.target[1],
          envProps.lightTwo.target[2],
        ],
      },
    },
    { collapsed: true }
  );

  const lightThree = useControls(
    'Light three',
    {
      visible: { value: envProps.lightThree.visible },
      color: envProps.lightThree.color,
      intensity: { value: envProps.lightThree.intensity, min: 0, max: 200, step: 0.01 },
      position: {
        value: [
          envProps.lightThree.position[0],
          envProps.lightThree.position[1],
          envProps.lightThree.position[2],
        ],
      },
      target: {
        value: [
          envProps.lightThree.target[0],
          envProps.lightThree.target[1],
          envProps.lightThree.target[2],
        ],
      },
    },
    { collapsed: true }
  );
  */

  return (
    <>
      <Environment
        files="/assets/textures/exo_03.hdr"
        resolution={1024}
        background={false}
        frames={1}
      >
        <Lightformer
          intensity={2}
          rotation-y={degToRad(45)}
          position={[0, 4, -3.6]}
          scale={[10, 1.5, 1]}
        />

        <Lightformer
          intensity={2}
          rotation-x={Math.PI / 2}
          color={'#f4f4f4'}
          position={[0, 4, -1.6]}
          scale={[10, 0.25, 1]}
        />

        <Lightformer
          intensity={2}
          rotation-x={Math.PI / 2}
          color={'#f4f4f4'}
          position={[0, 4, -0.7]}
          scale={[10, 0.5, 1]}
        />

        <Lightformer
          intensity={2}
          rotation-x={Math.PI / 2}
          color={'#f4f4f4'}
          position={[0, 4, 0.1]}
          scale={[10, 0.25, 1]}
        />

        <Lightformer
          intensity={2}
          rotation-x={Math.PI / 2}
          color={'#f4f4f4'}
          position={[0, 4, 2]}
          scale={[10, 1, 1]}
        />

        <Lightformer
          intensity={2}
          rotation-x={Math.PI / 2}
          color={'#f4f4f4'}
          position={[0, 4, 6]}
          scale={[10, 1, 1]}
        />
      </Environment>
    </>
  );
});
