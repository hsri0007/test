'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { useEffect, useState } from 'react';

import { IS_NOT_PRODUCTION } from '~/constants';
import { env } from '~/env';
import { gtm } from '~/lib/gtm';

const GTM_ID = env.NEXT_PUBLIC_GTM;

export const GoogleTagManager = () => {
  const [loaded, setLoaded] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Prevents a duplicate pageview on the first load
    if (!loaded) {
      setLoaded(true);
      return;
    }
    if (pathname) {
      gtm.pageview(pathname);
    }
  }, [pathname, searchParams, loaded]);

  // Analytics scripts should only be used in production
  if (IS_NOT_PRODUCTION) {
    return null;
  }

  return (
    <>
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer', '${GTM_ID}');
  `,
        }}
      />
    </>
  );
};
