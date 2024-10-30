'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Group, LinearSRGBColorSpace, Mesh, Texture } from 'three';
import { degToRad } from 'three/src/math/MathUtils';

import { AiContentFragment, AssetFragment } from '~/cms';
import { PhoneCanvas } from '~/components/3d/PhoneCanvas';
import { PhoneModel2, changePhone2Texture } from '~/components/3d/PhoneCanvas/PhoneModel2';
import { CMSImage, Section, Video } from '~/components/ui';
import { useIsLandscape, useLoadContent } from '~/hooks';
import { cx } from '~/utils';

import { ScanLarge } from './ScanLarge';
import styles from './Scans.module.scss';

const setVideoAttributesOnTexture = (videoElement: HTMLVideoElement) => {
  videoElement.setAttribute('playsinline', 'playsinline');
  videoElement.loop = true;
  videoElement.muted = true;
  videoElement.autoplay = true;
};

gsap.registerPlugin(ScrollTrigger);

enum StepImageType {
  Phone = 'Phone',
  Laptop = 'Laptop',
}

export interface ScansContentProps {
  items: {
    image: AssetFragment | null;
    heading: string | null;
    clearance: string | null;
    copy: string | null;
  }[];
  phoneImages: AiContentFragment['aiPhoneImagesCollection'];
}

// ["textures[1]"].source.data

