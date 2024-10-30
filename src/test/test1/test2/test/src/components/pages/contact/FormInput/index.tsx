'use client';

import { ComponentPropsWithoutRef } from 'react';

import { cx } from '~/utils';

import styles from './FormInput.module.scss';

interface FormInputProps extends ComponentPropsWithoutRef<'input'> {
  className?: string | undefined;
  label: string;
}

export const FormInput = ({ className, label, ...rest }: FormInputProps) => {
  return (
    <label className={cx(styles.formLabel, className)}>
      <p className={styles.labelText}>{label ? `${label}:` : ''}</p>
      <input className={styles.inputEl} {...rest} />
    </label>
  );
};
