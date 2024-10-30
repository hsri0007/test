'use client';

import { useEffect, useMemo, useState } from 'react';

import { Asset, AssetFragment, ExoIrisContentFragment, Maybe, Sys } from '~/cms';
import { ArrowLink, CMSImage, Section, SectionProps, Video } from '~/components/ui';
import PhoneCarousel from '~/components/ui/PhoneCarousel';
import { useIsLandscape, useIsMobile } from '~/hooks';
import { cx } from '~/utils';
import { OmitChildren } from '~/utils/types';

import styles from './MediaBackgroundSection.module.scss';

interface MediaBackgroundSectionProps extends OmitChildren<SectionProps> {
  logo?: { src: string };
  heading?: string;
  copy?: string;
  desktopImage: Maybe<AssetFragment>;
  mobileImage: Maybe<AssetFragment>;
  cta?: { href?: string; label: string };
  side?: 'left' | 'right';
  caption: Maybe<string>;
  ecosystemFeatureImage1Desktop: Maybe<AssetFragment>;
  ecosystemFeatureImage1Mobile: Maybe<AssetFragment>;
  ecosystemFeatureImage2Desktop: Maybe<AssetFragment>;
  ecosystemFeatureImage3Desktop: Maybe<AssetFragment>;
  ecosystemFeature1MediaCollection: ExoIrisContentFragment['seeDeeperPhoneCarouselCollection'];
}

export const MediaBackgroundSection = (props: MediaBackgroundSectionProps) => {
  const {
    className,
    isHalf,
    side,
    isDark,
    logo,
    heading,
    copy,
    desktopImage,
    mobileImage,
    cta,
    caption,
    ecosystemFeatureImage1Desktop,
    ecosystemFeatureImage1Mobile,
    ecosystemFeatureImage2Desktop,
    ecosystemFeatureImage3Desktop,
    ecosystemFeature1MediaCollection,
    ...otherProps
  } = props;

  const isLandscape = useIsLandscape();

  const assetsToUse = isLandscape
    ? [ecosystemFeatureImage2Desktop, ecosystemFeatureImage1Desktop, ecosystemFeatureImage3Desktop]
    : [ecosystemFeatureImage1Mobile];

  return (
    <Section
      {...otherProps}
      isHalf={isHalf}
      isDark={isDark && !isHalf}
      className={cx(
        styles.section,
        isHalf && styles.isHalf,
        side && styles[side],
        isDark && styles.dark,
        className
      )}
    >
      <div className={styles.container} data-theme={isDark ? 'dark' : 'light'}>
        <div className={styles.topGradient} />
        <div className={styles.bottomGradient} />

        <div className={styles.content}>
          {!!logo && (
            <img
              loading="lazy"
              alt="Exo AI"
              width="90"
              height="35"
              className={styles.logo}
              {...logo}
            />
          )}
          {!!heading && <h2 className={styles.heading}>{heading}</h2>}
          {!!copy && isLandscape && <p className={styles.copy}>{copy}</p>}
          {/* <div className={styles.phonesContainer}>
            {assetsToUse[0] && <Phone mediaAsset={assetsToUse[0]} className={styles.phone1} />}
            {assetsToUse[1] && <Phone mediaAsset={assetsToUse[1]} className={styles.phone2} />}
            {assetsToUse[2] && <Phone mediaAsset={assetsToUse[2]} className={styles.phone3} />}
          </div> */}
          <PhoneCarousel items={ecosystemFeature1MediaCollection?.items || []} />
          {!!copy && !isLandscape && (
            <>
              <p className={styles.copy}>{copy}</p>
              <span className={styles.caption}>{caption}</span>
            </>
          )}
        </div>
        {!!cta && (
          <ArrowLink className={cx(styles.cta, !cta.href && styles.disabled)} href={cta.href} isBig>
            {cta.label}
          </ArrowLink>
        )}
        {!!caption && isLandscape && (
          <span className={cx(styles.caption, styles.captionDesktop)}>{caption}</span>
        )}
      </div>
    </Section>
  );
};

export function Phone({
  mediaAsset,
  className,
  isContain,
}: {
  className?: string;
  mediaAsset: Maybe<AssetFragment>;
  isContain?: boolean;
}) {
  console.log({ mediaAsset });

  if (!mediaAsset) return null;

  return (
    <div className={cx(className, styles.phoneContainer, { [styles.isContain]: isContain })}>
      <img
        alt=""
        src={'/assets/images/iphone-14-hollow.webp'}
        className={styles.phoneContainer__hollowPhone}
        loading="lazy"
      />
      <div className={styles.mediaContainer}>
        {mediaAsset.contentType?.includes('video') && (
          <Video
            isBackgroundVideo
            url={mediaAsset.url as string}
            altText={mediaAsset.description}
            mobileUrl={mediaAsset?.url}
            previewUrl={mediaAsset?.url}
            className={styles.media}
          />
        )}
        {mediaAsset.contentType?.includes('image') && (
          <CMSImage
            width={400}
            height={800}
            className={styles.media}
            asset={mediaAsset}
            loading="lazy"
          />
        )}
      </div>
    </div>
  );
}
