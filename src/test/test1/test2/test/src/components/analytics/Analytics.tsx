'use client';

import { GoogleTagManager } from '@next/third-parties/google';
import { usePathname } from 'next/navigation';
import { Suspense } from 'react';

import { env } from '~/env';

// import { FacebookPixel } from './FacebookPixel';
import HubSpotTracker from './HubSpotTracker';

export const Analytics = () => {
  const GTM_ID = env.NEXT_PUBLIC_GTM;
  const router = usePathname();

  // dont show cookie pop in iris gallery page
  if (router === '/iris-gallery') {
    return (
      <Suspense>
        <HubSpotTracker />
      </Suspense>
    );
  }

  return (
    <Suspense>
      <GoogleTagManager gtmId={GTM_ID} />
      {/* <FacebookPixel /> */}
      <HubSpotTracker />
    </Suspense>
  );
};
