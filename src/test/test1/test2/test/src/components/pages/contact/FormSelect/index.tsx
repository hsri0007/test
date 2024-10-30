'use client';

//@ts-ignore
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import * as Select from '@radix-ui/react-select';
import { ComponentProps, ReactNode, forwardRef } from 'react';

import { cx } from '~/utils';

import styles from './FormSelect.module.scss';

interface FormSelectProps extends ComponentProps<'select'> {
  label: string;
  type: string;
  selectOptions: {
    data: {
      value: string | number;
      name: string;
    }[];
  };
}

interface SelectItemProps {
  children?: ReactNode;
  className?: string;
  ref?: any;
  value: string | number;
}

export const FormSelect = ({ label, selectOptions, ...rest }: FormSelectProps) => {
  const SelectItem = forwardRef(
    ({ children, className, ...props }: SelectItemProps, forwardedRef) => {
      return (
        //@ts-ignore
        <Select.Item className={cx(styles.SelectItem, className)} {...props} ref={forwardedRef}>
          <Select.ItemText>{children}</Select.ItemText>
          <Select.ItemIndicator className={styles.SelectItemIndicator}>
            {' '}
            <CheckIcon />{' '}
          </Select.ItemIndicator>
        </Select.Item>
      );
    }
  );

  SelectItem.displayName = 'SelectItem';

  return (
    <label className={styles.formLabel}>
      <p className={styles.labelText}>{label ? `${label}:` : ''}</p>
      <Select.Root>
        <Select.Trigger className={cx(styles.SelectTrigger, styles.selectEl)} aria-label="Food">
          <Select.Value placeholder="Please select" />
          <Select.Icon className={cx(styles.SelectIcon)}>
            <ChevronDownIcon />
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content className={styles.SelectContent}>
            <Select.ScrollUpButton className={styles.SelectScrollButton}>
              {' '}
              <ChevronUpIcon />{' '}
            </Select.ScrollUpButton>
            <Select.Viewport className={styles.SelectViewport}>
              <Select.Group>
                {selectOptions &&
                  selectOptions.data.map((e, key) => {
                    return (
                      <SelectItem key={'sel' + e.value + key} value={e.value}>
                        {e.name}
                      </SelectItem>
                    );
                  })}
              </Select.Group>
            </Select.Viewport>
            <Select.ScrollDownButton className={cx(styles.SelectScrollButton, styles.selectIcon)}>
              <ChevronDownIcon />
            </Select.ScrollDownButton>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </label>
  );
};
