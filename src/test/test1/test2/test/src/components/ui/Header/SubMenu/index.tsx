'use client';

import Image, { StaticImageData } from 'next/image';
import { ComponentProps, Fragment, useCallback, useMemo, useState } from 'react';

import { ExoLink } from '~/components/ui/ExoLink';
import { cx } from '~/utils';
import { ColorName } from '~/utils/types';

import styles from './SubMenu.module.scss';

export interface SubMenuItems {
  label: string;
  href: string;
  color?: ColorName;
  image?: { src: string | StaticImageData; alt: string; caption?: string };
}

interface SubMenuProps extends ComponentProps<'div'> {
  isActive: boolean;
  id: string;
  items: SubMenuItems[];
  activateSubMenu: () => void;
}

export const SubMenu = (props: SubMenuProps) => {
  const { className, children, id, isActive, items, activateSubMenu, ...otherProps } = props;
  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);
  const activeItem = useMemo(() => {
    if (activeItemIndex === null) {
      return null;
    }
    return items[activeItemIndex];
  }, [activeItemIndex, items]);

  const removeAsActiveItem = useCallback(
    (index: number) => {
      if (index === activeItemIndex) {
        setActiveItemIndex(null);
      }
    },
    [activeItemIndex]
  );
  return (
    <div
      {...otherProps}
      className={cx(
        styles.submenu,
        isActive && styles.active,
        !!activeItem && !!activeItem.image && styles.containsActiveItemWithImage,
        styles[`submenu_${id}`]
      )}
      onMouseEnter={activateSubMenu}
      aria-hidden={!isActive}
      id={`${id}-submenu`}
      key={`${id}-submenu`}
    >
      <ul className={styles.items} key={`${id}-list`}>
        {items.map((item, index) => {
          return (
            <li
              key={`${id}-${index}`}
              className={cx(styles.item, activeItem?.color && styles[activeItem?.color])}
            >
              <ExoLink
                className={styles.link}
                href={item.href}
                tabIndex={isActive ? 0 : -1}
                onMouseEnter={() => setActiveItemIndex(index)}
                onMouseLeave={() => removeAsActiveItem(index)}
                onFocus={() => setActiveItemIndex(index)}
                onBlur={() => removeAsActiveItem(index)}
              >
                {item.label}
              </ExoLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
