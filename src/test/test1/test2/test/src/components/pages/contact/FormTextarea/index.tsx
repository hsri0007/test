'use client';

import { ComponentProps } from 'react';

import styles from './FormTextarea.module.scss';

interface FormTextareaProps extends ComponentProps<'textarea'> {
  label: string;
}

export const FormTextarea = ({ label, ...rest }: FormTextareaProps) => {
  return (
    <label className={styles.formLabel}>
      <p className={styles.labelText}>{label ? `${label}:` : ''}</p>
      <textarea className={styles.textAreaEl} {...rest} required />
    </label>
  );
};
