'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLayoutEffect, useRef, useState } from 'react';

import { VisionContentFragment } from '~/cms';
import { BackgroundCanvas, BackgroundConfig } from '~/components/3d';
import { CMSImage, Section } from '~/components/ui';
import { useIsLandscape } from '~/hooks';
import { useGlobalStore } from '~/stores/globalStore';
import { cx } from '~/utils';

import styles from './Hero.module.scss';
import bgConfig from './bgConfig.yml';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  heroHeading: VisionContentFragment['heroCopy'];
  heroSubhead: VisionContentFragment['heroAnimatedCopy'];
  splashHeading: VisionContentFragment['splashHeading'];
  splashCopy: VisionContentFragment['splashCopy'];
  splashFloatingImages: VisionContentFragment['splashFloatingImagesCollection'];
  splashImageLarge: VisionContentFragment['splashImageLarge'];
  splashImageSmall: VisionContentFragment['splashImageSmall'];
}

const Hero = (props: HeroProps) => {
  const {
    heroHeading,
    heroSubhead,
    splashHeading,
    splashCopy,
    splashFloatingImages,
    splashImageLarge,
    splashImageSmall,
  } = props;

  const isDesktop = useIsLandscape();
  const { windowHeight, windowWidth } = useGlobalStore(['windowHeight', 'windowWidth']);

  const [introComplete, setIntroComplete] = useState(false);
  const [xClip, setXClip] = useState<number | null>(null);
  const [yClip, setYClip] = useState<number | null>(null);

  const refContainer = useRef<HTMLElement | null>(null);
  const refPanel1 = useRef<HTMLDivElement | null>(null);
  const refPanel2 = useRef<HTMLDivElement | null>(null);
  const refPanel3 = useRef<HTMLDivElement | null>(null);
  const refSplashBlend = useRef<HTMLDivElement | null>(null);
  const refSplashClip = useRef<HTMLDivElement | null>(null);
  const refSplashContent = useRef<HTMLDivElement | null>(null);
  const refSplashScale = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    // calculate clip percent for image in X and Y direction
    const clipX = ((windowWidth - windowHeight * 0.35) / 2 / windowWidth) * 100;
    const clipY = (100 - 35) / 2;

    setXClip(clipX);
    setYClip(clipY);
  }, [windowHeight, windowWidth]);

  useLayoutEffect(() => {
    // panel 1 entrance
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        onComplete: () => setIntroComplete(true),
      });

      timeline.to(refPanel1.current, {
        autoAlpha: 1,
        delay: 0.5,
        duration: 1,
        ease: 'none',
        filter: 'blur(0rem)',
      });
    }, refContainer);

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    if (!introComplete || !xClip || !yClip) return;

    // scroll timeline
    const ctx = gsap.context(() => {
      const floats: HTMLElement[] = gsap.utils.toArray('.gsap-float');
      const letters: HTMLSpanElement[] = gsap.utils.toArray('.gsap-letter');

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: refContainer.current,
          start: 'top top',
          end: '82% bottom',
          scrub: true,
          // snap: {
          //   snapTo: 'labelsDirectional',
          //   duration: { min: 0.25, max: 0.5 },
          //   delay: 0,
          //   ease: 'power1.out',
          // },
        },
      });

      // panel 1 exit, panel 2 enter
      timeline.addLabel('panel-2');
      timeline.to(refPanel1.current, { autoAlpha: 0, filter: 'blur(15rem)' });
      timeline.to(refPanel2.current, { autoAlpha: 1, filter: 'blur(0rem)' });

      // panel 2 & subhead exit
      // panel 3 enter
      timeline.addLabel('panel-3');

      const lettersTotal = letters.length;
      const lettersHalf = lettersTotal / 2;
      const createIndexArray = () => Array.from(Array(lettersHalf).keys());

      const xValues = [
        ...createIndexArray()
          .reverse()
          .map((x) => (x + 1) * -150),
        ...createIndexArray().map((x) => (x + 1) * 150),
      ];

      timeline.to(
        refPanel3.current,
        { autoAlpha: 1, filter: 'blur(0rem)', duration: 1.5 },
        'panel-3'
      );

      // splash scale
      timeline.addLabel('splash-scale');

      timeline.to(
        refPanel2.current,
        { autoAlpha: 0, filter: 'blur(0rem)', duration: 1.5 },
        'panel-3+=0.5'
      );

      letters.forEach((letter, index) =>
        timeline.to(letter, { x: xValues[index], duration: 2.5 }, 'panel-3')
      );

      const startPath = `polygon(
        ${xClip}% ${yClip}%,
        ${100 - xClip}% ${yClip}%,
        ${100 - xClip}% ${100 - yClip}%,
        ${xClip}% ${100 - yClip}%
      )`;

      const endPath = `polygon(
        0% 0%,
        100% 0%,
        100% 100%,
        0% 100%
      )`;

      timeline.fromTo(
        refSplashClip.current,
        { clipPath: startPath },
        { clipPath: endPath, ease: 'none', duration: 2 },
        'splash-scale'
      );

      timeline.fromTo(
        refSplashScale.current,
        { scale: 0.5 },
        { scale: 1, ease: 'none', duration: 2 },
        'splash-scale'
      );

      timeline.to(floats, { filter: 'blur(15rem)', opacity: 0 }, 'splash-scale');

      // splash content
      timeline.addLabel('splash-content');

      timeline.fromTo(refSplashBlend.current, { opacity: 0 }, { opacity: 0.4 });

      timeline.fromTo(
        refSplashContent.current,
        { autoAlpha: 0, filter: isDesktop ? 'blur(15rem)' : 'blur(0rem)' },
        { autoAlpha: 1, filter: 'blur(0rem)' },
        'splash-content'
      );
    }, refContainer);

    return () => ctx.revert();
  }, [isDesktop, introComplete, xClip, yClip]);

  return (
    <Section className={styles.container} ref={refContainer}>
      <div className={styles.content}>
        <div className={styles.bgContainer}>
          <BackgroundCanvas
            config={bgConfig as BackgroundConfig}
            className={styles.gradientBackground}
          />
        </div>
        <div className={styles.panel} ref={refPanel1}>
          <h1 className={styles.heading}>{heroHeading}</h1>
        </div>

        <div className={styles.panel} ref={refPanel2}>
          <div className={styles.subhead}>
            {heroSubhead?.split('').map((letter, index) => (
              <span className={cx(styles.subheadLetter, 'gsap-letter')} key={index}>
                {letter}
              </span>
            ))}
          </div>
        </div>

        <div className={styles.panel} ref={refPanel3}>
          <div className={styles.splashBackground}>
            {splashFloatingImages?.items.map((asset, index) => (
              <div
                className={cx(styles.splashFloat, styles[`splashFloat-${index + 1}`], 'gsap-float')}
                key={index}
              >
                <CMSImage
                  asset={asset}
                  className={styles.splashFloatImage}
                  sm={{ asset: asset, width: 200 }}
                  lg={{ asset: asset, width: index === 0 ? 100 : 200 }}
                  xl={{ asset: asset, width: index === 0 ? 200 : 400 }}
                />
              </div>
            ))}

            <div className={styles.splashClip} ref={refSplashClip}>
              <div className={styles.splashScale} ref={refSplashScale}>
                <CMSImage
                  asset={isDesktop ? splashImageLarge : splashImageSmall}
                  className={styles.splashFocus}
                  loading="lazy"
                />

                <div className={styles.splashBlend} ref={refSplashBlend} />
              </div>
            </div>
          </div>

          <div className={styles.splashContent} ref={refSplashContent}>
            <p className={styles.splashHeading}>{splashHeading}</p>
            <p className={styles.splashCopy}>{splashCopy}</p>
          </div>
        </div>
      </div>
    </Section>
  );
};

export { Hero };
