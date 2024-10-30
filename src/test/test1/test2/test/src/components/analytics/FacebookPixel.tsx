'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { useEffect, useState } from 'react';

import { IS_NOT_PRODUCTION } from '~/constants';
import { env } from '~/env';
import { pixel } from '~/lib/fpixel';

export const FacebookPixel = () => {
  const [loaded, setLoaded] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!loaded) return;

    pixel.pageview();
  }, [pathname, searchParams, loaded]);

  // Analytics scripts should only be used in production
  if (IS_NOT_PRODUCTION) {
    return null;
  }

  return (
    <div>
      <Script
        id="fb-pixel"
        src="/scripts/pixel.js"
        strategy="afterInteractive"
        onLoad={() => setLoaded(true)}
        data-pixel-id={env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID}
      />
    </div>
  );
};
