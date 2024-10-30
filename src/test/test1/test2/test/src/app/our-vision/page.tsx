import { Metadata } from 'next';

import { cms } from '~/cms';
import { Hero, People, Sequence } from '~/components/pages/vision';
import { ModularSections } from '~/components/sections';
import { Outro } from '~/components/ui';
import { getFirstItemInCollection } from '~/utils';
import { formatPageMeta } from '~/utils/server';

const getData = async () => {
  const response = await cms().vision(cms().defaultVariables);

  return {
    articles: response.articleCollection,
    page: getFirstItemInCollection(response.visionCollection),
  };
};

export async function generateMetadata(): Promise<Metadata> {
  const { page } = await getData();

  return formatPageMeta(page?.meta);
}

const VisionPage = async () => {
  const { articles, page } = await getData();

  const {
    heroCopy,
    heroAnimatedCopy,
    splashHeading,
    splashCopy,
    splashFloatingImagesCollection,
    splashImageLarge,
    splashImageSmall,
    visionImagesCollection,
    visionAHeading,
    visionACopy,
    visionBHeading,
    visionBCopy,
    visionCHeading,
    visionCCopy,
    visionDHeading,
    visionDCopy,
    modularSectionsMiddleCollection,
    aboutHeading,
    aboutCopyA,
    aboutCtaA,
    aboutCopyB,
    aboutCtaB,
    aboutPeopleCollection,
    modularSectionsBottomCollection,
    outro,
  } = page;

  return (
    <div>
      <Hero
        heroHeading={heroCopy}
        heroSubhead={heroAnimatedCopy}
        splashHeading={splashHeading}
        splashCopy={splashCopy}
        splashFloatingImages={splashFloatingImagesCollection}
        splashImageLarge={splashImageLarge}
        splashImageSmall={splashImageSmall}
      />

      <Sequence
        items={[
          {
            number: 1,
            image: visionImagesCollection?.items[0],
            heading: visionAHeading,
            copy: visionACopy,
          },
          {
            number: 2,
            image: visionImagesCollection?.items[1],
            heading: visionBHeading,
            copy: visionBCopy,
          },
          {
            number: 3,
            image: visionImagesCollection?.items[2],
            heading: visionCHeading,
            copy: visionCCopy,
          },
          {
            number: 4,
            image: visionImagesCollection?.items[3],
            heading: visionDHeading,
            copy: visionDCopy,
          },
        ]}
      />

      <ModularSections
        articleCollection={articles}
        items={modularSectionsMiddleCollection?.items}
      />

      <People
        heading={aboutHeading}
        copyA={aboutCopyA}
        copyB={aboutCopyB}
        ctaA={aboutCtaA}
        ctaB={aboutCtaB}
        people={aboutPeopleCollection}
      />

      <ModularSections
        articleCollection={articles}
        items={modularSectionsBottomCollection?.items}
      />

      <Outro {...outro} />
    </div>
  );
};

export default VisionPage;
