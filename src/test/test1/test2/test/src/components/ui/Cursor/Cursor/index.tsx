'use client';

import { ComponentProps, Ref, forwardRef } from 'react';

import { useIsMobile } from '~/hooks';
import { useGlobalStore } from '~/stores/globalStore';
import { cx } from '~/utils';
import { ColorName, CursorIconName, CursorName, OmitChildren } from '~/utils/types';

import { CursorIcon } from '../CursorIcon';
import styles from './Cursor.module.scss';

interface CursorProps extends OmitChildren<ComponentProps<'button'>> {
  name?: CursorName;
  isGlobal?: boolean;
  isHidden?: boolean;
}

export const Cursor = forwardRef((props: CursorProps, ref: Ref<HTMLButtonElement>) => {
  const { className, name, isGlobal = false, isHidden = false, ...otherProps } = props;
  const { mousePressed } = useGlobalStore(['mousePressed']);

  const isIcon = name === 'chevron-left' || name === 'chevron-right' || name === 'pause';
  const isMobile = useIsMobile();

  return (
    <button
      {...otherProps}
      className={cx(
        styles.cursor,
        mousePressed && styles.pressed,
        isMobile && styles.mobile,
        isGlobal && styles.global,
        isHidden && styles.hidden,
        className
      )}
      ref={ref}
      {...otherProps}
      aria-label={name ? name : 'Cursor'}
    >
      {isIcon ? <CursorIcon icon={name} /> : <span className={styles.copy}>{name}</span>}
    </button>
  );
});

Cursor.displayName = 'Cursor';
