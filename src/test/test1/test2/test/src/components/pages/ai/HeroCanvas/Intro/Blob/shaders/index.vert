#include <common>

varying float vNoiseIntensity;
varying float vNoiseIntensity2;
varying float vNoiseIntensity3;
varying float vNoiseIntensity4;
varying float vAnalyzeProgress1;
varying float vAnalyzeProgress2;
varying float vFadeColor;
varying float vProgress;
varying float vColorshift;
varying vec2 vUv;
varying vec2 vGridPos;
varying vec3 vFinalPosition;

uniform float uSizeFactor;
uniform float uTime;
uniform float uAnimationDuration;
uniform float uMorphProgress;
uniform float uNoiseRedScale1;
uniform float uNoiseRedScale2;
uniform float uNoiseGreenScale1;
uniform float uNoiseGreenScale2;
uniform float uNoiseBlackScale;
uniform float uNoiseGreenDisplacementFactor;
uniform float uNoiseRedDisplacementFactor;
uniform float uNoiseBlackDisplacementFactor;
uniform float uAnalyzeProgress;
uniform vec2 uGridSize;
uniform vec4 uCameraQuaterion;
uniform sampler2D uNoiseTxt;

attribute float aTimeShift;
attribute float aRandomPoint;
attribute float aAnimationDelay;
attribute float aFinalScale;
attribute float aColorShift;
attribute vec2 aGridPos;
attribute vec3 aPlaneTranslate;
attribute vec3 aSphereTranslate;

void main(){
  vColorshift = aColorShift;
  vUv = uv;

  float t = uTime * 0.1 + aTimeShift;
  float progress = smoothstep(aAnimationDelay, aAnimationDelay + uAnimationDuration, uMorphProgress);
  vProgress = progress;

  // REMAP MAIN TXT
  vec2 remappedUv = vec2(
    smoothstep(-1.0, 1.0, position.x),
    smoothstep(-1.0, 1.0, position.y)
  );

  vGridPos = aGridPos;

  // FINAL POSITION
  vec3 translate = mix(aPlaneTranslate, aSphereTranslate, progress);
  
  // NOISE2 
  float t2 = uTime * 0.07;

  vec2 fakeWorldUv = vec2(
    smoothstep(-4.0, 4.0, aSphereTranslate.x) + t2 * 0.15,
    smoothstep(-4.0, 4.0, aSphereTranslate.y) + t2 * 0.6
  );

  vec2 fakeWorldUv2 = vec2(
    smoothstep(-2.0, 2.0, aSphereTranslate.x) - t2 * 0.45,
    smoothstep(-2.0, 2.0, aSphereTranslate.y) + t2 * 0.99 + 4.0
  );

  // CALCULATE BOTH NOISES
  float redNoise1 = texture2D(uNoiseTxt, fakeWorldUv * uNoiseRedScale1).r;
  redNoise1 = smoothstep(0.5, 0.7, redNoise1);

  float redNoise2 = texture2D(uNoiseTxt, fakeWorldUv2 * uNoiseRedScale2).r;
  redNoise2 = smoothstep(0.4, 0.9, redNoise2);

  float greenNoise1 = texture2D(uNoiseTxt, fakeWorldUv * uNoiseGreenScale1).r;
  greenNoise1 = smoothstep(0.45, 0.6, greenNoise1);

  float greenNoise2 = texture2D(uNoiseTxt, fakeWorldUv2 * uNoiseGreenScale2).r;
  greenNoise2 = smoothstep(0.4, 0.7, greenNoise2);

  float fakeNoise = cos(uTime * 0.502 + sin(0.4 * uTime * 0.502) + cos(3.0 * uTime * 0.502));

  // REMAP PROGRESS
  vAnalyzeProgress1 = smoothstep(0.1, 0.5, uAnalyzeProgress);
  vAnalyzeProgress2 = smoothstep(0.4, 1.0, uAnalyzeProgress);

  // MIX THEM
  float finalNoise1 = mix(redNoise1, greenNoise1, vAnalyzeProgress1);
  float finalNoise2 = mix(redNoise2, greenNoise2, vAnalyzeProgress2);
  float finalBlackNoise = texture2D(uNoiseTxt, fakeWorldUv2 * uNoiseBlackScale).r;

  vNoiseIntensity = (finalNoise1 * 0.8 + finalNoise2 * 0.2);
  vNoiseIntensity2 = finalNoise1;
  vNoiseIntensity3 = finalNoise2;
  vNoiseIntensity4 = finalBlackNoise;

  translate.xyz *= 
    1.0 
    + finalNoise1 * progress * 0.02 * uNoiseGreenDisplacementFactor
    + finalNoise2 * progress * 0.04 * uNoiseRedDisplacementFactor
    + finalBlackNoise * progress * 0.1 * uNoiseBlackDisplacementFactor
    + fakeNoise * progress * 0.1;
    ;

  vec4 mvPosition = modelViewMatrix * instanceMatrix * vec4(translate, 1.0);

  vFadeColor = length(vec2(0.0) - mvPosition.xy);
  vFadeColor = smoothstep(0.46, 0.49, vFadeColor);
  vFadeColor = mix(1.0, vFadeColor, progress);

  vFinalPosition = translate.xyz;

  vec3 newPosition = mix(position, position * uSizeFactor, progress);

  newPosition = mix(newPosition, newPosition * (0.5 + vNoiseIntensity * 1.8 + vNoiseIntensity4 * 0.4), progress);

  float scaleZ = smoothstep(-0.08, 0.03, newPosition.z);
  newPosition *= mix(1.0, scaleZ, progress);

  vec3 screenPos = newPosition;
  screenPos = screenPos + 2.0 * cross(uCameraQuaterion.xyz, cross(uCameraQuaterion.xyz, screenPos) + uCameraQuaterion.w * screenPos);

  mvPosition.xyz += screenPos;
  gl_Position = projectionMatrix * mvPosition;
}