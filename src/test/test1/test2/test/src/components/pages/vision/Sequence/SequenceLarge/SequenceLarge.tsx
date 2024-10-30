import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLayoutEffect, useRef, useState } from 'react';

import { IconCrosshair } from '~/components/svgs';
import { Section } from '~/components/ui';
import { cx } from '~/utils';

import { SequenceProps } from '..';
import { DotAnimation } from '../DotAnimation';
import styles from './SequenceLarge.module.scss';

gsap.registerPlugin(ScrollTrigger);

const SequenceLarge = (props: SequenceProps) => {
  const { items } = props;

  const refContainer = useRef<HTMLElement | null>(null);
  const [currentSection, setCurrentSection] = useState(-1);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const numbers = gsap.utils.toArray('.gsap-number');
      const contents = gsap.utils.toArray('.gsap-content');

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: refContainer.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
          onLeave: () => {
            setCurrentSection(-1);
          },
          onLeaveBack: () => {
            setCurrentSection(-1);
          },
          // snap: {
          //   snapTo: 'labelsDirectional',
          //   duration: { min: 0.25, max: 0.5 },
          //   delay: 0,
          //   ease: 'power1.out',
          // },
        },
      });

      const createEnter = (index: number, pos?: gsap.Position) => {
        timeline.call(
          () => {
            setCurrentSection(index);
          },
          undefined,
          `${pos}+=0.25`
        );
        timeline.fromTo(
          [numbers[index], contents[index]],
          { y: '100%' },
          { y: 0, duration: 0.5, ease: 'power1.inOut' },
          pos
        );
      };

      const createExit = (index: number, pos?: gsap.Position) => {
        timeline.call(
          () => {
            setCurrentSection(index);
          },
          undefined,
          `${pos}+=0.25`
        );
        timeline.to(
          [numbers[index], contents[index]],
          {
            y: ' -100%',
            duration: 0.5,
            ease: 'power1.inOut',
          },
          pos
        );
      };

      createEnter(0);

      timeline.addLabel('part-1');
      createExit(0, 'part-1');
      createEnter(1, 'part-1');
      timeline.to({ pause: 0 }, { pause: 1, ease: 'linear', duration: 0.25 });

      timeline.addLabel('part-2');
      createExit(1, 'part-2');
      createEnter(2, 'part-2');
      timeline.to({ pause: 0 }, { pause: 1, ease: 'linear', duration: 0.25 });

      timeline.addLabel('part-3');
      createExit(2, 'part-3');
      createEnter(3, 'part-3');
      timeline.to({ pause: 0 }, { pause: 1, ease: 'linear', duration: 0.25 });

      timeline.addLabel('part-4');
      createExit(3, 'part-4');
    }, refContainer);

    return () => ctx.revert();
  }, [setCurrentSection, currentSection]);

  return (
    <Section className={styles.container} isDark ref={refContainer}>
      <div className={styles.grid}>
        <div className={styles.columnLeft}>
          <div className={styles.numbers}>
            {items.map((item, index) => (
              <p className={cx(styles.number, 'gsap-number')} key={index}>
                {item.number}
              </p>
            ))}
          </div>

          <div className={styles.particles}>
            <IconCrosshair className={styles.crosshair} />
            <DotAnimation className={styles.image} animation={currentSection} />
          </div>
        </div>

        <div className={styles.columnRight}>
          {items.map((item, index) => (
            <div className={cx(styles.content, 'gsap-content')} key={index}>
              <p className={styles.contentHeading}>{item.heading}</p>
              <p className={styles.contentCopy}>{item.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export { SequenceLarge };
