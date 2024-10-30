'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { AnimatePresence, motion, useDragControls, useMotionValue } from 'framer-motion';
import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';
import { useRouter } from 'next/navigation';
import { useLayoutEffect, useRef, useState } from 'react';
import { useElementSize } from 'usehooks-ts';

import { ExoIrisContentFragment } from '~/cms';
import { CircleArrow, Close } from '~/components/svgs';
import { ButtonLink } from '~/components/ui';
import { useIsLandscape } from '~/hooks';
import { useGlobalStore } from '~/stores/globalStore';
import { cx } from '~/utils';

import styles from './ExoIrisGallery.module.scss';
import { GalleryAssetModal } from './GalleryAssetModal';

const FILTER_DATA = [
  { id: 'all', label: 'All' },
  { id: 'abdomen', label: 'Abdomen' },
  { id: 'cardiac', label: 'Cardiac' },
  { id: 'lung', label: 'Lung' },
  { id: 'ob/gyn', label: 'OB/GYN' },
  { id: 'vascular', label: 'Vascular' },
];

type FilterProps = {
  active: boolean;
  changeFn: () => void;
  id: string;
  label: string;
};

const Filter = ({ active, changeFn, id, label }: FilterProps) => {
  return (
    <motion.label
      className={cx(styles.label, active && styles.labelActive)}
      htmlFor={id}
      initial={{ filter: 'blur(20rem)' }}
      animate={{ filter: 'blur(0rem)' }}
      transition={{ duration: 1, delay: 0.5 }}
    >
      <input
        className="sr-only"
        type="radio"
        name="filter"
        id={id}
        value={id}
        checked={active}
        onChange={changeFn}
      />
      {label}
    </motion.label>
  );
};

interface ExoIrisGalleryProps {
  assets: ExoIrisContentFragment['answersProofGalleryImagesCollection'];
  galleryPage?: boolean;
}

