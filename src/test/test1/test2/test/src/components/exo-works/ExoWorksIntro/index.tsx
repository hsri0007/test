import { gsap } from 'gsap';
import { useLayoutEffect, useRef } from 'react';

import { ExoWorksContentFragment, Maybe } from '~/cms';
import { Section } from '~/components/ui';
import { useIsLandscape } from '~/hooks';
import { cx } from '~/utils';

import styles from './ExoWorksIntro.module.scss';

interface ExoWorksIntroProps {
  introTitle: ExoWorksContentFragment['introTitle'];
  introFeatureList: ExoWorksContentFragment['introFeatureList'];
}

export const ExoWorksIntro = (props: ExoWorksIntroProps) => {
  const containerRef = useRef(null);
  const isDesktop = useIsLandscape();

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(
      { isDesktop: '(orientation: landscape)', isMobile: '(orientation: portrait)' },
      (ctx: any) => {
        const { isDesktop } = ctx.conditions;
        const settledDevices = ['.js__laptop', '.js__tablet', '.js__phone'];

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            scrub: true,
            // markers: true,
            start: isDesktop ? '0% 100%' : '0% 100%',
            end: isDesktop ? '100% 0%' : '100% 0%',
            // snap: {
            //   snapTo: 'labelsDirectional',
            //   duration: { min: 0.25, max: 0.5 },
            //   delay: 0,
            //   ease: 'power1.out',
            // },
          },
        });
        tl.fromTo(
          '.js__header',
          { y: '100vh' },
          {
            y: '0',
            duration: 4,
            ease: 'power1.out',
          },
          0
        );

        tl.fromTo(
          '.js__list',
          { y: '100vh' },
          {
            y: '0',
            duration: 4,
            ease: 'power1.out',
          },
          1
        );
        tl.fromTo(
          settledDevices,
          { x: '100vw' },
          { x: 0, stagger: 0.25, duration: 4, ease: 'power1.out' },
          3
        );
        tl.addLabel('devicesSettles');
        tl.to({ pause: 0 }, { pause: 1, duration: 0.5, ease: 'linear' });

        // const tl2 = gsap.timeline({
        //   scrollTrigger: {
        //     trigger: containerRef.current,
        //     scrub: true,
        //     // markers: true,
        //     start: isDesktop ? '100% 100%' : '100% 100%',
        //     end: isDesktop ? '100% 0%' : '100% 0%',
        //     immediateRender: false,
        //   },
        // });

        tl.to('.js__header', {
          y: '-100vh',
          duration: 4,
          ease: 'power1.in',
        });
        tl.to(
          '.js__list',
          {
            y: '-100vh',
            duration: 4,
            ease: 'power1.in',
          },
          '<+=1'
        );
        tl.to(
          settledDevices,
          { y: '-100vh', stagger: 0.1, duration: 4, ease: 'power1.in' },
          '<+=1'
        );
      },
      containerRef
    );
    return () => mm.revert();
  }, [isDesktop]);

  return (
    <Section className={styles.container} isDark ref={containerRef}>
      <div className={styles.contentWrapper}>
        <div className={styles.stickyContainer}>
          <div className={styles.contentContainer}>
            <h2 className={cx(styles.header, 'js__header')}>{props.introTitle}</h2>
            <ul className={cx(styles.list, 'js__list')}>
              {props.introFeatureList?.map((item, i) => (
                <li key={i} className={styles.listItem}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className={cx(styles.imagesContainer, 'js__images-container')}>
            <img
              src="/assets/images/exo-works/iPhone_11.webp"
              alt="phone with Exo Works on it"
              className={cx(styles.image, styles.phone, 'js__phone')}
            />
            <img
              src="/assets/images/exo-works/iPad_11.webp"
              alt="tablet with Exo Works on it"
              className={cx(styles.image, styles.tablet, 'js__tablet')}
            />
            <img
              src="/assets/images/exo-works/Laptop_11.webp"
              alt="laptop with Exo Works on it"
              className={cx(styles.image, styles.laptop, 'js__laptop')}
            />
          </div>
        </div>
      </div>
    </Section>
  );
};
