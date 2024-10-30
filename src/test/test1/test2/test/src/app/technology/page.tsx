import { Metadata } from 'next';

import { cms } from '~/cms';
import {
  Features,
  Hero,
  Meets,
  Partnerships,
  TechnologyImageSequence,
} from '~/components/pages/technology';
import { Intro } from '~/components/pages/technology/Intro';
import { ModularSections } from '~/components/sections';
import { Outro } from '~/components/ui';
import { getFirstItemInCollection } from '~/utils';
import { formatPageMeta } from '~/utils/server';

import styles from './technology.module.scss';

const getData = async () => {
  const response = await cms().technology({ ...cms().defaultVariables, product: 'exo-silicon' });

  return {
    articles: response.articleCollection,
    page: getFirstItemInCollection(response.technologyPageCollection),
  };
};

export async function generateMetadata(): Promise<Metadata> {
  const { page } = await getData();

  return formatPageMeta(page?.meta);
}

const TechnologyPage = async () => {
  const { articles, page } = await getData();

  const {
    meetsWordLeft,
    meetsWordCenter,
    meetsWordRight,
    meetsHeading,
    meetsCopy,
    modularSectionsCollection,
    powerHeading,
    powerCopy,
    pmutCta,
    physicalSpecsStatsCollection,
    celloHeading,
    celloCopy1,
    celloCopy2,
    featuresHeading,
    featuresSubheading,
    feature1Image,
    feature1Heading,
    feature1Copy,
    feature1Cta,
    feature2Image,
    feature2Heading,
    feature2Copy,
    feature2Cta,
    partnershipsHeading,
    partnershipsSubheading,
    partnershipsContactHeading,
    partnershipsContactCopy,
    partnershipsContactCta,
    partnershipsApplicationsListHeading,
    partnershipsApplicationsListItems,
    outro,
  } = page;

  return (
    <>
      <Intro
        wordLeft={meetsWordLeft}
        wordCenter={meetsWordCenter}
        wordRight={meetsWordRight}
        heading={meetsHeading}
        copy={meetsCopy}
      />
      <div className={styles.modularBackground}>
        <ModularSections articleCollection={articles} items={modularSectionsCollection?.items} />
      </div>

      <TechnologyImageSequence
        powerHeading={powerHeading}
        powerCopy={powerCopy}
        pmutCta={pmutCta}
        physicalSpecsStatsCollection={physicalSpecsStatsCollection}
        celloHeading={celloHeading}
        celloCopy1={celloCopy1}
        celloCopy2={celloCopy2}
      />

      <Features
        heading={featuresHeading}
        subheading={featuresSubheading}
        items={[
          { image: feature1Image, heading: feature1Heading, copy: feature1Copy, cta: feature1Cta },
          {
            image: feature2Image,
            heading: feature2Heading,
            copy: feature2Copy,
            cta: feature2Cta,
            hasHeart: true,
          },
        ]}
      />

      <Partnerships
        heading={partnershipsHeading}
        subheading={partnershipsSubheading}
        contactHeading={partnershipsContactHeading}
        contactCopy={partnershipsContactCopy}
        contactCta={partnershipsContactCta}
        appsHeading={partnershipsApplicationsListHeading}
        appsList={partnershipsApplicationsListItems}
      />

      <Outro {...outro} />
    </>
  );
};

export default TechnologyPage;
