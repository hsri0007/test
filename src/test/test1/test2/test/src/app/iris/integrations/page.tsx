import { Metadata } from 'next';

import { cms } from '~/cms';
import { Device, Features, Hero } from '~/components/pages/integrations';
import { LogosCTASection } from '~/components/sections';
import { Outro } from '~/components/ui';
import { getFirstItemInCollection } from '~/utils';
import { formatPageMeta } from '~/utils/server';

import styles from './integrations.module.scss';

const getData = async () => {
  const response = await cms().integrations({ ...cms().defaultVariables, product: 'exo-iris' });
  const data = getFirstItemInCollection(response.integrationsPageCollection);

  return data;
};

export async function generateMetadata(): Promise<Metadata> {
  const data = await getData();

  return formatPageMeta(data?.meta);
}

const IntegrationsPage = async () => {
  const data = await getData();

  const {
    heroImage,
    deviceTopHeading,
    deviceTopSubheading,
    deviceTopCopy,
    deviceImage,
    deviceRepeatedImage,
    deviceBottomHeading,
    deviceBottomCopy,
    deviceBottomCta,
    featuresHeading,
    feature1Image,
    feature1Heading,
    feature1Copy,
    feature1Cta,
    feature2Image,
    feature2Heading,
    feature2Copy,
    feature2Cta,
    feature3Image,
    feature3Heading,
    feature3Copy,
    feature3Cta,
    feature4Image,
    feature4Heading,
    feature4Copy,
    feature4Cta,
    trustCenter,
    outro,
  } = data;

  return (
    <div className={styles.container}>
      <Hero image={heroImage} hiddenHeroText={deviceTopHeading} />

      <Device
        topHeading={deviceTopHeading}
        topSubheading={deviceTopSubheading}
        topCopy={deviceTopCopy}
        deviceImage={deviceImage}
        deviceRepeatedImage={deviceRepeatedImage}
        bottomHeading={deviceBottomHeading}
        bottomCopy={deviceBottomCopy}
        bottomCta={deviceBottomCta}
      />

      <Features
        heading={featuresHeading}
        items={[
          { image: feature1Image, heading: feature1Heading, copy: feature1Copy, cta: feature1Cta },
          { image: feature2Image, heading: feature2Heading, copy: feature2Copy, cta: feature2Cta },
          { image: feature3Image, heading: feature3Heading, copy: feature3Copy, cta: feature3Cta },
          { image: feature4Image, heading: feature4Heading, copy: feature4Copy, cta: feature4Cta },
        ]}
      />

      <LogosCTASection
        privacyHeading={trustCenter?.heading ?? ''}
        privacySubhead={trustCenter?.subhead ?? ''}
        trustCenterText={trustCenter?.cta?.label ?? ''}
        trustCenterUrl={trustCenter?.cta?.href ?? ''}
        trustOrgLogosCollection={trustCenter?.complianceOrgsCollection!}
      />

      <Outro {...outro} />
    </div>
  );
};

export default IntegrationsPage;
