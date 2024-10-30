'use client';

import { ComponentProps, useRef } from 'react';

import { cx } from '~/utils';

import { Hero } from '../Hero';
import { Meets } from '../Meets';
import type { MeetsProps } from '../Meets';
import styles from './Intro.module.scss';

interface IntroProps
  extends ComponentProps<'div'>,
    Pick<MeetsProps, 'wordLeft' | 'wordCenter' | 'wordRight' | 'heading' | 'copy'> {}

export const Intro = (props: IntroProps) => {
  const { className, children, wordLeft, wordCenter, wordRight, heading, copy, ...otherProps } =
    props;
  const ref = useRef<null | HTMLDivElement>(null);
  return (
    <div {...otherProps} className={cx(className, styles.introWrapper)} ref={ref}>
      <Hero introRef={ref} />
      <Meets
        wordLeft={wordLeft}
        wordCenter={wordCenter}
        wordRight={wordRight}
        heading={heading}
        copy={copy}
      />
    </div>
  );
};
