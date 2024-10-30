'use client';

import gsap from 'gsap';
import { Flip } from 'gsap/Flip';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitText from 'gsap/SplitText';

import { ExoIrisContentFragment, PageWithModularSectionFragment } from '~/cms';
import {
  ExoIrisAnswers, // ExoIrisCanvas,
} from '~/components/exo-iris';
import { useIsLandscape } from '~/hooks/';

import styles from './exo-iris.module.scss';

gsap.registerPlugin(Flip, MorphSVGPlugin, ScrollTrigger, SplitText);

interface ExoIrisProps extends PageWithModularSectionFragment {
  data: ExoIrisContentFragment;
}

const ExoIris = (props: ExoIrisProps) => {
  const { data } = props;

  const {
    answersHeading,
    answersCopy,
    answer1Heading,
    answer1Image,
    answer1Video,
    answer2Heading,
    answer2Image,
    answer2Video,
    answer3Heading,
    answer3Image,
    answer3Video,
    answersProofFloatingImage,
    answersProofCopy,
    answersProofGalleryImagesCollection,
  } = data;

  const isDesktop = useIsLandscape();

  return (
    <>
      <div id="iris-container" className={styles.container}>
        <ExoIrisAnswers
          galleryPage={true}
          answersHeading={answersHeading}
          answersCopy={answersCopy}
          answersItems={[
            { heading: answer1Heading, image: answer1Image, video: answer1Video },
            { heading: answer2Heading, image: answer2Image, video: answer2Video },
            { heading: answer3Heading, image: answer3Image, video: answer3Video },
          ]}
          proofImage={answersProofFloatingImage}
          proofCopy={answersProofCopy}
          proofGalleryImages={answersProofGalleryImagesCollection}
        />
      </div>
    </>
  );
};

export default ExoIris;
