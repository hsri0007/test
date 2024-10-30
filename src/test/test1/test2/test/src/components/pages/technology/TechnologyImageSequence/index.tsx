'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef } from 'react';

import { AssetFragment, Maybe, TechnologyContentFragment } from '~/cms';
import { ArrowLink, CMSImage, ExoLink, Section } from '~/components/ui';
import { useIsLandscape, useIsPortrait } from '~/hooks';
import { cx } from '~/utils';

import styles from './TechnologyImageSequence.module.scss';

gsap.registerPlugin(ScrollTrigger);

type currentIndexType = {
  i: number;
};

type StatProps = {
  label: Maybe<string>;
  value: Maybe<string>;
  image?: Maybe<AssetFragment>;
};

const Stat = ({ label, value, image }: StatProps) => {
  return (
    <div className={styles.statContainer}>
      {image && (
        <CMSImage
          className={styles.statIcon}
          asset={image}
          width={image?.width || 100}
          height={image?.height || 100}
          loading="lazy"
        />
      )}
      {value && <div className={styles.statValue}>{value}</div>}
      {label && <div className={styles.statLabel}>{label}</div>}
    </div>
  );
};

interface TechnologyImageSequenceProps {
  powerHeading: TechnologyContentFragment['powerHeading'];
  powerCopy: TechnologyContentFragment['powerCopy'];
  pmutCta: TechnologyContentFragment['pmutCta'];
  physicalSpecsStatsCollection: TechnologyContentFragment['physicalSpecsStatsCollection'];
  celloHeading: TechnologyContentFragment['celloHeading'];
  celloCopy1: TechnologyContentFragment['celloCopy1'];
  celloCopy2: TechnologyContentFragment['celloCopy2'];
}

