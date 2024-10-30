'use client';

import { motion, useAnimationControls } from 'framer-motion';
import { forwardRef, useCallback, useEffect, useRef } from 'react';

import { AssetFragment, Maybe } from '~/cms';
import { CMSImage } from '~/components/ui';
import { useIsLandscape } from '~/hooks';
import { cx } from '~/utils';

import styles from './GalleryThumbnail.module.scss';

type GalleryThumbnailProps = {
  index: number;
  category: string | null;
  thumbnail: Maybe<AssetFragment>;
};

export const GalleryThumbnail = forwardRef<HTMLButtonElement, GalleryThumbnailProps>(
  (props: GalleryThumbnailProps, ref) => {
    const { thumbnail, index, category } = props;
    const controls = useAnimationControls();

    const introAnimation = useCallback(async () => {
      await controls.start({
        opacity: 1,
        transition: {
          duration: 0.3,
          delay: 0.7 + index * 0.1,
        },
      });
      await controls.start({
        filter: 'blur(0)',
        transition: {
          duration: 0.5,
          delay: 0.7 + index * 0.1,
        },
      });
    }, [controls, index]);

    useEffect(() => {
      introAnimation();
    }, [introAnimation]);

    return (
      <div>
        <motion.button
          ref={ref}
          {...props}
          className={cx(styles.thumbnailContainer, 'js__thumbnail-container')}
          initial={{ opacity: 0, filter: 'blur(15rem)' }}
          animate={controls}
          data-category={category?.toLowerCase()}
        >
          <CMSImage className={styles.thumbnailImage} asset={thumbnail} />
        </motion.button>
      </div>
    );
  }
);

GalleryThumbnail.displayName = 'GalleryThumbnail';
