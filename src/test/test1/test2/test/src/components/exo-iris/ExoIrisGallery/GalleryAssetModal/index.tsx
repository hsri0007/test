import * as Dialog from '@radix-ui/react-dialog';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import { AssetFragment, GalleryImageFragment, Maybe } from '~/cms';
import { CircleArrow, Close } from '~/components/svgs';
import { cx } from '~/utils';

import { GalleryThumbnail } from '../GalleryThumbnail';
import styles from './GalleryAssetModal.module.scss';

type GalleryImageModalProps = {
  category: string | null;
  index: number;
  asset: Maybe<AssetFragment>;
  thumbnail: Maybe<AssetFragment>;
  slides: Maybe<GalleryImageFragment>[];
  showModel?: boolean;
};

export const GalleryAssetModal = ({
  index,
  category,
  thumbnail,
  asset,
  slides,
  showModel = false,
}: GalleryImageModalProps) => {
  const [open, setOpen] = useState(false);
  const isVideo = asset?.contentType?.split('/')[0] === 'video';
  const [activeSlide, setActiveSlide] = useState<number | undefined>(index);

  useEffect(() => {
    if (showModel) {
      setOpen(showModel);
    }
  }, [showModel]);

  return (
    <Dialog.Root open={open} onOpenChange={(o) => setOpen(o)}>
      <Dialog.Trigger asChild>
        <GalleryThumbnail thumbnail={thumbnail} index={index} category={category} />
      </Dialog.Trigger>
      <AnimatePresence>
        {open ? (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                className={styles.overlay}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              />
            </Dialog.Overlay>
            <Dialog.Content asChild forceMount>
              <motion.div
                className={styles.content}
                onClick={() => {
                  // if (open) {
                  //   setOpen(false);
                  // }
                }}
              >
                <Dialog.Title className="sr-only">Ultrasound image</Dialog.Title>
                <Dialog.Close className={styles.close}>
                  <Close title="Close gallery" className={styles.closeSvg} />
                </Dialog.Close>
                {!showModel && (
                  <button
                    className={cx(styles.carouselNavBtn, styles.carouselNavForwardBtn)}
                    onClick={() => {
                      if (activeSlide === slides.length - 1) setActiveSlide(0);
                      else setActiveSlide(activeSlide! + 1);
                    }}
                  >
                    <CircleArrow className={styles.carouselNavIcon} title="forward-arrow-icon" />
                  </button>
                )}
                {!showModel && (
                  <button
                    className={cx(styles.carouselNavBtn, styles.carouselNavBackBtn)}
                    onClick={() => {
                      if (activeSlide === 0) setActiveSlide(slides.length - 1);
                      else setActiveSlide(activeSlide! - 1);
                    }}
                  >
                    <CircleArrow
                      className={cx(styles.carouselNavIcon, styles.carouselNavIconBack)}
                      title="backward-arrow-icon"
                    />
                  </button>
                )}
                <motion.div
                  className={styles.imageContainer}
                  initial={{ opacity: 0, filter: 'blur(15rem)' }}
                  animate={{ opacity: 1, filter: 'blur(0rem)' }}
                  exit={{ opacity: 0, filter: 'blur(15rem)', transition: { delay: 0 } }}
                  transition={{ duration: 0.4, ease: 'easeInOut', delay: 0.2 }}
                >
                  {isVideo ? (
                    <motion.video
                      className={cx(styles.image, styles.video)}
                      src={slides[activeSlide!]?.asset?.url as string}
                      autoPlay
                      loop
                      muted
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 1.2 }}
                      transition={{ duration: 0.5, ease: 'easeInOut' }}
                    />
                  ) : (
                    <motion.img
                      className={styles.image}
                      src={slides[activeSlide!]?.asset?.url}
                      alt={slides[activeSlide!]?.asset?.description}
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 1.2 }}
                      transition={{ duration: 0.5, ease: 'easeInOut' }}
                    />
                  )}
                  <span className={styles.caption}>{slides[activeSlide!]?.asset?.description}</span>
                </motion.div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        ) : null}
      </AnimatePresence>
    </Dialog.Root>
  );
};
