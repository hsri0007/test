import { MathUtils } from 'three';

export default function distance(width: number, camera: THREE.PerspectiveCamera) {
  const vFOV = MathUtils.degToRad(camera.fov);
  const distance = width / camera.aspect / (2 * Math.tan(vFOV / 2));
  const heightPlane = 2 * Math.tan(vFOV / 2) * distance;

  return { distance, height: heightPlane };
}
