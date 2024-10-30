import { ComponentProps } from 'react';

import { cx } from '~/utils';

import styles from './<FTName | pascalcase>.module.scss';

interface <FTName | pascalcase>Props extends ComponentProps<'<element>'> {}

export const <FTName | pascalcase> = (props: <FTName | pascalcase>Props) => {
      const { className, children, ...otherProps } = props;
  return (
    <<element> {...otherProps} className={cx(className)}>
      {children}
    </<element>>
  );
};