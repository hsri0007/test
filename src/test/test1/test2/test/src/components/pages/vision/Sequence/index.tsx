'use client';

import { AssetFragment } from '~/cms';
import { useIsLandscape } from '~/hooks';

import { DotAnimation } from './DotAnimation';
import styles from './Sequence.module.scss';
import { SequenceLarge } from './SequenceLarge/SequenceLarge';
import { SequenceSmall } from './SequenceSmall/SequenceSmall';

export interface SequenceProps {
  items: {
    number: number;
    image?: AssetFragment | null;
    heading: string | null;
    copy: string | null;
  }[];
}

const Sequence = (props: SequenceProps) => {
  const isDesktop = useIsLandscape();

  const Component = isDesktop ? SequenceLarge : SequenceSmall;
  return <Component {...props} />;
};

export { Sequence };
