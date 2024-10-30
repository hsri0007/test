import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLayoutEffect, useMemo, useRef, useState } from 'react';

import { AssetFragment, ExoIrisContentFragment } from '~/cms';
import { ExoIrisGallery } from '~/components/exo-iris';
import { useIsLandscape } from '~/hooks';
import { cx } from '~/utils';

import { GalleryAssetModal } from '../ExoIrisGallery/GalleryAssetModal';
import styles from './ExoIrisAnswers.module.scss';

gsap.registerPlugin(ScrollTrigger);

interface ExoIrisAnswersProps {
  answersHeading: ExoIrisContentFragment['answersHeading'];
  answersCopy: ExoIrisContentFragment['answersCopy'];
  answersItems: {
    heading: string | null;
    image: AssetFragment | null;
    video: AssetFragment | null;
  }[];
  proofImage: ExoIrisContentFragment['answersProofFloatingImage'];
  proofCopy: ExoIrisContentFragment['answersProofCopy'];
  proofGalleryImages: ExoIrisContentFragment['answersProofGalleryImagesCollection'];
  galleryPage?: boolean;
}

export const ExoIrisAnswers = (props: ExoIrisAnswersProps) => {
  const {
    answersHeading,
    answersCopy,
    answersItems,
    proofImage,
    proofCopy,
    proofGalleryImages,
    galleryPage = false,
  } = props;

  const [showGalleryModel, setShowGalleryModel] = useState<null | string>(null);
  const isDesktop = useIsLandscape();
  const proofContainerRef = useRef<HTMLDivElement | null>(null);

  function randomFloat() {
    return Math.round(Math.random() * 1000) / 1000;
  }

  const proofImageYValues = useMemo(() => {
    return [0.5, 0.1, 0.8, 0.3, 0.1, 0.5];
  }, []);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const imagesAreaRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const proofContainer = proofContainerRef.current;
    if (!container || !proofContainer) return;

    const ctx = gsap.context(() => {
      const items = container.querySelectorAll('.js__answerItem');
      const itemsArray = Array.from(items).filter((item) => item);
      const galleryImages = proofContainer.querySelectorAll('.js_galleryImage');
      const galleryImagesArray = Array.from(galleryImages).filter((item) => item);
      const proofContainerDesktop = container.querySelector('.js__proofContainerDesktop');

      if (isDesktop) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: imagesAreaRef.current,
            start: '0% 100%',
            end: '100% 25%',
            scrub: true,
          },
        });

        if (itemsArray.length) {
          tl.fromTo(
            itemsArray,
            { y: '25%', opacity: 0 },
            { y: '0', opacity: 1, stagger: 0.7, ease: 'linear', duration: 1 },
            0
          );
        }

        tl.addLabel('exit');
        if (itemsArray.length) {
          tl.to(
            [...itemsArray].reverse(),
            { y: '-25%', opacity: 0, stagger: 0.7, ease: 'linear', duration: 1 },
            '+=1'
          );
        }

        tl.fromTo(
          container,
          { y: '25%' },
          { y: '0', ease: 'power1.out', duration: tl.totalDuration() * 0.5 },
          0
        );

        tl.fromTo(
          container,
          { y: '0' },
          { y: '-25%', ease: 'power1.in', duration: tl.totalDuration() * 0.5 },
          tl.totalDuration() * 0.5
        );

        if (proofContainerDesktop) {
          tl.to(
            proofContainerDesktop,
            { opacity: 0, y: '-25%', ease: 'power1.in', duration: tl.totalDuration() * 0.5 },
            'exit'
          );
        }

        const galleryTL = gsap.timeline({
          scrollTrigger: {
            trigger: proofContainer,
            start: '0% 50%',
            end: '100% 60%',
            scrub: true,
          },
        });

        if (galleryImagesArray.length) {
          galleryTL.to(
            galleryImagesArray,
            { opacity: 1, stagger: 0.5, ease: 'linear', duration: 1 },
            0
          );
        }

        const parallaxTL = gsap.timeline({
          scrollTrigger: {
            trigger: proofContainer,
            start: '0% 100%',
            end: '100% 0%',
            scrub: true,
          },
        });

        if (galleryImagesArray.length) {
          const offset = 40;
          proofImageYValues.forEach((speed, index) => {
            const minSpeed = speed;
            parallaxTL.fromTo(
              galleryImagesArray[index],
              { y: `${offset * minSpeed}vh` },
              { y: `${-offset * minSpeed}vh`, ease: 'linear', duration: 1 },
              0
            );
          });
        }
      } else {
        if (!imagesAreaRef.current) return;

        const tlIn = gsap.timeline({
          scrollTrigger: {
            trigger: imagesAreaRef.current,
            start: '0% 80%',
            end: '100% 80%',
            scrub: true,
            immediateRender: false,
          },
        });

        if (itemsArray.length) {
          tlIn.fromTo(
            itemsArray,
            { y: '15%', opacity: 0 },
            { y: '0', opacity: 1, stagger: 1, ease: 'power1.out', duration: 1 }
          );
        }

        const tlOut = gsap.timeline({
          scrollTrigger: {
            trigger: imagesAreaRef.current,
            start: '0% -10%',
            end: '100% 15%',
            scrub: true,
            immediateRender: false,
          },
        });

        const galleryTL = gsap.timeline({
          scrollTrigger: {
            trigger: proofContainer,
            start: '0% 50%',
            end: '100% 50%',
            scrub: true,
          },
        });

        if (galleryImagesArray.length) {
          galleryTL.to(
            galleryImagesArray,
            { opacity: 1, stagger: 0.5, ease: 'linear', duration: 1 },
            0
          );
        }

        const parallaxTL = gsap.timeline({
          scrollTrigger: {
            trigger: proofContainer,
            start: '0% 100%',
            end: '100% 0%',
            scrub: true,
          },
        });

        if (galleryImagesArray.length) {
          const offset = 35;
          proofImageYValues.forEach((speed, index) => {
            const minSpeed = speed;
            parallaxTL.fromTo(
              galleryImagesArray[index],
              { y: `${offset * minSpeed}vh` },
              { y: `${-offset * minSpeed}vh`, ease: 'linear', duration: 1 },
              0
            );
          });
        }
      }
    }, container);

    return () => ctx.revert();
  }, [isDesktop, proofImageYValues]);

  if (galleryPage) {
    return <ExoIrisGallery assets={proofGalleryImages} galleryPage={galleryPage} />;
  }

  function generateGalleryImage(arr: any) {
    const obj = {
      sys: {
        id: arr?.video?.sys?.id,
      },
      category: arr.heading,
      thumbnail: arr.image,
      asset: arr?.video,
    };
    return obj;
  }

  const answerGalleryVideos = answersItems.map((value, index) => generateGalleryImage(value));

  return (
    <section className={styles.container}>
      <div className={styles.headingContainer}>
        <h2 className={styles.headline}>{answersHeading}</h2>
        <p className={styles.copy}>{answersCopy}</p>
      </div>
      <div className={styles.imagesArea} ref={imagesAreaRef} id="iris-answers">
        <div className={styles.imagesAreaOffset}>
          <div className={cx(styles.imagesContainer, 'js__imagesContainer')} ref={containerRef}>
            {answersItems.map((value, index) => {
              const obj = generateGalleryImage(value);
              return (
                <div key={index} className={cx(styles.answerItem, 'js__answerItem')}>
                  <div className={styles.imageContainer}>
                    <div className={styles.imageWrapper}>
                      <img
                        className={styles.image}
                        src={value.image?.url}
                        alt={value.image?.description ? value.image?.description : ''}
                        width={370}
                        height={410}
                        loading="lazy"
                      />
                      {showGalleryModel === obj.sys.id && (
                        <GalleryAssetModal
                          key={obj.sys.id}
                          index={index}
                          asset={obj.asset}
                          thumbnail={obj.thumbnail}
                          category={obj.category}
                          slides={answerGalleryVideos}
                          showModel={true}
                        />
                      )}
                      <div
                        className={styles.playIcon}
                        onClick={() => {
                          setShowGalleryModel(null);
                          setTimeout(() => {
                            setShowGalleryModel(obj.sys.id);
                          });
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="107"
                          height="107"
                          viewBox="0 0 107 107"
                          fill="none"
                        >
                          <path d="M73 52.5L43.75 71.9856L43.75 33.0144L73 52.5Z" fill="white" />
                          <circle cx="53.5" cy="53.5" r="52.5" stroke="white" stroke-width="2" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <h2 className={styles.imageHeading}>{value.heading}</h2>
                </div>
              );
            })}
            <div className={cx(styles.proofContainerDesktop, 'js__proofContainerDesktop')}>
              <p className={styles.proofCopy}>{proofCopy}</p>
              <div className={styles.proofGallery}>
                <ExoIrisGallery assets={proofGalleryImages} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.proofBottomContainer} />
      <div className={styles.proofContainer}>
        <p className={styles.proofCopy}>{proofCopy}</p>
        <ExoIrisGallery assets={proofGalleryImages} />
        <div className={styles.floatingImagesContainer} ref={proofContainerRef} />
      </div>
    </section>
  );
};
