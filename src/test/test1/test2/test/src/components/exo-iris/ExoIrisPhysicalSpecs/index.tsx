import { useInView } from 'framer-motion';
import gsap from 'gsap';
import { Power2, ScrollTrigger } from 'gsap/all';
import { ComponentProps, useLayoutEffect, useRef, useState } from 'react';
import { Group } from 'three';
import { degToRad } from 'three/src/math/MathUtils';

import { ExoIrisContentFragment } from '~/cms';
import { IrisCanvas } from '~/components/3d/IrisCanvas';
import { IconCrosshair, IconDroplet } from '~/components/svgs';
import { ArrowLink, Section } from '~/components/ui';
import { useInViewport, useIsLandscape, useIsPortrait } from '~/hooks';
import { use3dStore } from '~/stores/3d/store';
import { useIrisStore } from '~/stores/exo-iris/store';
import { cx } from '~/utils';

import styles from './ExoIrisPhysicalSpecs.module.scss';

interface ExoIrisPhysicalSpecsProps extends ComponentProps<'section'> {
  heading: ExoIrisContentFragment['physicalSpecsHeading'];
  copy: ExoIrisContentFragment['physicalSpecsCopy'];
  cta: ExoIrisContentFragment['physicalSpecsCta'];
  stats: ExoIrisContentFragment['physicalSpecsStatsCollection'];
  isDark?: boolean;
}

