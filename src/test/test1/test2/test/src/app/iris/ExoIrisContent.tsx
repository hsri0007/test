'use client';

import gsap from 'gsap';
import { Flip } from 'gsap/Flip';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitText from 'gsap/SplitText';

import { ExoIrisContentFragment, PageWithModularSectionFragment } from '~/cms';
import {
  ExoIrisAnswers, // ExoIrisCanvas,
  ExoIrisHorizontalScroll,
  ExoIrisImageSequence,
  ExoIrisIntro,
  ExoIrisPhoneSequence,
  ExoIrisPhysicalSpecs,
  ExoIrisSeeDeeper,
} from '~/components/exo-iris';
import ExoIrisQuickLinks from '~/components/exo-iris/ExoIrisQuickLinks';
import {
  LogosCTASection,
  ModularSections,
  PricingSection,
  VideoSection,
} from '~/components/sections';
import { ExploreHighlightSection } from '~/components/sections/ExploreHighlightSection';
import { Outro } from '~/components/ui';
import { useIsLandscape } from '~/hooks/';

import styles from './exo-iris.module.scss';

gsap.registerPlugin(Flip, MorphSVGPlugin, ScrollTrigger, SplitText);

interface ExoIrisProps extends PageWithModularSectionFragment {
  data: ExoIrisContentFragment;
}

const ExoIris = (props: ExoIrisProps) => {
  const { articleCollection, data } = props;

  const {
    meta,
    introHeading,
    introSubhead,
    introCopy,
    modularSectionsTopCollection,
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
    seeImagesCollection,
    seeHeading1,
    seeHeading2,
    seeHeading3,
    seeStatsCollection,
    madeSimpleImage,
    madeSimpleHeading,
    madeSimpleCopy,
    madeSimpleCta,
    powerHeading,
    powerSubhead,
    powerCopy,
    powerCta,
    powerStatsCollection,
    horizontalHeading,
    phonesCollection,
    modularSectionsMiddleCollection,
    pricing,
    exploreHighlightSectionCollection,
    physicalSpecsHeading,
    physicalSpecsCopy,
    physicalSpecsCta,
    physicalSpecsStatsCollection,
    trustCenter,
    modularSectionsBottomCollection,
    outro,
    seeDeeperPhoneCarouselCollection,
  } = data;

  const isDesktop = useIsLandscape();

  return (
    <>
      {/* hiding the Quick links */}
      <ExoIrisQuickLinks />
      <div id="iris-container" className={styles.container}>
        <ExoIrisIntro subhead={introSubhead} copy={introCopy} />
        <div className={styles.modularSectionsTop}>
          <ModularSections
            articleCollection={articleCollection}
            items={modularSectionsTopCollection?.items}
          />
        </div>
        <ExoIrisSeeDeeper
          madeSimpleImage={madeSimpleImage}
          madeSimpleHeading={madeSimpleHeading}
          madeSimpleCopy={madeSimpleCopy}
          madeSimpleCta={madeSimpleCta}
          seeImages={seeImagesCollection}
          seeHeadings={[seeHeading1, seeHeading2, seeHeading3]}
          seeStats={seeStatsCollection}
          seeDeeperPhoneCarouselCollection={seeDeeperPhoneCarouselCollection}
        />
        <ExoIrisAnswers
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
        {/* <ExoIrisImageSequence
          heading={powerHeading}
          subhead={powerSubhead}
          copy={powerCopy}
          cta={powerCta}
          stats={powerStatsCollection}
        /> */}
        <ExoIrisHorizontalScroll id="why-exo-iris" heading={horizontalHeading} />
        <ExoIrisPhoneSequence phones={phonesCollection} />
        <ModularSections
          articleCollection={articleCollection}
          items={modularSectionsMiddleCollection?.items}
        />
        <PricingSection pricing={pricing} />
        <ExploreHighlightSection exploreHighlightCollection={exploreHighlightSectionCollection} />
        <ExoIrisPhysicalSpecs
          heading={physicalSpecsHeading}
          copy={physicalSpecsCopy}
          cta={physicalSpecsCta}
          stats={physicalSpecsStatsCollection}
        />
        <LogosCTASection
          privacyHeading={trustCenter?.heading ?? ''}
          privacySubhead={trustCenter?.subhead ?? ''}
          trustCenterText={trustCenter?.cta?.label ?? ''}
          trustCenterUrl={trustCenter?.cta?.href ?? ''}
          trustOrgLogosCollection={trustCenter?.complianceOrgsCollection!}
        />
        <ModularSections
          articleCollection={articleCollection}
          items={modularSectionsBottomCollection?.items}
        />
        <Outro {...outro} />
      </div>
    </>
  );
};

export default ExoIris;
