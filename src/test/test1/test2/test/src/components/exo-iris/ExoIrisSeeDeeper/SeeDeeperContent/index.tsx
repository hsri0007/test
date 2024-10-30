'use client';

import gsap from 'gsap';
import { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Group, LinearSRGBColorSpace, Mesh, MeshBasicMaterial, Texture } from 'three';
import { degToRad } from 'three/src/math/MathUtils';

import { ExoIrisContentFragment } from '~/cms';
import { PhoneCanvas } from '~/components/3d/PhoneCanvas';
import {
  PhoneModel3,
  pausePhone2Texture,
  playPhone2Texture,
} from '~/components/3d/PhoneCanvas/PhoneModel3';
import { ArrowLink } from '~/components/ui';
import PhoneCarousel from '~/components/ui/PhoneCarousel';
import VideoAltText from '~/components/ui/VideoAltText';
import { useLoadContent } from '~/hooks';
import { cx, externalToIsExternal } from '~/utils';

import { PhoneModel2, changePhone2Texture } from '../../../3d/PhoneCanvas/PhoneModel2';
import { SeeDeeperSvg } from '../SeeDeeperSvg/';
import styles from './SeeDeeperContent.module.scss';

type phoneScreens = 'seeDeeper' | 'seeWider' | 'seeBetter' | 'madeSimple';

interface SeeDeeperContentProps {
  madeSimpleImage: ExoIrisContentFragment['madeSimpleImage'];
  madeSimpleHeading: ExoIrisContentFragment['madeSimpleHeading'];
  madeSimpleCopy: ExoIrisContentFragment['madeSimpleCopy'];
  madeSimpleCta: ExoIrisContentFragment['madeSimpleCta'];
  seeImages: ExoIrisContentFragment['seeImagesCollection'];
  seeDeeperPhoneCarouselCollection: ExoIrisContentFragment['seeDeeperPhoneCarouselCollection'];
  seeHeadings: [
    ExoIrisContentFragment['seeHeading1'],
    ExoIrisContentFragment['seeHeading2'],
    ExoIrisContentFragment['seeHeading3']
  ];
  seeStats: ExoIrisContentFragment['seeStatsCollection'];
}