export const ExoIrisPhysicalSpecs = (props: ExoIrisPhysicalSpecsProps) => {
  const { heading, copy, cta, stats, isDark = false, className } = props;

  const infoPanelRef = useRef<HTMLDivElement | null>(null);
  const physicalSpecsContainerRef = useRef<HTMLDivElement | null>(null);
  const isDesktop = useIsLandscape(); // use hooks instead
  const xs = useIsPortrait();

  const groupPos: [number, number, number] = [0, 0, 10];
  const groupRot: [number, number, number] = [0, 0, 0];
  const modelPos: [number, number, number] = [0, 0, 0];
  const modelRot: [number, number, number] = [1.55, 0, 0];
  const modelScale = isDesktop ? 2.75 : 5;
  const visible = true;
  const [pageLoaded, setPageLoaded] = useState(false);
  const irisGroupRef = useRef<Group | null>();
  const irisModelRef = useRef<Group | null>();
  const canvasContainerRef = useRef<HTMLDivElement | null>();

  const { introCanvasContainerRef } = useIrisStore(['introCanvasContainerRef']);

  const domContainerInView = useInView(physicalSpecsContainerRef);

  function onload(irisGroup: any, irisModel: any, canvasContainer: any) {
    irisGroupRef.current = irisGroup.current;
    irisModelRef.current = irisModel.current;
    canvasContainerRef.current = canvasContainer.current;
    setPageLoaded(true);
  }

  // adds animation timeline for scrolling down page for the model
  useLayoutEffect(() => {
    if (!irisGroupRef?.current || !irisModelRef?.current) return;
    const mm = gsap.matchMedia();
    mm.add(
      { isDesktop: '(orientation: landscape)', isMobile: '(orientation: portrait)' },
      (ctx: any) => {
        if (!irisGroupRef?.current || !irisModelRef?.current) return;
        // const { isDesktop } = ctx.conditions;
        const INITIAL_G_ROTATE_X = isDesktop ? -13 : 15;
        const INITIAL_G_ROTATE_Y = isDesktop ? 41 : 135;
        const INITIAL_G_ROTATE_Z = isDesktop ? 49 : 5;
        const INITIAL_SCALE = isDesktop ? 0.675 : 0.5;

        let DEFAULT_POS = { x: 0, y: 0.2, z: 11.2 };
        let DEFAULT_ROT = { x: 0, y: 9.948377, z: 0 };
        let DEFAULT_ROT_IRISMODEL = { x: 0, y: 0, z: 0 }; //default rotation - {x: -0.3, y: 0.1, z: -0.2}

        if (isDesktop) {
          const tl = gsap.timeline({ overwrite: true, paused: true });

          const tl2 = gsap.timeline({
            scrollTrigger: {
              trigger: physicalSpecsContainerRef.current,
              start: '0% bottom',
              scrub: true,
              onUpdate: (self) => {
                if (!irisGroupRef?.current || !irisModelRef?.current) return;
                const delta = gsap.utils.mapRange(1, 0, -0.175, 0.02, self.progress);
                gsap.to(irisGroupRef.current.position, { y: delta, duration: 0, ease: 'linear' });
              },
            },
          });

          if (domContainerInView) {
            tl.fromTo(
              infoPanelRef.current,
              { x: '45vw' },
              { x: 0, duration: 1.5, ease: Power2.easeOut }
            );

            tl.add('intro');
            tl.fromTo(
              irisGroupRef.current.position,
              { x: 0.5, z: 11.2 },
              { x: 0.05, z: 11.1, duration: 2 },
              '< intro'
            );

            tl.fromTo(
              irisGroupRef?.current.rotation,
              { x: 0, y: 0, z: 0 },
              {
                x: degToRad(INITIAL_G_ROTATE_X),
                y: degToRad(INITIAL_G_ROTATE_Y),
                z: degToRad(INITIAL_G_ROTATE_Z),
                duration: 2,
              },
              '< intro'
            );

            tl.fromTo(
              irisModelRef?.current.rotation,
              { x: 0, y: degToRad(360), z: 0 },
              { x: 0, y: 0, z: 0, duration: 2 },
              '< intro'
            );
          }

          ScrollTrigger.create({
            trigger: physicalSpecsContainerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            onToggle: (self) => {
              if (
                !irisGroupRef?.current ||
                !irisModelRef?.current ||
                !introCanvasContainerRef?.current
              )
                return;
              const scaleVal = !self.isActive ? 1 : INITIAL_SCALE;
              gsap.set(irisGroupRef.current.scale, { x: scaleVal, y: scaleVal, z: scaleVal });
              // setIrisModelVisible(self.isActive);

              // gsap.set(introCanvasContainerRef.current, { display: 'none' });
            },
            onEnter: (self) => {
              if (!irisGroupRef?.current || !irisModelRef?.current) return;

              const scaleVal = INITIAL_SCALE;
              gsap.set(irisGroupRef.current.scale, { x: scaleVal, y: scaleVal, z: scaleVal });
              tl?.play();
              tl2?.play();
            },
            onLeave: (self) => {
              // setIrisModelVisible(false);
            },
            onLeaveBack: (self) => {
              // setIrisModelVisible(false);
            },
          });
        } else {
          // MOBILE
          const tl = gsap.timeline({ overwrite: true, paused: true });
          const tl2 = gsap.timeline({
            scrollTrigger: {
              trigger: physicalSpecsContainerRef.current,
              start: '20% bottom',
              end: '98% 2%',
              scrub: true,
              onUpdate: (self) => {
                if (!irisGroupRef?.current || !irisModelRef?.current) return;
                const delta = gsap.utils.mapRange(1, 0, -0.27, 0.05, self.progress);
                gsap.to(irisGroupRef.current.position, { y: delta, duration: 0, ease: 'linear' });
              },
            },
          });

          if (domContainerInView) {
            tl.add('intro');
            tl.fromTo(irisGroupRef.current.position, { x: 0.1 }, { x: 0, duration: 1.25 }, 'intro');
            tl.fromTo(
              irisGroupRef?.current.rotation,
              { x: 0, y: 0, z: 0 },
              {
                x: degToRad(INITIAL_G_ROTATE_X),
                y: degToRad(INITIAL_G_ROTATE_Y),
                z: degToRad(INITIAL_G_ROTATE_Z),
                duration: 2,
              },
              'intro'
            );
            tl.fromTo(
              irisModelRef?.current.rotation,
              { x: 0, y: degToRad(360), z: 0 },
              { x: 0, y: 0, z: 0, duration: 1.25 },
              'intro'
            );
          }

          ScrollTrigger.create({
            trigger: physicalSpecsContainerRef.current,
            start: '0% bottom',
            // markers: true,
            onToggle: (self) => {
              if (
                !irisGroupRef?.current ||
                !irisModelRef?.current ||
                !introCanvasContainerRef?.current
              )
                return;
              const scaleVal = !self.isActive ? 1 : INITIAL_SCALE;
              gsap.set(irisGroupRef.current.scale, { x: scaleVal, y: scaleVal, z: scaleVal });
              // setIrisModelVisible(self.isActive);
            },
            onEnter: (self) => {
              if (
                !irisGroupRef?.current ||
                !irisModelRef?.current ||
                !introCanvasContainerRef?.current
              )
                return;

              const scaleVal = INITIAL_SCALE;
              gsap.set(irisGroupRef.current.scale, { x: scaleVal, y: scaleVal, z: scaleVal });
              tl?.play();
              tl2?.play();
            },
            onLeave: (self) => {
              // setIrisModelVisible(false);
            },
          });
        }
      },
      physicalSpecsContainerRef
    );

    return () => {
      mm.revert();
    };
  }, [
    physicalSpecsContainerRef,
    irisGroupRef,
    irisModelRef,
    pageLoaded,
    domContainerInView,
    introCanvasContainerRef,
    isDesktop,
    xs,
  ]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: physicalSpecsContainerRef.current,
          scrub: true,
          start: '90% top',
          end: 'bottom top',
        },
      });
      if (introCanvasContainerRef?.current) {
        tl.to(introCanvasContainerRef.current, {
          autoAlpha: 0,
        });
      }
    }, physicalSpecsContainerRef);
    return () => ctx.revert();
  }, [introCanvasContainerRef]);

  const specsContent = () => {
    // first stat is skipped, because it's given a special design treatment
    let items = stats?.items.map(
      (item, i) =>
        i !== 0 && (
          <li key={'specs_' + i} className={cx(styles.specs, styles.weight)}>
            <p className={styles.techSpecHeadline}>{item.title}</p>
            <span className={styles.techSpecDescription}>{item.description}</span>
          </li>
        )
    );
    return <ul>{items}</ul>;
  };

  const featuredStat = stats?.items[0];

  return (
    <Section
      isDark={isDark}
      className={className ? cx(styles[className]) : styles.container}
      ref={physicalSpecsContainerRef}
      id="iris-specs"
    >
      {isDesktop && (
        <IrisCanvas
          groupPos={groupPos}
          groupRot={groupRot}
          modelScale={modelScale}
          modelRot={modelRot}
          modelPos={modelPos}
          visible={visible}
          isBottomFaded={true}
          onLoadFn={onload}
          className={styles.irisCanvas}
        ></IrisCanvas>
      )}

      <div className={cx(styles.contentContainer, styles.left)}>
        <article className={styles.headline}>
          <h1>{heading}</h1>
          <p>{copy}</p>

          {cta && (
            <ArrowLink href={cta.href as string} className={styles.cta} isSmall>
              {cta.label}
            </ArrowLink>
          )}
        </article>
      </div>

      <div className={cx(styles.contentContainer, styles.center)}>
        <IconCrosshair className={styles.crossHair} />
        <div className={styles.mobileImgContainer}>
          <img
            src="/assets/images/exo-iris/mobile-iris.webp"
            alt="Exo Iris"
            width={100}
            height={100}
            className={styles.mobileIris}
          />
        </div>
      </div>

      <div className={cx(styles.contentContainer, styles.right)} ref={infoPanelRef}>
        <div className={styles.bgContainer}></div>
        <div className={styles.specsContainer}>
          <div className={cx(styles.specsContent, styles.specsA)}>
            <img
              width={100}
              height={100}
              className={styles.droplet}
              alt={featuredStat?.image?.description ? featuredStat?.image?.description : ''}
              src={featuredStat?.image?.url}
            />
            <div className={cx(styles.waterproofContent, styles.techSpecHeadline)}>
              {featuredStat?.title}
            </div>
          </div>
          <div className={cx(styles.specsContent, styles.specsB)}>{specsContent()}</div>
        </div>
      </div>
    </Section>
  );
};
