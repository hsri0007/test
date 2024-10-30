'use client';

/* eslint-disable react-hooks/exhaustive-deps */
import { useTexture } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { gsap } from 'gsap';
import React, { useEffect, useRef, useState } from 'react';
import { LinearMipmapLinearFilter, MathUtils } from 'three';

import { useResponsiveValue } from '~/hooks';
import distanceFromCamera from '~/utils/three/distanceFromCamera';

import Blob from './Blob';
import Plane from './Plane';
import config from './config.yml';

const updateTexture = (v: any) => {
  v.generateMipmaps = true;
  v.minFilter = LinearMipmapLinearFilter;
  v.needsUpdate = true;
};

const SIZE = 9.5; // WORLD WIDTH OF THE ANSWER IMMEDIATELY // used as boundary for responsiveness

export default function Hero() {
  const aBlobRef = useRef<any>();
  const iBlobRef = useRef<any>();

  const aPlaneRef = useRef<any>();
  const iPlaneRef = useRef<any>();

  const artificialRef = useRef<any>();
  const intelligenceRef = useRef<any>();
  const answerRef = useRef<any>();
  const immediatelyRef = useRef<any>();

  const taglineRef = useRef<any>(null);
  const poweredRef = useRef<any>(null);

  const [isAnimationEnded, setIsAnimationEnded] = useState(false);

  const artificialTexture = useTexture('/assets/textures/ai/artificial.webp', updateTexture);
  const intelligenceTexture = useTexture('/assets/textures/ai/intelligence.webp', updateTexture);
  const answerTexture = useTexture('/assets/textures/ai/answer.webp', updateTexture);
  const immediatelyTexture = useTexture('/assets/textures/ai/immediately.webp', updateTexture);
  const aTexture = useTexture('/assets/textures/ai/letter-a.png', updateTexture);
  const iTexture = useTexture('/assets/textures/ai/letter-i.png', updateTexture);
  const poweredTexture = useTexture('/assets/textures/ai/powered_by_exoai.png', updateTexture);

  const shiftXBlobA = -0.225 + 0.08;
  const shiftXBlobI = 0.225 + 0.08;

  const { camera } = useThree();

  useEffect(() => {
    /**
     *  ALL THE TIMELINES FOR THE CHOREOGRAPHY
     */
    const createZoomInTl = () => {
      const tl = gsap.timeline();
      const duration = 1.6;
      const ease = 'power2.inOut';

      tl
        //
        .to(aPlaneRef.current.scale, { duration, x: 1, y: 1, z: 1, ease }, 0)
        .to(aPlaneRef.current.position, { duration, x: shiftXBlobA, y: 0, z: 0, ease }, 0)
        .to(iPlaneRef.current.scale, { duration, x: 1, y: 1, z: 1, ease }, 0)
        .to(iPlaneRef.current.position, { duration, x: shiftXBlobI, y: 0, z: 0, ease }, 0)
        .set([aPlaneRef.current, iPlaneRef.current], { visible: false });

      return tl;
    };

    const createZoomOutTl = () => {
      const tl = gsap.timeline();
      const duration = 1.6;
      const ease = 'power2.inOut';
      const aRef = aPlaneRef.current;
      const iRef = iPlaneRef.current;
      const tag = taglineRef.current;

      const finalPosA = [
        data.a.end.position[0] + data.a.end.shift[0],
        data.a.end.position[1] + data.a.end.shift[1],
        data.depth,
      ];
      const finalScaleA = data.scale * data.a.scale;

      const finalPosI = [
        data.i.end.position[0] + data.i.end.shift[0],
        data.i.end.position[1] + data.i.end.shift[1],
        data.depth,
      ];
      const finalScaleI = data.scale * data.i.scale;

      tl
        //
        .set([aRef, iRef], { visible: true })
        .to(aRef.position, { duration, x: finalPosA[0], y: finalPosA[1], z: finalPosA[2], ease }, 0)
        .to(aRef.scale, { duration, x: finalScaleA, y: finalScaleA, z: 1, ease }, 0)

        .to(iRef.position, { duration, x: finalPosI[0], y: finalPosI[1], z: finalPosI[2], ease }, 0)
        .to(iRef.scale, { duration, x: finalScaleI, y: finalScaleI, z: 1, ease }, 0);

      return tl;
    };

    const createFadeInTl = (arr = [] as any[]) => {
      const tl = gsap.timeline();

      arr.forEach((el: any) => {
        const { uniforms } = el.current.material;
        tl
          //
          .from(uniforms.uBlur, { duration: 1, value: 6, ease: 'power2.in' }, 0)
          .from(uniforms.uAlpha, { duration: 1, value: 0, ease: 'power2.inOut' }, 0.5);
      });

      tl.timeScale(0.9);

      return tl;
    };

    const createFadeOutTl = (arr = [] as any[]) => {
      const tl = gsap.timeline();

      arr.forEach((el: any) => {
        const { uniforms } = el.current.material;
        tl.to(uniforms.uBlur, { duration: 1, value: 6, ease: 'power2.in' }, 0).to(
          uniforms.uAlpha,
          { duration: 0.8, value: 0, ease: 'power2.in' },
          0.1
        );
      });

      tl.timeScale(0.9);

      return tl;
    };

    const powerTL = () => {
      const tl = gsap.timeline();
      const { uniforms } = poweredRef.current.material;
      tl.set(uniforms.uBlur, { value: 6 })
        .set(uniforms.uAlpha, { value: 0 })
        .set(poweredRef.current, { visible: true })
        .to(uniforms.uBlur, { duration: 0.8, value: 0, ease: 'power2.in' }, 0)
        .to(uniforms.uAlpha, { duration: 0.8, value: 1, ease: 'power2.in' }, 0.1);

      return tl;
    };

    const onComplete = () => {
      setIsAnimationEnded(true);
    };

    const tl = gsap.timeline({ delay: 0, onComplete });
    const aTl = aBlobRef.current.createTimeline();
    const iTl = iBlobRef.current.createTimeline();
    const introFadeInTl = createFadeInTl([artificialRef, intelligenceRef, aPlaneRef, iPlaneRef]);
    const introFadeOutTl = createFadeOutTl([artificialRef, intelligenceRef]);
    const outroFadeInTl = createFadeInTl([answerRef, immediatelyRef]);
    const zoomInTl = createZoomInTl();
    const zoomOutTl = createZoomOutTl();
    const powered = powerTL();

    tl.addLabel('intro:start')
      .set(
        [artificialRef.current, intelligenceRef.current, aPlaneRef.current, iPlaneRef.current],
        { visible: true },
        'intro:start'
      )
      .add(introFadeInTl, 'intro:start')
      .addLabel('intro:end')
      .add(introFadeOutTl, 'intro:end')
      .add(zoomInTl, 'intro:end')
      .set([artificialRef.current, intelligenceRef.current, poweredRef.current], { visible: false })
      .addLabel('blob:start')
      .add(aTl, 'blob:start')
      .add(iTl, 'blob:start')
      .set([answerRef.current, immediatelyRef.current], { visible: true })
      .addLabel('outro:start')
      .add(outroFadeInTl, 'outro:start')
      .add(zoomOutTl, 'outro:start')
      .add(powered, 'power -=1');

    return () => {
      tl?.kill();
      aTl?.kill();
      iTl?.kill();
      zoomInTl?.kill();
      zoomOutTl?.kill();
      powered?.kill();
    };
  }, []);

  const data = useResponsiveValue(config as any);
  data.depth =
    MathUtils.clamp(distanceFromCamera(SIZE, camera as THREE.PerspectiveCamera).distance, 15, 100) *
    -1;

  return (
    <>
      {/* LETTER-A */}
      <Plane
        isBigLetter={true}
        ref={aPlaneRef}
        data={data.a}
        texture={aTexture}
        scale={data.scale * data.a.scale}
        depth={data.depth}
        isAnimationEnded={isAnimationEnded}
      />

      {/* LETTER-I */}
      <Plane
        isBigLetter={true}
        ref={iPlaneRef}
        data={data.i}
        texture={iTexture}
        scale={data.scale * data.i.scale}
        depth={data.depth}
        isAnimationEnded={isAnimationEnded}
      />

      {/* WORD-ARTIFICIAL*/}
      <Plane
        ref={artificialRef}
        data={data.artificial}
        texture={artificialTexture}
        scale={data.scale}
        depth={data.depth}
        isAnimationEnded={isAnimationEnded}
      />

      {/* WORD-INTELLIGENCE*/}
      <Plane
        ref={intelligenceRef}
        data={data.intelligence}
        texture={intelligenceTexture}
        scale={data.scale}
        depth={data.depth}
        isAnimationEnded={isAnimationEnded}
      />

      {/* WORD-ANSWERS*/}
      <Plane
        ref={answerRef}
        data={data.answer}
        texture={answerTexture}
        scale={data.scale}
        depth={data.depth}
        isAnimationEnded={isAnimationEnded}
      />

      {/* WORD-IMMEDIATELY*/}
      <Plane
        ref={immediatelyRef}
        data={data.immediately}
        texture={immediatelyTexture}
        scale={data.scale}
        depth={data.depth}
        isAnimationEnded={isAnimationEnded}
      />

      {/* AI TAGLINE */}
      <Plane
        ref={poweredRef}
        data={data.powered}
        texture={poweredTexture}
        scale={data.scale * 0.3}
        depth={data.depth}
        isAnimationEnded={isAnimationEnded}
      />

      {/* BLOBS */}
      <Blob type="a" spin={1} direction={shiftXBlobA} ref={aBlobRef} />
      <Blob type="i" spin={-1} direction={shiftXBlobI} ref={iBlobRef} />
    </>
  );
}
