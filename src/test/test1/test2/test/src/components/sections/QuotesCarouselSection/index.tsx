'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import {
  ExoIrisContentFragment,
  ExoWorksContentFragment,
  Maybe,
  QuoteCarouselSectionFragment,
  TestimonialCollection,
  TestimonialFragment,
} from '~/cms';
import { QuotationOpen } from '~/components/svgs/QuotationOpen';
import { CarouselIndicator, Section, SectionProps } from '~/components/ui';
import { useIsLandscape } from '~/hooks';
import { cx } from '~/utils';

import styles from './QuotesCarouselSection.module.scss';
import { QuotationImage } from './QuotesImage';

// This should be updated to not use partial once the CMS entries have been fixed
interface QuotesCarouselSectionProps extends Partial<QuoteCarouselSectionFragment>, SectionProps {
  testimonials: Maybe<QuoteCarouselSectionFragment['quotesCollection']>;
}

export const QuotesCarouselSection = (props: QuotesCarouselSectionProps) => {
  const testimonials = useMemo(() => props.testimonials?.items ?? [], [props.testimonials?.items]);
  const indicator = true;
  const { isDark, darkTheme, className } = props;
  const [[carouselIndex, direction], setCarouselIndex] = useState([0, 0]);
  const swipeConfidenceThreshold = 10000;
  const slideRef = useRef<HTMLDivElement | null>(null);
  const isLandscape = useIsLandscape();

  const dark = darkTheme === null ? isDark ?? false : darkTheme;

  const variants = useMemo(
    () => ({
      intro: () => {
        return {
          opacity: 0,
        };
      },
      idle: {
        zIndex: 1,
        x: 0,
        opacity: 1,
      },
      outro: () => {
        return {
          zIndex: 0,
          opacity: 0,
        };
      },
    }),
    []
  );

  const paginate = useCallback(
    (newDirection: number) => {
      let nextIndex = carouselIndex + newDirection;
      if (nextIndex < 0) nextIndex = testimonials.length - 1;
      if (nextIndex > testimonials.length - 1) nextIndex = 0;
      gotoSlide(nextIndex, newDirection);
    },
    [carouselIndex, testimonials.length]
  );

  const gotoSlide = (index: number, direction?: number) => {
    setCarouselIndex([index, direction ?? 0]);
  };

  const sliderContent = useMemo(() => {
    const quoteLength = testimonials[carouselIndex]?.content?.length ?? 1;
    const fontSize = isLandscape
      ? `clamp(20rem, calc(3.5vw * ${1 / Math.pow(1.1, quoteLength / 100)}), 60rem)`
      : `clamp(3rem, calc(6vw * ${1 / Math.pow(1.1, quoteLength / 100)} ), 28rem)`;
    return (
      <>
        {testimonials[carouselIndex]?.photo?.url && (
          <div className={styles.imageContainer}>
            <QuotationImage
              title={'quotationMarkIcon'}
              imgSrc={testimonials[carouselIndex].photo?.url!}
              altText={testimonials[carouselIndex].photo?.description!}
            />
          </div>
        )}

        <div
          className={cx(
            styles.quoteContainer,
            testimonials[carouselIndex]?.photo?.url && styles.quoteImageSpacer
          )}
        >
          {!testimonials[carouselIndex]?.photo?.url && (
            <QuotationOpen className={cx(styles.quoteIcon, dark && styles.darkModeSVG)} />
          )}
          <q
            className={cx(
              styles.quote,
              testimonials[carouselIndex]?.photo?.url && styles.imageQuote
            )}
            style={{ fontSize }}
          >
            {testimonials[carouselIndex]?.content}
          </q>
          <div className={cx(styles.quoteInfo, dark && styles.darkMode)}>
            {testimonials[carouselIndex]?.attribution}
            <br />
            {testimonials[carouselIndex]?.attributionDetail}
          </div>
        </div>
      </>
    );
  }, [carouselIndex, dark, testimonials, isLandscape]);

  useEffect(() => {
    const interval = setInterval(() => {
      paginate(1);
    }, 7000);

    return () => clearInterval(interval);
  });

  const quoteSlides = useMemo(
    () => (
      <AnimatePresence initial={false} custom={direction} mode={'wait'} key={'q' + carouselIndex}>
        <motion.div
          ref={slideRef}
          className={cx(
            styles.quoteSlide,
            testimonials[carouselIndex]?.photo?.url && styles.imageView,
            dark && styles.darkMode
          )}
          variants={variants}
          custom={direction}
          initial="intro"
          animate="idle"
          exit="outro"
          transition={{
            opacity: { duration: 0.333 },
          }}
          onClick={(e) => {
            paginate(1);
          }}
        >
          {sliderContent}
        </motion.div>
      </AnimatePresence>
    ),
    [carouselIndex, dark, direction, paginate, sliderContent, testimonials, variants]
  );

  return (
    <Section
      isDark={dark}
      className={className ? styles[className] : styles.quotesCarouselContainer}
      id="quotes-carousel-section"
    >
      <div className={styles.quotesCarouselInnerContainer}>
        {quoteSlides}
        {indicator && (
          <CarouselIndicator
            data-accent-color="foreground"
            className={styles.indicator}
            activeIndex={carouselIndex}
            count={testimonials.length}
            onClick={gotoSlide}
          />
        )}
      </div>
    </Section>
  );
};
