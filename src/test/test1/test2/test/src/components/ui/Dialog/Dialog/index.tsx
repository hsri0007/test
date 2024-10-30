'use client';

import * as D from '@radix-ui/react-dialog';
import Image from 'next/image';
import React from 'react';

import styles from './Dialog.module.scss';

interface DialogProps {
  title?: string;
  description?: string;
  children?: React.ReactNode;
  isOpen?: boolean;
  closeModal?: () => void;
}
const Dialog = ({
  title = '',
  description = '',
  children,
  isOpen = false,
  closeModal,
}: DialogProps) => {
  return (
    <D.Root open={isOpen} modal={false}>
      <D.Portal forceMount>
        <D.Content
          className={styles.dialog}
          forceMount
          onOpenAutoFocus={(e) => {
            e.preventDefault();
          }}
        >
          <div className={styles.header}>
            <div>
              <D.Title className={styles.title}>{title}</D.Title>
              <D.Description className={styles.description}>{description}</D.Description>
            </div>
            <D.Close className={styles.close} onClick={closeModal} aria-label="Close">
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g>
                  <rect
                    x="1"
                    y="1"
                    width="28"
                    height="28"
                    rx="14"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    id="Vector 96"
                    d="M10.7578 10.7578L19.2431 19.2431"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    id="Vector 97"
                    d="M10.7578 19.2422L19.2431 10.7569"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </g>
              </svg>
            </D.Close>
          </div>
          <div className={styles.body}>{children}</div>
        </D.Content>
      </D.Portal>
    </D.Root>
  );
};

export default Dialog;