export default function ScansContent(props: ScansContentProps) {
  const { items, phoneImages } = props;
  const [containerClipped, setContainerClipped] = useState(true);
  const videoTextureRefs = useRef<{ [key: string]: HTMLVideoElement }>({});
  const videoTextureCurrentTimeRefs = useRef<{ [key: string]: number }>({});
  const containerClippedRef = useRef(true);
  const [formattedTextures, setFormattedTextures] = useState<Texture[]>([]);

  // These should be removed as they should be part of the steps objects in the CMS
  const hardcodedStepTypes = [
    StepImageType.Phone,
    StepImageType.Phone,
    StepImageType.Phone,
    StepImageType.Phone,
    StepImageType.Laptop,
  ];

  const isLandscape = useIsLandscape();

  const texturePaths = phoneImages?.items
    .filter((item) => item?.url !== null && item?.contentType !== null)
    .map((item) => ({
      path: item.url,
      contentType: item.contentType,
    })) as { path: string; contentType: string }[];

  const textures = useLoadContent(texturePaths);

  const setCurrentVideoTime = useCallback(() => {
    formattedTextures.forEach((texture, i) => {
      if (texture.source.data?.nodeName === 'VIDEO') {
        if (texture.source.data.currentTime < 0.1) return;
        videoTextureCurrentTimeRefs.current[texture.source.data.src] =
          texture.source.data.currentTime;
      }
    });
  }, [formattedTextures]);

  useEffect(() => {
    containerClippedRef.current = containerClipped;
  }, [containerClipped]);

  useEffect(() => {
    if (formattedTextures.length || !textures.length) return;
    textures.forEach((texture, i) => {
      texture.colorSpace = LinearSRGBColorSpace;
      texture.flipY = false;
      texture.repeat.set(1.109, 1.06);
      texture.offset.set(-0.048, -0.03);

      if (texture.source.data?.nodeName === 'VIDEO') {
        videoTextureRefs.current[texture.uuid] = texture.source.data;
        setVideoAttributesOnTexture(texture.source.data);
      }
    });
    setFormattedTextures(textures);
  }, [textures, formattedTextures]);

  // group X position is really deteremined later in the getPhone() function
  const groupPos: [number, number, number] = [0.4, -1, 10];
  const groupRot: [number, number, number] = [0, 0, 0];
  const modelScale = isLandscape ? 3.75 : 3;
  const visible = true;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLDivElement | null>(null);

  const playVideos = () => {
    Object.values(videoTextureRefs.current).forEach((video, i) => {
      setVideoAttributesOnTexture(video);
      video.currentTime = videoTextureCurrentTimeRefs.current[video.src] || 0;
      video.play();
    });
  };

  const phone0 = {
    groupRef: useRef<Group | null>(null),
    modelRef: useRef<Group | null>(null),
    screenRef: useRef<Mesh | null>(null),
    isLoaded: useState(false),
    changeTexture: function (texture: Texture) {
      setCurrentVideoTime();
      changePhone2Texture(texture, this.screenRef);
      playVideos();
    },
  };

  const phone1 = {
    groupRef: useRef<Group | null>(null),
    modelRef: useRef<Group | null>(null),
    screenRef: useRef<Mesh | null>(null),
    isLoaded: useState(false),
    changeTexture: function (texture: Texture) {
      setCurrentVideoTime();
      changePhone2Texture(texture, this.screenRef);
      playVideos();
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
    phone0.changeTexture(formattedTextures[0]);
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
    phone1.changeTexture(formattedTextures[1]);
  }

  function getPhoneX() {
    let desktopX = 0.4;

    let isDesktop = false;
    if (canvasRef.current) {
      isDesktop = canvasRef.current?.offsetWidth > canvasRef.current?.offsetHeight;
      const ratio = canvasRef.current?.offsetWidth / canvasRef.current?.offsetHeight;
      if (ratio > 1.8) {
        desktopX = 0.46;
      }
    }
    const posX = isDesktop ? desktopX : 0;
    return posX;
  }

  // bulk of the scroll animations
  useLayoutEffect(() => {
    if (!phone0.isLoaded[0] || !phone1.isLoaded[0] || !items || !phoneImages) return;
    const mm = gsap.matchMedia();
    mm.add(
      { isDesktop: '(orientation: landscape)', isMobile: '(orientation: portrait)' },
      (ctx: any) => {
        const { isDesktop } = ctx.conditions;
        const ease = isDesktop ? 'power1.inOut' : 'linear';

        const stepImages = gsap.utils.toArray('.js__stepImage');
        const delayBetweenSlides = isDesktop ? 1.46 : 1.1;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            // markers: true,
            scrub: true,
            start: '0% 100%',
            end: '100% 0%',
            onUpdate: (e: any) => {
              if (e.progress > 0.5 && containerClippedRef.current === true) {
                setContainerClipped(false);
              } else if (e.progress <= 0.5 && containerClippedRef.current === false) {
                setContainerClipped(true);
              }
            },
          },
        });

        resizeHandler();

        tl.set(
          [phone0.modelRef.current?.scale, phone1.modelRef.current?.scale],
          { x: modelScale, y: modelScale, z: modelScale },
          0
        );

        // DOM animations between snaps
        function enterPhone(
          phone: any,
          newTexture: Texture,
          oldTexture: Texture | null,
          index: number
        ) {
          // if (!isDesktop) {
          //   tl.to({ pause: 0 }, { pause: 1, ease: 'linear', duration: 0.5 }, '<');
          // }
          tl.fromTo(
            phone.groupRef.current.position,
            { y: -1 },
            {
              immediateRender: false,
              y: isDesktop ? -0.065 : 0.05,
              duration: 0.9,
              ease,
              onStart: () => {
                if (oldTexture && oldTexture.source.data.src !== newTexture.source.data.src) {
                  phone.changeTexture(newTexture);
                }
              },
              onReverseComplete: () => {
                if (oldTexture && oldTexture.source.data.src !== newTexture.source.data.src) {
                  phone.changeTexture(oldTexture);
                }
              },
            },
            '<+=0.1'
          );

          tl.fromTo(
            phone.groupRef.current.rotation,
            { y: -degToRad(67.5) },
            {
              y: degToRad(0),
              duration: 1,
              immediateRender: false,
              ease,
            },
            '<'
          );
        }

        function enterLaptop(laptop: any) {
          tl.fromTo(laptop, { y: '100vh' }, { y: '0', duration: 1, ease }, '<');
          if (isDesktop) {
            tl.fromTo(
              laptop,
              { x: '5%' },
              { x: '33%', duration: delayBetweenSlides - 1, ease: 'power1.inOut' },
              '<+=1'
            );
          }
        }

        function exitPhone(phone: any) {
          tl.to(phone.groupRef.current.position, {
            y: 1,
            duration: 1,
            ease,
          });
          tl.to(
            phone.groupRef.current.rotation,
            {
              y: degToRad(45),
              duration: 1,
              ease,
            },
            '<'
          );
        }

        function exitLaptop(laptop: any) {
          tl.to(laptop, { y: '-100vh', duration: 1, ease });
          tl.to(
            { test: 0 },
            {
              test: 1,
              ease: 'linear',
              duration: 1,
            },
            '<'
          );
        }

        const phoneTextures: Array<Texture> = new Array();
        phoneImages?.items.forEach((item, index) => {
          const stepImageType = hardcodedStepTypes[index];
          if (stepImageType == StepImageType.Phone) phoneTextures.push(formattedTextures[index]);
        });

        const phoneModels = [phone0, phone1];
        let phoneIndex = 0;
        phoneImages?.items.forEach((item, index) => {
          const stepImageType = hardcodedStepTypes[index];

          if (isDesktop) {
            tl.to({ pause: 0 }, { pause: 1, ease: 'linear', duration: delayBetweenSlides }, '<');
          }

          switch (stepImageType) {
            case StepImageType.Phone:
              const phoneModulo = phoneIndex % 2;

              enterPhone(
                phoneModels[phoneModulo],
                phoneTextures[phoneIndex],
                phoneTextures[phoneIndex - 2],
                index
              );
              exitPhone(phoneModels[phoneModulo]);
              phoneIndex++;
              break;
            case StepImageType.Laptop:
              enterLaptop(stepImages[index]);
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
  }, [
    phone0.groupRef,
    phone0.isLoaded,
    phone1.groupRef,
    phone1.isLoaded,
    items,
    formattedTextures,
  ]);

  function resizeHandler() {
    const x = getPhoneX();
    if (phone0.groupRef.current) phone0.groupRef.current.position.x = x;
    if (phone1.groupRef.current) phone1.groupRef.current.position.x = x;
  }

  function mount() {
    window.addEventListener('resize', resizeHandler);
    resizeHandler();
    return unmount;
  }

  function unmount() {
    window.removeEventListener('resize', resizeHandler);
  }

  useEffect(
    mount,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  console.log({
    items,
    phoneImages,
  });

  return (
    <Section
      className={cx(styles.container, containerClipped && styles['container--clipped'])}
      ref={containerRef}
    >
      <div className={styles.slidesContainer}>
        {items.map((item, index) => (
          <ScanLarge
            key={index}
            // index={index}
            image={item.image}
            heading={item.heading}
            clearance={item.clearance}
            copy={item.copy}
            // texture={last ? null : textures[index]}
            // prevTexture={index > 0 ? textures[index - 1] : null}
            phoneImage={index === items.length - 1 ? phoneImages?.items[index] : null}
            videoAltText={phoneImages?.items[index]?.description}
          />
        ))}
      </div>
      <div className={styles.canvasWrapper}>
        <div className={styles.canvasSticky} ref={canvasRef}>
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
          <div className={styles.stepImages}>
            {phoneImages?.items.map((phoneImage, index) => {
              return (
                <div
                  key={index}
                  data-step-type={hardcodedStepTypes[index]}
                  className={cx(styles.imageContainer, 'js__stepImage')}
                >
                  {phoneImage?.contentType?.includes('video') && phoneImage.url ? (
                    <Video
                      altText={phoneImage?.description}
                      url={phoneImage.url}
                      isBackgroundVideo
                      className={styles.videoElement}
                    />
                  ) : (
                    <CMSImage asset={phoneImage} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}
