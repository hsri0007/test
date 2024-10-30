uniform sampler2D map;
uniform float uTime;
uniform float uFrequency;
uniform float uSpeed;
uniform float uAmplitude;
uniform vec2 uScale;
uniform float uTransitionInTime;
varying vec2 vUv;

#include <noise2d>

vec2 snoiseVec2( vec2 x ) {
  float s  = snoise(x);
  float s1 = snoise(vec2( x.y - 19.1 , x.x + 33.4 ));
  return vec2( s , s1 );
}

void main() {
    vec2 noise = snoiseVec2(vUv * uFrequency + uTime * uSpeed) * uAmplitude * uScale;
    noise = noise * (1.0 - uTransitionInTime);
    vec4 tex = texture2D(map, vUv + noise);
    float opacity =  tex.a;
    opacity -= smoothstep(-uAmplitude, uAmplitude, noise.x) * (1.0 - uTransitionInTime);
    gl_FragColor = vec4(tex.rgb, opacity * uTransitionInTime);
}