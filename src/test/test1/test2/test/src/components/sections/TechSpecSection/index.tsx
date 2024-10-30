'use client';

import { easeInOut, motion, useMotionTemplate, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

import { FeaturedTechSpecFragment } from '~/cms';
import { CMSImage, Section, SectionProps } from '~/components/ui';
import { useIsLandscape } from '~/hooks';
import { cx } from '~/utils';
import { OmitChildren } from '~/utils/types';

import styles from './TechSpecSection.module.scss';

interface TechSpecSectionProps
  extends Omit<OmitChildren<SectionProps>, 'title'>,
    FeaturedTechSpecFragment {
  alignRight?: boolean;
}

export const TechSpecSection = (props: TechSpecSectionProps) => {
  const {
    sys,
    additionalTechSpecsCollection,
    addPadding,
    addPaddingForPhones,
    className,
    title,
    description,
    image,
    mobileImage,
    verticalAlignment = false,
    alignRight = false,
    ...otherProps
  } = props;
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: [`start end`, `start start`],
  });
  const translateYValue = useTransform(scrollYProgress, [0, 1], [30, 0], { ease: easeInOut });
  const translateY = useMotionTemplate`${translateYValue}%`;
  const translateYCard = useMotionTemplate`-${translateYValue}%`;
  const blurValue = useTransform(scrollYProgress, [0, 1], [12, 0], { ease: easeInOut });
  const blur = useMotionTemplate`blur(${blurValue}rem)`;
  const isDesktop = useIsLandscape();

  const renderContent = (content: string | null) => {
    if (!content) {
      return null;
    }

    const lines = content.split('\n');

    return lines.map((line, index) => (
      <p className={styles.specDescription} key={index}>
        {line}
      </p>
    ));
  };

  const specs =
    additionalTechSpecsCollection && additionalTechSpecsCollection.items?.length
      ? additionalTechSpecsCollection.items.map((spec) => {
          return (
            <div className={styles.spec} key={`spec-${spec.sys.id}`}>
              {!!spec.title && <h3 className={styles.specTitle}>{spec.title}</h3>}
              {/*{!!spec.description && <p className={styles.specDescription}>{spec.description}</p>}*/}
              <div className={styles.specDescriptionWrapper}>{renderContent(spec.description)}</div>
            </div>
          );
        })
      : '';
  return (
    <Section
      {...otherProps}
      ref={sectionRef}
      className={cx(
        className,
        styles.section,
        addPadding && styles.addPadding,
        addPaddingForPhones && styles.addPaddingForPhones,
        alignRight ? styles.alignRight : styles.alignLeft
      )}
    >
      <div className={styles.content}>
        <motion.div
          className={cx(styles.imageWrapper, verticalAlignment && styles.alignVMiddle)}
          style={isDesktop ? { translateY, filter: blur } : {}}
        >
          {!!image && !!image?.url && (
            <CMSImage
              className={styles.image}
              asset={mobileImage ?? image}
              lg={{ asset: image, width: 300 }}
            />
          )}
        </motion.div>
        <div className={styles.cardSide}>
          <div className={styles.cardWrapper}>
            <motion.div className={styles.card} style={{ filter: blur }}>
              <div className={styles.cardHead}>
                {!!title && <h2 className={styles.cardTitle}>{title}</h2>}
                {!!description && (
                  <p
                    className={styles.cardDescription}
                    dangerouslySetInnerHTML={{ __html: description }}
                  ></p>
                )}
              </div>
              {specs}
            </motion.div>
          </div>
        </div>
      </div>
    </Section>
  );
};
