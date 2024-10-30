import { Metadata } from 'next';

import AI_LOGO from '~/assets/images/temp/ai-logo.webp';
import IRIS_LOGO from '~/assets/images/temp/iris-logo.webp';
import WORKS_LOGO from '~/assets/images/temp/works-logo.svg';
import { cms } from '~/cms';
import {
  ExoIrisHomepage,
  HomepageExoWorksSection,
  HomepageHero,
  HomepageOrbSection,
} from '~/components/homepage';
import { MediaBackgroundSection, ModularSections } from '~/components/sections';
import { Outro, PageBackground } from '~/components/ui';
import { getFirstItemInCollection } from '~/utils';
import { formatPageMeta } from '~/utils/server';

const getHomeData = async () => {
  const response = await cms().home(cms().defaultVariables);
  const homeData = getFirstItemInCollection(response.homeCollection);
  return {
    ...response,
    homeCollection: undefined,
    ...homeData,
  };
};

export async function generateMetadata(): Promise<Metadata> {
  const data = await getHomeData();
  return formatPageMeta(data?.meta);
}

const HomePage = async () => {
  const data = await getHomeData();

  const { worksPhoneImagesCollection } = data;
  const worksPhoneImages = worksPhoneImagesCollection?.items.map((item) => item?.url) as string[];

  if (!data) {
    return '';
  }
  return (
    <div>
      <PageBackground backgroundColor="light-light-gray" />
      <HomepageHero
        headline={data.heroHeading ?? 'Headline Missing'}
        subhead={data.heroSubhead}
        copy={data.heroCopy}
      />

      <ModularSections
        items={data.modularSectionsTopCollection?.items}
        articleCollection={data.articleCollection}
      />

      <ExoIrisHomepage
        logo={{ src: IRIS_LOGO.src, alt: 'Exo Iris' }}
        heading={data.irisHeading ?? ''}
        copy={data.irisCopy ?? ''}
        primaryCta={data.irisPrimaryCta}
        secondaryCta={data.irisSecondaryCta}
      />

      <HomepageExoWorksSection
        logo={{ src: WORKS_LOGO.src }}
        heading={data.worksHeading ?? ''}
        copy={data.worksCopy ?? ''}
        primaryCta={data.worksPrimaryCta}
        secondaryCta={data.worksSecondaryCta}
        screens={worksPhoneImages}
        videoAltText={data.worksVideosAltDescription}
      />

      <ModularSections
        items={data.modularSectionsMiddleCollection?.items}
        articleCollection={data.articleCollection}
      />

      <MediaBackgroundSection
        isHalf={false}
        data-accent-color="ai-green"
        side="left"
        logo={{ src: data.ecosystemFeature1Logo?.url ?? AI_LOGO.src }}
        heading={data.ecosystemFeature1Heading ?? ''}
        copy={data.ecosystemFeature1Copy ?? ''}
        desktopImage={data.ecosystemFeature1Image}
        mobileImage={data.ecosystemFeature1ImageMobile}
        ecosystemFeatureImage1Desktop={data.ecosystemFeatureImage1Desktop}
        ecosystemFeatureImage1Mobile={data.ecosystemFeatureImage1Mobile}
        ecosystemFeatureImage2Desktop={data.ecosystemFeatureImage2Desktop}
        ecosystemFeatureImage3Desktop={data.ecosystemFeatureImage3Desktop}
        ecosystemFeature1MediaCollection={data.ecosystemFeature1MediaCollection}
        cta={
          data.ecosystemFeature1Cta?.href || data.ecosystemFeature1Cta?.label
            ? {
                href: data.ecosystemFeature1Cta?.href ?? '',
                label: data.ecosystemFeature1Cta?.label ?? '',
              }
            : undefined
        }
        caption={data.ecosystemFeature1Caption}
      />

      <HomepageOrbSection
        heading={data.ecosystemHeading}
        copy={data.ecosystemCopy}
        ctas={data.ecosystemCtasCollection}
      />

      <ModularSections
        items={data.modularSectionsBottomCollection?.items}
        articleCollection={data.articleCollection}
      />

      <Outro {...data.outro} />
    </div>
  );
};

export default HomePage;
