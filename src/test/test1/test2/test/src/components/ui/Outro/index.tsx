'use client';

import {
  easeInOut,
  motion,
  useMotionTemplate,
  useScroll,
  useTime,
  useTransform,
} from 'framer-motion';
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

import { OutroFragment } from '~/cms';
import { BackgroundCanvas, BackgroundConfig } from '~/components/3d';
import { ButtonLink } from '~/components/ui/ButtonLink';
import { Section, SectionProps } from '~/components/ui/Section';
import { useIsLandscape } from '~/hooks';
import { useGlobalStore } from '~/stores/globalStore';
import { cx } from '~/utils';
import { ColorName, OmitChildren } from '~/utils/types';

import styles from './Outro.module.scss';
import bgConfig from './bgConfig.yml';
import bgConfigWorks from './bgConfigWorks.yml';

type OutroPropsParents = OmitChildren<SectionProps> & Partial<OutroFragment>;

interface OutroProps extends OutroPropsParents {
  primaryColor?: ColorName;
  secondaryColor?: ColorName;
  postButtonContent?: React.ReactNode;
}

const MARQUEE_OFFSET = 0.3333;

export const Outro = (props: OutroProps) => {
  const {
    heading,
    copy,
    ctasCollection,
    animatedHeading = false,
    hideBackground = false,
    primaryColor = 'exo-blue',
    secondaryColor = 'exo-fluro',
    className,
    postButtonContent,
    ...otherProps
  } = props;

  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const [headingWidth, setHeadingWidth] = useState(1);
  const { windowWidth } = useGlobalStore(['windowWidth']);

  const ctas = useMemo(() => ctasCollection?.items ?? [], [ctasCollection]);

  // If there is no content this section has zero height
  const hasNoContent = useMemo(
    () => !(heading || copy || (ctas && ctas.length)),
    [copy, ctas, heading]
  );

  // CTAs
  const ctaElements = useMemo(
    () =>
      !!ctas && ctas.length
        ? ctas.map((cta, index) => {
            return (
              <li key={cta.sys.id}>
                <ButtonLink secondary={index > 0} href={cta.href}>
                  {cta.label}
                </ButtonLink>
              </li>
            );
          })
        : null,
    [ctas]
  );

  // Heading Animation
  const isDesktop = useIsLandscape();
  const { scrollY, scrollYProgress } = useScroll({
    target: sectionRef,
    offset: [isDesktop ? 'center end' : 'start center', 'end center'],
  });

  useLayoutEffect(() => {
    const headingElement = headingRef.current;
    if (windowWidth && headingElement) {
      setHeadingWidth(headingElement.getBoundingClientRect()?.width ?? 1);
    }
  }, [windowWidth]);

  // useEffect(() => {
  //   const headingElement = headingRef.current;
  //   if (windowWidth && headingElement) {
  //     setHeadingWidth(headingElement.getBoundingClientRect()?.width ?? 1);
  //   }
  // }, [windowWidth]);

  const contentTranslateValue = useTransform(
    isDesktop ? scrollYProgress : scrollY,
    [0, 1],
    [0, 100],
    {}
  );

  const contentTranslate = useMotionTemplate`${contentTranslateValue}%`;

  const headingWidthOffset = isDesktop ? headingWidth / 4 : headingWidth;
  const headingTranslateValue = useTransform(
    scrollYProgress,
    [0, 1],
    [0, (headingWidthOffset + windowWidth * (isDesktop ? MARQUEE_OFFSET : 0.2)) * -1],
    { ease: easeInOut }
  );
  const headingTranslate = useMotionTemplate`${headingTranslateValue}rem`;

  return (
    <Section
      {...otherProps}
      ref={sectionRef}
      className={cx(
        className,
        styles.section,
        !!copy && styles.hasCopy,
        !heading && styles.noHeading,
        hasNoContent && styles.noHeight,
        animatedHeading && styles.animatedHeading
      )}
    >
      {!hideBackground && (
        <div className={styles.background}>
          <BackgroundCanvas
            backgroundColor={0xffffff}
            config={
              primaryColor === 'works-purple'
                ? (bgConfigWorks as BackgroundConfig)
                : (bgConfig as BackgroundConfig)
            }
            className={styles.gradientBackground}
          />
        </div>
      )}
      <motion.div
        className={styles.content}
        style={animatedHeading ? { translateY: contentTranslate } : {}}
      >
        <div className={styles.headingContainer}>
          {!!heading && (
            <motion.h2
              className={styles.heading}
              ref={headingRef}
              style={animatedHeading ? { translateX: headingTranslate } : {}}
            >
              {heading}
            </motion.h2>
          )}
        </div>
        {!!copy && <p className={styles.copy}>{copy}</p>}
        {!!ctaElements && <ul className={styles.ctas}>{ctaElements}</ul>}
        {postButtonContent && <>{postButtonContent}</>}
      </motion.div>
    </Section>
  );
};
