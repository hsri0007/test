'use client';

import { ComponentProps, useId, useMemo } from 'react';

import { cx } from '~/utils';
import { CursorIconName, OmitChildren } from '~/utils/types';

import styles from './CursorIcon.module.scss';

interface CursorIconProps extends OmitChildren<ComponentProps<'svg'>> {
  icon: CursorIconName;
}

export const CursorIcon = (props: CursorIconProps) => {
  const { className, icon, ...otherProps } = props;
  const id = useId();
  const iconContent = useMemo(() => {
    switch (icon) {
      case 'pause':
        return (
          <g>
            <path key={`${id}-icon-content`} d="M7.5 4.5V15.5" stroke="currentColor" />
            <path d="M12.5 4.5V15.5" stroke="currentColor" />
          </g>
        );
      case 'chevron-right':
        return <path key={`${id}-icon-content`} d="M5 1L15 10L5 19" stroke="currentColor" />;
      case 'chevron-left':
        return <path key={`${id}-icon-content`} d="M5 1L15 10L5 19" stroke="currentColor" />;
      default:
        return <g></g>;
    }
  }, [icon, id]);
  return (
    <svg
      {...otherProps}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cx(className, styles.icon, styles[`icon_${icon}`])}
    >
      {iconContent}
    </svg>
  );
};
