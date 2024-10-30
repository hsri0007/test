uniform sampler2D map;
uniform float uFrequency;
uniform float uTime;
uniform float uSpeed;
uniform float uAmplitude;
uniform float uTransitionInTime;
varying vec2 vUv;

void main() {
  gl_Position = vec4(position * (uTransitionInTime * 0.25  + 0.75), 1.0);
  vUv = uv;
}