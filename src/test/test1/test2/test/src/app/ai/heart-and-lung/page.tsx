import { Metadata } from 'next';

import Hero from '~/components/pages/ai/HeartAndLung/Hero/Hero';
import ImageBlock from '~/components/pages/ai/HeartAndLung/ImageBlock/ImageBlock';
import InnovationCallout from '~/components/pages/ai/HeartAndLung/InnovationCallout/InnovationCallout';
import Intro from '~/components/pages/ai/HeartAndLung/Intro/Intro';
import Introducing from '~/components/pages/ai/HeartAndLung/Introducing/Introducing';
import Performance from '~/components/pages/ai/HeartAndLung/Performance/Performance';
import ScreenComparison from '~/components/pages/ai/HeartAndLung/ScreenComparison/ScreenComparison';
import { Outro } from '~/components/ui';
import { formatPageMeta } from '~/utils/server';

import DATA from './data';
import styles from './heartAndLung.module.scss';

export async function generateMetadata(): Promise<Metadata> {
  return formatPageMeta({
    pageTitle: 'Exo AI | Heart & Lung',
    description: '',
    keywords: '',
    socialImage: {
      url: 'https://images.ctfassets.net/f1onadsih6xk/kSRTIfed5rD3Mf75FQWyP/0ff49011008bce637c315dc40d668575/AI-resized.png',
      width: 1200,
      height: 627,
    },
  });
}

const PostTextContent = () => {
  return (
    <ul className={styles.outroSubtextList}>
      {DATA.outro.subtextCopy.map((str, i) => (
        <li key={i} className={styles.outroSubtextList__item}>
          <span className={styles.outroSubtextList__number}>{i + 1}.</span>
          <span className={styles.outroSubtextList__text}>{str}</span>
        </li>
      ))}
    </ul>
  );
};

const AiHeartAndLungPage = () => {
  return (
    <div data-accent-color="ai-green" className={styles.page}>
      <Hero
        eyebrow={DATA.hero.eyebrow}
        mobileEyebrow={DATA.hero.mobileEyebrow}
        title={DATA.hero.title}
        subtitle={DATA.hero.subtitle}
        image={DATA.hero.image}
      />
      <Intro
        title={DATA.intro.title}
        description={DATA.intro.description}
        points={DATA.intro.points}
      />
      <ImageBlock
        title={DATA.imageBlock.title}
        image={DATA.imageBlock.image}
        textTitle={DATA.imageBlock.textTitle}
        text={DATA.imageBlock.text}
      />
      <Introducing
        subtitle={DATA.introducing.subtitle}
        title={DATA.introducing.title}
        paragraph1={DATA.introducing.paragraph1}
        paragraph2={DATA.introducing.paragraph2}
        itemsCollection={DATA.introducing.itemsCollection}
      />
      <ScreenComparison
        title1={DATA.comparison.title1}
        description1={DATA.comparison.description1}
        title2={DATA.comparison.title2}
        description2={DATA.comparison.description2}
        imagesCollection={DATA.comparison.imagesCollection}
      />
      <Performance
        title={DATA.performance.title}
        paragraph1={DATA.performance.paragraph1}
        paragraph2={DATA.performance.paragraph2}
        amenity1Title={DATA.performance.amenity1Title}
        amenity1ItemsCollection={DATA.performance.amenity1ItemsCollection}
        amenity2Title={DATA.performance.amenity2Title}
        amenity2ItemsCollection={DATA.performance.amenity2ItemsCollection}
      />
      <InnovationCallout title={DATA.innovation.title} description={DATA.innovation.description} />
      <Outro
        className={styles.outro}
        {...DATA.outro}
        postButtonContent={
          <div className={styles.outroTextContent}>
            <div className={styles.gradient} />
            <PostTextContent />
          </div>
        }
      />
    </div>
  );
};

AiHeartAndLungPage.displayName = 'AiHeartAndLungPage';

export default AiHeartAndLungPage;
