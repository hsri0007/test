import { useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useEffect, useRef, useState } from 'react';
import Swiper from 'swiper';
import 'swiper/css';
import { SwiperOptions } from 'swiper/types';

import { Asset, AssetCollection, AssetFragment, Maybe, Sys } from '~/cms';
import { CMSImage } from '~/components/ui';
import { useIsLandscape } from '~/hooks';
import { cx } from '~/utils';

import VideoAltText from '../VideoAltText';
import styles from './PhoneCarousel.module.scss';

ScrollTrigger.config({
  ignoreMobileResize: true,
});

gsap.registerPlugin(ScrollTrigger);

const PhoneCarousel = ({
  items,
  scrollTriggerElement,
  scrollTriggerStart,
  scrollTriggerEnd,
}: {
  items:
    | (Pick<Asset, 'contentType' | 'url' | 'description' | 'width' | 'height'> & {
        sys: Pick<Sys, 'id'>;
      })[];
  scrollTriggerElement?: HTMLElement | string;
  scrollTriggerStart?: string;
  scrollTriggerEnd?: string;
}) => {
  const carouselElementRef = useRef<HTMLDivElement | null>(null);
  const carouselRef = useRef<Swiper | null>(null);
  const [currentItems, setCurrentItems] = useState([...items, ...items]);
  // const currentItems = useRef(ITEMS);
  const [resizeKey, setResizeKey] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(items?.length);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const navigationRef = useRef<HTMLDivElement | null>(null);
  const buttonsRef = useRef<HTMLDivElement | null>(null);
  const slidesChangedTimeout = useRef<ReturnType<typeof setTimeout> | null>();
  const remountTimeout = useRef<ReturnType<typeof setTimeout> | null>();
  const isInView = useInView(containerRef, { margin: '1000px 0px 1000px 0px' });
  const isDesktop = useIsLandscape();
  const [sliderInitialized, setSliderInitialized] = useState(false);
  const timelineRef = useRef<GSAPTimeline | null>(null);
  const scrollTrigger = useRef<ScrollTrigger>();
  const swiperInstance = useRef<any>(null);
  const [scrollTriggerComplete, setScrollTriggerComplete] = useState(false);
  const hasDoneMobileSlideHack = useRef(false);

  useEffect(() => {
    if (
      !sliderInitialized ||
      !containerRef.current ||
      !buttonsRef.current ||
      !navigationRef.current
    )
      return;

    if (scrollTrigger.current) {
      scrollTrigger.current.kill();
    }

    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    const queryClass = styles.phoneContainerInner;
    const allInnerItems = containerRef.current.querySelectorAll(`.${queryClass}`);
    allInnerItems.forEach((el) => {
      if (el) {
        gsap.set(el, { clearProps: 'all' });
      }
    });

    gsap.set([buttonsRef.current, navigationRef.current], { clearProps: 'all' });

    if (!swiperInstance.current?.slides?.length) return;

    const leftItem = swiperInstance.current.slides[swiperInstance.current.activeIndex - 1];
    const centerItem = swiperInstance.current.slides[swiperInstance.current.activeIndex];
    const rightItem = swiperInstance.current.slides[swiperInstance.current.activeIndex + 1];

    // if (!leftItem || !centerItem || !rightItem) return;

    const items = [leftItem, centerItem, rightItem];
    const innerItems: any = [];
    items.forEach((el) => {
      if (!el) return;
      const innerDiv = el.querySelectorAll(`.${queryClass}`)[0];
      if (innerDiv) {
        innerItems.push(innerDiv);
      }
    });

    if (!isDesktop || scrollTriggerComplete) return;

    timelineRef.current = gsap.timeline();

    timelineRef.current.fromTo(
      innerItems,
      {
        y: 175,
      },
      {
        y: 0,
        stagger: 0.1,
      }
    );

    timelineRef.current.fromTo(
      [buttonsRef.current, navigationRef.current],
      {
        autoAlpha: 0,
      },
      {
        autoAlpha: 1,
      }
    );

    scrollTrigger.current = new ScrollTrigger({
      trigger: scrollTriggerElement ? scrollTriggerElement : containerRef.current,
      start: scrollTriggerStart ? scrollTriggerStart : 'top bottom',
      end: scrollTriggerEnd ? scrollTriggerEnd : `bottom+=${window.innerHeight * 0.3} bottom`,
      animation: timelineRef.current,
      scrub: true,
      onLeave: () => {
        setScrollTriggerComplete(true);
      },
    });
  }, [
    sliderInitialized,
    isDesktop,
    scrollTriggerElement,
    scrollTriggerStart,
    scrollTriggerEnd,
    scrollTriggerComplete,
  ]);

  useEffect(() => {
    return () => {
      if (scrollTrigger.current) {
        scrollTrigger.current.kill();
      }

      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, []);

  useEffect(() => {
    if (!items?.length) return;

    if (isDesktop) {
      setCurrentItems([...items, ...items]);
    } else {
      setCurrentItems(items);
    }
  }, [isDesktop, items]);

  useEffect(() => {
    return;
    if (!sliderInitialized) return;
    if (swiperInstance.current?.slides?.length && !isDesktop && !hasDoneMobileSlideHack.current) {
      hasDoneMobileSlideHack.current = true;
      const interval = 10;
      swiperInstance.current.slides.forEach((_: any, i: number) => {
        setTimeout(() => {
          swiperInstance.current.slideTo(i, 0);

          setTimeout(() => {
            if (i === swiperInstance.current.slides.length - 1) {
              swiperInstance.current.slideTo(0, 0);
            }
          }, interval);
        }, i * interval);
      });
    }
  }, [isDesktop, sliderInitialized]);

  useEffect(() => {
    if (!isInView || !containerRef.current) return;

    const videos = containerRef.current.querySelectorAll('video');
    if (videos.length) {
      videos.forEach((el) => {
        if (!el) return;
        // el.src = el.dataset.src || '';
        // el.load();
      });

      if (carouselRef?.current?.slides?.length) {
        carouselRef.current.slides.forEach((el) => {
          const video = el.querySelectorAll('video')[0];
          if (el.classList.contains('swiper-slide-active') && video) {
            video.play();
          }
        });
      }
    }
  }, [isInView, isDesktop]);

  useEffect(() => {
    const handleResize = () => {
      setResizeKey(new Date().getTime());
    };

    window.removeEventListener('resize', handleResize);

    if (!isDesktop) return;

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isDesktop]);

  useEffect(() => {
    if (!carouselElementRef.current) return;

    if (remountTimeout.current) {
      clearTimeout(remountTimeout.current);
    }

    setSliderInitialized(false);

    if (carouselRef.current) {
      carouselRef.current.destroy();
    }

    remountTimeout.current = setTimeout(() => {
      const onSlideChange = (swiper: any) => {
        setActiveIndex(swiper.realIndex);

        if (slidesChangedTimeout.current) {
          clearTimeout(slidesChangedTimeout.current);
        }

        slidesChangedTimeout.current = setTimeout(() => {
          if (!swiper?.slides?.length) return;
          swiper.slides.forEach((el: any) => {
            const video = el.querySelectorAll('video')[0] as HTMLVideoElement | undefined;
            if (!video) return;
            if (el.classList.contains('swiper-slide-active')) {
              video.playbackRate = 1;
              video.play();
            } else {
              // Using playbackrate instead of pause to prevent the blackscreen issue in safari
              video.playbackRate = 0;
              video.play();
            }
          });
        }, 0);
      };

      let settings: SwiperOptions = {
        slidesPerView: 3,
        loop: true,
        centeredSlides: true,
        initialSlide: items.length,
        on: {
          afterInit: function (swiper) {
            swiperInstance.current = swiper;
            setTimeout(() => {
              setSliderInitialized(true);
            }, 600);
          },
          slideChange: function (swiper) {
            swiperInstance.current = swiper;
            onSlideChange(swiper);
          },
        },
      };

      if (!isDesktop) {
        settings = {
          slidesPerView: 3,
          spaceBetween: 20,
          centeredSlides: true,
          on: {
            afterInit: function (swiper) {
              swiperInstance.current = swiper;

              setTimeout(() => {
                setSliderInitialized(true);
              }, 600);
            },
            slideChange: function (swiper) {
              swiperInstance.current = swiper;
              onSlideChange(swiper);
            },
          },
        };
      }

      carouselRef.current = new Swiper(carouselElementRef.current as HTMLElement, settings);
    }, 100);

    return () => {
      if (carouselRef.current) {
        carouselRef.current.destroy();
      }
    };
  }, [resizeKey, isDesktop, currentItems, items]);

  if (!currentItems.length) return null;

  return (
    <div className={styles.PhoneCarousel} ref={containerRef}>
      <div ref={carouselElementRef} className={cx(styles.swiper, 'swiper')}>
        <ul className={cx(styles.swiperWrapper, 'swiper-wrapper')}>
          {currentItems.map((item, i) => {
            return (
              <li className={cx(styles.swiperSlide, 'swiper-slide')} key={i}>
                <Phone mediaAsset={item} />
              </li>
            );
          })}
        </ul>
        <div className={styles.navigation} ref={navigationRef}>
          {items.map((_, i) => {
            return (
              <div
                key={i}
                className={cx(styles.navigationItem, {
                  [styles.active]: activeIndex === i || activeIndex === i + items.length,
                })}
                onClick={() => {
                  if (!swiperInstance.current) return;
                  const realIndex =
                    activeIndex >= items.length ? activeIndex - items.length : activeIndex;
                  if (i === realIndex) return;
                  const diff = Math.abs(realIndex - i);
                  const isAfter = i > realIndex;

                  // slideTo api does not work well with looped items
                  // as we are faking the loop on desktop by
                  // multiplying items by 2
                  for (let index = 0; index < diff; index++) {
                    setTimeout(() => {
                      if (isAfter) {
                        swiperInstance.current.slideNext(0);
                      } else {
                        swiperInstance.current.slidePrev(0);
                      }
                    }, 0);
                  }
                }}
              />
            );
          })}
        </div>
      </div>
      <div ref={buttonsRef} className={styles.buttonsContainer}>
        <PhoneCarouselButton
          direction="left"
          className={styles.leftButton}
          onClick={() => {
            if (carouselRef.current) {
              carouselRef.current.slidePrev();
            }
          }}
        />
        <PhoneCarouselButton
          direction="right"
          className={styles.rightButton}
          onClick={() => {
            if (carouselRef.current) {
              carouselRef.current.slideNext();
            }
          }}
        />
      </div>
    </div>
  );
};

PhoneCarousel.displayName = 'PhoneCarousel';

const PhoneCarouselButton = ({
  direction,
  onClick,
  className,
}: {
  direction: 'left' | 'right';
  onClick: () => void;
  className?: string;
}) => {
  return (
    <button
      className={cx(styles.PhoneCarouselButton, styles[direction], className)}
      onClick={() => {
        if (onClick) onClick();
      }}
    >
      <span className={styles.iconContainer}>
        <svg viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10.5122 0.878906L1.48782 9.00086L10.5122 17.1228"
            stroke="currentColor"
            stroke-width="0.902439"
          />
        </svg>
      </span>
    </button>
  );
};

PhoneCarouselButton.displayName = 'PhoneCarouselButton';

function Phone({
  mediaAsset,
  className,
}: {
  className?: string;
  mediaAsset: Maybe<AssetFragment>;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  if (!mediaAsset) return null;

  return (
    <div className={cx(className, styles.phoneContainer)}>
      <div className={styles.phoneContainerInner}>
        <img
          alt=""
          src={'/assets/images/iphone-hollow.webp'}
          className={styles.phoneContainer__hollowPhone}
          // loading="lazy"
        />

        <div className={styles.mediaContainer}>
          {mediaAsset.contentType?.includes('video') && (
            <>
              <VideoAltText text={mediaAsset.description} describes={videoRef.current} />
              <video
                src={`${mediaAsset.url}#t=0.001`}
                data-src={`${mediaAsset.url}#t=0.001`}
                playsInline
                preload="auto"
                autoPlay={false}
                muted
                loop
                className={styles.media}
                ref={videoRef}
              />
            </>
          )}
          {mediaAsset.contentType?.includes('image') && (
            <CMSImage
              width={400}
              height={800}
              className={styles.media}
              asset={mediaAsset}
              // loading="lazy"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default PhoneCarousel;
