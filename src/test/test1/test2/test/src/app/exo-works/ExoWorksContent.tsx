'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRouter } from 'next/navigation';

import {
  ExoWorksContentFragment,
  PageWithModularSectionFragment,
  QuoteCarouselQuotesCollection,
} from '~/cms';
import {
  ExoWorksHero,
  ExoWorksInnovation,
  ExoWorksIntro,
  PhoneSequenceSteps,
} from '~/components/exo-works';
import { ExoWorksPhoneSequence } from '~/components/exo-works';
import { Features } from '~/components/pages/integrations';
import {
  LogosCTASection,
  PricingSection,
  QuotesCarouselSection,
  VideoSection,
} from '~/components/sections';
import { ArrowLink, ButtonLink, Outro, Video } from '~/components/ui';
import { useIsLandscape } from '~/hooks/';

import { DESKTOP_GRADIENT, EXO_WORKS_INNOVATION_CARDS, MOBILE_GRADIENT } from './data';
import styles from './exo-works.module.scss';

gsap.registerPlugin(ScrollTrigger);

interface ExoWorksProps extends PageWithModularSectionFragment {
  data: ExoWorksContentFragment;
}

const ExoWorks = (props: ExoWorksProps) => {
  const router = useRouter();
  const { articleCollection, data } = props;
  const phoneSequenceSteps: PhoneSequenceSteps[] = [];
  for (let i = 0; i < 6; i++) {
    const stepNumber = i + 1;
    phoneSequenceSteps.push({
      id: `step${stepNumber}`,
      heading: data[`feature${stepNumber}Heading` as keyof ExoWorksContentFragment] as string,
      bodyCopy: data[`feature${stepNumber}Description` as keyof ExoWorksContentFragment] as string,
      subCopy: data[`feature${stepNumber}SubCopy` as keyof ExoWorksContentFragment] as string,
      asset: data[`feature${stepNumber}Asset` as keyof ExoWorksContentFragment] as any,
    });
  }

  const {
    introTitle,
    introSubhead,
    introVideo,
    introFeatureList,
    pricing,
    trustCenter,
    testimonialsCollection,
    unlockMoreHeading,
    unlockMoreFeature1Image,
    unlockMoreFeature1ImageThumbnail,
    unlockMoreFeature1Heading,
    unlockMoreFeature1Description,
    unlockMoreFeature1Cta,
    outro,
    productBannerCopy,
    productBannerHeader1,
    productBannerSubheader1,
    productBannerHeader2,
    productBannerSubheader2,
  } = data;

  const isDesktop = useIsLandscape();

  const bannerData = [
    {
      name: productBannerHeader1 ?? '',
      subhead: productBannerSubheader1 ?? '',
    },
    {
      name: productBannerHeader2 ?? '',
      subhead: productBannerSubheader2 ?? '',
    },
  ];

  return (
    <div className={styles.container}>
      <ExoWorksHero subhead={introSubhead} />
      <ExoWorksIntro introTitle={introTitle} introFeatureList={introFeatureList} />
      <ExoWorksInnovation title={productBannerCopy ?? ''} data={bannerData} />
      <div className={styles.videoSectionContainer}>
        {introVideo ? (
          <VideoSection
            data-background-color="dark-dark-blue"
            darkTheme={true}
            backgroundVideo={false}
            heading={null}
            eyebrow={null}
            mobileVideo={null}
            previewVideo={null}
            __typename={'ResponsiveVideo'}
            sys={{ id: '' }}
            video={{
              url: introVideo?.url ?? '',
              description: introVideo?.description,
              width: 0,
              height: 0,
              contentType: '',
              sys: {
                id: '',
              },
            }}
          />
        ) : null}
        <div className={styles.wellstar}>
          <p>Wellstar MCG Health Implements Exo Works® and Sees 47% Increase in Revenue Capture</p>
          <ArrowLink
            href={
              '/article/wellstar-mcg-health-implements-exo-works-and-sees-47-percent-increase-in-revenue'
            }
            className={styles.wellstarCta}
            isBig
          />
        </div>
      </div>
      <ExoWorksPhoneSequence id="why-exo-works" steps={phoneSequenceSteps} />
      <LogosCTASection
        privacyHeading={trustCenter?.heading ?? ''}
        privacySubhead={trustCenter?.subhead ?? ''}
        trustCenterText={trustCenter?.cta?.label ?? ''}
        trustCenterUrl={trustCenter?.cta?.href ?? ''}
        trustOrgLogosCollection={trustCenter?.complianceOrgsCollection!}
      />
      <QuotesCarouselSection
        testimonials={testimonialsCollection as QuoteCarouselQuotesCollection}
      />
      <PricingSection pricing={pricing} />
      <Features
        heading={unlockMoreHeading}
        items={[
          {
            image: isDesktop ? unlockMoreFeature1Image : unlockMoreFeature1ImageThumbnail,
            //image: unlockMoreFeature1Image,
            heading: unlockMoreFeature1Heading,
            copy: unlockMoreFeature1Description,
            cta: unlockMoreFeature1Cta,
          },
        ]}
      />
      <Outro {...outro} primaryColor="works-purple" secondaryColor="pink" />
    </div>
  );
};

export default ExoWorks;
