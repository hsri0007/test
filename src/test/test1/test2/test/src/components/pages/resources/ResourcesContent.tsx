'use client';

import { Suspense } from 'react';

import { ContentFeatureFilter, type ContentFeatureFilterProps } from '../articles/Content';

export const ResourcesContent = (props: ContentFeatureFilterProps) => {
  return (
    <Suspense>
      <ContentFeatureFilter {...props} />
    </Suspense>
  );
};
