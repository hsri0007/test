'use client';

import { motion } from 'framer-motion';
import gsap from 'gsap';
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef } from 'react';

import { Asset, AssetFragment, ExoIrisContentFragment, Maybe, Sys } from '~/cms';
import { ArrowLink, CMSImage, Section } from '~/components/ui';
import { useIsLandscape, useIsPortrait } from '~/hooks';
import { cx, externalToIsExternal } from '~/utils';

import styles from './ExoIrisImageSequence.module.scss';

type currentIndexType = {
  i: number;
};

interface StatProps {
  image: AssetFragment | null;
  title: string | null;
  description: string | null;
}

const Stat = ({ image, title, description }: StatProps) => {
  return (
    <div className={cx(styles.statContainer, 'js__stat')}>
      {image && (
        <CMSImage
          width={image?.width || 100}
          height={image?.height || 100}
          className={styles.statIcon}
          asset={image}
          loading="lazy"
        />
      )}
      <div className={styles.statValue}>{title}</div>
      <div className={styles.statLabel}>{description}</div>
    </div>
  );
};

interface ExoIrisImageSequenceProps {
  heading: ExoIrisContentFragment['powerHeading'];
  subhead: ExoIrisContentFragment['powerSubhead'];
  copy: ExoIrisContentFragment['powerCopy'];
  cta: ExoIrisContentFragment['powerCta'];
  stats: ExoIrisContentFragment['powerStatsCollection'];
}

export const ExoIrisImageSequence = (props: ExoIrisImageSequenceProps) => {
  const { heading, subhead, copy, cta, stats } = props;

  const isTablet = useIsPortrait();
  const isDesktop = useIsLandscape();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const bottomContainerRef = useRef<HTMLDivElement | null>(null);
  const statsRef = useRef<HTMLDivElement | null>(null);
  const currentIndex = useRef<currentIndexType>({ i: 0 });
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const lastIndex = useRef<number>(0);

  const NUM_OF_FRAMES = 240;

  const preloadImage = (image: HTMLImageElement, src: string) => {
    return new Promise((resolve, reject) => {
      image.onload = resolve;
      image.onerror = reject;
      image.src = src;
    });
  };

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

  const render = useCallback((i: number) => {
    if (imagesRef.current.length < 1) return;
    canvasRef.current?.getContext('2d')?.clearRect(0, 0, 1000, 1000);
    canvasRef.current?.getContext('2d')?.drawImage(imagesRef.current[i], 0, 0);
  }, []);

  useEffect(() => {
    frameUrls.forEach((url, index) => {
      const img = new Image();
      const promise = preloadImage(img, url);
      if (index == 0) {
        promise.then(() => {
          render(0);
        });
      }
      imagesRef.current.push(img);
    });
    return () => {
      imagesRef.current = [];
    };
  }, [frameUrls, render]);

  // for image sequencing
  useLayoutEffect(() => {
    if (frameUrls.length < 1) return;

    const ctx = gsap.context(() => {
      gsap.to(currentIndex.current, {
        i: frameUrls.length - 1,
        roundProps: 'i',
        ease: 'none',
        scrollTrigger: {
          onUpdate: () => render(currentIndex.current.i),
          trigger: containerRef.current,
          start: 'start start',
          end: '80% end',
          // markers: true,
          scrub: 0.65,
        },
      });

      const contentTL = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: isDesktop ? '80% 80%' : '80% 70%',
          end: isDesktop ? '80% 50%' : '80% 50%',
          scrub: true,
          id: 'intro',
        },
      });
      contentTL.set(bottomContainerRef.current, { autoAlpha: 0, filter: 'blur(15px)' });
      contentTL.fromTo(
        bottomContainerRef.current,
        { autoAlpha: 0, filter: 'blur(15px)' },
        { autoAlpha: 1, filter: 'blur(0px)' }
      );

      if (isTablet) {
        const statsDivs: HTMLDivElement[] = gsap.utils.toArray('.js__stat');
        statsDivs.forEach((div) => {
          const statsTL = gsap.timeline({
            scrollTrigger: {
              trigger: div,
              start: 'top 70%',
              end: 'top 50%',
              scrub: true,
            },
          });

          statsTL.set(div, { autoAlpha: 0, filter: 'blur(15px)' });
          statsTL.fromTo(
            div,
            { autoAlpha: 0, filter: 'blur(15px)' },
            { autoAlpha: 1, filter: 'blur(0px)' }
          );
        });
      }
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [frameUrls, render, isTablet, isDesktop]);

  // moves image sequencing container to the anchor towards the bottom on mobile
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.js__canvas', {
        objectPosition: '50% 90%',
        scrollTrigger: {
          trigger: containerRef.current,
          start: '70% 50%',
          end: '85% 50%',
          scrub: true,
        },
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <Section className={styles.container} ref={containerRef}>
      <div className={styles.headingContainer}>
        <h2 className={styles.heading} id="image-sequence-heading">
          {heading}
        </h2>
      </div>
      {/* <div className={styles.sequenceContainer}>
        <canvas
          width={isDesktop ? 1920 : 786}
          height={isDesktop ? 1080 : 1704}
          className={cx(styles.canvas, 'js__canvas')}
          ref={canvasRef}
        />
      </div> */}
      {/* <div className={styles.outerBottomContainer} ref={bottomContainerRef}>
        <div className={styles.bottomContainer}>
          <div className={styles.copyContainer}>
            <h3 className={styles.bottomHeading}>{subhead}</h3>
            <p className={styles.bottomCopy}>{copy}</p>
            <ArrowLink isSmall {...externalToIsExternal(cta)} />
          </div>
          <div className={styles.statsGrid} ref={statsRef}>
            {stats?.items.map((item) => (
              <Stat key={item.sys.id} {...item} />
            ))}
          </div>
        </div>
      </div>{' '} */}
    </Section>
  );
};
