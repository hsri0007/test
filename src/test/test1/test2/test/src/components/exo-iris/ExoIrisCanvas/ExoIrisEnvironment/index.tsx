import { Environment, Lightformer } from '@react-three/drei';
import { useControls } from 'leva';
import React, { useRef } from 'react';

import { use3dStore } from '~/stores/3d/store';

import PRESETS from './presets';

export default React.memo(function ExoIrisEnvironment() {
  const light1 = useRef(null);
  const light2 = useRef(null);
  const { exoIrisEnvironmentPreset } = use3dStore(['exoIrisEnvironmentPreset']);

  // @ts-ignore
  const envProps = PRESETS[exoIrisEnvironmentPreset];

  /*
  // CUSTOMIZATION IF NECESSARY
  const lightOne = useControls(
    'Light one',
    {
      visible: { value: envProps.lightOne.visible },
      color: envProps.lightOne.color,
      intensity: { value: envProps.lightOne.intensity, min: 0, max: 30, step: 0.05 },
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
      intensity: { value: envProps.lightTwo.intensity, min: 0, max: 30, step: 0.05 },
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
      intensity: { value: envProps.lightThree.intensity, min: 0, max: 30, step: 0.05 },
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
