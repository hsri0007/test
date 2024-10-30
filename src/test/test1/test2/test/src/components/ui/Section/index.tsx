import { Ref } from 'react';
import { ComponentPropsWithoutRef, forwardRef } from 'react';

import { cx } from '~/utils';
import { ColorName } from '~/utils/types';

import { DarkSection } from './DarkSection';
import styles from './Section.module.scss';

export interface SectionProps extends ComponentPropsWithoutRef<'section'> {
  isDark?: boolean;
  isHalf?: boolean; // Makes the section half width on desktop
  accentColor?: ColorName;
  id?: string;
}

export const Section = forwardRef((props: SectionProps, ref: Ref<HTMLElement>) => {
  const { className, children, isDark = false, isHalf = false, id, ...otherProps } = props;
  const SectionComponent = isDark ? DarkSection : 'section';

  return (
    <SectionComponent
      ref={ref}
      {...otherProps}
      id={id}
      className={cx(styles.section, isHalf && styles.halfSection, className)}
    >
      {children}
    </SectionComponent>
  );
});

Section.displayName = 'Section';
