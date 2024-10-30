'use client';

//@ts-ignore
import * as Checkbox from '@radix-ui/react-checkbox';
//@ts-ignore
import { CheckIcon } from '@radix-ui/react-icons';
import { ComponentProps } from 'react';

import styles from './FormCheckbox.module.scss';

interface FormCheckboxProps extends ComponentProps<'textarea'> {
  label: string;
  className?: string;
}

export const FormCheckbox = ({ label, className, id, ...rest }: FormCheckboxProps) => {
  return (
    <div className={styles.checkboxContainer}>
      <Checkbox.Root className={styles.CheckboxRoot} defaultChecked id={id}>
        <Checkbox.Indicator className={styles.CheckboxIndicator}>
          <CheckIcon />
        </Checkbox.Indicator>
      </Checkbox.Root>
      <label className={styles.checkboxLabel} htmlFor={id}>
        <p className={styles.labelText}>{label ? `${label}` : ''}</p>
      </label>
    </div>
  );
};