export default function SeeDeeperContent(props: SeeDeeperContentProps) {
  const {
    madeSimpleImage,
    madeSimpleHeading,
    madeSimpleCopy,
    madeSimpleCta,
    seeImages,
    seeHeadings,
    seeStats,
    seeDeeperPhoneCarouselCollection,
  } = props;

  const headingsSrOnly = `${seeHeadings
    .map((text, index) => (index === 0 ? text : text?.toLowerCase()))
    .join(', ')}.`;

  const containerRef = useRef<HTMLDivElement>(null);
  const copyContainerRef = useRef<HTMLDivElement>(null);
  const activePhoneScreen = useRef<phoneScreens>('seeDeeper');
  const phoneScreenMaterialRef = useRef<MeshBasicMaterial | null>();

  const handleScreenMaterial = useCallback((screenMaterial: MeshBasicMaterial) => {
    phoneScreenMaterialRef.current = screenMaterial;
  }, []);

  const texturesArray = useLoadContent([
    {
      path: seeImages?.items[0].url as string,
      contentType: seeImages?.items[0].contentType as string,
    },
    {
      path: seeImages?.items[1].url as string,
      contentType: seeImages?.items[1].contentType as string,
    },
    {
      path: seeImages?.items[2].url as string,
      contentType: seeImages?.items[2].contentType as string,
    },
    {
      path: madeSimpleImage?.url as string,
      contentType: madeSimpleImage?.contentType as string,
    },
  ]);

  const textures: { [key: string]: Texture } = useMemo(() => {
    return {
      textureSeeDeeper: texturesArray[0],
      textureSeeWider: texturesArray[1],
      textureSeeBetter: texturesArray[2],
      textureMadeSimple: texturesArray[3],
    };
  }, [texturesArray]);
  // const textures: { [key: string]: Texture } = ;

  for (let key in textures) {
    const texture: Texture = textures[key] as Texture;
    if (texture?.colorSpace) {
      texture.colorSpace = LinearSRGBColorSpace;
      texture.flipY = false;
      texture.repeat.set(1.109, 1.06);
      texture.offset.set(-0.048, -0.03);
    }
  }

  const groupPos: [number, number, number] = [0, 1.25, 9.5];
  const groupRot: [number, number, number] = [0, 0, 0];
  const modelScale = 3.75;
  const visible = true;

  const phoneGroupRef = useRef<Group | null>(null);
  const phoneModelRef = useRef<Group | null>(null);
  const phoneScreenRef = useRef<Mesh | null>(null);
  const [pageLoaded, setPageLoaded] = useState(false);

  const phonePauseTexture = useCallback(() => {
    if (phoneScreenMaterialRef.current) {
      pausePhone2Texture(phoneScreenMaterialRef.current, 'wider-deeper');
    }
  }, [phoneScreenMaterialRef]);
  const phonePlayTexture = useCallback(() => {
    if (phoneScreenMaterialRef.current) {
      playPhone2Texture(phoneScreenMaterialRef.current, 'wider-deeper');
    }
  }, [phoneScreenMaterialRef]);

  const changePhoneTexture = useCallback(
    (texture: Texture) => {
      phonePauseTexture();
      changePhone2Texture(texture, phoneScreenRef);
      phonePlayTexture();
    },
    [phonePauseTexture, phonePlayTexture]
  );

  function onLoad(
    groupRef: React.RefObject<Group>,
    modelRef: React.RefObject<Group>,
    screenRef: React.RefObject<Mesh>
  ) {
    phoneScreenRef.current = screenRef.current;
    phoneModelRef.current = modelRef.current;
    phoneGroupRef.current = groupRef.current;
    setPageLoaded(true);
    changePhoneTexture(textures.textureSeeDeeper);
  }

  useLayoutEffect(() => {
    if (!pageLoaded) return;

    const mm = gsap.matchMedia();
    mm.add(
      { isDesktop: '(orientation: landscape)', isMobile: '(orientation: portrait)' },
      (ctx: any) => {
        const { isDesktop, isMobile } = ctx.conditions;

        const refactorYOffset = isDesktop ? 0.005 : 0;

        if (!phoneGroupRef?.current) return;
        const seeDeeper = copyContainerRef.current?.querySelector('.js__see-deeper');
        const seeWider = copyContainerRef.current?.querySelector('.js__see-wider');
        const seeBetter = copyContainerRef.current?.querySelector('.js__see-better');
        const gridItems = copyContainerRef.current?.querySelectorAll('.js__grid-item');
        const madeSimpleContainer = copyContainerRef.current?.querySelector(
          '.js__made-simple-container'
        );
        const statItems = copyContainerRef.current?.querySelectorAll('.js__stat-item');

        if (
          !seeDeeper ||
          !seeWider ||
          !seeBetter ||
          !gridItems ||
          !madeSimpleContainer ||
          !statItems
        )
          return;

        // used to determine when mobile should stop its snap behavior (it's sooner than desktop)
        const mobileCopyHeight =
          containerRef.current?.querySelector('.js__mobile-only-copy')?.clientHeight ?? 0;
        const totalContainerHeight = containerRef.current?.clientHeight ?? 0;
        const mobileOffset =
          ((totalContainerHeight - mobileCopyHeight) / totalContainerHeight) * 100 + '%';

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: '0% 0%',
            end: `${isDesktop ? '100% 100%' : mobileOffset} bottom`,
            scrub: true,
            // snap: {
            //   snapTo: 'labelsDirectional',
            //   duration: { min: 0.25, max: 0.5 },
            //   delay: 0,
            //   ease: 'power1.out',
            // },
          },
        });

        tl.set('.js__svgContainer', {
          scale: 1,
          y: '100%',
        });

        tl.addLabel('step1', 0);

        tl.to('.js__background', { y: '-100%', duration: 0.8 }, 'step1');
        // tl.to(seeDeeper, { autoAlpha: 1, filter: 'blur(0px)' }, 'step1');
        tl.to(
          '.js__svgContainer',
          { y: isDesktop ? '0%' : '0%', scale: 1, duration: 0.8 },
          'step1'
        );
        tl.to(
          phoneGroupRef?.current?.position,
          { x: 0, y: -0.125 + refactorYOffset, z: 9.5, duration: 0.8, ease: 'power1.out' },
          'step1'
        );
        // tl.to(phoneGroupRef?.current?.rotation, { y: 0, duration: 1 }, 'step1');

        tl.addLabel('step2', 1);

        tl.to(seeDeeper, { autoAlpha: 0, filter: 'blur(10rem)', duration: 0.4 }, 'step2');
        tl.to(seeWider, { autoAlpha: 1, filter: 'blur(0rem)', duration: 0.4 });
        tl.to(
          '#deeper',
          {
            morphSVG: '#wider',
            duration: 0.8,
            ease: 'power1.inOut',
          },
          'step2'
        );
        tl.to(
          phoneGroupRef?.current?.rotation,
          {
            y: `+=${degToRad(360)}`,
            duration: 0.8,
            ease: 'power1.inOut',
          },
          'step2'
        );
        tl.add(() => {
          if (activePhoneScreen.current === 'seeDeeper') {
            changePhoneTexture(textures.textureSeeWider);
            activePhoneScreen.current = 'seeWider';
          } else {
            changePhoneTexture(textures.textureSeeDeeper);
            activePhoneScreen.current = 'seeDeeper';
          }
        }, '-=0.4');

        tl.addLabel('step3', 2);

        tl.to(seeWider, { autoAlpha: 0, filter: 'blur(10rem)', duration: 0.4 });
        tl.to(seeBetter, { autoAlpha: 1, filter: 'blur(0rem)', duration: 0.4 });
        tl.to(
          '.js__svgContainer',
          {
            scale: isDesktop ? 2 : 1.5,
            opacity: 0,
            ease: 'power1.in',
            duration: 0.8,
          },
          'step3'
        );
        tl.to(
          phoneGroupRef?.current?.rotation,
          {
            y: `+=${degToRad(360)}`,
            duration: 0.8,
            ease: 'power1.inOut',
          },
          'step3'
        );
        tl.add(() => {
          if (activePhoneScreen.current === 'seeWider') {
            changePhoneTexture(textures.textureSeeBetter);
            activePhoneScreen.current = 'seeBetter';
          } else {
            changePhoneTexture(textures.textureSeeWider);
            activePhoneScreen.current = 'seeWider';
          }
        }, '-=0.4');

        tl.addLabel('step4', 3);

        if (isDesktop) {
          tl.to(seeBetter, { autoAlpha: 0, filter: 'blur(10rem)', duration: 0.4 }, 'step4');

          tl.to(
            phoneGroupRef?.current?.position,
            { y: 0.22 + refactorYOffset, duration: 0.8, ease: 'power1.inOut' },
            '<'
          );

          tl.to(gridItems, { autoAlpha: 1, duration: 0.4, stagger: 0.2 }, 'step4+=0.45');
          tl.addLabel('step5', 4.5);
          tl.to(gridItems, { autoAlpha: 0, filter: 'blur(10rem)', duration: 0.4 }, '+=0.1'); // infographs
          // tl.to(
          //   madeSimpleContainer,
          //   { autoAlpha: 1, filter: 'blur(0rem)', duration: 0.5 },
          //   '+=0.2'

          tl.to(
            phoneGroupRef?.current?.position,
            { y: 1.47 + refactorYOffset, duration: 0.8, ease: 'power1.inOut' },
            '-=0.2'
          );

          tl.addLabel('step6', 4.5);

          /*
          tl.to(
            phoneGroupRef?.current?.position,
            { y: -0.17 + refactorYOffset, duration: 0.8, ease: 'power1.inOut' },
            'step6'
          );
          tl.to(
            phoneGroupRef?.current?.rotation,
            {
              y: `+=${degToRad(360)}`,
              duration: 0.8,
              ease: 'power1.inOut',
            },
            'step6'
          );
          tl.to(
            phoneGroupRef?.current?.scale,
            {
              x: 0.8,
              y: 0.8,
              z: 0.8,
              duration: 0.8,
              ease: 'power1.inOut',
            },
            'step5'
          );
          tl.add(() => {
            if (activePhoneScreen.current === 'seeBetter') {
              changePhoneTexture(textures.textureMadeSimple);
              activePhoneScreen.current = 'madeSimple';
            } else {
              changePhoneTexture(textures.textureSeeBetter);
              activePhoneScreen.current = 'seeBetter';
            }
          }, '-=0.4');
          */

          tl.addLabel('step7', 5);

          tl.set(madeSimpleContainer, { y: '25vh' }, 'step7');

          tl.to(
            madeSimpleContainer,
            { autoAlpha: 1, filter: 'blur(0rem)', y: '0', duration: 0.4, ease: 'power1.out' },
            'step7'
          );
          tl.to({ pause: 0 }, { pause: 1, duration: 0.5 }, 'step7');

          tl.addLabel('step8', 5.5);

          // tl.to(madeSimpleContainer, { autoAlpha: 0, filter: 'blur(10rem)', duration: 0.45 });
          // tl.to(
          //   phoneGroupRef?.current?.position,
          //   { y: 0.1 + refactorYOffset, duration: 0.8, ease: 'power1.in' },
          //   'step8'
          // );
          // tl.to(madeSimpleContainer, { y: '-50vh', duration: 0.8, ease: 'power1.in' }, 'step8');

          // tl.to(statItems, { autoAlpha: 1, duration: 0.5, stagger: 0.2 }, '-=0.2');
        }

        //=====================================================================================
        // TIMELINE2
        //=====================================================================================

        // timeline for when snaps end on desktop
        if (isDesktop) {
        } else {
          const tl2 = gsap.timeline({
            scrollTrigger: {
              trigger: '.js__mobile-only-copy',
              start: `0% 100%`,
              end: '0% 0%',
              scrub: true,
            },
          });
          // we want the rest of the content to appear behind the phone models
          const parentContainer = document.querySelector('.js__see-deeper-container');
          tl2.to(parentContainer, {
            zIndex: 1,
            duration: 0.01,
          });
          tl2.to(
            phoneGroupRef?.current?.position,
            {
              y: 1,
              duration: 0.5,
              ease: 'linear',
              onComplete: () => {
                changePhoneTexture(textures.textureMadeSimple);
              },
            },
            0
          );
          tl2.to(seeBetter, { autoAlpha: 0, filter: 'blur(10rem)', duration: 0.5 }, 0);
        }

        //=====================================================================================
        // END TIMELINE2
        //=====================================================================================

        //=====================================================================================
        // BEGIN TIMELINE3
        //=====================================================================================
        // final phone animation on mobile
        if (isMobile) {
          /*
          const tl3 = gsap.timeline({
            scrollTrigger: {
              trigger: '.js__mobile-only-copy .js__made-simple-container',
              start: `0% 50%`,
              end: '100% 100%',
              scrub: true,
            },
          });
          tl3.fromTo(
            phoneGroupRef?.current?.position,
            {
              y: -1,
            },
            {
              y: -0.325,
              ease: 'linear',
              // immediateRender: true,
              onReverseComplete: () => {
                changePhoneTexture(textures.textureSeeBetter);
              },
            }
          );
          */
        }

        //=====================================================================================
        // END TIMELINE3
        //=====================================================================================
      },
      containerRef
    );

    return () => {
      mm.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageLoaded, phoneGroupRef, textures]);

  return (
    <div className={styles.container} ref={containerRef}>
      <span id="see-deeper-quicklink-id" className={styles.seeDeeperQuicklinkId}></span>
      <div className={styles.sticky}>
        <PhoneCanvas>
          <PhoneModel3
            groupPos={groupPos}
            groupRot={groupRot}
            visible={visible}
            modelScale={modelScale}
            onLoadFn={onLoad}
            onScreenMaterial={handleScreenMaterial}
          />
        </PhoneCanvas>
        <div className={cx(styles.svgContainer, 'js__svgContainer')}>
          <SeeDeeperSvg />
        </div>
        <div className={cx(styles.background, 'js__background')} />
        <div className={styles.copyContainer} ref={copyContainerRef}>
          <h2 className="sr-only">{headingsSrOnly}</h2>
          {seeImages?.items[0] && <VideoAltText text={seeImages?.items[0].description} />}
          {seeImages?.items[1] && <VideoAltText text={seeImages?.items[1].description} />}
          {seeImages?.items[2] && <VideoAltText text={seeImages?.items[2].description} />}
          <div className={styles.headerContainer} aria-hidden>
            <p className={cx(styles.header, styles.deeper, 'js__see-deeper')}>{seeHeadings[0]}</p>
            <p className={cx(styles.header, styles.wider, 'js__see-wider')}>{seeHeadings[1]}</p>
            <p className={cx(styles.header, styles.better, 'js__see-better')}>{seeHeadings[2]}</p>
          </div>
          <div className={styles.desktopOnlyCopy}>
            <SeeDeeperCopyGrid seeStats={seeStats} />
            <SeeDeeperMadeSimple
              madeSimpleHeading={madeSimpleHeading}
              madeSimpleCopy={madeSimpleCopy}
              madeSimpleCta={madeSimpleCta}
              seeDeeperPhoneCarouselCollection={seeDeeperPhoneCarouselCollection}
            />
            {madeSimpleImage?.description && <VideoAltText text={madeSimpleImage?.description} />}
          </div>
        </div>
      </div>
      <div className={cx(styles.mobileOnlyCopy, 'js__mobile-only-copy')}>
        <SeeDeeperCopyGrid seeStats={seeStats} />
        <SeeDeeperMadeSimple
          seeDeeperPhoneCarouselCollection={seeDeeperPhoneCarouselCollection}
          madeSimpleHeading={madeSimpleHeading}
          madeSimpleCopy={madeSimpleCopy}
          madeSimpleCta={madeSimpleCta}
        />
        {madeSimpleImage?.description && <VideoAltText text={madeSimpleImage?.description} />}
      </div>
    </div>
  );
}

