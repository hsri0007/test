'use client';

import { ComponentProps, useMemo } from 'react';

import { useGlobalStore } from '~/stores/globalStore';
import { cx } from '~/utils';

import { Cursor } from '../Cursor';
import styles from './GlobalCursor.module.scss';

interface GlobalCursorProps extends ComponentProps<'div'> {}

export const GlobalCursor = (props: GlobalCursorProps) => {
  const { className, children, ...otherProps } = props;
  const { mousePressed, globalCursor, mouseInactive } = useGlobalStore([
    'mousePressed',
    'globalCursor',
    'mouseInactive',
  ]);

  return (
    <div
      {...otherProps}
      className={cx(className, styles.cursorWrapper, mousePressed && styles.pressed)}
      data-accent-color={globalCursor?.accentColor}
      data-theme={globalCursor?.theme}
    >
      <Cursor
        isGlobal
        isHidden={
          (mouseInactive && globalCursor.inactiveHidden) ||
          globalCursor.hidden ||
          !globalCursor.name
        }
        name={globalCursor.name}
      />
    </div>
  );
};
