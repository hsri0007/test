varying float vNoiseIntensity;
varying float vNoiseIntensity2;
varying float vNoiseIntensity3;
varying float vNoiseIntensity4;
varying float vFadeColor;
varying float vProgress;
varying float vColorshift;
varying float vAnalyzeProgress1;
varying float vAnalyzeProgress2;

varying vec2 vUv;
varying vec2 vGridPos;

uniform bool uIsRedChannel;
uniform float uSmoothCircle;
uniform vec2 uGridSize;
uniform vec3 uColor;
uniform vec3 uColorGreen;
uniform vec3 uColorRed;
uniform sampler2D uTxt;

void main(){  
  // DIFFUSE IMAGE
  vec2 nUv = vUv;
  nUv *= (vec2(1.0) / uGridSize);
  nUv += vGridPos;
  vec4 t = texture2D(uTxt, nUv);
  float ta = uIsRedChannel ? t.r : t.g;

  // SPHERE
  float d = distance(vUv, vec2(0.5));
  d = smoothstep(uSmoothCircle, 0.5, d);
  d = pow(d, 0.9);
  float pa = 1.0 - d;

  // FINAL
  vec3 finalPlane = uColor;

  vec3 finalSphere = mix(uColor + vColorshift, uColor + vColorshift * 2.0, vNoiseIntensity4);
  vec3 highlightColor1 = mix(uColorRed + vColorshift, uColorGreen + vColorshift, vAnalyzeProgress1);
  vec3 highlightColor2 = mix(uColorRed + vColorshift, uColorGreen + vColorshift, vAnalyzeProgress2);

  finalSphere = mix(finalSphere, highlightColor1, smoothstep(0.3, 0.9, vNoiseIntensity2));
  finalSphere = mix(finalSphere, highlightColor2, smoothstep(0.3, 0.9, vNoiseIntensity3));

  vec3 final = mix(finalPlane, finalSphere, vProgress);

  float a = mix(ta, ta * pa, vProgress);
  float remapA = smoothstep(0.6, 1.0, vProgress);
  a = mix(a, pa * (0.4 + vFadeColor * 0.6 + vNoiseIntensity3), remapA);

  if(a < 0.05) discard;

  gl_FragColor = vec4(final.rgb, a);

  #include <colorspace_fragment>
}