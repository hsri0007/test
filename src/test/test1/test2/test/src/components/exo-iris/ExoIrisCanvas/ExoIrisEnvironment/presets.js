import { Vector3 } from 'three';

const presets = {
  irisModel: {
    lightOne: {
      visible: true,
      color: '#c300ff',
      intensity: 3.4,
      position: new Vector3(-1.0, 1.4, 0.6),
      target: new Vector3(0, 0, 0),
    },
    lightTwo: {
      visible: true,
      color: '#ffffff',
      intensity: 23.85,
      position: new Vector3(1, 0, 0.5),
      target: new Vector3(0, 0, 0),
    },
    lightThree: {
      visible: false,
      color: '#ffa300',
      intensity: 24.2,
      position: new Vector3(-3.09, -3.14, 3.73),
      target: new Vector3(-1, -3.73, 0.15),
    },
  },
  irisModelSpecs: {
    lightOne: {
      visible: true,
      color: '#c300ff',
      intensity: 3.4,
      position: new Vector3(-1.0, 1.4, 0.6),
      target: new Vector3(0, 0, 0),
    },
    lightTwo: {
      visible: true,
      color: '#ffffff',
      intensity: 0.75,
      position: new Vector3(1, 0, 0.5),
      target: new Vector3(0, 0, 0),
    },
    lightThree: {
      visible: false,
      color: '#ffa300',
      intensity: 24.2,
      position: new Vector3(-3.09, -3.14, 3.73),
      target: new Vector3(-1, -3.73, 0.15),
    },
  },
  default: {
    lightOne: {
      visible: false,
      color: '#c300ff',
      intensity: 3.4,
      position: new Vector3(-1.0, 1.4, 0.6),
      target: new Vector3(0, 0, 0),
    },
    lightTwo: {
      visible: false,
      color: '#ffffff',
      intensity: 23.85,
      position: new Vector3(1, 0, 0.5),
      target: new Vector3(0, 0, 0),
    },
    lightThree: {
      visible: false,
      color: '#ffa300',
      intensity: 24.2,
      position: new Vector3(-3.09, -3.14, 3.73),
      target: new Vector3(-1, -3.73, 0.15),
    },
  },
};

export default presets;
