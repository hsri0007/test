'use client';

import { easeInOut, motion, useMotionTemplate, useScroll, useTransform } from 'framer-motion';
import { useEffect, useId, useMemo, useRef, useState } from 'react';

import { ResponsiveVideoSectionFragment } from '~/cms';
import { useLenis } from '~/components/layout/LenisWrapper';
import { Section, SectionProps, Video } from '~/components/ui';
import { useColWidth, useGridGap, useIsLandscape, useSidePadding } from '~/hooks';
import { useGlobalStore } from '~/stores/globalStore';
import { cx } from '~/utils';
import { easeOut, evilEase } from '~/utils/client';

import styles from './VideoSection.module.scss';

interface VideoSectionProps extends SectionProps, ResponsiveVideoSectionFragment {}

export const VideoSection = (props: VideoSectionProps) => {
  const {
    className,
    darkTheme,
    children,
    video,
    mobileVideo,
    previewVideo,
    backgroundVideo,
    heading,
    eyebrow,
    isDark,
    ...otherProps
  } = props;
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isReady, setIsReady] = useState(false);
  const id = useId();
  const { windowWidth } = useGlobalStore(['windowWidth']);
  const sidePadding = useSidePadding();
  const isLandscape = useIsLandscape();
  const colWidth = useColWidth();
  const gridGap = useGridGap();
  const initialMaskWidth = useMemo(
    () =>
      isLandscape
        ? windowWidth - sidePadding * 2 - colWidth * 2 - gridGap * 2
        : windowWidth - sidePadding * 2,
    [colWidth, gridGap, isLandscape, sidePadding, windowWidth]
  );
  const initialMaskScale = initialMaskWidth / windowWidth;
  const lenis = useLenis();
  const hasCopy = !!heading || !!eyebrow;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['0.4 center', 'center center'],
  });
  const { scrollYProgress: scrollYProgressIn } = useScroll({
    target: sectionRef,
    offset: [`start end`, `end end`],
  });

  const { scrollYProgress: scrollYProgressStart } = useScroll({
    target: sectionRef,
    offset: [`start end`, `start start`],
  });

  const maskScale = useTransform(scrollYProgress, [0, 1], [initialMaskScale, 1], {
    ease: easeOut,
  });
  const maskBorderRadius = useTransform(scrollYProgress, [0, 1], [20, 0], {
    ease: easeOut,
  });
  const videoScale = useTransform(scrollYProgress, [0, 1], [1 / initialMaskScale, 1], {
    ease: easeOut,
  });
  const videoTransformValue = useTransform(scrollYProgressIn, [0, 1], [-99, 0], {
    clamp: true,
  });
  const videoTransform = useMotionTemplate`${videoTransformValue}%`;

  const borderRadius = useMotionTemplate`${maskBorderRadius}rem`;

  // Fades the video when there is copy over it
  const videoOpacity = useTransform(scrollYProgressStart, [0, 1], [1.2, 0.5], {
    ease: easeInOut,
    clamp: true,
  });

  const copyOpacity = useTransform(scrollYProgressStart, [0, 1], [-0.7, 1], {
    ease: easeInOut,
  });

  const copyBlurValue = useTransform(scrollYProgressStart, [0, 1], [20, 0], {
    ease: easeInOut,
  });

  const copyBlur = useMotionTemplate`blur(${copyBlurValue}px)`;

  useEffect(() => {
    setIsReady(true);
  }, []);

  return (
    <Section
      id={id}
      {...otherProps}
      isDark={isDark !== undefined ? isDark : darkTheme === true}
      className={cx(className)}
      ref={sectionRef}
      data-section="video-section"
    >
      <motion.div
        className={styles.mask}
        style={{
          scale: maskScale,
          borderRadius,
        }}
      >
        <motion.div
          style={{
            width: '100%',
            height: '100%',
            scale: videoScale,
            position: 'relative',
            opacity: hasCopy ? videoOpacity : 1,
          }}
        >
          {video?.url && (
            <Video
              isBackgroundVideo={hasCopy || (backgroundVideo ?? false)}
              url={video.url}
              altText={video.description}
              mobileUrl={mobileVideo?.url}
              previewUrl={previewVideo?.url}
              onClickPlay={() => {
                lenis.scrollTo(sectionRef.current);
              }}
            />
          )}
        </motion.div>
        {hasCopy && (
          <motion.div
            className={styles.copyContainer}
            style={{ opacity: copyOpacity, filter: copyBlur }}
          >
            {!!eyebrow && <h3 className={styles.eyebrow}>{eyebrow}</h3>}
            <h2 className={styles.heading}>{heading}</h2>
          </motion.div>
        )}
      </motion.div>
    </Section>
  );
};

export default VideoSection;
