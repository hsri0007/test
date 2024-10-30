const presets = {
  pmutModel: {
    lightOne: {
      visible: true,
      color: '#10F8E4', //green
      intensity: 5.63, //35.4
      position: [-0.5, 1, -0.85],
      // position: [-.8,1.5, -3],
      // position: [-1.0, 1.4, 0.6],
      target: [0, 0, 0],
    },
    //   lightOne: {
    //     visible: true,
    //     color: '#03544D', //green
    //     intensity: 70.4, //35.4
    //     position: [-1.0, 1.4, 0.6],
    //     target: [0, 0, 0],
    //   },
    lightTwo: {
      visible: false,
      color: '#ffffff',
      intensity: 5.85,
      position: [1, 0, 0.5],
      target: [-1, 0, 0],
    },
    //   lightThree: {
    //     visible: true,
    //     // color: '#266B86', //blue
    //     color: '#00A4E7', //blue
    //     intensity: 34.2,
    //     position: [-3.09, -3.14, 3.73],
    //     target: [-1, -3.73, 0.15],
    //   },
    lightThree: {
      visible: false,
      // color: '#266B86', //blue
      color: '#ffffff', //blue
      intensity: 1.5,
      // position: [-.21, 1.4, -1.5],
      position: [-0.5, 1, -0.85],
      target: [0, 0, 0],
    },
  },
  default: {
    lightOne: {
      visible: false,
      color: '#c300ff',
      intensity: 3.4,
      position: [-1.0, 1.4, 0.6],
      target: [0, 0, 0],
    },
    lightTwo: {
      visible: false,
      color: '#ffffff',
      intensity: 23.85,
      position: [1, 0, 0.5],
      target: [0, 0, 0],
    },
    lightThree: {
      visible: false,
      color: '#ffa300',
      intensity: 24.2,
      position: [-3.09, -3.14, 3.73],
      target: [-1, -3.73, 0.15],
    },
  },
};

export default presets;
