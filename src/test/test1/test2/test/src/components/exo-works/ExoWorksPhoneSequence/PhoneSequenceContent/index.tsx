'use client';

import { gsap } from 'gsap';
import { marked } from 'marked';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { text } from 'stream/consumers';
import { Group, LinearSRGBColorSpace, Mesh, Texture } from 'three';
import { degToRad } from 'three/src/math/MathUtils';

import { PhoneCanvas } from '~/components/3d/PhoneCanvas';
import { PhoneModel2, changePhone2Texture } from '~/components/3d/PhoneCanvas/PhoneModel2';
import { Corner } from '~/components/svgs';
import { useIsLandscape, useLoadContent } from '~/hooks';
import { cx } from '~/utils';

import { PhoneSequenceSteps } from '../index';
import styles from './PhoneSequenceContent.module.scss';

type PhoneSequenceContentProps = {
  steps: PhoneSequenceSteps[];
};

enum StepImageType {
  Phone = 'Phone',
  Laptop = 'Laptop',
}

const PhoneSequenceContent = ({ steps }: PhoneSequenceContentProps) => {
  // These should be removed as they should be part of the steps objects in the CMS
  const hardcodedStepTypes = [
    StepImageType.Phone,
    StepImageType.Phone,
    StepImageType.Phone,
    StepImageType.Phone,
    StepImageType.Laptop,
    StepImageType.Phone,
  ];

  const groupPos: [number, number, number] = [0.275, -1, 10];
  const groupRot: [number, number, number] = [0, 0, 0];
  const modelScale = 3.75;
  const visible = true;

  const containerRef = useRef<HTMLDivElement | null>(null);

  const texturePaths = steps
    .filter((item) => item?.asset?.url !== null && item?.asset?.contentType !== null)
    .map((item) => ({
      path: item.asset!.url,
      contentType: item.asset!.contentType,
    })) as { path: string; contentType: string }[];

  const textures = useLoadContent(texturePaths);

  useEffect(() => {
    textures.forEach((texture, i) => {
      texture.colorSpace = LinearSRGBColorSpace;
      texture.flipY = false;
      texture.repeat.set(1.109, 1.06);
      texture.offset.set(-0.048, -0.03);
      if (i === 0 || i === 1) {
        texture.repeat.set(1.109, 1.05);
        texture.offset.set(-0.048, -0.021);
      }
    });
  }, [textures]);

  const phone0 = {
    groupRef: useRef<Group | null>(null),
    modelRef: useRef<Group | null>(null),
    screenRef: useRef<Mesh | null>(null),
    isLoaded: useState(false),
    changeTexture: function (texture: Texture) {
      changePhone2Texture(texture, this.screenRef);
    },
  };

  const phone1 = {
    groupRef: useRef<Group | null>(null),
    modelRef: useRef<Group | null>(null),
    screenRef: useRef<Mesh | null>(null),
    isLoaded: useState(false),
    changeTexture: function (texture: Texture) {
      changePhone2Texture(texture, this.screenRef);
    },
  };

  function onPhone0Load(
    groupRef: React.RefObject<Group>,
    modelRef: React.RefObject<Group>,
    screenRef: React.RefObject<Mesh>
  ) {
    phone0.screenRef.current = screenRef.current;
    phone0.modelRef.current = modelRef.current;
    phone0.groupRef.current = groupRef.current;
    phone0.isLoaded[1](true);
    phone0.changeTexture(textures[0]);
  }

  function onPhone1Load(
    groupRef: React.RefObject<Group>,
    modelRef: React.RefObject<Group>,
    screenRef: React.RefObject<Mesh>
  ) {
    phone1.screenRef.current = screenRef.current;
    phone1.modelRef.current = modelRef.current;
    phone1.groupRef.current = groupRef.current;
    phone1.isLoaded[1](true);
    phone1.changeTexture(textures[1]);
  }

  // bulk of the scroll animations
  useLayoutEffect(() => {
    if (!phone0.isLoaded[0] || !phone1.isLoaded[0] || !steps) return;
    const mm = gsap.matchMedia();
    mm.add(
      {
        isDesktop: '(orientation: landscape)',
        isMobile: '(orientation: portrait)',
        isLg: '(min-width: 1200px)',
      },
      (ctx: any) => {
        const { isDesktop, isLg } = ctx.conditions;

        const numbers = gsap.utils.toArray('.js__number');
        const copyContainers = gsap.utils.toArray('.js__copyContainer');
        const stepImages = gsap.utils.toArray('.js__stepImage');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            // markers: true,
            scrub: true,
            start: '5% 100%',
            end: '100% 15%',
            // snap: {
            //   snapTo: 'labelsDirectional',
            //   duration: { min: 0.25, max: 0.5 },
            //   delay: 0,
            //   ease: 'power1.out',
            // },
          },
        });

        const posX = isDesktop ? (isLg ? groupPos[0] : groupPos[0] - 0.075) : 0;
        tl.set(
          [phone0.groupRef.current?.position, phone1.groupRef.current?.position],
          { x: posX },
          0
        );
        const scale = isDesktop ? modelScale : modelScale * 0.47;
        tl.set(
          [phone0.modelRef.current?.scale, phone1.modelRef.current?.scale],
          { x: scale, y: scale, z: scale },
          0
        );

        // DOM animations between snaps
        function enterTo(index: number) {
          tl.fromTo(
            [numbers[index], copyContainers[index]],
            { y: '100%' },
            {
              y: 0,
              duration: 0.5,
              ease: 'power1.inOut',
            },
            '<'
          );
        }

        function enterPhone(phone: any, newTexture: Texture, oldTexture: Texture | null) {
          tl.fromTo(
            phone.groupRef.current.position,
            { y: -1 },
            {
              immediateRender: false,
              y: isDesktop ? -0.035 : -0.175,
              duration: 0.5,
              ease: 'power1.inOut',
              onStart: () => {
                phone.changeTexture(newTexture);
              },
              onReverseComplete: () => {
                if (oldTexture) {
                  phone.changeTexture(oldTexture);
                }
              },
            },
            '<'
          );

          tl.fromTo(
            phone.groupRef.current.rotation,
            { y: -degToRad(67.5) },
            {
              y: degToRad(0),
              duration: 0.5,
              immediateRender: false,
              ease: 'power1.inOut',
            },
            '<'
          );
        }

        function enterLaptop(laptop: any) {
          tl.fromTo(laptop, { y: '100vh' }, { y: '0', duration: 0.5, ease: 'power1.inOut' }, '<');
        }

        function exitTo(i: number) {
          tl.to([numbers[i], copyContainers[i]], {
            y: '-100%',
            duration: 0.5,
            ease: 'power1.inOut',
          });
        }

        function exitPhone(phone: any) {
          tl.to(
            phone.groupRef.current.position,
            {
              y: 1,
              duration: 0.5,
              ease: 'power1.inOut',
            },
            '<'
          );
          tl.to(
            phone.groupRef.current.rotation,
            {
              y: degToRad(45),
              duration: 0.5,
              ease: 'power1.inOut',
            },
            '<'
          );
        }

        function exitLaptop(laptop: any) {
          tl.to(laptop, { y: '-100vh', duration: 0.5, ease: 'power1.inOut' }, '<');
        }

        const delayBetweenPhones = 0.1;

        const phoneTextures: Array<Texture> = new Array();
        steps.forEach((item, index) => {
          const stepImageType = hardcodedStepTypes[index];
          if (stepImageType == StepImageType.Phone) phoneTextures.push(textures[index]);
        });

        const phoneModels = [phone0, phone1];
        let phoneIndex = 0;
        steps.forEach((item, index) => {
          const stepImageType = hardcodedStepTypes[index];
          enterTo(index);

          switch (stepImageType) {
            case StepImageType.Phone:
              const phoneModulo = phoneIndex % 2;
              enterPhone(
                phoneModels[phoneModulo],
                phoneTextures[phoneIndex],
                phoneTextures[phoneIndex - 2]
              );
              tl.to({ pause: 0 }, { pause: 1, ease: 'linear', duration: delayBetweenPhones });
              exitTo(index);
              exitPhone(phoneModels[phoneModulo]);
              phoneIndex++;
              break;
            case StepImageType.Laptop:
              enterLaptop(stepImages[index]);
              tl.to({ pause: 0 }, { pause: 1, ease: 'linear', duration: delayBetweenPhones });
              exitTo(index);
              exitLaptop(stepImages[index]);
              break;
          }
        });
      },
      containerRef
    );

    return () => {
      mm.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phone0.groupRef, phone0.isLoaded, phone1.groupRef, phone1.isLoaded, steps, textures]);

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.grid}>
        <div className={styles.leftColumn}>
          <div className={styles.numberWrapper}>
            <div className={styles.numberArea}>
              {steps.map((item, index) => (
                <div key={index} className={cx(styles.numberContainer, 'js__number')} aria-hidden>
                  <div className={styles.number}>{index + 1}</div>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.bottomSection}>
            <Corner className={styles.corner} />
            <div className={styles.copyWrapper}>
              {steps.map((step, index) => (
                <div key={index} className={cx(styles.copyContainer, 'js__copyContainer')}>
                  <h3 className={styles.heading}>{step.heading}</h3>
                  <p className={styles.copy}>{step.bodyCopy}</p>
                  {step.subCopy && (
                    <span
                      className={styles.subCopy}
                      dangerouslySetInnerHTML={{
                        __html: marked.parse(step.subCopy, {
                          mangle: false,
                          headerIds: false,
                          breaks: true,
                        }),
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.rightColumn}>
          {steps.map((item, index) => (
            <div
              key={index}
              data-step-type={hardcodedStepTypes[index]}
              className={cx(styles.imageContainer, 'js__stepImage')}
            >
              <img
                src={steps[index].asset?.url}
                alt={steps[index].asset?.description}
                width={steps[index].asset?.width}
                height={steps[index].asset?.height}
                loading="lazy"
              />
            </div>
          ))}
        </div>
        <PhoneCanvas className={styles.phoneCanvas}>
          <PhoneModel2
            groupPos={groupPos}
            groupRot={groupRot}
            visible={visible}
            modelScale={modelScale}
            onLoadFn={onPhone0Load}
          />
          <PhoneModel2
            groupPos={groupPos}
            groupRot={groupRot}
            visible={visible}
            modelScale={modelScale}
            onLoadFn={onPhone1Load}
          />
        </PhoneCanvas>
      </div>
    </div>
  );
};

export default PhoneSequenceContent;
