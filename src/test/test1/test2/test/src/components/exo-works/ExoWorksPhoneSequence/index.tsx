'use client';

import dynamic from 'next/dynamic';

import { AssetFragment, Maybe } from '~/cms';
import { Section } from '~/components/ui/Section';

import styles from './ExoWorksPhoneSequence.module.scss';
import PhoneSequenceContent from './PhoneSequenceContent';

export type PhoneSequenceSteps = {
  id: string;
  heading: string;
  bodyCopy: string;
  subCopy?: string | undefined;
  smallCopy?: string;
  asset: Maybe<AssetFragment>;
  isLaptop?: boolean;
};

type PhoneSequenceContentProps = {
  steps: PhoneSequenceSteps[];
  id?: string;
};

export const ExoWorksPhoneSequence = ({ steps, id }: PhoneSequenceContentProps) => {
  // const PhoneSequenceContent = dynamic(() => import('./PhoneSequenceContent'), {
  //   ssr: false,
  // });

  return (
    <Section id={id} className={styles.container}>
      <PhoneSequenceContent steps={steps} />
    </Section>
  );
};
