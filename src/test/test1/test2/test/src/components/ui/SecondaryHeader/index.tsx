'use client';

import { Suspense } from 'react';

import { SecondaryHeaderContent, SecondaryHeaderProps } from './SecondaryHeader';

export const SecondaryHeader = (props: SecondaryHeaderProps) => {
  return (
    <Suspense>
      <SecondaryHeaderContent {...props} />
    </Suspense>
  );
};
