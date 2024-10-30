'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from 'react';

import { ArticleCarouselArticleFragment } from '~/cms';
import { ArrowRight } from '~/components/svgs/ArrowRight';
import { ArrowLink, ExoLink, Section, SectionProps } from '~/components/ui';
import { useIsLandscape, useIsPortrait } from '~/hooks';
import { useGlobalStore } from '~/stores/globalStore';
import { cx, generateArticleUrl } from '~/utils';
import { evilEase } from '~/utils/client';
import { OmitChildren } from '~/utils/types';

import styles from './ArticleCarouselSectionContent.module.scss';

export interface ArticleDataItem extends ArticleCarouselArticleFragment {
  formattedDate: string;
}

export interface ArticleCarouselSectionContentProps extends OmitChildren<SectionProps> {
  articleData: ArticleDataItem[];
  heading?: string | null;
}

export const ArticleCarouselSectionContent = (props: ArticleCarouselSectionContentProps) => {
  const { className, articleData, heading, ...otherProps } = props;

  const id = useId();
  const articlesWrapperRef = useRef<HTMLDivElement | null>(null);
  const [step, setStep] = useState(0);
  const isSm = useIsPortrait();
  const isLg = useIsLandscape();
  const articlesPerStep = isLg ? 3 : isSm ? 2 : 1;
  const articleCount = articleData.length ?? 0;
  const stepCount = useMemo(
    () => Math.ceil(articleCount / articlesPerStep),
    [articleCount, articlesPerStep]
  );

  const { windowWidth } = useGlobalStore(['windowWidth']);

  useEffect(() => {
    if (windowWidth) {
      setStep(0);
    }
  }, [windowWidth]);

  const articles = useMemo(
    () =>
      articleData.map((article, index) => {
        const href = generateArticleUrl(article.category, article.slug, article.migrationSlug);
        const isActive =
          index >= step * articlesPerStep && index < step * articlesPerStep + articlesPerStep;
        return (
          <motion.div
            className={styles.articleWrapper}
            key={`${id}-${article.sys.id}`}
            initial={{ opacity: 0, translateX: 0, filter: 'blur(50rem)' }}
            data-test={index % articlesPerStep}
            style={{ pointerEvents: isActive ? 'all' : 'none' }}
            transition={{
              type: 'spring',
              ease: evilEase,
              duration: 1,
              bounce: 0,
              delay: isActive ? (index % articlesPerStep) * (1 / articlesPerStep / 2) : 0,
            }}
            animate={{
              translateX: `-${step * articlesPerStep * 100}%`,
              opacity: isActive ? 1 : 0,
              filter: isActive ? `blur(0rem)` : `blur(50rem)`,
            }}
          >
            <ExoLink
              className={styles.articleHeadingAnchor}
              href={article.category === 'Media Coverage' ? article.slug : href}
              tabIndex={isActive ? 0 : -1}
              isExternal={article.category === 'Media Coverage'}
            >
              <article className={styles.article}>
                <div className={styles.articleContent}>
                  <time dateTime={article.date} className={styles.date}>
                    {article.formattedDate}
                  </time>

                  <h3 className={styles.articleHeading}>{article.shortTitle ?? article.title}</h3>

                  <p className={styles.excerpt}>{article.excerpt}</p>
                  <div className={styles.spacer} />
                  <ArrowLink
                    className={styles.arrowLink}
                    tabIndex={isActive ? 0 : -1}
                    isExternal={article.category === 'Media Coverage'}
                    isResponsive
                    href={article.category === 'Media Coverage' ? article.slug : href}
                    isSpan
                  >
                    Read more
                  </ArrowLink>
                  <span className={styles.hoverOutline} />
                </div>
              </article>
            </ExoLink>
          </motion.div>
        );
      }),
    [articleData, articlesPerStep, id, step]
  );

  const handlePrevious = useCallback(() => {
    if (step > 0) {
      setStep(step - 1);
    }
  }, [step]);

  const handleNext = useCallback(() => {
    if (step + 1 < stepCount) {
      setStep(step + 1);
    }
  }, [step, stepCount]);

  return (
    <Section {...otherProps} className={cx(styles.section, className)}>
      <div className={styles.header}>
        <h2 className={styles.heading}>{heading}</h2>
        <div className={styles.controls}>
          <button
            className={cx(styles.previous, !(step > 0) && styles.disabled)}
            onClick={handlePrevious}
            aria-label="Previous"
          >
            <ArrowRight />
          </button>
          <div className={styles.counter}>
            <span className={styles.current}>{step + 1}</span>
            <span className={styles.slash}>/</span>
            <span className={styles.total}>{stepCount}</span>
          </div>
          <button
            className={cx(styles.next, !(step + 1 < stepCount) && styles.disabled)}
            onClick={handleNext}
            aria-label="Next"
          >
            <ArrowRight />
          </button>
        </div>
      </div>
      <div className={styles.articlesWrapper}>
        <div className={styles.articles} ref={articlesWrapperRef}>
          {articles}
        </div>
      </div>
    </Section>
  );
};
