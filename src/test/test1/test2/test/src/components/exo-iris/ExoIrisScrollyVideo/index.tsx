import { useMotionValueEvent, useScroll } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLayoutEffect, useRef } from 'react';

import { useLenis } from '~/components/layout/LenisWrapper';
import { cx } from '~/utils';

import styles from './ExoIrisScrollyVideo.module.scss';

export const ExoIrisScrollyVideo = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const lenis = useLenis();

  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (containerRef?.current === null) return;
    const video = containerRef.current.querySelector('video');
    if (video) {
      video.currentTime = latest * video.duration;
    }
  });

  // useLayoutEffect(() => {
  //   if (!lenis) return;
  //   lenis.on('scroll', ScrollTrigger.update);

  //   gsap.ticker.add((time) => {
  //     lenis.raf(time * 1000);
  //   });
  //   const ctx = gsap.context(() => {
  //     if (containerRef?.current === null) return;
  //     const video: HTMLVideoElement | null = containerRef.current.querySelector('.video');
  //     if (!video) return;
  //     const tl = gsap.timeline({
  //       defaults: { duration: 1 },
  //       scrollTrigger: {
  //         start: 'top top',
  //         end: 'bottom bottom',
  //         scrub: true,
  //       },
  //     });
  //     tl.fromTo(
  //       '.video',
  //       {
  //         currentTime: 0,
  //       },
  //       {
  //         currentTime: video.duration || 1,
  //       }
  //     );
  //   }, containerRef);
  //   return () => {
  //     ctx.revert();
  //   };
  // }, [lenis]);

  return (
    <section className={styles.container} ref={containerRef}>
      <div className={styles.videoContainer}>
        <video className="video">
          <source src="/assets/videos/exo-shot-keyint5.mp4" type="video/mp4" />
        </video>
      </div>
    </section>
  );
};
