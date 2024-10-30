import { Metadata } from 'next';

import { cms } from '~/cms';
import { Content, ContentFeature } from '~/components/pages/articles/Content';
import { Section } from '~/components/ui';

import styles from './newsroom.module.scss';

const getNewsroomData = async () => {
  const response = await cms().newsroom(cms().defaultVariables);

  return {
    ...response,
  };
};

export const metadata: Metadata = {
  title: 'Newsroom',
  description: 'Get the latest news about point-of-care ultrasound (POCUS) at Exo.',
  openGraph: {
    title: 'Newsroom',
    description: 'Get the latest news about point-of-care ultrasound (POCUS) at Exo.',
    locale: 'en-US',
    type: 'website',
  },
};

const NewsroomPage = async () => {
  const data = await getNewsroomData();

  return (
    <Section data-accent-color="lavender" className={styles.container}>
      <ContentFeature data={data.articleCollection} heading="Newsroom" />
      <Content data={data.mediaCollection} heading="Media Coverage" />
    </Section>
  );
};

export default NewsroomPage;
