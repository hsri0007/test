import { ComponentProps } from 'react';

import { cx } from '~/utils';
import { ColorName, OmitChildren } from '~/utils/types';

import styles from './PageBackground.module.scss';

interface PageBackgroundProps extends OmitChildren<ComponentProps<'div'>> {
  backgroundColor: ColorName;
}

export const PageBackground = (props: PageBackgroundProps) => {
  const { className, backgroundColor, ...otherProps } = props;
  return (
    <div
      {...otherProps}
      data-background-color={backgroundColor}
      className={cx(styles.pageBackground, className, backgroundColor)}
    />
  );
};
