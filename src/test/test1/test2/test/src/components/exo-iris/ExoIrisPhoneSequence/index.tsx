'use client';

import dynamic from 'next/dynamic';

import { ExoIrisContentFragment } from '~/cms';
import { Section } from '~/components/ui/Section';

import styles from './ExoIrisPhoneSequence.module.scss';
import PhoneSequenceContent from './PhoneSequenceContent';

interface ExoIrisPhoneSequenceProps {
  phones: ExoIrisContentFragment['phonesCollection'];
}

export const ExoIrisPhoneSequence = (props: ExoIrisPhoneSequenceProps) => {
  const { phones } = props;

  // const PhoneSequenceContent = dynamic(() => import('./PhoneSequenceContent'), {
  //   ssr: false,
  // });

  return (
    <Section id="phone-sequence" className={styles.container} isDark>
      <PhoneSequenceContent phones={phones} />
    </Section>
  );
};