interface SeeDeeperCopyGridProps {
  seeStats: ExoIrisContentFragment['seeStatsCollection'];
}

const SeeDeeperCopyGrid = (props: SeeDeeperCopyGridProps) => {
  const { seeStats } = props;

  const classNames = {
    item: [styles.degrees, styles.centimeters, styles.harmonics],
    image: [styles.degreesImage, styles.centimetersImage, styles.harmonicsImage],
  };

  return (
    <div className={styles.copyGrid}>
      {seeStats?.items.map((item, index) => {
        return (
          <div
            className={cx(styles.gridItem, classNames.item[index], 'js__grid-item')}
            key={item.sys.id}
          >
            <img
              className={classNames.image[index]}
              src={item.image?.url}
              alt={item.image?.description ? item.image?.description : ''}
              width={item.image?.width}
              height={item.image?.height}
            />
            <h3 className={styles.gridHeader}>{item.title}</h3>
            <p className={styles.gridCopy}>{item.description}</p>
          </div>
        );
      })}
    </div>
  );
};

interface SeeDeeperMadeSimpleProps {
  madeSimpleHeading: ExoIrisContentFragment['madeSimpleHeading'];
  madeSimpleCopy: ExoIrisContentFragment['madeSimpleCopy'];
  madeSimpleCta: ExoIrisContentFragment['madeSimpleCta'];
  seeDeeperPhoneCarouselCollection: ExoIrisContentFragment['seeDeeperPhoneCarouselCollection'];
}

const SeeDeeperMadeSimple = (props: SeeDeeperMadeSimpleProps) => {
  const { madeSimpleHeading, madeSimpleCopy, madeSimpleCta, seeDeeperPhoneCarouselCollection } =
    props;

  const madeSimpleCtaFormatted: any = externalToIsExternal(madeSimpleCta);

  return (
    <div className={cx(styles.madeSimpleContainer, 'js__made-simple-container')}>
      <h2 className={styles.madeSimpleHeader}>{madeSimpleHeading}</h2>
      <p className={styles.madeSimpleCopy}>{madeSimpleCopy}</p>
      <PhoneCarousel
        scrollTriggerElement="#see-deeper-section"
        scrollTriggerEnd={`bottom bottom`}
        scrollTriggerStart={`bottom-=${
          typeof window !== 'undefined' ? window.innerHeight * 0.5 : 0
        } bottom`}
        items={seeDeeperPhoneCarouselCollection?.items || []}
      />
      {!!madeSimpleCtaFormatted && (
        <ArrowLink className={styles.madeSimpleCta} {...madeSimpleCtaFormatted} isSmall />
      )}
    </div>
  );
};
