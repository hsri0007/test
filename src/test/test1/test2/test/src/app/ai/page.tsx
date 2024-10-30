import { Metadata } from 'next';

import { cms } from '~/cms';
import { Background, HeroCanvas, Manifesto, Partnerships, Scans } from '~/components/pages/ai';
import { SweepAi } from '~/components/pages/ai/AISweeper';
import { ModularSections } from '~/components/sections';
import { NewsletterSection } from '~/components/sections/NewsletterSection';
import { Outro } from '~/components/ui';
import { getFirstItemInCollection } from '~/utils';
import { formatPageMeta, parseMarkdown } from '~/utils/server';

import styles from './exo-Ai.module.scss';

const getData = async () => {
  const response = await cms().ai(cms().defaultVariables);

  return {
    articles: response.articleCollection,
    page: getFirstItemInCollection(response.aiPageCollection),
  };
};

export async function generateMetadata(): Promise<Metadata> {
  const { page } = await getData();

  console.log({ 'page.meta': page.meta });

  return formatPageMeta(page?.meta);
}

const TechnologyPage = async () => {
  const { articles, page } = await getData();

  const {
    heroHeading,
    manifestoSectionHeading,
    manifestoItemsNumbered,
    manifestoHeading1,
    manifestoHeading2,
    manifestoHeading3,
    manifestoHeading4,
    manifestoHeading5,
    manifestoHeading6,
    manifestoIcon1,
    manifestoIcon2,
    manifestoIcon3,
    manifestoIcon4,
    manifestoIcon5,
    manifestoIcon6,
    manifestoCopy1,
    manifestoCopy2,
    manifestoCopy3,
    manifestoCopy4,
    manifestoCopy5,
    manifestoCopy6,
    aiPhoneImagesCollection,
    aiImage1,
    aiImage2,
    aiImage3,
    aiImage4,
    aiImage5,
    aiHeading1,
    aiHeading2,
    aiHeading3,
    aiHeading4,
    aiHeading5,
    aiClearance1,
    aiClearance2,
    aiClearance3,
    aiClearance4,
    aiClearance5,
    aiCopy1,
    aiCopy2,
    aiCopy3,
    aiCopy4,
    aiCopy5,
    partnershipsHeading,
    partnershipsCopy,
    partnershipsCta,
    modularSectionsCollection,
    outro,
  } = page;

  return (
    <div data-accent-color="ai-green">
      <Background />
      <HeroCanvas />
      <div className={styles.Sweep}>
        <SweepAi />
      </div>
      <Scans
        items={[
          {
            image: aiImage1,
            heading: aiHeading1,
            clearance: aiClearance1,
            copy: parseMarkdown(aiCopy1),
          },
          {
            image: aiImage2,
            heading: aiHeading2,
            clearance: aiClearance2,
            copy: parseMarkdown(aiCopy2),
          },
          {
            image: aiImage3,
            heading: aiHeading3,
            clearance: aiClearance3,
            copy: parseMarkdown(aiCopy3),
          },
          {
            image: aiImage4,
            heading: aiHeading4,
            clearance: aiClearance4,
            copy: parseMarkdown(aiCopy4),
          },
          {
            image: aiImage5,
            heading: aiHeading5,
            clearance: aiClearance5,
            copy: parseMarkdown(aiCopy5),
          },
        ]}
        phoneImages={aiPhoneImagesCollection}
      />
      {/* <ExoWorksInnovation
        title={'Exo Works® POCUS workflow can scale to meet you'}
        data={[
          {
            name: 'Exo Works Connect',
            subhead: 'Get up and running fast for compliance, QA and proficiency tr',
          },
        ]}
      /> */}
      <Partnerships heading={partnershipsHeading} copy={partnershipsCopy} cta={partnershipsCta} />
      <Manifesto
        heading={manifestoSectionHeading}
        ordered={manifestoItemsNumbered}
        unordered={[
          { icon: manifestoIcon1, heading: manifestoHeading1, copy: parseMarkdown(manifestoCopy1) },
          { icon: manifestoIcon2, heading: manifestoHeading2, copy: parseMarkdown(manifestoCopy2) },
          { icon: manifestoIcon3, heading: manifestoHeading3, copy: parseMarkdown(manifestoCopy3) },
          { icon: manifestoIcon4, heading: manifestoHeading4, copy: parseMarkdown(manifestoCopy4) },
          { icon: manifestoIcon5, heading: manifestoHeading5, copy: parseMarkdown(manifestoCopy5) },
          { icon: manifestoIcon6, heading: manifestoHeading6, copy: parseMarkdown(manifestoCopy6) },
        ]}
      />
      <ModularSections articleCollection={articles} items={modularSectionsCollection?.items} />
      <Outro {...outro} />
    </div>
  );
};

export default TechnologyPage;
