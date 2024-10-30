import { Metadata } from 'next';

import { cms } from '~/cms';
import { Hero, Items } from '~/components/pages/careers';
import { GradientTransitionSection, ModularSections } from '~/components/sections';
import { Outro, PageBackground } from '~/components/ui';
import { getFirstItemInCollection } from '~/utils';
import { formatPageMeta } from '~/utils/server';
import { Gradient } from '~/utils/types';

const getData = async () => {
  const response = await cms().careers(cms().defaultVariables);

  return {
    articles: response.articleCollection,
    page: getFirstItemInCollection(response.careersPageCollection),
  };
};

export async function generateMetadata(): Promise<Metadata> {
  const { page } = await getData();

  return formatPageMeta(page?.meta);
}

const MOBILE_GRADIENT = {
  stops: [
    { color: 'rgb(var(--light-light-gray))', position: '0%' },
    { color: 'rgb(var(--exo-fluro))', position: '33%' },
    { color: 'rgb(var(--exo-blue))', position: '65%' },
    { color: 'rgb(var(--dark-dark-blue))', position: '95%' },
    { color: 'rgb(var(--dark-dark-blue))', position: '100%' },
  ],
} satisfies Gradient;

const DESKTOP_GRADIENT = {
  stops: [
    { color: 'rgb(var(--light-light-gray))', position: '0%' },
    { color: 'rgb(var(--exo-fluro))', position: '33%' },
    { color: 'rgb(var(--exo-blue))', position: '65%' },
    { color: 'rgb(var(--dark-dark-blue))', position: '95%' },
    { color: 'rgb(var(--dark-dark-blue))', position: '100%' },
  ],
} satisfies Gradient;

const CareersPage = async () => {
  const { articles, page } = await getData();

  const {
    heroEyebrow,
    heroHeading,
    image1,
    image2,
    image3,
    heading1,
    heading2,
    heading3,
    copy1,
    copy2,
    copy3,
    cta1,
    cta2,
    cta3,
    modularSectionsCollection,
    outro,
  } = page;

  return (
    <>
      <PageBackground backgroundColor="light-light-gray" />
      <Hero eyebrow={heroEyebrow} heading={heroHeading} />
      <GradientTransitionSection
        mobileGradient={MOBILE_GRADIENT}
        gradient={DESKTOP_GRADIENT}
        sectionScale={1.25}
        gradientScale={1.5}
        isDark
      />
      <Items
        items={[
          { image: image1, heading: heading1, copy: copy1, cta: cta1 },
          { image: image2, heading: heading2, copy: copy2, cta: cta2 },
          { image: image3, heading: heading3, copy: copy3, cta: cta3 },
        ]}
      />

      <ModularSections articleCollection={articles} items={modularSectionsCollection?.items} />

      <Outro {...outro} />
    </>
  );
};

export default CareersPage;
