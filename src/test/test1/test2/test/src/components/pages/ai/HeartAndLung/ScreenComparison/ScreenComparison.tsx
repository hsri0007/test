'use client';

import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';

import { AssetFragment } from '~/cms';
import { AbstractCircles } from '~/components/sections/BlobGradientHeroSection/AbstractCircle';
import { Phone } from '~/components/sections/MediaBackgroundSection';
import { DarkSection } from '~/components/ui/Section/DarkSection';
import { cx } from '~/utils';

import styles from './ScreenComparison.module.scss';

const StarFilled = ({ className }: { className?: string }) => {
  return (
    <svg className={className} viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12.0489 0.927052C12.3483 0.00574112 13.6517 0.00573993 13.9511 0.927051L16.1432 7.67376C16.2771 8.08578 16.661 8.36475 17.0943 8.36475H24.1882C25.1569 8.36475 25.5597 9.60436 24.7759 10.1738L19.0369 14.3435C18.6864 14.5981 18.5397 15.0495 18.6736 15.4615L20.8657 22.2082C21.1651 23.1295 20.1106 23.8956 19.3269 23.3262L13.5878 19.1565C13.2373 18.9019 12.7627 18.9019 12.4122 19.1565L6.67312 23.3262C5.88941 23.8956 4.83493 23.1295 5.13428 22.2082L7.32642 15.4615C7.46029 15.0495 7.31363 14.5981 6.96315 14.3435L1.22405 10.1738C0.440337 9.60436 0.843112 8.36475 1.81184 8.36475H8.90575C9.33897 8.36475 9.72293 8.08578 9.8568 7.67376L12.0489 0.927052Z"
        fill="currentColor"
      />
    </svg>
  );
};

const StarEmpty = ({ className }: { className?: string }) => {
  return (
    <svg className={className} viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12.7622 1.15881C12.8371 0.928485 13.1629 0.928488 13.2378 1.15881L15.4299 7.90552C15.6642 8.62656 16.3361 9.11475 17.0943 9.11475H24.1882C24.4303 9.11475 24.531 9.42465 24.3351 9.567L18.596 13.7367C17.9827 14.1823 17.726 14.9722 17.9603 15.6933L20.1524 22.44C20.2273 22.6703 19.9636 22.8618 19.7677 22.7195L14.0286 18.5498C13.4153 18.1042 12.5847 18.1042 11.9714 18.5498L6.23228 22.7195C6.03635 22.8618 5.77273 22.6703 5.84757 22.44L8.03971 15.6933C8.27399 14.9722 8.01734 14.1823 7.40398 13.7367L1.66489 9.567C1.46896 9.42465 1.56966 9.11475 1.81184 9.11475H8.90575C9.66389 9.11475 10.3358 8.62657 10.5701 7.90552L12.7622 1.15881Z"
        stroke="currentColor"
        stroke-width="1.5"
      />
    </svg>
  );
};

const ScreenComparison = ({
  title1,
  description1,
  title2,
  description2,
  imagesCollection,
}: {
  title1: string;
  description1: string;
  title2: string;
  description2: string;
  imagesCollection: {
    title: string;
    imageGoodQuality: AssetFragment | null;
    imageBadQuality: AssetFragment | null;
  }[];
}) => {
  const [activePhoneIndex, setActivePhoneIndex] = useState(0);
  const phoneContainerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!phoneContainerRefs.current.length) return;

    phoneContainerRefs.current.forEach((el, i) => {
      const isActive = activePhoneIndex === i;
      gsap.killTweensOf(el);
      const duration = 0.2;
      gsap.to(el, {
        autoAlpha: isActive ? 1 : 0,
        delay: isActive ? duration : 0,
        duration,
      });
    });
  }, [activePhoneIndex]);

  if (!title1 || !description1 || !title2 || !description2 || !imagesCollection?.length)
    return null;

  return (
    <div className={styles.ScreenComparison}>
      <DarkSection>
        <div className={styles.inner}>
          <AbstractCircles className={styles.circlesContainer} isDark={true} circleCount={3} />
          <div className={styles.inner__content}>
            <div className={styles.topText}>
              <h1 className={styles.topText__title}>{title1}</h1>
              <p className={styles.topText__description}>{description1}</p>
            </div>
            <div className={styles.bottomText}>
              <h2 className={styles.bottomText__title}>{title2}</h2>
              <p className={styles.bottomText__description}>{description2}</p>
            </div>
            <div className={styles.buttons}>
              {imagesCollection.map((item, i) => {
                return (
                  <>
                    {i === 1 && <div className={styles.lineBreak} />}
                    <button
                      onClick={() => {
                        setActivePhoneIndex(i);
                      }}
                      className={cx(styles.toggleButton, {
                        [styles.active]: i === activePhoneIndex,
                      })}
                      key={i}
                    >
                      {item.title}
                    </button>
                  </>
                );
              })}
            </div>
            <div className={styles.phoneComparisonMasterContainer}>
              {imagesCollection.map((item, i) => {
                return (
                  <div
                    className={styles.phonesContainer}
                    ref={(ref) => {
                      phoneContainerRefs.current[i] = ref;
                    }}
                    key={i}
                  >
                    <div className={styles.phoneContainer}>
                      <p className={styles.imageQualityTitle}>Image Quality</p>
                      <div className={styles.starsContainer}>
                        {new Array(5).fill(null).map((_, i) => (
                          <StarFilled key={i} className={styles.starFilled} />
                        ))}
                      </div>
                      <Phone className={styles.phone} mediaAsset={item.imageGoodQuality} />
                    </div>
                    <div className={styles.phoneContainer}>
                      <p className={styles.imageQualityTitle}>Image Quality</p>
                      <div className={styles.starsContainer}>
                        {new Array(5).fill(null).map((_, i) => {
                          if (i === 3 || i === 4) {
                            return <StarEmpty key={i} className={styles.starEmpty} />;
                          }

                          return <StarFilled key={i} className={styles.starFilled} />;
                        })}
                      </div>
                      <Phone className={styles.phone} mediaAsset={item.imageBadQuality} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </DarkSection>
    </div>
  );
};

ScreenComparison.displayName = 'ScreenComparison';

export default ScreenComparison;