export const TechnologyImageSequence = (props: TechnologyImageSequenceProps) => {
  const {
    powerHeading,
    powerCopy,
    pmutCta,
    physicalSpecsStatsCollection,
    celloHeading,
    celloCopy1,
    celloCopy2,
  } = props;

  const isTablet = useIsPortrait();
  const isDesktop = useIsLandscape();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const currentIndex = useRef<currentIndexType>({ i: 0 });
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const lastIndex = useRef<number>(0);

  const outerStatsContainerRef = useRef<HTMLDivElement | null>(null);

  const NUM_OF_FRAMES = 340;

  // frames where the sequencing needs to stop for a beat
  const FIRST_PAUSE_FRAME = 240;
  const SECOND_PAUSE_FRAME = 276;
  const SECOND_PAUSE_FRAME_DESKTOP = 250;
  // const SECOND_PAUSE_FRAME_DESKTOP = 255;

  // gsap positioning values for the pauses
  const FIRST_PAUSE_POS = '51% 50%';

  const preloadImage = (src: string) =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = resolve;
      image.onerror = reject;
      image.src = src;
    });

  const frameUrls = useMemo(() => {
    const imageArr = [];
    for (let i = 1; i <= NUM_OF_FRAMES; i++) {
      if (isDesktop) {
        imageArr.push(`/assets/images/iris-sequence/output_${i.toString().padStart(4, '0')}.webp`);
      } else {
        imageArr.push(
          `/assets/images/iris-sequence-mobile/output_${i.toString().padStart(4, '0')}.webp`
        );
      }
    }
    return imageArr;
  }, [isDesktop]);

  useEffect(() => {
    frameUrls.forEach((url) => {
      const img = new Image();
      img.src = url;
      imagesRef.current.push(img);
    });
    return () => {
      imagesRef.current = [];
    };
  }, [frameUrls]);

  const render = useCallback((i: number) => {
    if (imagesRef.current.length < 1) return;
    canvasRef.current?.getContext('2d')?.clearRect(0, 0, 1000, 1000);
    if (imagesRef.current[i]) {
      canvasRef.current?.getContext('2d')?.drawImage(imagesRef.current[i], 0, 0);
    }
  }, []);

  useEffect(() => {
    if (frameUrls.length < 1) return;
    const promises = frameUrls.map((url) => preloadImage(url));
    Promise.all(promises).then(() => {});
  }, [frameUrls]);

  // for image sequencing
  useLayoutEffect(() => {
    if (frameUrls.length < 1) return;

    const mm = gsap.matchMedia();
    mm.add(
      { isDesktop: '(orientation: landscape)', isMobile: '(orientation: portrait)' },
      (ctx: any) => {
        const { isDesktop } = ctx.conditions;

        //SECTION 1
        // goes all the way until the grid with stats
        gsap.to(currentIndex.current, {
          i: FIRST_PAUSE_FRAME,
          roundProps: 'i',
          ease: 'none',
          scrollTrigger: {
            onUpdate: () => {
              render(currentIndex.current.i);
            },
            trigger: containerRef.current,
            start: 'start start',
            end: FIRST_PAUSE_POS,
            scrub: true,
          },
        });

        const contentTL = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: isDesktop ? '50% bottom+=80' : '50% bottom',
            end: '50% 85%',
            scrub: true,
            id: 'intro',
          },
        });
        contentTL.set(outerStatsContainerRef.current, { opacity: 0 });
        contentTL.fromTo(
          outerStatsContainerRef.current,
          { opacity: 0, filter: 'blur(15px)' },
          { opacity: 1, filter: 'blur(0px)' }
        );

        // SECTION 2
        // ----------
        // goes to "A Range That Reaches Farther"
        gsap.to(currentIndex.current, {
          i: isDesktop
            ? SECOND_PAUSE_FRAME_DESKTOP - FIRST_PAUSE_FRAME
            : SECOND_PAUSE_FRAME - FIRST_PAUSE_FRAME,
          roundProps: 'i',
          ease: 'none',
          scrollTrigger: {
            onUpdate: () => {
              const newI = currentIndex.current.i + FIRST_PAUSE_FRAME;
              render(newI);
            },
            trigger: containerRef.current,
            start: FIRST_PAUSE_POS,
            end: isDesktop ? '59% 50%' : '54% 50%',
            scrub: true,
          },
        });

        // SECTION 3
        //------------
        // final state
        gsap.to(currentIndex.current, {
          i: isDesktop
            ? frameUrls.length - 1 - SECOND_PAUSE_FRAME_DESKTOP
            : frameUrls.length - 1 - SECOND_PAUSE_FRAME,
          roundProps: 'i',
          ease: 'none',
          scrollTrigger: {
            onUpdate: () => {
              const newI =
                currentIndex.current.i +
                (isDesktop ? SECOND_PAUSE_FRAME_DESKTOP : SECOND_PAUSE_FRAME);
              render(newI);
            },
            start: isDesktop ? '70% 50%' : '75% 50%',
            end: isDesktop ? 'bottom bottom' : 'bottom bottom',
            scrub: true,
          },
        });
        /*  */
      },
      containerRef
    );

    return () => {
      mm.revert();
    };
  }, [frameUrls, render]);

  // shifts around <canvas>'s object position and fades in/out content from sticky container
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // moves image sequencing container to the anchor towards the bottom on mobile
      gsap.to('.js__canvas', {
        objectPosition: '50% 90%',
        scrollTrigger: {
          trigger: containerRef.current,
          start: '47% 50%',
          end: FIRST_PAUSE_POS,
          scrub: true,
        },
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: '53% 50%',
          end: '59% 50%',
          id: 'section-2',
          scrub: true,
        },
      });

      tl.fromTo(
        '.js__canvas',
        { objectPosition: '50% 90%' },
        { objectPosition: '50% 50%', immediateRender: false }
      );

      tl.to(['.js__header', '.js__subcopy1'], {
        autoAlpha: 1,
        filter: 'blur(0rem)',
      });
    }, containerRef);

    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        // start: isDesktop ? '70% 50%' : '75% 50%',
        // end: isDesktop ? '80% bottom' : 'bottom bottom',
        start: '70% 30%',
        end: '90% 50%',
        // markers: true,
        id: 'section-3',
        scrub: true,
      },
    });
    tl2.to(['.js__header', '.js__subcopy1'], {
      autoAlpha: 0,
      filter: 'blur(15rem)',
    });
    tl2.to('.js__subcopy2', {
      autoAlpha: 1,
      filter: 'blur(0rem)',
    });

    return () => {
      ctx.revert();
    };
  }, [isDesktop]);

  return (
    <Section className={styles.container} ref={containerRef}>
      <h2 className="sr-only">pMUT Technology</h2>
      <div className={styles.sequenceContainer}>
        <canvas
          width={isDesktop ? 1920 : 786}
          height={isDesktop ? 1080 : 1704}
          className={cx(styles.canvas, 'js__canvas')}
          ref={canvasRef}
        />
      </div>
      <div className={styles.outerStatsContainer} ref={outerStatsContainerRef}>
        <div className={styles.statsContainer}>
          <div className={styles.copyContainer}>
            <h3 className={styles.statsHeading}>{powerHeading}</h3>
            <p className={styles.statsCopy}>{powerCopy}</p>
            <ArrowLink isSmall href={pmutCta?.href}>
              {pmutCta?.label}
            </ArrowLink>
          </div>
          <div className={styles.statsGrid}>
            {physicalSpecsStatsCollection?.items.map((stat, index) => (
              <Stat key={index} label={stat.title} value={stat.description} {...stat} />
            ))}
          </div>
        </div>
      </div>{' '}
      <div className={styles.stickyContainer}>
        <h3 className={cx(styles.header, 'js__header')}>{celloHeading}</h3>
        <p className={cx(styles.subcopy, styles.subcopy1, 'js__subcopy1')}>{celloCopy1}</p>
        <p className={cx(styles.subcopy, styles.subcopy2, 'js__subcopy2')}>{celloCopy2}</p>
      </div>
    </Section>
  );
};
