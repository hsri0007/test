'use client';

import { gsap } from 'gsap';
import {
  MutableRefObject,
  RefObject,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Group, LinearSRGBColorSpace, Mesh, MeshBasicMaterial, Texture } from 'three';
import { degToRad } from 'three/src/math/MathUtils';

import { ExoIrisContentFragment } from '~/cms';
import { PhoneCanvas } from '~/components/3d/PhoneCanvas';
import { Corner } from '~/components/svgs';
import VideoAltText from '~/components/ui/VideoAltText';
import { useLoadContent } from '~/hooks';
import { cx } from '~/utils';

import {
  PhoneModel3,
  changePhone2Texture,
  pausePhone2Texture,
  playPhone2Texture,
} from '../../../3d/PhoneCanvas/PhoneModel3';
import { MobilePhone } from '../MobilePhone';
import styles from './PhoneSequenceContent.module.scss';

interface PhoneSequenceContentProps {
  phones: ExoIrisContentFragment['phonesCollection'];
}

export default function PhoneSequenceContent(props: PhoneSequenceContentProps) {
  const { phones } = props;
  const containerRef = useRef<HTMLDivElement | null>(null);

  const phone0GroupRef = useRef<Group | null>(null);
  const phone0ModelRef = useRef<Group | null>(null);
  const phone0ScreenRef = useRef<Mesh | null>(null);
  const phone0ScreenMaterialRef = useRef<MeshBasicMaterial | null>();
  const [phone0IsLoaded, setPhone0IsLoaded] = useState(false);

  const phone0PauseTexture = useCallback(() => {
    if (phone0ScreenMaterialRef.current) {
      pausePhone2Texture(phone0ScreenMaterialRef.current, 0);
    }
  }, [phone0ScreenMaterialRef]);
  const phone0PlayTexture = useCallback(() => {
    if (phone0ScreenMaterialRef.current) {
      playPhone2Texture(phone0ScreenMaterialRef.current, 0);
    }
  }, [phone0ScreenMaterialRef]);
  const phone0ChangeTexture = useCallback(
    (texture: Texture) => {
      phone0PauseTexture();
      changePhone2Texture(texture, phone0ScreenRef);
      phone0PlayTexture();
    },
    [phone0PauseTexture, phone0PlayTexture]
  );

  const phone1GroupRef = useRef<Group | null>(null);
  const phone1ModelRef = useRef<Group | null>(null);
  const phone1ScreenRef = useRef<Mesh | null>(null);
  const phone1ScreenMaterialRef = useRef<MeshBasicMaterial | null>();
  const [phone1IsLoaded, setPhone1IsLoaded] = useState(false);

  const phone1PauseTexture = useCallback(() => {
    if (phone1ScreenMaterialRef.current) {
      pausePhone2Texture(phone1ScreenMaterialRef.current, 1);
    }
  }, [phone1ScreenMaterialRef]);
  const phone1PlayTexture = useCallback(() => {
    if (phone1ScreenMaterialRef.current) {
      playPhone2Texture(phone1ScreenMaterialRef.current, 1);
    }
  }, [phone1ScreenMaterialRef]);
  const phone1ChangeTexture = useCallback(
    (texture: Texture) => {
      phone1PauseTexture();
      changePhone2Texture(texture, phone1ScreenRef);
      phone1PlayTexture();
    },
    [phone1PauseTexture, phone1PlayTexture]
  );

  const groupPos: [number, number, number] = useMemo(() => [0.275, -1, 10], []);
  const groupRot: [number, number, number] = useMemo(() => [0, 0, 0], []);
  const modelScale = 3.75;
  const visible = true;

  const texturePaths = useMemo(
    () =>
      phones?.items
        .filter((item) => item?.phoneAsset?.url !== null && item?.phoneAsset?.contentType !== null)
        .map((item) => ({
          path: item.phoneAsset!.url,
          contentType: item.phoneAsset!.contentType,
        })) as { path: string; contentType: string }[] | undefined,
    [phones?.items]
  );

  const textures = useLoadContent(texturePaths);

  useEffect(() => {
    textures.forEach((texture, i) => {
      texture.colorSpace = LinearSRGBColorSpace;
      texture.flipY = false;
      texture.repeat.set(1.109, 1.06);
      texture.offset.set(-0.048, -0.03);
      if (i === 2 || i === 3 || i === 4) {
        texture.repeat.set(1.109, 1.05);
        texture.offset.set(-0.048, -0.021);
      }
    });
  }, [textures]);

  const onPhone0Load = useCallback(
    (
      groupRef: React.RefObject<Group>,
      modelRef: React.RefObject<Group>,
      screenRef: React.RefObject<Mesh>
    ) => {
      phone0ScreenRef.current = screenRef.current;
      phone0ModelRef.current = modelRef.current;
      phone0GroupRef.current = groupRef.current;
      setPhone0IsLoaded(true);
      phone0ChangeTexture(textures[0]);
    },
    [textures, phone0ChangeTexture]
  );

  const handleScreenMaterial0 = useCallback((screenMaterial: MeshBasicMaterial) => {
    phone0ScreenMaterialRef.current = screenMaterial;
  }, []);

  const onPhone1Load = useCallback(
    (
      groupRef: React.RefObject<Group>,
      modelRef: React.RefObject<Group>,
      screenRef: React.RefObject<Mesh>
    ) => {
      phone1ScreenRef.current = screenRef.current;
      phone1ModelRef.current = modelRef.current;
      phone1GroupRef.current = groupRef.current;
      setPhone1IsLoaded(true);
      phone0ChangeTexture(textures[1]);
      phone0PauseTexture();
    },
    [textures, phone0ChangeTexture, phone0PauseTexture]
  );

  const handleScreenMaterial1 = useCallback((screenMaterial: MeshBasicMaterial) => {
    phone1ScreenMaterialRef.current = screenMaterial;
  }, []);

  useLayoutEffect(() => {
    if (!phone0IsLoaded || !phone1IsLoaded || !phones) return;
    const mm = gsap.matchMedia();
    mm.add(
      { isDesktop: '(orientation: landscape)', isMobile: '(orientation: portrait)' },
      (ctx: any) => {
        const { isDesktop } = ctx.conditions;

        const numbers = gsap.utils.toArray('.js__number');
        const copyContainers = gsap.utils.toArray('.js__copyContainer');
        const mobilePhones = gsap.utils.toArray('.js__phone-container');

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

        if (isDesktop) {
          const posX = groupPos[0];
          tl.set(
            [phone0GroupRef.current?.position, phone1GroupRef.current?.position],
            { x: posX },
            0
          );
        }

        if (isDesktop) {
          const scale = modelScale;
          tl.set(
            [phone0ModelRef.current?.scale, phone1ModelRef.current?.scale],
            { x: scale, y: scale, z: scale },
            0
          );
        }

        // DOM animations between snaps
        function enterTo(index: number) {
          tl.fromTo(
            [numbers[index], copyContainers[index], mobilePhones[index]],
            {
              y: '100%',
            },
            {
              // autoAlpha: 1,
              // filter: 'blur(0rem)',
              y: 0,
              duration: 0.5,
              ease: 'power1.inOut',
            },
            '<'
          );
        }

        function enterPhone(
          phone: {
            phoneGroupRef: MutableRefObject<Group>;
            phoneChangeTexture: (texture: Texture) => void;
            pause: () => void;
            play: () => void;
          },
          newTexture: Texture,
          oldTexture: Texture | null
        ) {
          tl.fromTo(
            phone.phoneGroupRef.current.position,
            { y: -1 },
            {
              immediateRender: false,
              y: isDesktop ? -0.035 : -0.165,
              duration: 0.5,
              ease: 'power1.inOut',
              onStart: () => {
                phone.phoneChangeTexture(newTexture);
              },
              onReverseComplete: () => {
                phone.pause();
              },
            },
            '<'
          );

          tl.fromTo(
            phone.phoneGroupRef.current.rotation,
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

        function exitTo(i: number) {
          tl.to([numbers[i], copyContainers[i], mobilePhones[i]], {
            // autoAlpha: 0,
            // filter: 'blur(15rem)',
            y: '-100%',
            duration: 0.5,
            ease: 'power1.inOut',
          });
        }

        function exitPhone(phone: {
          phoneGroupRef: MutableRefObject<Group>;
          phoneChangeTexture: (texture: Texture) => void;
          pause: () => void;
          play: () => void;
        }) {
          tl.to(
            phone.phoneGroupRef.current.position,
            {
              y: 1,
              duration: 0.5,
              ease: 'power1.inOut',
            },
            '<'
          );
          tl.to(
            phone.phoneGroupRef.current.rotation,
            {
              y: degToRad(45),
              duration: 0.5,
              ease: 'power1.inOut',
              onComplete: () => {
                phone.pause();
              },
              onUpdate: (e) => {
                // If this animation is going backwards make sure the video is playing
                if (e.direction === -1) {
                  phone.play();
                }
              },
              onUpdateParams: [tl.scrollTrigger],
            },
            '<'
          );
        }

        const delayBetweenPhones = 0.1;

        const phoneModels = [
          {
            phoneGroupRef: phone0GroupRef as MutableRefObject<Group>,
            phoneChangeTexture: phone0ChangeTexture,
            pause: phone0PauseTexture,
            play: phone0PlayTexture,
          },
          {
            phoneGroupRef: phone1GroupRef as MutableRefObject<Group>,
            phoneChangeTexture: phone1ChangeTexture,
            pause: phone1PauseTexture,
            play: phone1PlayTexture,
          },
        ];
        phones?.items.forEach((phone, index) => {
          const phoneIndex = index % 2;
          const phoneModel = phoneModels[phoneIndex];
          enterTo(index);
          enterPhone(phoneModel, textures[index], textures[index - 2]);

          tl.addLabel(`step${index}`);

          tl.to({ pause: 0 }, { pause: 1, ease: 'linear', duration: delayBetweenPhones });

          exitTo(index);
          exitPhone(phoneModel);
        });
      },
      containerRef
    );

    return () => {
      mm.revert();
    };
  }, [
    groupPos,
    phone0ChangeTexture,
    phone0GroupRef,
    phone0IsLoaded,
    phone0PauseTexture,
    phone0PlayTexture,
    phone1ChangeTexture,
    phone1GroupRef,
    phone1IsLoaded,
    phone1PauseTexture,
    phone1PlayTexture,
    phones,
    textures,
  ]);

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.grid}>
        <div className={styles.logoContainer}>
          <p className={styles.logoText}>
            Includes <span className="sr-only">Exo Works</span>
          </p>
          <img
            className={styles.logo}
            src="/assets/images/exo-works-logo.webp"
            alt="Exo Works logo"
          />
        </div>
        <div className={styles.leftColumn}>
          <div className={styles.numberWrapper}>
            <div className={styles.numberArea}>
              {phones?.items.map((item, index) => (
                <div key={index} className={cx(styles.numberContainer, 'js__number')} aria-hidden>
                  <div className={styles.number}>{index + 1}</div>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.bottomSection}>
            <Corner className={styles.corner} />
            <div className={styles.copyWrapper}>
              {phones?.items.map((step, index) => (
                <div key={index} className={cx(styles.copyContainer, 'js__copyContainer')}>
                  <h3 className={styles.heading}>{step.title}</h3>
                  <p className={styles.copy}>{step.description}</p>
                  <VideoAltText text={step.phoneAsset?.description || ''} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <PhoneCanvas className={styles.phoneCanvas}>
          <PhoneModel3
            groupPos={groupPos}
            groupRot={groupRot}
            visible={visible}
            modelScale={modelScale}
            onLoadFn={onPhone0Load}
            onScreenMaterial={handleScreenMaterial0}
          />
          <PhoneModel3
            groupPos={groupPos}
            groupRot={groupRot}
            visible={visible}
            modelScale={modelScale}
            onLoadFn={onPhone1Load}
            onScreenMaterial={handleScreenMaterial1}
          />
        </PhoneCanvas>
        <div className={styles.mobilePhoneContainer}>
          {phones &&
            phones.items.map((phone, i) => {
              return <MobilePhone key={phone.sys.id} asset={phone.phoneAsset} />;
            })}
        </div>
      </div>
    </div>
  );
}
