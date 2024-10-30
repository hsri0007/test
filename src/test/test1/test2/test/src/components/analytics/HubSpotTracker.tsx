'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';

const HubSpotTracker = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      var _hsq = (window._hsq = window._hsq || []);
      if (searchParams.size === 0) {
        _hsq.push(['setPath', pathname]);
      } else {
        _hsq.push(['setPath', pathname + '?' + searchParams.toString()]);
      }
      _hsq.push(['trackPageView']);
    }
  }, [pathname, searchParams]);

  return null;
};

export default HubSpotTracker;
