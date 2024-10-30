/* eslint-disable react-hooks/exhaustive-deps */
import React, { useLayoutEffect } from 'react';

const glsl = (x: any) => x;

interface FadeMaterial extends THREE.MeshStandardMaterial {
  isBottomFaded?: {
    value: boolean;
  };
  uniforms: object;
}

export default function useMaterialFade(material: FadeMaterial, isBottomFaded: boolean = false) {
  useLayoutEffect(function onMount() {
    material.transparent = true;
    material.isBottomFaded = { value: isBottomFaded };

    material.onBeforeCompile = (shader) => {
      material?.isBottomFaded && (shader.uniforms.uIsBottomFaded = material.isBottomFaded);
      material.uniforms = shader.uniforms;

      // VERTEX
      shader.vertexShader = shader.vertexShader.replace(
        `#include <common>`,
        glsl`
             #include <common>
             uniform float uIsBottomFaded;
             varying float vAlphaMask;
            `
      );

      shader.vertexShader = shader.vertexShader.replace(
        `#include <uv_vertex>`,
        glsl`
            #include <uv_vertex>
            vAlphaMask = mix(1.0, smoothstep(-0.065, -0.020, position.x), uIsBottomFaded);
            vAlphaMask = pow(vAlphaMask, 2.0);
        `
      );

      // FRAGMENT
      shader.fragmentShader = shader.fragmentShader.replace(
        `#include <common>`,
        glsl`
            #include <common>
            varying float vAlphaMask;
        `
      );

      shader.fragmentShader = shader.fragmentShader.replace(
        `#include <opaque_fragment>`,
        glsl`
            #include <opaque_fragment>
            gl_FragColor.a = vAlphaMask;
        `
      );

      shader.fragmentShader = shader.fragmentShader.replace(
        `vec3 totalEmissiveRadiance = emissive;`,
        glsl`vec3 totalEmissiveRadiance = mix(vec3(1.0, 1.0, 1.0), emissive, vAlphaMask);
        `
      );
    };

    material.needsUpdate = true;
  }, []);
}
