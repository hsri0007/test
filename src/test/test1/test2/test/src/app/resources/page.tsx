import { Metadata } from 'next';

import { cms } from '~/cms';
import { ResourcesContent } from '~/components/pages/resources/ResourcesContent';
import { Section } from '~/components/ui';

import styles from './resources.module.scss';

const getResourcesData = async () => {
  const response = await cms().resources(cms().defaultVariables);

  return {
    ...response,
  };
};

export const metadata: Metadata = {
  title: 'Resources',
  description: 'Get the latest resources about point-of-care ultrasound (POCUS) at Exo.',
  openGraph: {
    title: 'Resources',
    description: 'Get the latest resources about point-of-care ultrasound (POCUS) at Exo.',
    locale: 'en-US',
    type: 'website',
  },
};

const ResourcesPage = async () => {
  const data = await getResourcesData();

  return (
    <Section data-accent-color="lavender" className={styles.container}>
      <ResourcesContent data={data.articleCollection} heading="Resources" />
    </Section>
  );
};

export default ResourcesPage;