export const ExoIrisGallery = (props: ExoIrisGalleryProps) => {
  const { assets, galleryPage = false } = props;

  const isDesktop = useIsLandscape();
  const { windowWidth } = useGlobalStore(['windowWidth']);
  const controls = useDragControls();
  const x = useMotionValue(0);
  const progressX = useMotionValue(0);
  const filterContainerRef = useRef<HTMLDivElement>(null);
  const contentContainerRef = useRef<HTMLDivElement>(null);
  const thumbnailsRef = useRef<any>([]);
  const [open, setOpen] = useState(false);
  const [progressValue, setProgressValue] = useState(0);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [previousFilter, setPreviousFilter] = useState<string | null>(null);
  const [filterAnimationActive, setFilterAnimationActive] = useState(false);
  const [fieldsetRef, { width }] = useElementSize();
  const router = useRouter();

  const inputChange = (id: string) => {
    if (!filterAnimationActive) {
      setActiveFilter(id);
    }
  };

  const dragFn = () => {
    const rawX = x.get();
    const finalX = rawX > 0 ? 0 : Math.abs(rawX);
    setProgressValue(finalX);
    progressX.set(Math.min(finalX / (width - windowWidth), 1));
  };

  useLayoutEffect(() => {
    if (galleryPage) {
      setOpen(galleryPage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // behavior and animations for filters.
  useLayoutEffect(() => {
    if (
      contentContainerRef?.current === null ||
      !open ||
      activeFilter === null ||
      previousFilter === activeFilter
    )
      return;

    const ctx = gsap.context(() => {
      if (contentContainerRef?.current === null) return;
      setFilterAnimationActive(true);
      const state = Flip.getState('.js__thumbnail-container', { props: 'filter' });
      const matches = contentContainerRef.current.querySelectorAll('.js__thumbnail-container');
      // use a forEach in matches and see if they have a data-category of activeFilter
      matches?.forEach((match: Element) => {
        if (!(match instanceof HTMLElement)) {
          return;
        }
        if (activeFilter === 'all') {
          match.style.display = 'inline-block';
          match.parentElement!.style.display = 'block';
        } else if (match.dataset.category !== activeFilter) {
          match.style.display = 'none';
          match.parentElement!.style.display = 'none';
        } else {
          match.style.display = 'inline-block';
          match.parentElement!.style.display = 'block';
        }
      });
      Flip.from(state, {
        duration: 0.5,
        scale: true,
        // absolute: true,
        ease: 'power1.inOut',
        onComplete: () => {
          setFilterAnimationActive(false);
          setPreviousFilter(activeFilter);
        },
        onEnter: (elements) =>
          gsap.fromTo(
            elements,
            { opacity: 0, filter: 'blur(15rem)' },
            {
              opacity: 1,
              filter: 'blur(0rem)',
              duration: 0.5,
              ease: 'none',
            }
          ),
        onLeave: (elements) =>
          gsap.to(elements, { opacity: 0, filter: 'blur(15rem)', duration: 0.5, ease: 'none' }),
      });
    }, contentContainerRef);

    return () => {
      ctx.revert();
    };
  }, [activeFilter, previousFilter, open, thumbnailsRef]);

  return (
    <Dialog.Root
      onOpenChange={(o) => {
        setOpen(o);
        if (!o) setActiveFilter(null);
      }}
    >
      {!galleryPage && <Dialog.Trigger className={styles.proofButton}>View gallery</Dialog.Trigger>}
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
              ></motion.div>
            </Dialog.Overlay>
            <Dialog.Content className={styles.container} asChild forceMount>
              <motion.div
                data-accent-color="iris-blue"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { delay: 0 } }}
                transition={{ duration: 0.4, ease: 'easeInOut', delay: 0.5 }}
                ref={contentContainerRef}
              >
                <Dialog.Title className="sr-only">Ultrasound images gallery</Dialog.Title>
                <p className={styles.instructions}>Swipe to view more categories</p>
                {!galleryPage ? (
                  <Dialog.Close className={styles.close}>
                    <Close title="Close gallery" className={styles.closeSvg} />
                  </Dialog.Close>
                ) : (
                  <div
                    className={styles.close}
                    onClick={() => {
                      router.back();
                    }}
                  >
                    <Close title="Close gallery" className={styles.closeSvg} />
                  </div>
                )}
                <div className={styles.contentContainer} data-lenis-prevent>
                  <div
                    className={styles.filterContainer}
                    ref={filterContainerRef}
                    data-lenis-prevent
                    data-cursor="drag"
                  >
                    <motion.fieldset
                      // @ts-expect-error
                      ref={fieldsetRef}
                      className={styles.fieldset}
                      drag={isDesktop ? false : 'x'}
                      whileDrag={{ cursor: 'grabbing' }}
                      onUpdate={() => dragFn()}
                      dragConstraints={filterContainerRef}
                      style={{ x }}
                    >
                      <legend className="sr-only">Filter by:</legend>
                      {FILTER_DATA.map((filter, i) => (
                        <Filter
                          key={filter.id}
                          active={
                            i === 0 // first filter is 'all'
                              ? activeFilter === null || activeFilter === 'all'
                              : activeFilter === filter.id
                          }
                          changeFn={() => inputChange(filter.id)}
                          id={filter.id}
                          label={filter.label}
                        />
                      ))}
                    </motion.fieldset>
                  </div>
                  <div className={styles.progress} aria-hidden />
                  <progress className="sr-only" value={progressValue} max={width - windowWidth} />
                  <motion.div className={styles.thumbnailsContainer}>
                    {assets?.items.map((item, i) => {
                      return (
                        <GalleryAssetModal
                          key={i}
                          index={i}
                          asset={item.asset}
                          thumbnail={item.thumbnail}
                          category={item.category}
                          slides={assets?.items}
                        />
                      );
                    })}
                  </motion.div>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        ) : null}
      </AnimatePresence>
    </Dialog.Root>
  );
};
